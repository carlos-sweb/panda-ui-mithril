#!/usr/bin/env bun
/**
 * panda-ui-mithril CLI
 *
 * `bunx panda-ui-mithril init` — generates the consumer configuration:
 *   1. `pum/` — local copy of `preset.ts` + `theme.ts` (+ d.ts). The copied
 *      preset imports the recipes from the package (`panda-ui-mithril/recipes`,
 *      public barrel) — recipes are NOT copied. The theme (`pum/theme.ts`)
 *      is the consumer's local, editable source of truth.
 *   2. `panda.config.ts` — points to `./pum/preset` (not node_modules).
 *   3. Mithril JSX fields in `tsconfig.json` (jsx: react + factory m).
 *      The dev server (`bun index.html`) compiles the package's `.jsx` files
 *      with the JSX config from `tsconfig.json` (the `bunfig.toml` is only
 *      respected by `bun build`, not the dev server — verified empirically).
 *
 * Usage:
 *   bunx panda-ui-mithril init           # creates pum/ + config (no overwrite)
 *   bunx panda-ui-mithril init --force   # force overwrite
 *   bunx panda-ui-mithril --help
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const CLI_DIR = dirname(fileURLToPath(import.meta.url))
// The CLI lives in scripts/ of the installed package → the package root is ../.
// node_modules/panda-ui-mithril/scripts/cli.ts → node_modules/panda-ui-mithril/
const PKG_DIR = join(CLI_DIR, '..')

const CONFIG_NAME = 'panda.config.ts'
const TSCONFIG_NAME = 'tsconfig.json'
const PUM_DIR = 'pum'

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

// Mithril JSX fields the dev server needs to compile the package's .jsx
// components (Button/Alert).
const JSX_FIELDS = {
  jsx: 'react',
  jsxFactory: 'm',
  jsxFragmentFactory: 'm.Fragment',
}

const HELP = `panda-ui-mithril — initialization CLI

Usage:
  bunx panda-ui-mithril init            Copies pum/preset.ts + pum/theme.ts into
                                         your project, creates panda.config.ts
                                         (pointing to ./pum/preset) and merges
                                         the Mithril JSX fields into tsconfig.json.
  bunx panda-ui-mithril init --force    Overwrites if pum/ or panda.config.ts
                                         already exist.
  bunx panda-ui-mithril --help          Shows this help.

The editable theme lives in pum/theme.ts — change colors/scales there and
recompile (bunx panda codegen && bunx panda cssgen). Recipes are NOT copied:
they come from the package via panda-ui-mithril/recipes.

Prerequisites (Quick Start steps):
  bun add -d @pandacss/dev @pandacss/preset-panda
  bun add https://github.com/carlos-sweb/panda-ui-mithril.git mithril

After init:
  bunx panda codegen && bunx panda cssgen
  bun index.html            # opens http://localhost:3000
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
 * Copies preset.ts + theme.ts (+ d.ts) into pum/ and rewrites the copied
 * preset's recipe imports: from relative paths ('./../src/recipes/X') to the
 * package's public barrel ('panda-ui-mithril/recipes').
 */
function copyPum(cwd: string, force: boolean) {
  const pumPath = join(cwd, PUM_DIR)
  const sources = [
    ['src/preset.ts', 'preset.ts'],
    ['src/theme.ts', 'theme.ts'],
    ['src/theme.d.ts', 'theme.d.ts'],
    // Archivos TS del theme (colors/fonts/spacing/radii/keyframes) — la
    // fuente editable de valores del consumidor.
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

function main() {
  const args = process.argv.slice(2)

  if (args.includes('--help') || args.includes('-h') || args[0] !== 'init') {
    console.log(HELP)
    process.exit(args[0] !== 'init' ? 1 : 0)
  }

  const cwd = process.cwd()
  const force = args.includes('--force')
  const target = join(cwd, CONFIG_NAME)

  if (existsSync(target) && !force) {
    console.error(
      `${CONFIG_NAME} already exists in ${cwd}. Use --force to overwrite it.`,
    )
    process.exit(1)
  }

  copyPum(cwd, force)
  writeFileSync(target, CONFIG_TEMPLATE)
  console.log(`✔ Created ${CONFIG_NAME}`)
  ensureJsxConfig(cwd)
  console.log('')
  console.log('The editable theme is in pum/theme.ts.')
  console.log('Next steps:')
  console.log('  bunx panda codegen && bunx panda cssgen')
  console.log('  bun index.html            # opens http://localhost:3000')
}

main()
