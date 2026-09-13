import { describe, expect, test } from 'bun:test'
import { existsSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { join } from 'node:path'

/**
 * The CLI is a script whose `main()` runs at import time, so its contract is
 * tested by spawning it — which is also exactly how a consumer runs it.
 *
 * The contract these tests pin down (it used to be inconsistent:
 * `init --help` exited 0 while `--help` exited 1, and a flag missing its value
 * silently fell back to the cwd):
 *   - `--help`/`-h` anywhere wins, on stdout, exit 0;
 *   - a usage error (no command, unknown command or option, missing or invalid
 *     value) prints the help on stderr and exits 1;
 *   - `--dir` without a value is an error, never a silent write to the cwd.
 */
const CLI = join(import.meta.dir, 'cli.ts')

function run(args: string[], cwd?: string) {
  const proc = Bun.spawnSync({
    cmd: ['bun', CLI, ...args],
    cwd,
    stdout: 'pipe',
    stderr: 'pipe',
  })
  return {
    code: proc.exitCode,
    out: proc.stdout.toString(),
    err: proc.stderr.toString(),
  }
}

function tempDir(): string {
  return mkdtempSync(join(tmpdir(), 'pum-cli-'))
}

describe('cli --help', () => {
  test('exits 0 and prints the help on stdout', () => {
    const r = run(['--help'])
    expect(r.code).toBe(0)
    expect(r.out).toContain('Usage:')
    expect(r.out).toContain('Exit status:')
    expect(r.err).toBe('')
  })

  test('wins wherever it appears, even next to a mistake', () => {
    for (const args of [['-h'], ['init', '--help'], ['--help', 'init'], ['bogus', '--help']]) {
      const r = run(args)
      expect(r.code).toBe(0)
      expect(r.out).toContain('Usage:')
      expect(r.err).toBe('')
    }
  })
})

describe('cli usage errors', () => {
  const cases: Array<[string, string[]]> = [
    ['missing command', []],
    ['unknown command', ['bogus']],
    ['unknown option', ['init', '--bogus']],
    ['option not accepted by the command', ['config', '--force']],
    ['invalid port', ['config', '--port=abc']],
    ['port out of range', ['config', '--port=70000']],
    ['unexpected extra argument', ['init', 'extra', 'arg']],
  ]

  for (const [name, args] of cases) {
    test(`${name} -> help on stderr, exit 1`, () => {
      const r = run(args)
      expect(r.code).toBe(1)
      expect(r.err).toContain('error: ')
      expect(r.err).toContain('Usage:')
      expect(r.out).toBe('')
    })
  }
})

describe('cli --dir without a value', () => {
  test('init --dir fails instead of scaffolding into the cwd', () => {
    const dir = tempDir()
    try {
      const r = run(['init', '--dir'], dir)
      expect(r.code).toBe(1)
      expect(r.err).toContain("option '--dir' requires a value")
      // The bug this pins: it used to write the whole scaffold into the cwd.
      expect(existsSync(join(dir, 'panda.config.ts'))).toBe(false)
      expect(existsSync(join(dir, 'pum'))).toBe(false)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  test('a value that looks like another flag counts as missing', () => {
    const dir = tempDir()
    try {
      const r = run(['init', '--dir', '--force'], dir)
      expect(r.code).toBe(1)
      expect(r.err).toContain("option '--dir' requires a value")
      expect(existsSync(join(dir, 'panda.config.ts'))).toBe(false)
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  test('config --dir fails without starting the server', () => {
    // On the old code this loaded config-ui/server.ts and blocked forever.
    const r = run(['config', '--dir'])
    expect(r.code).toBe(1)
    expect(r.err).toContain("option '--dir' requires a value")
  })
})

describe('cli init', () => {
  test('scaffolds into --dir, and refuses a second run without --force', () => {
    const dir = tempDir()
    try {
      const first = run(['init', '--dir', dir])
      expect(first.code).toBe(0)
      expect(existsSync(join(dir, 'panda.config.ts'))).toBe(true)
      expect(existsSync(join(dir, 'postcss.config.cjs'))).toBe(true)
      expect(existsSync(join(dir, 'pum', 'theme', 'colors.ts'))).toBe(true)

      const again = run(['init', '--dir', dir])
      expect(again.code).toBe(1)
      expect(again.err).toContain('already exists')
    } finally {
      rmSync(dir, { recursive: true, force: true })
    }
  })

  test('accepts the = and short forms of --dir, in any flag order', () => {
    const base = tempDir()
    try {
      const cases: Array<[string, (d: string) => string[]]> = [
        ['dir-eq', (d) => ['init', `--dir=${d}`]],
        ['d-space', (d) => ['init', '-d', d]],
        ['d-eq', (d) => ['init', `-d=${d}`]],
        ['force-first', (d) => ['init', '--force', '--dir', d]],
        ['force-last', (d) => ['init', '--dir', d, '--force']],
      ]
      for (const [name, args] of cases) {
        const dir = join(base, name)
        const r = run(args(dir))
        expect(r.code).toBe(0)
        expect(existsSync(join(dir, 'panda.config.ts'))).toBe(true)
      }
    } finally {
      rmSync(base, { recursive: true, force: true })
    }
  })
})
