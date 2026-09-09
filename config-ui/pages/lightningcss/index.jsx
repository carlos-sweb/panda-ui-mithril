import m from 'mithril'
import { css } from '../../../styled-system/css'
import {
  Stack, Title, Text, Button, Card, CardBody, TextInput, Alert, Block,
  Checkbox, Loading, Collapse, CollapseTitle, CollapseContent,
} from '../../../src/index.js'
import { t, loadPageI18n } from '../../i18n/index.js'

/**
 * Página Lightningcss — soporte NATIVO de Panda para lightningcss (NO es un
 * plugin de PostCSS, es ortogonal al pipeline que gestiona la página Postcss).
 *
 * panda.config.ts expone `lightningcss`/`browserslist`/`minify` de nivel
 * superior; Panda auto-registra @pandacss/plugin-lightningcss internamente
 * cuando lightningcss=true — funciona igual con `panda cssgen` que con
 * `@pandacss/dev/postcss`, así que Save no necesita tocar postcss.config.cjs.
 *
 * "browserslist" son queries de texto, pero para los 9 navegadores que
 * lightningcss realmente soporta (Targets: android/chrome/edge/firefox/ie/
 * ios_saf/opera/safari/samsung) una query simple es literalmente
 * "{navegador} >= {versión}" (verificado: browserslist acepta esos mismos
 * ids en minúscula como nombre de navegador). Por eso la UI principal es
 * checkbox + versión mínima por navegador — sin que el usuario escriba
 * sintaxis — y solo lo que NO encaja en ese patrón (p. ej. "not dead",
 * "> 0.5%") cae en la sección Advanced como query de texto libre.
 *
 * API:
 *   GET  /api/lightningcss/config    { enabled, browserslist, minify }
 *   POST /api/lightningcss/config    guarda el bloque en panda.config.ts
 *   GET  /api/lightningcss/preview   resuelve queries -> targets reales
 */

// Los 9 navegadores del `Targets` de lightningcss (ver targets.d.ts) — mismo
// id que usa `resolveTargets` en el servidor (lightningcss-api.ts). Orden:
// los más comunes primero, IE al final (legacy, casi nunca se quiere).
const BROWSERS = [
  { key: 'chrome', label: 'Chrome', defaultVersion: '90' },
  { key: 'safari', label: 'Safari', defaultVersion: '14' },
  { key: 'firefox', label: 'Firefox', defaultVersion: '88' },
  { key: 'edge', label: 'Edge', defaultVersion: '90' },
  { key: 'samsung', label: 'Samsung Internet', defaultVersion: '14' },
  { key: 'opera', label: 'Opera', defaultVersion: '76' },
  { key: 'android', label: 'Android', defaultVersion: '90' },
  { key: 'ios_saf', label: 'iOS Safari', defaultVersion: '14' },
  { key: 'ie', label: 'IE (legacy)', defaultVersion: '11' },
]
const BROWSER_KEYS = new Set(BROWSERS.map((b) => b.key))

const PER_BROWSER_RE = /^([a-z_]+)\s*>=\s*([\d.]+)$/i

/**
 * Separa un array de queries en { perBrowser, extra }: perBrowser mapea
 * key -> versión para las que calzan con el patrón "{browser} >= {version}"
 * de uno de los 9 navegadores conocidos; el resto (sintaxis libre de
 * browserslist: "not dead", "> 0.5%", combinaciones...) queda en extra tal
 * cual, sin perder nada que el usuario ya tuviera escrito a mano.
 */
function parseBrowserslist(arr) {
  const perBrowser = {}
  const extra = []
  for (const raw of arr || []) {
    const q = String(raw).trim()
    const match = PER_BROWSER_RE.exec(q)
    const key = match ? match[1].toLowerCase() : null
    if (key && BROWSER_KEYS.has(key)) {
      perBrowser[key] = match[2]
    } else if (q) {
      extra.push(q)
    }
  }
  return { perBrowser, extra }
}

/** Reconstruye el array de queries desde el estado (orden: navegadores primero, luego advanced). */
function serializeBrowserslist(s) {
  const fromBrowsers = BROWSERS
    .filter((b) => s.perBrowser[b.key] !== undefined && s.perBrowser[b.key] !== '')
    .map((b) => `${b.key} >= ${s.perBrowser[b.key]}`)
  return [...fromBrowsers, ...s.extraQueries.filter((q) => q.trim())]
}

const optionRow = css({
  display: 'grid',
  gridTemplateColumns: '200px 1fr',
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

const browserGrid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
  gap: '0.5rem',
})

const browserRow = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.375rem 0.625rem',
  borderRadius: 'var(--radius-field)',
  border: '1px solid',
  borderColor: 'base-300',
})

const browserVersionInput = css({ width: '4.5rem', flexShrink: 0 })

const targetsTable = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))',
  gap: '0.5rem',
  marginTop: '0.5rem',
})

const targetCell = css({
  display: 'flex',
  justifyContent: 'space-between',
  gap: '0.5rem',
  padding: '0.375rem 0.625rem',
  borderRadius: 'var(--radius-field)',
  backgroundColor: 'base-200',
  fontSize: '0.8125rem',
})

function loadConfig(s) {
  s.loading = true
  s.error = null
  fetch('/api/lightningcss/config')
    .then((r) => r.json())
    .then((d) => {
      s.loading = false
      if (d.ok) {
        s.enabled = !!d.config.enabled
        s.minify = !!d.config.minify
        s.polyfill = !!d.config.polyfill
        const { perBrowser, extra } = parseBrowserslist(d.config.browserslist)
        s.perBrowser = perBrowser
        s.extraQueries = extra
      } else {
        s.error = d.error || 'Failed to load lightningcss config'
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
  const browserslist = serializeBrowserslist(s)
  fetch('/api/lightningcss/config', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ enabled: s.enabled, browserslist, minify: s.minify, polyfill: s.polyfill }),
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

function previewTargets(s) {
  s.previewLoading = true
  s.previewError = null
  const q = serializeBrowserslist(s).join(',')
  fetch('/api/lightningcss/preview?q=' + encodeURIComponent(q))
    .then((r) => r.json())
    .then((d) => {
      s.previewLoading = false
      if (d.ok) {
        s.previewTargets = d.targets
      } else {
        s.previewError = d.error || 'Preview failed'
        s.previewTargets = null
      }
      m.redraw()
    })
    .catch((e) => {
      s.previewLoading = false
      s.previewError = String(e)
      m.redraw()
    })
}

/** Fila de un navegador: checkbox (target on/off) + input numérico de versión mínima. */
function browserRowView(s, b) {
  const version = s.perBrowser[b.key]
  const checked = version !== undefined
  return (
    <div key={b.key} className={browserRow}>
      <Checkbox
        size="md"
        aria-label={b.label}
        checked={checked}
        onchange={(e) => {
          const next = { ...s.perBrowser }
          if (e.target.checked) next[b.key] = b.defaultVersion
          else delete next[b.key]
          s.perBrowser = next
          s.previewTargets = null
        }}
      />
      <Text size="sm" className={css({ flex: '1' })}>{b.label}</Text>
      <TextInput
        size="sm"
        type="number"
        min="0"
        disabled={!checked}
        value={checked ? version : ''}
        placeholder={b.defaultVersion}
        className={browserVersionInput}
        oninput={(e) => {
          s.perBrowser = { ...s.perBrowser, [b.key]: e.target.value }
          s.previewTargets = null
        }}
      />
    </div>
  )
}

/** Editor de texto libre (advanced) — mismo widget que ya usaba la página Postcss para arrays. */
function extraQueriesEditor(s) {
  const arr = s.extraQueries
  return (
    <Stack gap="xs">
      {arr.map((item, i) => (
        <Stack key={i} direction="row" gap="sm">
          <TextInput
            size="md"
            value={item}
            placeholder="> 0.5%, not dead, cover 99.5%…"
            oninput={(e) => {
              const next = arr.slice()
              next[i] = e.target.value
              s.extraQueries = next
              s.previewTargets = null
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
              s.extraQueries = next
              s.previewTargets = null
            }}
          >
            ×
          </Button>
        </Stack>
      ))}
      <div>
        <Button
          size="sm"
          variant="outline"
          onclick={() => { s.extraQueries = [...arr, '']; s.previewTargets = null }}
        >
          + {t('addQuery')}
        </Button>
      </div>
    </Stack>
  )
}

const page = {
  oninit(vnode) {
    loadPageI18n('lightningcss')
    const s = vnode.state
    s.loading = false
    s.error = null
    s.enabled = false
    s.perBrowser = {}
    s.extraQueries = []
    s.minify = false
    s.polyfill = false
    s.saving = false
    s.saved = false
    s.rebuilding = false
    s.rebuildMsg = null
    s.rebuildError = null
    s.previewLoading = false
    s.previewError = null
    s.previewTargets = null
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
          <Card>
            <CardBody>
              <Stack gap="md">
                <div className={optionRow}>
                  <Stack gap="0">
                    <Text weight="bold" size="sm">{t('enable')}</Text>
                    <Text color="neutral" size="sm" className={optionHelp}>{t('enableHint')}</Text>
                  </Stack>
                  <Checkbox
                    size="md"
                    aria-label={t('enable')}
                    checked={s.enabled}
                    onchange={(e) => { s.enabled = !!e.target.checked }}
                  />
                </div>

                <div className={optionRow}>
                  <Stack gap="0">
                    <Text weight="bold" size="sm">{t('polyfill')}</Text>
                    <Text color="neutral" size="sm" className={optionHelp}>{t('polyfillHint')}</Text>
                  </Stack>
                  <Checkbox
                    size="md"
                    aria-label={t('polyfill')}
                    checked={s.polyfill}
                    onchange={(e) => { s.polyfill = !!e.target.checked }}
                  />
                </div>

                {s.enabled && (
                  <>
                    <div className={optionRow}>
                      <Stack gap="0">
                        <Text weight="bold" size="sm">{t('minify')}</Text>
                        <Text color="neutral" size="sm" className={optionHelp}>{t('minifyHint')}</Text>
                      </Stack>
                      <Checkbox
                        size="md"
                        aria-label={t('minify')}
                        checked={s.minify}
                        onchange={(e) => { s.minify = !!e.target.checked }}
                      />
                    </div>

                    <Stack gap="xs">
                      <Text weight="bold" size="sm">{t('browserslist')}</Text>
                      <Text color="neutral" size="sm" className={optionHelp}>{t('browserslistHint')}</Text>
                      <div className={browserGrid}>
                        {BROWSERS.map((b) => browserRowView(s, b))}
                      </div>
                    </Stack>

                    <Collapse arrow>
                      <CollapseTitle>
                        <Text size="sm">{t('advanced')} {s.extraQueries.length > 0 ? `(${s.extraQueries.length})` : ''}</Text>
                      </CollapseTitle>
                      <CollapseContent>
                        <Stack gap="sm" className={css({ paddingTop: '0.5rem' })}>
                          <Text color="neutral" size="sm">{t('advancedHint')}</Text>
                          {extraQueriesEditor(s)}
                        </Stack>
                      </CollapseContent>
                    </Collapse>

                    <Stack direction="row" gap="sm" align="center">
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={s.previewLoading}
                        onclick={() => previewTargets(s)}
                      >
                        {s.previewLoading ? t('resolving') : t('resolveTargets')}
                      </Button>
                    </Stack>
                    {s.previewError && <Alert color="error">{t('errorPrefix')}{s.previewError}</Alert>}
                    {s.previewTargets && (
                      <div className={targetsTable}>
                        {s.previewTargets.map((tg) => (
                          <div key={tg.browser} className={targetCell}>
                            <Text weight="bold" size="sm">{tg.browser}</Text>
                            <Text color="neutral" size="sm">{tg.version}+</Text>
                          </div>
                        ))}
                      </div>
                    )}

                    <Alert color="info">{t('redundancyHint')}</Alert>
                  </>
                )}
              </Stack>
            </CardBody>
          </Card>
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
