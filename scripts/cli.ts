#!/usr/bin/env bun
/**
 * panda-ui-mithril CLI
 *
 * `bunx panda-ui-mithril init` — generates/updates the consumer's
 * configuration:
 *   1. `pum/` — local copy of `preset.ts` + `theme.ts` (+ d.ts) + the `theme/`
 *      folder with `{colors,fonts,spacing,radii,keyframes}.ts`. The copied
 *      preset imports the package's recipes (`panda-ui-mithril/recipes`,
 *      public barrel) — recipes are NOT copied. The theme (`pum/theme/*.ts`)
 *      is the consumer's local editable source.
 *   2. `panda.config.ts` — points at `./pum/preset` (not node_modules).
 *   3. Mithril JSX fields in `tsconfig.json` (jsx: react + factory m).
 *      The dev server (`bun index.html`) compiles the package's `.jsx` files
 *      with the JSX config from `tsconfig.json` (only `bun build` honours
 *      `bunfig.toml`, the dev server does not — verified empirically).
 *
 * Legacy layout: if the project was initialized by an old CLI version, `pum/`
 * holds a single-file `theme.ts` (no `theme/` folder). `init` detects it and
 * MIGRATES automatically to `pum/theme/*.ts`, preserving the customized values
 * (colors/fonts/spacing/radii/keyframes) that may have been edited in the
 * legacy file. The `config` editor cannot operate on the legacy layout and
 * returns a migration hint.
 *
 * Usage:
 *   bunx panda-ui-mithril init           # creates pum/ + config (no overwrite)
 *   bunx panda-ui-mithril init --force   # force overwrite
 *   bunx panda-ui-mithril init --dir <path>     # writes everything inside
 *                                          <path> instead of cwd (the same root
 *                                          `config --dir` later needs)
 *   bunx panda-ui-mithril config         # visual editor (Elysia) on :1234,
 *                                          opens the browser automatically
 *   bunx panda-ui-mithril config --port 5000    # custom port (--port=5000 ok)
 *   bunx panda-ui-mithril config --dir <path>   # points the editor at another root
 *   bunx panda-ui-mithril --help
 *
 * `--dir`/`-d` on `init`: treats `<path>` as the project's effective root for
 * EVERYTHING `init` writes (pum/, panda.config.ts, tsconfig.json,
 * postcss.config.cjs, pum/index.css) — it is created if missing. Same flag and
 * semantics as `config --dir` already has (see themeDirFromArgv in
 * config-ui/server.ts), on purpose: `init --dir my-app && config --dir my-app`
 * land in the same place. The generated `panda.config.ts` still ships
 * `include: ['./src/**\/*...']` relative to ITS OWN folder — if the real
 * source does not live inside `<path>`, that include has to be edited by hand
 * afterwards.
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  extractBalanced,
  extractCategory,
  parseColors,
  parseFlat,
  writeColorsSrc,
  writeFlatSrc,
} from '../config-ui/theme-io'

const CLI_DIR = dirname(fileURLToPath(import.meta.url))
// The CLI lives in scripts/ of the installed package → the package root is ../.
// node_modules/panda-ui-mithril/scripts/cli.ts → node_modules/panda-ui-mithril/
const PKG_DIR = join(CLI_DIR, '..')

const CONFIG_NAME = 'panda.config.ts'
const TSCONFIG_NAME = 'tsconfig.json'
const PUM_DIR = 'pum'
const POSTCSS_CONFIG_NAME = 'postcss.config.cjs'
// Pipeline postcss entry css (default; the user can change it in
// config-ui → Postcss). The @layer directive enables the generation of Panda's
// CSS (reset/base/tokens/recipes/utilities) when postcss runs.
const PUM_ENTRY_CSS = 'pum/index.css'

const CONFIG_TEMPLATE = `import { defineConfig } from '@pandacss/dev'
import pandaPreset from '@pandacss/preset-panda'
import { pumPreset } from './pum/preset'

export default defineConfig({
  presets: [pandaPreset, pumPreset],
  include: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  staticCss: {
    recipes: '*',
  },
  outdir: 'styled-system',
})
`

// Marker delimiting the plugin block managed by config-ui inside
// postcss.config.cjs (same pattern as /* pum:fontfaces */ in panda.config).
// Opening and closing on their own lines: the editor replaces ONLY the inside
// of the pair; everything else in the file is preserved.
const POSTCSS_MARKER = '/* pum:postcss */'
const POSTCSS_MARKER_END = '/* /pum:postcss */'

// postcss.config.cjs base: Panda as a PostCSS plugin (the way recommended by
// panda-css.com/docs/installation/postcss). The block managed by the editor
// (the pair of pum:postcss comments you see inside plugins) is added/removed by
// config-ui (Postcss → Configure section). Manual entries outside the pair are
// preserved on save. NOTE: the header must NOT write the marker literals
// (/* pum:postcss */) — it would break the editor's lookup.
const POSTCSS_CONFIG_TEMPLATE = `// postcss.config.cjs — the project's postcss pipeline (Panda is one layer).
// The section managed by \`panda-ui-mithril config\` (Postcss → Configure)
// is the block between the two pum:postcss comments inside plugins — do not
// edit its inside by hand. Entries you add outside the block are preserved
// when saving from the editor.
module.exports = {
  plugins: {
    ${POSTCSS_MARKER}
    '@pandacss/dev/postcss': {},
    ${POSTCSS_MARKER_END}
  },
}
`

// Pipeline postcss entry css. The first line (@layer …) is the directive the
// Panda plugin replaces with the generated CSS (preflight, tokens, recipes,
// utilities) — the rest of the file is the project's own css.
const PUM_INDEX_CSS_TEMPLATE = `/* Postcss pipeline entry CSS — managed by panda-ui-mithril config.
   The @layer directive enables the generation of Panda's CSS (reset, base,
   tokens, recipes, utilities) when postcss runs on this file. */
@layer reset, base, tokens, recipes, utilities;
`

/**
 * Creates the project's postcss scaffold (only if missing, or with --force):
 *   - postcss.config.cjs (root): Panda as a PostCSS plugin + marker.
 *   - pum/index.css (pipeline entry with the @layer directive).
 */
function writePostcssScaffold(cwd: string, force: boolean) {
  const configPath = join(cwd, POSTCSS_CONFIG_NAME)
  if (!existsSync(configPath) || force) {
    writeFileSync(configPath, POSTCSS_CONFIG_TEMPLATE)
    console.log(`✔ Created ${POSTCSS_CONFIG_NAME} (Panda via PostCSS)`)
  }

  const entryPath = join(cwd, PUM_ENTRY_CSS)
  if (!existsSync(entryPath) || force) {
    mkdirSync(dirname(entryPath), { recursive: true })
    writeFileSync(entryPath, PUM_INDEX_CSS_TEMPLATE)
    console.log(`✔ Created ${PUM_ENTRY_CSS} (entry CSS with @layer)`)
  }
}

// Mithril JSX fields the dev server needs to compile the package's .jsx
// components (Button/Alert).
const JSX_FIELDS = {
  jsx: 'react',
  jsxFactory: 'm',
  jsxFragmentFactory: 'm.Fragment',
}

const HELP = `panda-ui-mithril — initialization CLI

Usage:
  bunx panda-ui-mithril init            Copies pum/preset.ts + pum/theme.ts +
                                         pum/theme/*.ts into your project,
                                         creates panda.config.ts (pointing to
                                         ./pum/preset), merges the Mithril JSX
                                         fields into tsconfig.json, and scaffolds
                                         the PostCSS pipeline (postcss.config.cjs
                                         with Panda as a plugin + pum/index.css
                                         entry with @layer).
                                         Migrates an old single-file pum/theme.ts
                                         layout automatically (values preserved).
  bunx panda-ui-mithril init --force    Overwrites if pum/ or panda.config.ts
                                         already exist.
  bunx panda-ui-mithril init --dir <path>     ("--dir=<path>" also works.)
                                         Writes everything (pum/,
                                         panda.config.ts, tsconfig.json,
                                         postcss.config.cjs) under <path>
                                         instead of the current directory —
                                         creates it if it doesn't exist. The
                                         generated panda.config.ts's include
                                         glob is relative to THAT folder, so
                                         if your real source lives elsewhere,
                                         edit include afterward. Same flag/
                                         semantics as config --dir below, on
                                         purpose: init --dir X later needs
                                         config --dir X to find it.
  bunx panda-ui-mithril config          Opens the interactive theme editor
                                         (Elysia server) at http://localhost:1234
                                         and opens it in the browser.
  bunx panda-ui-mithril config --port 5000    Serves the editor on :5000
                                         (also --port=5000 or -p 5000).
  bunx panda-ui-mithril config --no-open      Does NOT open the system browser
                                         on start (the URL is still printed).
                                         Useful for repeated runs, scripts and
                                         CI; also honored via BROWSER=none.
  bunx panda-ui-mithril config --dir <path>   Points the editor at another
                                         project root (or a theme dir directly);
                                         "--dir=<path>" also works, and a
                                         relative path resolves against cwd, so
                                         "config --dir=src/pages/login" edits
                                         that sub-project (with its own
                                         pum/ + panda.config.ts) instead of the
                                         repo root;
                                         without it, it searches upward from
                                         the current directory (pum/theme, then
                                         src/theme).
  bunx panda-ui-mithril config --init   Initializes the project first IF it is
                                         not one yet (creates pum/,
                                         panda.config.ts, tsconfig.json and the
                                         postcss pipeline) and then opens the
                                         editor — one step for a fresh SPA
                                         (combine with --dir to target it).
                                         It is non-destructive: if the project
                                         already exists it opens the editor and
                                         touches nothing. To regenerate an
                                         existing project use "init --force"
                                         instead.
  bunx panda-ui-mithril --help          Shows this help.

Exit status: 0 on success and whenever --help is passed; 1 on a usage error
(unknown command or option, missing or invalid flag value), when the project
already exists (init without --force) and when config-ui/server.ts is missing.

The editable theme lives in pum/theme/*.ts — change colors/scales there and
recompile. Recipes are NOT copied: they come from the package via
panda-ui-mithril/recipes.

The CSS pipeline follows Panda's recommended PostCSS integration:
postcss.config.cjs declares the plugins (Panda base + any extras, managed by
the config editor) and pum/index.css is the entry (@layer directive) that
PostCSS processes into styled-system/styles.css.

Prerequisites (Quick Start steps):
  bun add -d @pandacss/dev @pandacss/preset-panda
  bun add https://github.com/carlos-sweb/panda-ui-mithril.git mithril

After init:
  bunx panda-ui-mithril config         # theme + Postcss → Configure (builds CSS)
  bunx panda codegen                   # generates Panda assets (helpers)
  bun index.html                       # opens http://localhost:3000
`

/** Merges the Mithril JSX fields into tsconfig.json (creates one if missing). */
function ensureJsxConfig(cwd: string) {
  const tsconfigPath = join(cwd, TSCONFIG_NAME)
  let tsconfig: { compilerOptions?: Record<string, unknown> } = {}

  if (existsSync(tsconfigPath)) {
    try {
      tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf8'))
    } catch {
      // Invalid tsconfig (e.g. with comments) — regenerate it fully.
      tsconfig = {}
    }
  }

  tsconfig.compilerOptions = { ...tsconfig.compilerOptions, ...JSX_FIELDS }
  writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2) + '\n')
  console.log(`✔ ${TSCONFIG_NAME} updated (Mithril JSX)`)
}

/**
 * Copies preset.ts + theme.ts (+ d.ts) + theme/*.ts into pum/ and rewrites
 * the copied preset's recipe imports: from relative paths ('./../src/recipes/X')
 * to the package's public barrel ('panda-ui-mithril/recipes').
 */
function copyPum(cwd: string, force: boolean) {
  const pumPath = join(cwd, PUM_DIR)
  const sources = [
    ['src/preset.ts', 'preset.ts'],
    ['src/theme.ts', 'theme.ts'],
    ['src/theme.d.ts', 'theme.d.ts'],
    // Theme TS files (colors/fonts/spacing/radii/keyframes) — the consumer's
    // editable source of values.
    ['src/theme/colors.ts', 'theme/colors.ts'],
    ['src/theme/fonts.ts', 'theme/fonts.ts'],
    ['src/theme/spacing.ts', 'theme/spacing.ts'],
    ['src/theme/radii.ts', 'theme/radii.ts'],
    ['src/theme/keyframes.ts', 'theme/keyframes.ts'],
  ]

  if (existsSync(pumPath) && !force) {
    console.error(
      `${PUM_DIR}/ already exists in ${cwd}. Use --force to regenerate it.`,
    )
    process.exit(1)
  }

  mkdirSync(pumPath, { recursive: true })

  for (const [from, to] of sources) {
    const src = join(PKG_DIR, from)
    if (!existsSync(src)) {
      console.error(`Could not find ${from} in the installed package.`)
      process.exit(1)
    }
    let content = readFileSync(src, 'utf8')

    // Rewrite recipe imports: './../src/recipes/X' → public barrel.
    if (to === 'preset.ts') {
      content = content.replace(
        /from '\.\/\.\.\/src\/recipes\/[a-zA-Z0-9]+'/g,
        "from 'panda-ui-mithril/recipes'",
      )
    }

    const out = join(pumPath, to)
    mkdirSync(dirname(out), { recursive: true })
    writeFileSync(out, content)
  }

  console.log(`✔ ${PUM_DIR}/ copied (preset.ts + theme.ts + theme/*.ts — recipes via package)`)
}

/** true if pum/ has the legacy layout: a single-file theme.ts with no theme/ folder. */
function isLegacyTheme(cwd: string): boolean {
  const pumPath = join(cwd, PUM_DIR)
  return existsSync(join(pumPath, 'theme.ts')) && !existsSync(join(pumPath, 'theme'))
}

/**
 * Migrates a legacy pum/ (single-file theme.ts) to the new layout
 * (pum/theme/*.ts), preserving the legacy file's customized values. Steps:
 *   1. Parse the legacy theme.ts BEFORE overwriting it.
 *   2. Copy the new layout (copyPum internal with force).
 *   3. Re-apply the parsed values onto the new files
 *      (writeColorsSrc/writeFlatSrc are no-ops for a token that does not
 *      exist, so the package defaults stay for tokens absent from the legacy).
 */
function migrateLegacyTheme(cwd: string) {
  const pumPath = join(cwd, PUM_DIR)
  const legacySrc = readFileSync(join(pumPath, 'theme.ts'), 'utf8')

  const tokensBlock = extractBalanced(legacySrc, 'defineTokens')
  const semanticBlock = extractBalanced(legacySrc, 'defineSemanticTokens')
  const rawColors = tokensBlock ? parseFlat(extractCategory(tokensBlock, 'colors') ?? '') : {}
  const fonts = tokensBlock ? parseFlat(extractCategory(tokensBlock, 'fonts') ?? '') : {}
  const spacing = tokensBlock ? parseFlat(extractCategory(tokensBlock, 'spacing') ?? '') : {}
  const radii = tokensBlock ? parseFlat(extractCategory(tokensBlock, 'radii') ?? '') : {}
  const semanticColors = semanticBlock
    ? parseColors(extractCategory(semanticBlock, 'colors') ?? '')
    : {}
  const keyframesBlock = extractBalanced(legacySrc, 'keyframes')

  const parsedCount =
    Object.keys(rawColors).length +
    Object.keys(fonts).length +
    Object.keys(spacing).length +
    Object.keys(radii).length +
    Object.keys(semanticColors).length

  // Copies the new layout (overwrites the whole pum/).
  copyPum(cwd, true)

  // Re-applies the legacy values onto the freshly copied files.
  const themeDir = join(pumPath, 'theme')
  const colorsPath = join(themeDir, 'colors.ts')
  writeFileSync(
    colorsPath,
    writeColorsSrc(writeFlatSrc(readFileSync(colorsPath, 'utf8'), rawColors), semanticColors),
  )
  writeFlatSrcTo(themeDir, 'fonts', fonts)
  writeFlatSrcTo(themeDir, 'spacing', spacing)
  writeFlatSrcTo(themeDir, 'radii', radii)
  if (keyframesBlock) {
    writeFileSync(
      join(themeDir, 'keyframes.ts'),
      `/**\n * panda-ui-mithril keyframes (migrated from the legacy layout).\n */\n\nexport const themeKeyframes = ${keyframesBlock}\n`,
    )
  }

  if (parsedCount > 0) {
    console.log(`✔ ${PUM_DIR}/ migrated from legacy single-file theme.ts → theme/*.ts (${parsedCount} values preserved)`)
  } else {
    console.warn(`⚠ ${PUM_DIR}/ legacy theme.ts could not be parsed (${parsedCount} values) — using the package defaults. Review pum/theme/*.ts.`)
  }
}

function writeFlatSrcTo(themeDir: string, file: string, values: Record<string, string>) {
  const path = join(themeDir, file + '.ts')
  writeFileSync(path, writeFlatSrc(readFileSync(path, 'utf8'), values))
}

/**
 * Flags each command accepts. `--help`/`-h` is handled before this table
 * (it is valid everywhere) and `--dir`/`-d` and `--port`/`-p` take a value.
 */
const COMMAND_FLAGS = {
  init: ['--force', '--dir'],
  config: ['--dir', '--port', '--no-open', '--init'],
} as const

type Command = keyof typeof COMMAND_FLAGS

/** What the CLI understood from process.argv.slice(2). */
type CliArgs = {
  command: Command | null
  help: boolean
  dir: string | null
  force: boolean
  port: number | null
  init: boolean
  noOpen: boolean
  error: string | null
}

/**
 * Parses the CLI's own arguments:
 *   - the command may come before or after its flags (`init --dir X` and
 *     `--dir X init` mean the same);
 *   - value flags accept `--dir X` and `--dir=X` (same forms as
 *     `themeDirFromArgv` in config-ui/server.ts; a relative path resolves
 *     against cwd), and a value that looks like another flag counts as
 *     MISSING — `init --dir --force` must never fall back to the cwd and
 *     scaffold somewhere else silently;
 *   - anything unknown, plus flags a command does not accept, becomes `error`
 *     instead of being ignored: a typo used to be silently dropped.
 *
 * It only READS argv: `config` imports the server in the same process and the
 * server re-parses `--dir`/`--port` on its own, so the arguments must keep
 * reaching it untouched.
 */
function parseArgs(argv: string[]): CliArgs {
  const out: CliArgs = {
    command: null,
    help: false,
    dir: null,
    force: false,
    port: null,
    init: false,
    noOpen: false,
    error: null,
  }
  const positional: string[] = []
  const seen = new Set<string>()

  for (let i = 0; i < argv.length; i++) {
    const a = argv[i]

    if (a === '--help' || a === '-h') {
      out.help = true
      continue
    }
    if (!a.startsWith('-')) {
      positional.push(a)
      continue
    }

    const eq = a.indexOf('=')
    const name = eq === -1 ? a : a.slice(0, eq)
    const inline = eq === -1 ? null : a.slice(eq + 1)

    if (name === '--dir' || name === '-d' || name === '--port' || name === '-p') {
      const canonical = name === '--dir' || name === '-d' ? '--dir' : '--port'
      seen.add(canonical)
      let value = inline
      if (value === null) {
        const next = argv[i + 1]
        if (next === undefined || next.startsWith('-')) {
          out.error ??= `option '${name}' requires a value`
          continue
        }
        value = next
        i++
      }
      if (value === '') {
        out.error ??= `option '${name}' requires a value`
        continue
      }
      if (canonical === '--dir') {
        out.dir = resolve(value)
      } else {
        const n = Number(value)
        if (!Number.isInteger(n) || n <= 0 || n >= 65536) {
          out.error ??= `invalid value for '${name}': '${value}' (expected a port between 1 and 65535)`
        } else {
          out.port = n
        }
      }
      continue
    }

    if (a === '--force') {
      seen.add('--force')
      out.force = true
      continue
    }
    if (a === '--init') {
      seen.add('--init')
      out.init = true
      continue
    }
    if (a === '--no-open') {
      seen.add('--no-open')
      out.noOpen = true
      continue
    }

    out.error ??= `unknown option '${a}'`
  }

  if (positional.length > 1) out.error ??= `unexpected argument '${positional[1]}'`
  const cmd = positional[0]
  if (cmd === undefined) {
    // `--help` on its own is fine; asking for nothing is a usage error.
    if (!out.help) out.error ??= 'missing command'
  } else if (cmd === 'init' || cmd === 'config') {
    out.command = cmd
  } else {
    out.error ??= `unknown command '${cmd}'`
  }

  if (out.command) {
    const allowed: readonly string[] = COMMAND_FLAGS[out.command]
    for (const flag of seen) {
      if (!allowed.includes(flag)) {
        out.error ??= `unknown option '${flag}' for '${out.command}'`
      }
    }
  }

  return out
}

/** Reports a usage error: the message and the help, both on stderr, exit 1. */
function usageError(message: string): never {
  console.error(`error: ${message}`)
  console.error('')
  console.error(HELP)
  process.exit(1)
}

/**
 * Is this dir already a panda-ui-mithril project? (theme in any of the valid
 * layouts: pum/theme, src/theme, theme/ — or the legacy pum/theme.ts). Used by
 * `config --init` to decide whether anything has to be created.
 */
function hasTheme(dir: string): boolean {
  for (const sub of ['pum/theme', 'src/theme', 'theme']) {
    if (existsSync(join(dir, sub, 'colors.ts'))) return true
  }
  return existsSync(join(dir, PUM_DIR, 'theme.ts'))
}

/**
 * Creates the project (pum/ + panda.config.ts + tsconfig JSX + postcss
 * pipeline). It is the body shared by `init` and `config --init`:
 *  - `init` calls it with `force: args.includes('--force')` and exits through
 *    `process.exit(1)` if it already exists (except legacy, which is migrated).
 *  - `config --init` calls it ONLY if `hasTheme()` is false, always with
 *    `force: false`: the combined variant is additive by construction and
 *    cannot overwrite anything (to regenerate there is `init --force`).
 */
function scaffoldProject(cwd: string, opts: { force: boolean; printNextSteps: boolean }): void {
  const target = join(cwd, CONFIG_NAME)
  const legacy = isLegacyTheme(cwd)

  // The "already exists" check is skipped for the legacy layout: migration is
  // exactly the operation the user needs (and panda.config.ts is regenerated
  // from the canonical template, identical to the one it already has).
  if (existsSync(target) && !opts.force && !legacy) {
    console.error(
      `${CONFIG_NAME} already exists in ${cwd}. Use --force to overwrite it.`,
    )
    process.exit(1)
  }

  if (legacy) {
    migrateLegacyTheme(cwd)
  } else {
    copyPum(cwd, opts.force)
  }
  writeFileSync(target, CONFIG_TEMPLATE)
  console.log(`✔ Created ${CONFIG_NAME} in ${cwd}`)
  ensureJsxConfig(cwd)
  writePostcssScaffold(cwd, opts.force)
  if (!opts.printNextSteps) return
  console.log('')
  console.log('The editable theme is in pum/theme/*.ts (colors/fonts/spacing/radii/keyframes).')
  console.log('The CSS pipeline is postcss.config.cjs (Panda via PostCSS) + pum/index.css (entry with @layer).')
  console.log('Next steps:')
  console.log('  bunx panda-ui-mithril config   # theme + Postcss → Configure (builds the CSS)')
  console.log('  bunx panda codegen             # generates Panda assets (helpers)')
  console.log('  bun index.html                 # opens http://localhost:3000')
}

async function main() {
  const parsed = parseArgs(process.argv.slice(2))

  // `--help`/`-h` is a request, not a mistake: wherever it appears
  // (`init --help`, `--bogus --help`) it wins and exits 0.
  if (parsed.help) {
    console.log(HELP)
    process.exit(0)
  }
  if (parsed.error) usageError(parsed.error)

  // `config` — opens the visual theme editor (Elysia server on :1234)
  if (parsed.command === 'config') {
    const serverPath = join(PKG_DIR, 'config-ui', 'server.ts')
    if (!existsSync(serverPath)) {
      console.error('Could not find config-ui/server.ts in the installed package.')
      process.exit(1)
    }

    // `config --init` — makes sure the project exists before opening the
    // editor: creates pum/ + panda.config.ts + tsconfig + postcss pipeline IF
    // MISSING, and touches nothing if it already exists (additive variant; it
    // never overwrites). That way a fresh SPA can be initialized and opened in
    // one step:
    //   bunx panda-ui-mithril config --init --dir=src/pages/login
    if (parsed.init) {
      const dir = parsed.dir ?? process.cwd()
      if (hasTheme(dir)) {
        console.log(`✔ ${dir} is already a panda-ui-mithril project — opening the editor, nothing touched.`)
      } else {
        scaffoldProject(dir, { force: false, printNextSteps: false })
      }
    }

    // Imports the server (Elysia listens and keeps the process alive). The
    // server reads --dir/-d and --port/-p from process.argv (port, theme path,
    // and opening the browser) — parseArgs above only validated them.
    await import(serverPath)
    return
  }

  // `init`, the only command left: parseArgs already rejected the rest.
  const cwd = parsed.dir ?? process.cwd()
  if (parsed.dir) mkdirSync(parsed.dir, { recursive: true })
  scaffoldProject(cwd, { force: parsed.force, printNextSteps: true })
}

await main()
