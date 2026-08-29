#!/usr/bin/env bun
/**
 * panda-ui-mithril CLI
 *
 * `bunx panda-ui-mithril init` — genera la configuración del consumidor:
 *   1. `panda.config.ts` — el preset de la librería ya configurado (el mismo
 *      archivo del Quick Start del landing/README, verificado de punta a
 *      punta). Evita correr `bunx panda init` y editar el archivo a mano.
 *   2. Los campos JSX de Mithril en `tsconfig.json` (jsx: react + factory m).
 *      El dev server (`bun index.html`) compila el `Button`/`Alert` (.jsx del
 *      paquete) con la config JSX del `tsconfig.json` — el `bunfig.toml` solo
 *      la respeta `bun build`, no el dev server (verificado empíricamente).
 *
 * Uso:
 *   bunx panda-ui-mithril init           # crea/mergea la config (no pisa)
 *   bunx panda-ui-mithril init --force   # fuerza sobreescritura de panda.config.ts
 *   bunx panda-ui-mithril --help
 */
import { existsSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'

const CONFIG_NAME = 'panda.config.ts'
const TSCONFIG_NAME = 'tsconfig.json'

const CONFIG_TEMPLATE = `import { defineConfig } from '@pandacss/dev'
import pandaPreset from '@pandacss/preset-panda'
import { pumPreset } from 'panda-ui-mithril/preset'

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
  bunx panda-ui-mithril init            Crea panda.config.ts con el preset de la
                                         librería y mergea los campos JSX de
                                         Mithril en tsconfig.json.
  bunx panda-ui-mithril init --force    Sobreescribe panda.config.ts si existe.
  bunx panda-ui-mithril --help          Muestra esta ayuda.

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

  writeFileSync(target, CONFIG_TEMPLATE)
  console.log(`✔ Creado ${CONFIG_NAME}`)
  ensureJsxConfig(cwd)
  console.log('')
  console.log('Siguientes pasos:')
  console.log('  bunx panda codegen && bunx panda cssgen')
  console.log('  bun index.html            # abre http://localhost:3000')
}

main()
