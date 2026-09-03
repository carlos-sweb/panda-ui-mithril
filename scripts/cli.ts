#!/usr/bin/env bun
/**
 * panda-ui-mithril CLI
 *
 * `bunx panda-ui-mithril init` — genera/actualiza la configuración del
 * consumidor:
 *   1. `pum/` — copia local de `preset.ts` + `theme.ts` (+ d.ts) + la carpeta
 *      `theme/` con `{colors,fonts,spacing,radii,keyframes}.ts`. El preset
 *      copiado importa las recipes del paquete (`panda-ui-mithril/recipes`,
 *      barrel público) — las recipes NO se copian. El theme (`pum/theme/*.ts`)
 *      es la fuente editable local del consumidor.
 *   2. `panda.config.ts` — apunta a `./pum/preset` (no node_modules).
 *   3. Mithril JSX fields en `tsconfig.json` (jsx: react + factory m).
 *      El dev server (`bun index.html`) compila los `.jsx` del paquete con la
 *      config JSX de `tsconfig.json` (el `bunfig.toml` solo lo respeta
 *      `bun build`, no el dev server — verificado empíricamente).
 *
 * Layout legacy: si el proyecto se inicializó con una versión vieja del CLI,
 * `pum/` tiene un `theme.ts` de archivo único (sin carpeta `theme/`). `init`
 * lo detecta y MIGRA automáticamente a `pum/theme/*.ts`, preservando los
 * valores personalizados (colores/fonts/spacing/radii/keyframes) que pudieran
 * haberse editado en el archivo legacy. El editor `config` no puede operar
 * sobre el layout legacy y devuelve un hint de migración.
 *
 * Usage:
 *   bunx panda-ui-mithril init           # crea pum/ + config (no overwrite)
 *   bunx panda-ui-mithril init --force   # force overwrite
 *   bunx panda-ui-mithril config         # editor visual (Elysia) en :1234,
 *                                          abre el navegador automáticamente
 *   bunx panda-ui-mithril config --port 5000    # puerto custom (--port=5000 ok)
 *   bunx panda-ui-mithril config --dir <ruta>   # apunta el editor a otra raíz
 *   bunx panda-ui-mithril --help
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
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
// Entry css del pipeline postcss (default; el usuario puede cambiarlo en
// config-ui → Postcss). La directiva @layer activa la generación del CSS de
// Panda (reset/base/tokens/recipes/utilities) al correr postcss.
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

// Marker que delimita el bloque de plugins gestionado por config-ui dentro
// de postcss.config.cjs (mismo patrón que /* pum:fontfaces */ en panda.config).
// Apertura y cierre en líneas propias: el editor reemplaza SOLO el interior
// del par; todo lo demás del archivo se conserva.
const POSTCSS_MARKER = '/* pum:postcss */'
const POSTCSS_MARKER_END = '/* /pum:postcss */'

// postcss.config.cjs base: Panda como plugin de PostCSS (vía recomendada por
// panda-css.com/docs/installation/postcss). El bloque gestionado por el editor
// (el par de comentarios pum:postcss que ves dentro de plugins) lo añade/quita
// config-ui (sección Postcss → Configure). Las entradas manuales fuera del par
// se conservan al guardar. NOTA: la cabecera NO debe escribir los literales de
// los markers (/* pum:postcss */) — rompería la localización del editor.
const POSTCSS_CONFIG_TEMPLATE = `// postcss.config.cjs — pipeline postcss del proyecto (Panda es una capa).
// La sección gestionada por \`panda-ui-mithril config\` (Postcss → Configure)
// es el bloque entre los dos comentarios pum:postcss dentro de plugins —
// no edites su interior a mano. Las entradas que añadas fuera del bloque se
// conservan al guardar desde el editor.
module.exports = {
  plugins: {
    ${POSTCSS_MARKER}
    '@pandacss/dev/postcss': {},
    ${POSTCSS_MARKER_END}
  },
}
`

// Entry css del pipeline postcss. La primera línea (@layer …) es la directiva
// que el plugin de Panda reemplaza por el CSS generado (preflight, tokens,
// recipes, utilities) — el resto del archivo es css propio del proyecto.
const PUM_INDEX_CSS_TEMPLATE = `/* Entry CSS del pipeline postcss — gestionado por panda-ui-mithril config.
   La directiva @layer activa la generación del CSS de Panda (reset, base,
   tokens, recipes, utilities) al correr postcss sobre este archivo. */
@layer reset, base, tokens, recipes, utilities;
`

/**
 * Crea el scaffold postcss del proyecto (solo si no existe, o --force):
 *   - postcss.config.cjs (raíz): Panda como plugin de PostCSS + marker.
 *   - pum/index.css (entry del pipeline con la directiva @layer).
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
  bunx panda-ui-mithril config          Opens the interactive theme editor
                                         (Elysia server) at http://localhost:1234
                                         and opens it in the browser.
  bunx panda-ui-mithril config --port 5000    Serves the editor on :5000
                                         (also --port=5000 or -p 5000).
  bunx panda-ui-mithril config --dir <ruta>   Points the editor at another
                                         project root (or a theme dir directly);
                                         without it, it searches upward from
                                         the current directory (pum/theme, then
                                         src/theme).
  bunx panda-ui-mithril --help          Shows this help.

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

/** true si pum/ tiene el layout legacy: theme.ts archivo único sin carpeta theme/. */
function isLegacyTheme(cwd: string): boolean {
  const pumPath = join(cwd, PUM_DIR)
  return existsSync(join(pumPath, 'theme.ts')) && !existsSync(join(pumPath, 'theme'))
}

/**
 * Migra un pum/ legacy (theme.ts de archivo único) al layout nuevo
 * (pum/theme/*.ts), preservando los valores personalizados del archivo
 * legacy. Pasos:
 *   1. Parsear el theme.ts legacy ANTES de sobrescribirlo.
 *   2. Copiar el layout nuevo (copyPum interno con force).
 *   3. Re-aplicar los valores parseados sobre los archivos nuevos
 *      (writeColorsSrc/writeFlatSrc son no-op si un token no existe, así que
 *      los defaults del paquete quedan para tokens no presentes en legacy).
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

  // Copia el layout nuevo (sobrescribe pum/ completo).
  copyPum(cwd, true)

  // Re-aplica los valores del legacy sobre los archivos recién copiados.
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
      `/**\n * Keyframes de panda-ui-mithril (migrados del layout legacy).\n */\n\nexport const themeKeyframes = ${keyframesBlock}\n`,
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

async function main() {
  const args = process.argv.slice(2)

  // `config` — abre el editor visual del theme (Elysia server en :1234)
  if (args[0] === 'config') {
    const serverPath = join(PKG_DIR, 'config-ui', 'server.ts')
    if (!existsSync(serverPath)) {
      console.error('Could not find config-ui/server.ts in the installed package.')
      process.exit(1)
    }
    // Importa el servidor (Elysia escucha y mantiene el proceso vivo). El
    // server lee --dir/-d y --port/-p de process.argv (puerto, ruta del theme,
    // y abre el navegador).
    await import(serverPath)
    return
  }

  if (args.includes('--help') || args.includes('-h') || args[0] !== 'init') {
    console.log(HELP)
    process.exit(args[0] !== 'init' ? 1 : 0)
  }

  const cwd = process.cwd()
  const force = args.includes('--force')
  const target = join(cwd, CONFIG_NAME)
  const legacy = isLegacyTheme(cwd)

  // El check de "ya existe" se salta si es layout legacy: la migración es
  // exactamente la operación que el usuario necesita (y panda.config.ts se
  // regenera con el template canónico, idéntico al que ya tiene).
  if (existsSync(target) && !force && !legacy) {
    console.error(
      `${CONFIG_NAME} already exists in ${cwd}. Use --force to overwrite it.`,
    )
    process.exit(1)
  }

  if (legacy) {
    migrateLegacyTheme(cwd)
  } else {
    copyPum(cwd, force)
  }
  writeFileSync(target, CONFIG_TEMPLATE)
  console.log(`✔ Created ${CONFIG_NAME}`)
  ensureJsxConfig(cwd)
  writePostcssScaffold(cwd, force)
  console.log('')
  console.log('The editable theme is in pum/theme/*.ts (colors/fonts/spacing/radii/keyframes).')
  console.log('The CSS pipeline is postcss.config.cjs (Panda via PostCSS) + pum/index.css (entry with @layer).')
  console.log('Next steps:')
  console.log('  bunx panda-ui-mithril config   # theme + Postcss → Configure (builds the CSS)')
  console.log('  bunx panda codegen             # generates Panda assets (helpers)')
  console.log('  bun index.html                 # opens http://localhost:3000')
}

await main()
