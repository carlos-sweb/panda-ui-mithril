/**
 * Build del playground usando esbuild.
 * Usage: bun run esbuild
 *
 * esbuild NO procesa CSS — toma el output de build-css.ts directamente:
 *   1. build-css.ts  → styled-system/styles.css + styled-system/fonts/
 *   2. esbuild       → bundle JS (main.jsx → main.js), copia assets via copy loader
 *   3. Copia CSS, fonts, HTML (reescribido), assets estáticos → dist-playground/
 */
import { $ } from 'bun'
import esbuild from 'esbuild'
import {
  existsSync,
  rmSync,
  mkdirSync,
  cpSync,
  readFileSync,
  writeFileSync,
  readdirSync,
  statSync,
} from 'fs'
import { resolve } from 'path'

// ── CLI flags ──
const USAGE = `Uso:
  bun run esbuild [opciones]

Opciones:
  -o, --output=<ruta>   Directorio de salida. Default: dist-playground
  --target=<target>     Targets de lightningcss para build-css.ts (heredado).
                        "all" (solo minify) o expresión JS como "safari: 17 << 16".
                        Si no se pasa, build-css.ts usa su default (Safari 2024).
  -h, --help            Muestra esta ayuda

Ejemplos:
  bun run esbuild
  bun run esbuild -o=my-build --target=all
  bun run esbuild --target="chrome: 128 << 16, safari: 17 << 16"
`

interface CliOptions {
  outdir: string
  target: string | undefined  // undefined = build-css.ts usa su default
  help: boolean
}

function parseArgv(argv: string[]): CliOptions {
  const opts: CliOptions = {
    outdir: 'dist-playground',
    target: undefined,
    help: false,
  }

  for (const arg of argv) {
    if (arg === '-h' || arg === '--help') {
      opts.help = true
      continue
    }
    const eq = arg.indexOf('=')
    const flag = eq === -1 ? arg : arg.slice(0, eq)
    const value = eq === -1 ? undefined : arg.slice(eq + 1)

    switch (flag) {
      case '-o':
      case '--output':
        if (!value) throw new Error(`${flag} requiere un valor: ${flag}=<ruta>`)
        opts.outdir = value
        break
      case '--target':
        if (!value) throw new Error('--target requiere un valor: --target=all | --target="safari: 17 << 16"')
        opts.target = value
        break
      default:
        throw new Error(`Argumento desconocido: ${arg}\n\n${USAGE}`)
    }
  }
  return opts
}

const cli = parseArgv(Bun.argv.slice(2))
if (cli.help) {
  console.log(USAGE)
  process.exit(0)
}

// ── Plugin YAML: parsea .yml → objeto JS ──
import yaml from 'yaml'

const yamlPlugin = {
  name: 'yaml',
  setup(build) {
    build.onLoad({ filter: /\.ya?ml$/ }, async (args) => {
      const text = await Bun.file(args.path).text()
      const contents = JSON.stringify(yaml.parse(text))
      return { contents, loader: 'json' }
    })
  },
}

const ROOT = resolve(import.meta.dir, '..')
const OUTDIR = resolve(ROOT, cli.outdir)
const PLAYGROUND = resolve(ROOT, 'playground')
const STYLED_SYSTEM = resolve(ROOT, 'styled-system')

// ── Limpiar ──
if (existsSync(OUTDIR)) rmSync(OUTDIR, { recursive: true })
mkdirSync(OUTDIR, { recursive: true })

// ── Step 1: CSS (build-css.ts genera styles.css + fonts/) ──
console.log('🎨 Step 1: Generando CSS...')
const cssArgs = cli.target ? [`--target="${cli.target}"`] : []
await $`bun run scripts/build-css.ts ${cssArgs}`.cwd(ROOT)

// ── Step 2: Bundle JS con esbuild (no toca CSS) ──
console.log('📦 Step 2: Bundling JS...')

await esbuild.build({
  entryPoints: [resolve(PLAYGROUND, 'main.jsx')],
  bundle: true,
  outdir: OUTDIR,
  format: 'esm',
  target: 'es2022',
  minify: true,
  splitting: false,

  // Preservar estructura: assets/card/card2-HASH.jpg (evita assets/assets/ duplicado)
  assetNames: '[dir]/[name]-[hash]',
  publicPath: '/',

  // Panda CSS genera .mjs — esbuild no resuelve .mjs por defecto en imports de directorio
  resolveExtensions: ['.mjs', '.js', '.json', '.ts', '.tsx', '.jsx'],

  plugins: [yamlPlugin],

  // Mithril JSX factory — same as bunfig.toml / tsconfig "jsx": "react"
  jsx: 'transform',
  jsxFactory: 'm',
  jsxFragment: 'm.Fragment',

loader: {
    '.css':   'empty',    // CSS lo maneja build-css.ts
    '.ico':   'file',     // Copia con hash y devuelve URL (import → string)
    '.png':   'file',
    '.jpg':   'file',
    '.jpeg':  'file',
    '.gif':   'file',
    '.svg':   'file',
    '.woff':  'file',
    '.woff2': 'file',
  },
})

// ── Step 3: Copiar CSS + fonts desde styled-system/ ──
console.log('📋 Step 3: Copiando CSS + fonts...')
cpSync(resolve(STYLED_SYSTEM, 'styles.css'), resolve(OUTDIR, 'styles.css'))

const fontsDir = resolve(STYLED_SYSTEM, 'fonts')
if (existsSync(fontsDir)) {
  cpSync(fontsDir, resolve(OUTDIR, 'fonts'), { recursive: true })
}

// ── Step 4: Reescribir y copiar HTML ──
console.log('📝 Step 4: Copiando HTML...')
let html = readFileSync(resolve(PLAYGROUND, 'index.html'), 'utf8')
html = html
  // styles.css ahora está en el mismo nivel, no en ../styled-system/
  .replace(/\.\.\/styled-system\/styles\.css/g, 'styles.css')
  // esbuild emite main.js, no main.jsx
  .replace(/\.\/main\.jsx/g, './main.js')
writeFileSync(resolve(OUTDIR, 'index.html'), html)

// ── Step 5: Copiar assets estáticos ──
console.log('🖼️ Step 5: Copiando assets...')

// Solo favicons sueltos y llms.txt (assets/ lo maneja esbuild via copy loader)
for (const f of ['favicon.ico', 'favicon-16.png', 'favicon-32.png', 'favicon-64.png']) {
  const src = resolve(PLAYGROUND, f)
  if (existsSync(src)) cpSync(src, resolve(OUTDIR, f))
}

cpSync(resolve(ROOT, 'llms.txt'), resolve(OUTDIR, 'llms.txt'))

// ── Listar archivos de salida ──
console.log(`\n✅ Build → ${OUTDIR}`)

function listFiles(dir: string, prefix = '') {
  for (const entry of readdirSync(dir)) {
    const path = `${prefix}${entry}`
    const full = `${dir}/${entry}`
    if (statSync(full).isDirectory()) {
      console.log(`  📁 ${path}/`)
      listFiles(full, `${path}/`)
    } else {
      console.log(`  📄 ${path} (${(statSync(full).size / 1024).toFixed(1)} KB)`)
    }
  }
}
listFiles(OUTDIR)
