#!/usr/bin/env bun
/**
 * panda-ui-mithril CLI
 *
 * `bunx panda-ui-mithril init` — genera la configuración del consumidor:
 *   1. `pum/` — copia local de `preset.ts` + `theme.ts` (+ d.ts). El preset
 *      copiado importa las recipes desde el paquete (`panda-ui-mithril/recipes`,
 *      barrel público) — las recipes NO se copian. El tema (`pum/theme.ts`)
 *      es la fuente local editable del consumidor.
 *   2. `panda.config.ts` — apunta a `./pum/preset` (no a node_modules).
 *   3. Los campos JSX de Mithril en `tsconfig.json` (jsx: react + factory m).
 *      El dev server (`bun index.html`) compila los `.jsx` del paquete con la
 *      config JSX del `tsconfig.json` (el `bunfig.toml` solo la respeta
 *      `bun build`, no el dev server — verificado empíricamente).
 *
 * Uso:
 *   bunx panda-ui-mithril init           # crea pum/ + config (no pisa)
 *   bunx panda-ui-mithril init --force   # fuerza sobreescritura
 *   bunx panda-ui-mithril --help
 */
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const CLI_DIR = dirname(fileURLToPath(import.meta.url))
// El CLI vive en scripts/ del paquete instalado → la raíz del paquete es ../.
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

// Los campos JSX de Mithril que el dev server necesita para compilar los
// componentes .jsx del paquete (Button/Alert).
const JSX_FIELDS = {
  jsx: 'react',
  jsxFactory: 'm',
  jsxFragmentFactory: 'm.Fragment',
}

const HELP = `panda-ui-mithril — CLI de inicialización

Uso:
  bunx panda-ui-mithril init            Copia pum/preset.ts + pum/theme.ts a tu
                                         proyecto, crea panda.config.ts (apunta a
                                         ./pum/preset) y mergea el JSX de Mithril
                                         en tsconfig.json.
  bunx panda-ui-mithril init --force    Sobreescribe si pum/ o panda.config.ts
                                         ya existen.
  bunx panda-ui-mithril --help          Muestra esta ayuda.

El tema editable vive en pum/theme.ts — cambia colores/escalas ahí y
recompila (bunx panda codegen && bunx panda cssgen). Las recipes NO se
copian: vienen del paquete vía panda-ui-mithril/recipes.

Requisitos previos (pasos del Quick Start):
  bun add -d @pandacss/dev @pandacss/preset-panda
  bun add https://github.com/carlos-sweb/panda-ui-mithril.git mithril

Después de init:
  bunx panda codegen && bunx panda cssgen
  bun index.html            # abre http://localhost:3000
`

/** Mergea los campos JSX de Mithril en tsconfig.json (crea uno si falta). */
function ensureJsxConfig(cwd: string) {
  const tsconfigPath = join(cwd, TSCONFIG_NAME)
  let tsconfig: { compilerOptions?: Record<string, unknown> } = {}

  if (existsSync(tsconfigPath)) {
    try {
      tsconfig = JSON.parse(readFileSync(tsconfigPath, 'utf8'))
    } catch {
      // tsconfig inválido (p.ej. con comentarios) — lo regeneramos completo.
      tsconfig = {}
    }
  }

  tsconfig.compilerOptions = { ...tsconfig.compilerOptions, ...JSX_FIELDS }
  writeFileSync(tsconfigPath, JSON.stringify(tsconfig, null, 2) + '\n')
  console.log(`✔ ${TSCONFIG_NAME} actualizado (JSX de Mithril)`)
}

/**
 * Copia preset.ts + theme.ts (+ d.ts) a pum/ y reescribe los imports de
 * recipes del preset copiado: de rutas relativas ('./../src/recipes/X') al
 * barrel público del paquete ('panda-ui-mithril/recipes').
 */
function copyPum(cwd: string, force: boolean) {
  const pumPath = join(cwd, PUM_DIR)
  const sources = [
    ['src/preset.ts', 'preset.ts'],
    ['src/theme.ts', 'theme.ts'],
    ['src/theme.d.ts', 'theme.d.ts'],
  ]

  if (existsSync(pumPath) && !force) {
    console.error(
      `${PUM_DIR}/ ya existe en ${cwd}. Usa --force para regenerarlo.`,
    )
    process.exit(1)
  }

  mkdirSync(pumPath, { recursive: true })

  for (const [from, to] of sources) {
    const src = join(PKG_DIR, from)
    if (!existsSync(src)) {
      console.error(`No se encontró ${from} en el paquete instalado.`)
      process.exit(1)
    }
    let content = readFileSync(src, 'utf8')

    // Reescribir imports de recipes: './../src/recipes/X' → barrel público.
    if (to === 'preset.ts') {
      content = content.replace(
        /from '\.\/\.\.\/src\/recipes\/[a-zA-Z0-9]+'/g,
        "from 'panda-ui-mithril/recipes'",
      )
    }

    writeFileSync(join(pumPath, to), content)
  }

  console.log(`✔ ${PUM_DIR}/ copiado (preset.ts + theme.ts — recipes vía paquete)`)
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
      `${CONFIG_NAME} ya existe en ${cwd}. Usa --force para sobreescribirlo.`,
    )
    process.exit(1)
  }

  copyPum(cwd, force)
  writeFileSync(target, CONFIG_TEMPLATE)
  console.log(`✔ Creado ${CONFIG_NAME}`)
  ensureJsxConfig(cwd)
  console.log('')
  console.log('El tema editable está en pum/theme.ts.')
  console.log('Siguientes pasos:')
  console.log('  bunx panda codegen && bunx panda cssgen')
  console.log('  bun index.html            # abre http://localhost:3000')
}

main()
