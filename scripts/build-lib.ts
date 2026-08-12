/**
 * Build script for the npm library package.
 * Usage: bun run scripts/build-lib.ts
 *
 * Outputs:
 * - dist/index.js (ES module, mithril external)
 * - dist/index.d.ts, dist/types.d.ts, dist/components/*\/index.d.ts (type declarations, assembled from src/)
 * - dist/preset.js (Panda preset ESM bundle, @pandacss/dev bundled in)
 * - dist/preset.d.ts (hand-authored, copied from src/preset.d.ts)
 */

import { existsSync, rmSync, mkdirSync, readFileSync, writeFileSync, readdirSync, statSync } from 'fs'
import { resolve } from 'path'
import { execSync } from 'child_process'

const ROOT = resolve(import.meta.dir, '..')
const OUTDIR = resolve(ROOT, 'dist')

// Clean output directory
if (existsSync(OUTDIR)) {
  rmSync(OUTDIR, { recursive: true })
}
mkdirSync(OUTDIR, { recursive: true })

console.log('Building library → dist/')

// Step 0: Regenerate styled-system so codegen/CSS reflect current source
console.log('Running Panda CSS codegen...')
execSync('bunx panda codegen', { cwd: ROOT, stdio: 'inherit' })

// Step 1: Bundle JS with Bun
const result = await Bun.build({
  entrypoints: [resolve(ROOT, 'src/index.js')],
  outdir: OUTDIR,
  format: 'esm',
  minify: true,
  splitting: true,
  external: ['mithril'],
  naming: {
    entry: '[name].[ext]',
    chunk: '[name]-[hash].[ext]',
    asset: '[name]-[hash].[ext]',
  },
})

if (!result.success) {
  console.error('Build failed:')
  for (const message of result.logs) {
    console.error(message)
  }
  process.exit(1)
}

console.log('JS bundle built successfully')

// Step 1b: Bundle the Panda preset as a separate ESM file (dist/preset.js).
// `@pandacss/dev` is intentionally NOT external here: `definePreset` is a
// self-contained identity function, so bundling it in makes dist/preset.js
// runnable without any runtime dependency on @pandacss/dev.
console.log('Building preset bundle...')
const presetResult = await Bun.build({
  entrypoints: [resolve(ROOT, 'src/preset.ts')],
  outdir: OUTDIR,
  format: 'esm',
  minify: true,
  external: ['mithril'],
  naming: {
    entry: '[name].[ext]',
    chunk: '[name]-[hash].[ext]',
    asset: '[name]-[hash].[ext]',
  },
})

if (!presetResult.success) {
  console.error('Preset build failed:')
  for (const message of presetResult.logs) {
    console.error(message)
  }
  process.exit(1)
}

console.log('Preset bundle built successfully')

// Guard: the barrel must NOT contain the preset — it ships as a separate
// file. `definePreset`/`semanticTokens` only exist in src/preset.ts.
const barrel = readFileSync(resolve(OUTDIR, 'index.js'), 'utf-8')
if (barrel.includes('definePreset') || barrel.includes('semanticTokens')) {
  console.error('Preset content leaked into dist/index.js barrel')
  process.exit(1)
}
console.log('Verified: dist/index.js does not contain preset content')

// Step 2: Type-check against the current source before publishing
// (component prop types are hand-authored .d.ts files, not compiler output —
// tsc here only validates them, it doesn't emit anything for dist/)
console.log('Type-checking...')
const tsc = Bun.spawnSync(['bunx', 'tsc', '--noEmit', '--project', 'tsconfig.lib.json'], {
  cwd: ROOT,
  stdio: ['inherit', 'inherit', 'inherit'],
})

if (tsc.exitCode !== 0) {
  console.error('Type-check failed')
  process.exit(1)
}

console.log('Type-check passed')

// Step 2b: Assemble dist/*.d.ts
// src/index.d.ts and src/types.d.ts are hand-authored and copied as-is.
// Each component gets a dist/components/<Name>/index.d.ts:
//   - hand-authored ones (currently Button, Alert) are copied as-is
//   - the rest are stubbed with `export const X: any` for every named export,
//     extracted from the component's `export const X = ...` lines, so the
//     barrel re-exports in index.d.ts resolve for consumers. Proper prop
//     types for these remain a TODO (tracked in README's Estado section).
console.log('Assembling type declarations...')

Bun.write(resolve(OUTDIR, 'index.d.ts'), readFileSync(resolve(ROOT, 'src/index.d.ts')))
Bun.write(resolve(OUTDIR, 'types.d.ts'), readFileSync(resolve(ROOT, 'src/types.d.ts')))
// preset.d.ts is hand-authored and copied as-is (self-contained, no
// @pandacss/dev type imports — consumers resolve it via dist/preset.d.ts).
Bun.write(resolve(OUTDIR, 'preset.d.ts'), readFileSync(resolve(ROOT, 'src/preset.d.ts')))
mkdirSync(resolve(OUTDIR, 'utils'), { recursive: true })
Bun.write(resolve(OUTDIR, 'utils/cx.d.ts'), readFileSync(resolve(ROOT, 'src/utils/cx.d.ts')))

const componentsDir = resolve(ROOT, 'src/components')
for (const name of readdirSync(componentsDir)) {
  const srcDts = resolve(componentsDir, name, 'index.d.ts')
  const outDir = resolve(OUTDIR, 'components', name)
  mkdirSync(outDir, { recursive: true })

  if (existsSync(srcDts)) {
    Bun.write(resolve(outDir, 'index.d.ts'), readFileSync(srcDts))
    continue
  }

  const srcJs = resolve(componentsDir, name, 'index.js')
  const source = readFileSync(srcJs, 'utf-8')
  const names = [...source.matchAll(/^export const (\w+)/gm)].map((m) => m[1])
  const stub = names.map((n) => `export const ${n}: any\n`).join('')
  writeFileSync(resolve(outDir, 'index.d.ts'), stub)
}

console.log('Type declarations assembled')

console.log(`\nBuild succeeded. Output in ${OUTDIR}`)

// List output files
function listFiles(dir: string, prefix = '') {
  for (const entry of readdirSync(dir)) {
    const path = `${prefix}${entry}`
    const fullPath = `${dir}/${entry}`
    if (statSync(fullPath).isDirectory()) {
      console.log(`  📁 ${path}/`)
      listFiles(fullPath, `${path}/`)
    } else {
      const size = statSync(fullPath).size
      console.log(`  📄 ${path} (${(size / 1024).toFixed(1)} KB)`)
    }
  }
}
console.log('\nOutput files:')
listFiles(OUTDIR)
