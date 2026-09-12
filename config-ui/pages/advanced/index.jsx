import m from 'mithril'
import { css } from '../../../styled-system/css'
import {
  Stack, Title, Text, Button, Card, CardBody, TextInput, Alert, Block,
  Checkbox, Loading,
} from '../../../src/index.js'
import { t, loadPageI18n } from '../../i18n/index.js'

/**
 * Página Advanced — subconjunto curado de campos de nivel superior de
 * panda.config.ts sin UI propia hasta ahora: preflight, strictTokens,
 * strictPropertyValues, hash, clean (booleans simples) + include/exclude
 * (globs, el mismo que ya usa el scanner de Static Css Recipes — aquí se
 * agrega el editor para escribirlos).
 *
 * Deliberadamente NO expone todo lo que acepta defineConfig — ver
 * advanced-config-api.ts para el razonamiento completo de qué quedó afuera
 * (jsxFramework/jsxFactory fijos a Mithril, outdir fijo a styled-system,
 * layers/separator necesitan regenerar pum/index.css también, hooks/plugins
 * no son serializables a un formulario, prefix SUSPENDIDO — ver el bullet
 * en AGENTS.md, rompe todo el paquete de forma verificada).
 *
 * API:
 *   GET  /api/advanced/config   estado actual
 *   POST /api/advanced/config   guarda
 */

const optionRow = css({
  display: 'grid',
  gridTemplateColumns: '260px 1fr',
  gap: '0.75rem',
  alignItems: 'start',
  padding: '0.375rem 0',
  '@media (max-width: 768px)': { gridTemplateColumns: '1fr' },
})

const optionHelp = css({
  fontSize: '0.75rem',
  opacity: 0.7,
  marginTop: '0.125rem',
})

const FLAGS = [
  { key: 'preflight', labelKey: 'preflight', hintKey: 'preflightHint' },
  { key: 'strictTokens', labelKey: 'strictTokens', hintKey: 'strictTokensHint' },
  { key: 'strictPropertyValues', labelKey: 'strictPropertyValues', hintKey: 'strictPropertyValuesHint' },
  { key: 'hash', labelKey: 'hash', hintKey: 'hashHint' },
  { key: 'clean', labelKey: 'clean', hintKey: 'cleanHint' },
]

function loadConfig(s) {
  s.loading = true
  s.error = null
  fetch('/api/advanced/config')
    .then((r) => r.json())
    .then((d) => {
      s.loading = false
      if (d.ok) {
        for (const f of FLAGS) s.flags[f.key] = !!d.config[f.key]
        s.include = Array.isArray(d.config.include) ? d.config.include.slice() : []
        s.exclude = Array.isArray(d.config.exclude) ? d.config.exclude.slice() : []
      } else {
        s.error = d.error || 'Failed to load advanced config'
      }
      m.redraw()
    })
    .catch((e) => {
      s.loading = false
      s.error = String(e)
      m.redraw()
    })
}

function saveConfig(s) {
  s.saving = true
  s.saved = false
  s.error = null
  fetch('/api/advanced/config', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...s.flags,
      include: s.include.filter((v) => v.trim()),
      exclude: s.exclude.filter((v) => v.trim()),
    }),
  })
    .then((r) => r.json())
    .then((d) => {
      s.saving = false
      if (d.ok) {
        s.saved = true
      } else {
        s.error = d.error || 'Save failed'
      }
      m.redraw()
    })
    .catch((e) => {
      s.saving = false
      s.error = String(e)
      m.redraw()
    })
}

function rebuild(s) {
  s.rebuilding = true
  s.rebuildMsg = null
  s.rebuildError = null
  fetch('/api/rebuild', { method: 'POST' })
    .then((r) => r.json())
    .then((d) => {
      s.rebuilding = false
      if (d.ok) {
        s.rebuildMsg = d.mode === 'postcss' ? t('rebuiltPostcss') : t('rebuiltCssgen')
      } else {
        s.rebuildError = (d.codegen || d.postcss || d.cssgen || 'Rebuild failed').slice(-300)
      }
      m.redraw()
    })
    .catch((e) => {
      s.rebuilding = false
      s.rebuildError = String(e)
      m.redraw()
    })
}

/** Editor de array de globs — mismo widget que ya usan lightningcss (Advanced) y postcss. */
function globArrayEditor(s, field, placeholder) {
  const arr = s[field]
  return (
    <Stack gap="xs">
      {arr.map((item, i) => (
        <Stack key={i} direction="row" gap="sm" align="center">
          <TextInput
            size="md"
            value={item}
            placeholder={placeholder}
            oninput={(e) => {
              const next = arr.slice()
              next[i] = e.target.value
              s[field] = next
            }}
          />
          <Button
            size="sm"
            variant="ghost"
            square
            aria-label={t('removeItem')}
            onclick={() => {
              const next = arr.slice()
              next.splice(i, 1)
              s[field] = next
            }}
          >
            ×
          </Button>
        </Stack>
      ))}
      <div>
        <Button size="sm" variant="outline" onclick={() => { s[field] = [...arr, ''] }}>
          + {t('addGlob')}
        </Button>
      </div>
    </Stack>
  )
}

const page = {
  oninit(vnode) {
    loadPageI18n('advanced')
    const s = vnode.state
    s.loading = false
    s.error = null
    s.flags = {}
    for (const f of FLAGS) s.flags[f.key] = false
    s.include = []
    s.exclude = []
    s.saving = false
    s.saved = false
    s.rebuilding = false
    s.rebuildMsg = null
    s.rebuildError = null
    loadConfig(s)
  },

  view(vnode) {
    const s = vnode.state

    return (
      <Stack gap="lg">
        <Title as="h1" size="2">{t('title')}</Title>
        <Text color="neutral">{t('intro')}</Text>

        {s.error && <Alert color="error">{t('errorPrefix')}{s.error}</Alert>}

        {s.loading && (
          <Stack align="center" gap="sm">
            <Loading variant="spinner" size="lg" />
          </Stack>
        )}

        {!s.loading && (
          <>
            <Card>
              <CardBody>
                <Stack gap="md">
                  {FLAGS.map((f) => (
                    <div key={f.key} className={optionRow}>
                      <Stack gap="xs">
                        <Text weight="bold" size="sm">{t(f.labelKey)}</Text>
                        <Text color="neutral" size="sm" className={optionHelp}>{t(f.hintKey)}</Text>
                      </Stack>
                      <Checkbox
                        size="md"
                        aria-label={t(f.labelKey)}
                        checked={s.flags[f.key]}
                        onchange={(e) => { s.flags[f.key] = !!e.target.checked }}
                      />
                    </div>
                  ))}
                </Stack>
              </CardBody>
            </Card>

            <Card>
              <CardBody>
                <Stack gap="md">
                  <Stack gap="xs">
                    <Text weight="bold" size="sm">{t('include')}</Text>
                    <Text color="neutral" size="sm" className={optionHelp}>{t('includeHint')}</Text>
                    {globArrayEditor(s, 'include', './src/**/*.{js,jsx,ts,tsx}')}
                  </Stack>
                  <Stack gap="xs">
                    <Text weight="bold" size="sm">{t('exclude')}</Text>
                    <Text color="neutral" size="sm" className={optionHelp}>{t('excludeHint')}</Text>
                    {globArrayEditor(s, 'exclude', './src/**/*.stories.tsx')}
                  </Stack>
                </Stack>
              </CardBody>
            </Card>
          </>
        )}

        {s.saved && !s.saving && <Alert color="success">{t('saved')}</Alert>}
        {s.rebuildMsg && !s.rebuilding && <Alert color="success">{s.rebuildMsg}</Alert>}
        {s.rebuildError && !s.rebuilding && <Alert color="error">{t('errorPrefix')}{s.rebuildError}</Alert>}

        <Block spacing="sm" />
        <Stack direction="row" gap="sm" align="center">
          <Button color="primary" disabled={s.saving || s.loading} onclick={() => saveConfig(s)}>
            {s.saving ? t('saving') : t('save')}
          </Button>
          <Button variant="outline" disabled={s.rebuilding} onclick={() => rebuild(s)}>
            {s.rebuilding ? t('rebuilding') : t('rebuild')}
          </Button>
          <Button variant="ghost" onclick={() => location.reload()}>{t('reload')}</Button>
        </Stack>
      </Stack>
    )
  },
}

export default page
