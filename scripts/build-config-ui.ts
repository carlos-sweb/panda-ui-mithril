import postcss from 'postcss/lib/postcss'
import pandacss from '@pandacss/dev/postcss'
import atImport from 'postcss-import'
import pruneVar from 'postcss-prune-var'
import url from 'postcss-url'
import nesting from 'postcss-nesting'
import autoprefixer from 'autoprefixer'
import reporter from 'postcss-reporter'
import { transform, type Targets } from 'lightningcss'
import { resolve, dirname, basename } from 'path'
import { mkdirSync } from 'fs'

const ROOT = resolve(import.meta.dir, '..')

// Target de lightningcss: Safari 2024 (la línea 17.x completa, 17.0..17.6).
// Codificación de versión: major << 16 | minor << 8 | patch. Si prefieres
// browserslist: targets = browserslistToTargets(browserslist('Safari >= 17'))
const SAFARI_2024 = { safari: 17 << 16 } satisfies Targets

const USAGE = `Uso:
  bun run scripts/build-config-ui.ts [opciones]

Genera el CSS del editor config-ui (config-ui/config-ui.css) con su propio
config de Panda (panda-config-ui.config.ts) y el entry postcss
(config-ui/index.css).

Opciones:
  -i, --input=<ruta>     CSS de entrada (entry de Panda). Default: config-ui/index.css
  -o, --output=<ruta>    Ruta de salida. Default: config-ui/config-ui.css
  --target=<target>      "all" (solo minify, sin transform) o una expresión JS de
                         targets de lightningcss. Default: "safari: 17 << 16" (Safari 2024)
  --no-minify            Desactiva minificación.
  -h, --help             Muestra esta ayuda

Ejemplos:
  bun run scripts/build-config-ui.ts
  bun run scripts/build-config-ui.ts -o=config-ui/config-ui.css --target=all
`

// Convierte una expresión JS de targets ("safari: 17 << 16") en un objeto
// Targets de lightningcss ({ safari: 1114112 }). Solo acepta objetos literales.
function evalTarget(expr: string): Targets {
  try {
    const fn = new Function(`return ({ ${expr} })`)
    const targets = fn()
    if (typeof targets !== 'object' || targets === null) throw new Error('no es un objeto')
    return targets as Targets
  } catch {
    throw new Error(
      `--target no válido: "${expr}" — esperaba "all" o una expresión JS como "safari: 17 << 16"`
    )
  }
}

interface CliOptions {
  input: string
  output: string
  targets: Targets | undefined
  minify: boolean
  help: boolean
}

// Bun.argv[0] = binario de Bun, [1] = path del script, [2..] = argumentos del usuario.
function parseArgv(argv: string[]): CliOptions {
  const opts: CliOptions = {
    input: resolve(ROOT, 'config-ui/index.css'),
    output: resolve(ROOT, 'config-ui/config-ui.css'),
    targets: SAFARI_2024,
    minify: true,
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
      case '-i':
      case '--input':
        if (!value) throw new Error(`${flag} requiere un valor: ${flag}=<ruta>`)
        opts.input = resolve(ROOT, value)
        break
      case '-o':
      case '--output':
        if (!value) throw new Error(`${flag} requiere un valor: ${flag}=<ruta>`)
        opts.output = resolve(ROOT, value)
        break
      case '--target':
        if (!value) throw new Error('--target requiere un valor: --target=all | --target="safari: 17 << 16"')
        opts.targets = value.replace(/^['"]|['"]$/g, '') === 'all' ? undefined : evalTarget(value.replace(/^['"]|['"]$/g, ''))
        break
      case '--no-minify':
        opts.minify = false
        break
      default:
        throw new Error(`Argumento desconocido: ${arg}\n\n${USAGE}`)
    }
  }
  return opts
}

// NOTA sobre exit codes: `@pandacss/node` registra handlers de
// process.on('uncaughtException'|'unhandledRejection') que solo loguean vía
// logger.caughtError() y no establecen exit code — un throw no capturado
// terminaría con exit 0 en silencio. Por eso todo el trabajo vive dentro de
// main() con try/catch y se fija process.exitCode explícitamente.

async function main() {
  const opts = parseArgv(Bun.argv.slice(2))

  if (opts.help) {
    console.log(USAGE)
    return
  }

  // config-ui/index.css es el entry de Panda: su primera línea
  // `@layer reset, base, tokens, recipes, utilities;` es la directiva que
  // activa la generación del CSS (sin ella el plugin hace no-op en silencio).
  const cssInput = await Bun.file(opts.input).text()

  const result = await postcss([
    pandacss({ configPath: resolve(ROOT, 'panda-config-ui.config.ts'), cwd: ROOT }), // codegen + extract + genera el CSS de Panda con el config de config-ui
    atImport(), // resolver @import
    url({
        filter: /\.(woff|woff2|eot|ttf|otf)(\?.*)?$/,
        url: 'copy',
        assetsPath: 'fonts', // Se copiarán en dist/fonts (o relativo a tu CSS de salida)
        useHash: true,       // Opcional: añade hash para cache-busting (fuente.a1b2c3.woff2)
      },),
    pruneVar(),
    nesting(),
    autoprefixer(),
    reporter({ clearReportedMessages: true }), // reporter al final para capturar avisos
  ]).process(cssInput, {
    from: opts.input,
    to: opts.output,
  })

  // lightningcss: minify + transforma a la sintaxis soportada por el target.
  const { code } = transform({
    filename: basename(opts.output),
    code: Buffer.from(result.css),
    minify: opts.minify !== false,
    ...(opts.targets ? { targets: opts.targets } : {}),
  })

  mkdirSync(dirname(opts.output), { recursive: true })
  await Bun.file(opts.output).write(code)

  const targetLabel = opts.targets ? JSON.stringify(opts.targets) : 'all'
  console.log(`CSS → ${opts.output} (${(code.length / 1024).toFixed(1)} KB, target: ${targetLabel})`)
}

main().catch((error) => {
  const message = error instanceof Error ? error.message : String(error)
  console.error(`✖ ${message}`)
  process.exitCode = 1
})
