#!/usr/bin/env bun
/**
 * verify-consumer-compile.ts
 *
 * End-to-end verification of the "source + preset" shipping model of
 * panda-ui-mithril: simulates a Panda consumer that compiles ONLY the CSS for
 * the components it uses (here: just `src/recipes/button.ts`), and checks the
 * three silent-failure footguns documented in AGENTS.md:
 *
 *   (a) consumer `outdir` must be `styled-system` — otherwise the cva()
 *       matcher never matches the recipes' `'../../styled-system/css'`
 *       specifier and the component styles are dropped with no error.
 *   (b) consumer `include` paths must be relative — absolute paths resolve to
 *       0 extracted files (verified empirically here).
 *   (c) `pumPreset` is mandatory — without it, `token(...)` references emit
 *       broken literals like `color: colors.primary`.
 *
 * The consumer lives entirely in /tmp/pum-consumer-verify (recreated from
 * scratch on every run). It never installs anything: node_modules is faked
 * with symlinks into this repo's existing node_modules, and the panda CLI
 * binary used is this repo's `node_modules/.bin/panda` run with `--cwd`.
 *
 * Run:  bun run scripts/verify-consumer-compile.ts   (or `npm run verify:consumer`)
 */
import { execFileSync } from 'node:child_process'
import {
  existsSync,
  mkdirSync,
  readFileSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const CONSUMER = '/tmp/pum-consumer-verify'
const PANDA_BIN = path.join(REPO, 'node_modules', '.bin', 'panda')
const RECIPES_REAL_DIR = path.join(REPO, 'src', 'recipes')
const BUTTON_ABSOLUTE = path.join(RECIPES_REAL_DIR, 'button.ts')

// ---------------------------------------------------------------------------
// Result bookkeeping
// ---------------------------------------------------------------------------
type Assertion = { id: string; name: string; pass: boolean; detail: string }
const results: Assertion[] = []
let failCount = 0

function record(id: string, name: string, pass: boolean, detail: string) {
  results.push({ id, name, pass, detail })
  if (!pass) failCount++
}

function render(pass: boolean) {
  return pass ? 'PASS' : 'FAIL'
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function runPanda(args: string[]): { stdout: string; stderr: string } {
  // panda CLI reads the config + cwd from --cwd; the binary itself lives in
  // this repo's node_modules (no installs in the consumer).
  const res: unknown = execFileSync(PANDA_BIN, args, {
    cwd: CONSUMER,
    stdio: ['ignore', 'pipe', 'pipe'],
    timeout: 300_000,
    env: { ...process.env, NO_COLOR: '1' },
  })
  // Bun's execFileSync returns { stdout, stderr } Buffers (ignores `encoding`),
  // Node returns a single Buffer/string — normalize both shapes.
  const obj = res as { stdout?: Buffer | string; stderr?: Buffer | string }
  const stdout = obj?.stdout != null ? String(obj.stdout) : String(res ?? '')
  const stderr = obj?.stderr != null ? String(obj.stderr) : ''
  return { stdout, stderr }
}

function runPhase(label: string): { stdout: string; stderr: string } {
  const codegen = runPanda(['codegen', '--cwd', CONSUMER, '--silent'])
  const cssgen = runPanda(['cssgen', '--cwd', CONSUMER])
  process.stdout.write(
    `  [${label}] codegen exit 0, cssgen exit 0 (${(codegen.stdout + cssgen.stdout)
      .match(/extracted css from (\d+) file/)?.[1] ?? '?'} file(s) extracted)\n`,
  )
  return { stdout: codegen.stdout + cssgen.stdout, stderr: codegen.stderr + cssgen.stderr }
}

function readCss(outdir: string): string {
  const file = path.join(CONSUMER, outdir, 'styles.css')
  return readFileSync(file, 'utf8')
}

const count = (css: string, re: RegExp) => (css.match(re) ?? []).length

function writeConfig(opts: { outdir: string; include: string[] }) {
  const includeLines = opts.include.map((p) => `    ${JSON.stringify(p)}`).join(',\n')
  const config = `import { defineConfig } from '@pandacss/dev'
import pandaPreset from '@pandacss/preset-panda'
import { pumPreset } from 'panda-ui-mithril/preset'

export default defineConfig({
  preflight: true,
  include: [
${includeLines},
  ],
  outdir: ${JSON.stringify(opts.outdir)},
  presets: [pandaPreset, pumPreset],
})
`
  writeFileSync(path.join(CONSUMER, 'panda.config.ts'), config)
}

/** rm the output dir of a previous pass so no stale CSS can leak in. */
function cleanOutdir(outdir: string) {
  rmSync(path.join(CONSUMER, outdir), { recursive: true, force: true })
}

// ---------------------------------------------------------------------------
// 0. Scaffold the consumer from scratch
// ---------------------------------------------------------------------------
console.log('=== panda-ui-mithril consumer compile verification ===\n')
console.log(`[0/3] Scaffolding consumer at ${CONSUMER}`)
rmSync(CONSUMER, { recursive: true, force: true })
mkdirSync(path.join(CONSUMER, 'node_modules'), { recursive: true })

const repoNodeModules = path.join(REPO, 'node_modules')
if (!existsSync(path.join(repoNodeModules, '@pandacss', 'dev'))) {
  console.error(`FATAL: ${repoNodeModules}/@pandacss/dev missing — run install in the repo first.`)
  process.exit(1)
}

// Simulate an installed package: node_modules/panda-ui-mithril -> this repo.
// `import { pumPreset } from 'panda-ui-mithril/preset'` then resolves through
// the package.json exports map to dist/preset.js, exactly like a real install.
symlinkSync(REPO, path.join(CONSUMER, 'node_modules', 'panda-ui-mithril'))
// Reuse the repo's @pandacss scope (defineConfig, preset-panda, the extractor).
symlinkSync(path.join(repoNodeModules, '@pandacss'), path.join(CONSUMER, 'node_modules', '@pandacss'))
// The include globs point at ./recipes-src/** (relative to the consumer cwd),
// backed by a symlink to the published recipe sources.
symlinkSync(RECIPES_REAL_DIR, path.join(CONSUMER, 'recipes-src'))

// ---------------------------------------------------------------------------
// 1. Happy path: outdir 'styled-system', relative include -> assertions A-C
// ---------------------------------------------------------------------------
console.log('\n[1/3] Happy path: outdir "styled-system", include "./recipes-src/button.ts"')
writeConfig({ outdir: 'styled-system', include: ['./recipes-src/button.ts'] })
cleanOutdir('styled-system')
runPhase('A-C')

const happy = readCss('styled-system')

// [A] Preset tokens resolved: --colors-primary (and semantic tokens in general)
const aPrimary = count(happy, /--colors-primary\b/g)
const aBase = count(happy, /--colors-base-100\b/g)
record(
  'A',
  'preset tokens resolved (--colors-primary present)',
  aPrimary > 0 && aBase > 0,
  `--colors-primary x${aPrimary}, --colors-base-100 x${aBase} in styled-system/styles.css`,
)

// [B] Tree-shaking: button styles present, other components absent
const bBtnP = count(happy, /--btn-p\b/g)
const bInline = count(happy, /\.d_inline-flex/g)
const bAlert = count(happy, /\.alert\b/g)
const bCard = count(happy, /\.card\b/g)
const bBadge = count(happy, /\.badge\b/g)
record(
  'B',
  'tree-shaking (only button compiled; alert/card/badge absent)',
  bBtnP > 0 && bInline > 0 && bAlert === 0 && bCard === 0 && bBadge === 0,
  `--btn-p x${bBtnP}, .d_inline-flex x${bInline} present; .alert x${bAlert}, .card x${bCard}, .badge x${bBadge} absent`,
)

// [C] No broken token literals as property VALUES (escaped class SELECTORS
// containing "colors.X" are valid and expected — only `prop: colors.x` is the bug)
const cColor = count(happy, /color:\s*colors\./g)
const cBtnColor = count(happy, /--btn-color:\s*colors\./g)
const cDecl = count(happy, /^\s*[a-z-]+:\s*colors\.[a-z0-9-]+/gm)
const cValid = count(happy, /var\(--colors-primary\)/g)
record(
  'C',
  'zero broken token literals (no `prop: colors.x` values)',
  cColor === 0 && cBtnColor === 0 && cDecl === 0 && cValid > 0,
  `color: colors.* x${cColor}, --btn-color: colors.* x${cBtnColor}, any prop: colors.* x${cDecl}; valid var(--colors-primary) x${cValid}`,
)

// ---------------------------------------------------------------------------
// 2. Footgun (a): outdir 'panda' -> assertion D
// ---------------------------------------------------------------------------
console.log('\n[2/3] Footgun (a): same config but outdir "panda"')
writeConfig({ outdir: 'panda', include: ['./recipes-src/button.ts'] })
cleanOutdir('panda')
runPhase('D')

const pandaCss = readCss('panda')
const dBtnP = count(pandaCss, /--btn-p\b/g)
const dInline = count(pandaCss, /\.d_inline-flex/g)
const dTokens = count(pandaCss, /--colors-primary\b/g)
record(
  'D',
  'outdir "panda" silently drops button styles (footgun a reproduced)',
  dBtnP === 0 && dInline === 0 && dTokens > 0,
  `--btn-p x${dBtnP}, .d_inline-flex x${dInline} (both must be 0); tokens still emitted x${dTokens} (build "succeeds" silently)`,
)

// ---------------------------------------------------------------------------
// 3. Footgun (b): absolute vs relative include -> assertion E
// ---------------------------------------------------------------------------
console.log('\n[3/3] Footgun (b): include absolute vs relative path')
const variants: { label: string; include: string[] }[] = [
  { label: 'ABSOLUTE', include: [BUTTON_ABSOLUTE] },
  { label: 'RELATIVE (symlink ./recipes-src)', include: ['./recipes-src/button.ts'] },
]
const extracted = new Map<string, number>()
const btnMarkers = new Map<string, number>()

for (const variant of variants) {
  writeConfig({ outdir: 'styled-system', include: variant.include })
  cleanOutdir('styled-system')
  const { stdout } = runPhase(variant.label)
  const n = Number(stdout.match(/extracted css from (\d+) file/)?.[1] ?? 0)
  extracted.set(variant.label, n)
  const css = readCss('styled-system')
  btnMarkers.set(variant.label, count(css, /--btn-p\b/g))
}

const absFiles = extracted.get('ABSOLUTE') ?? -1
const relFiles = extracted.get('RELATIVE (symlink ./recipes-src)') ?? -1
const absBtn = btnMarkers.get('ABSOLUTE') ?? -1
const relBtn = btnMarkers.get('RELATIVE (symlink ./recipes-src)') ?? -1

let eVerdict: string
if (absFiles === 0 && relFiles >= 1 && absBtn === 0 && relBtn > 0) {
  eVerdict = 'absoluto NO funciona; usar relativo'
} else if (absFiles >= 1 && absBtn > 0) {
  eVerdict = 'absoluto funciona'
} else {
  eVerdict = `INCONCLUSIVO (absoluto: ${absFiles} files / ${absBtn} markers, relativo: ${relFiles} files / ${relBtn} markers)`
}
record(
  'E',
  'footgun (b) resolved empirically (absolute vs relative include)',
  eVerdict.startsWith('absoluto'),
  `include "${BUTTON_ABSOLUTE}" -> ${absFiles} file(s), --btn-p x${absBtn} | include "./recipes-src/button.ts" -> ${relFiles} file(s), --btn-p x${relBtn} => ${eVerdict}`,
)

// ---------------------------------------------------------------------------
// Verdict
// ---------------------------------------------------------------------------
console.log('\n=== VERDICT ===')
for (const r of results) {
  console.log(`  [${r.id}] ${render(r.pass)} ${r.name}`)
  console.log(`        ${r.detail}`)
}
console.log(
  failCount === 0
    ? `\nALL ASSERTIONS PASS — consumer model verified. Artifact left at ${CONSUMER} (deleted on next run).`
    : `\n${failCount} assertion(s) FAILED — see details above. Artifact left at ${CONSUMER}.`,
)
writeFileSync(
  path.join(CONSUMER, 'VERIFY-RESULT.txt'),
  `verdict: ${failCount === 0 ? 'ALL PASS' : `${failCount} FAILED`}\n` +
    results.map((r) => `[${r.id}] ${render(r.pass)} ${r.name} — ${r.detail}`).join('\n') +
    '\n',
)
process.exit(failCount === 0 ? 0 : 1)
