import m from 'mithril'
import { css } from '../../../styled-system/css'
import {
  Stack, Title, Text, Button, Card, CardBody, TextInput, Alert, Block,
  Checkbox, Loading, Tag,
} from '../../../src/index.js'
import { t, loadPageI18n } from '../../i18n/index.js'

/**
 * Página Static Css Recipes — reduce `staticCss.recipes` de `'*'` (todos los
 * recipes de la librería) a solo los que el proyecto REALMENTE usa.
 *
 * "Scan" analiza el código del propio paquete instalado (qué recipes usa
 * cada componente, y de qué OTROS componentes depende — wrappers, p. ej.
 * Table usa Pagination/Select/Skeleton y Pagination a su vez usa Button) más
 * el código del consumidor (mismo glob `include` de panda.config.ts) para
 * saber qué componentes se importan. El resultado del scan NUNCA pisa la
 * lista "Manual": son dos fuentes independientes, el valor final guardado es
 * siempre scan ∪ manual — así el usuario puede agregar sus propios recipes
 * (o cualquiera que el análisis estático no pueda detectar: imports
 * dinámicos, re-exports indirectos) sin que un rescan futuro se los borre.
 *
 * API:
 *   GET  /api/staticcss/config   estado actual (sin escanear)
 *   POST /api/staticcss/scan     escanea (preview, no guarda)
 *   POST /api/staticcss/config   guarda { enabled, recipes, manual }
 */

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

const chipRow = css({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '0.375rem',
  marginTop: '0.375rem',
})

function loadConfig(s) {
  s.loading = true
  s.error = null
  fetch('/api/staticcss/config')
    .then((r) => r.json())
    .then((d) => {
      s.loading = false
      if (d.ok) {
        s.enabled = !!d.enabled
        // "último scan conocido" = lo guardado menos lo manual (no hace falta
        // re-escanear solo para pintar la página).
        const manualSet = new Set(d.manual || [])
        s.scannedRecipes = (d.recipes || []).filter((r) => !manualSet.has(r))
        s.scannedComponents = null
        s.manual = d.manual || []
        s.include = d.include || []
      } else {
        s.error = d.error || 'Failed to load static css config'
      }
      m.redraw()
    })
    .catch((e) => {
      s.loading = false
      s.error = String(e)
      m.redraw()
    })
}

function runScan(s) {
  s.scanning = true
  s.scanError = null
  fetch('/api/staticcss/scan', { method: 'POST' })
    .then((r) => r.json())
    .then((d) => {
      s.scanning = false
      if (d.ok) {
        s.scannedComponents = d.components
        s.scannedRecipes = d.recipes
        s.filesScanned = d.filesScanned
      } else {
        s.scanError = d.error || 'Scan failed'
      }
      m.redraw()
    })
    .catch((e) => {
      s.scanning = false
      s.scanError = String(e)
      m.redraw()
    })
}

function saveConfig(s) {
  s.saving = true
  s.saved = false
  s.error = null
  fetch('/api/staticcss/config', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ enabled: s.enabled, recipes: s.scannedRecipes, manual: s.manual }),
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

/** Editor de texto libre — mismo widget que ya usan browserslist (lightningcss) y arrays (postcss). */
function manualEditor(s) {
  const arr = s.manual
  return (
    <Stack gap="xs">
      {arr.map((item, i) => (
        <Stack key={i} direction="row" gap="sm">
          <TextInput
            size="md"
            value={item}
            placeholder="myCustomRecipe"
            oninput={(e) => {
              const next = arr.slice()
              next[i] = e.target.value
              s.manual = next
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
              s.manual = next
            }}
          >
            ×
          </Button>
        </Stack>
      ))}
      <div>
        <Button size="sm" variant="outline" onclick={() => { s.manual = [...arr, ''] }}>
          + {t('addRecipe')}
        </Button>
      </div>
    </Stack>
  )
}

const page = {
  oninit(vnode) {
    loadPageI18n('staticcss')
    const s = vnode.state
    s.loading = false
    s.error = null
    s.enabled = false
    s.scannedComponents = null
    s.scannedRecipes = []
    s.manual = []
    s.include = []
    s.scanning = false
    s.scanError = null
    s.filesScanned = null
    s.saving = false
    s.saved = false
    s.rebuilding = false
    s.rebuildMsg = null
    s.rebuildError = null
    loadConfig(s)
  },

  view(vnode) {
    const s = vnode.state
    const finalRecipes = [...new Set([...s.scannedRecipes, ...s.manual.filter((v) => v.trim())])].sort()

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

                {s.enabled && (
                  <>
                    <Stack gap="xs">
                      <Stack direction="row" gap="sm" align="center">
                        <Text weight="bold" size="sm">{t('scan')}</Text>
                        <Button size="sm" variant="outline" disabled={s.scanning} onclick={() => runScan(s)}>
                          {s.scanning ? t('scanning') : t('scanButton')}
                        </Button>
                      </Stack>
                      <Text color="neutral" size="sm" className={optionHelp}>
                        {s.include.length ? tf(t('scanHint'), { include: s.include.join(', ') }) : t('scanHint')}
                      </Text>
                      {s.scanError && <Alert color="error">{t('errorPrefix')}{s.scanError}</Alert>}
                      {s.scannedComponents !== null && (
                        <Text color="neutral" size="sm">
                          {s.filesScanned} {t('filesScanned')}
                        </Text>
                      )}
                      {s.scannedComponents !== null && s.scannedComponents.length > 0 && (
                        <div className={chipRow}>
                          {s.scannedComponents.map((c) => <Tag key={c} size="md" variant="ghost">{c}</Tag>)}
                        </div>
                      )}
                      {s.scannedComponents !== null && s.scannedComponents.length === 0 && (
                        <Alert color="warning">{t('noComponentsDetected')}</Alert>
                      )}
                    </Stack>

                    <div className={optionRow}>
                      <Stack gap="0">
                        <Text weight="bold" size="sm">{t('manual')}</Text>
                        <Text color="neutral" size="sm" className={optionHelp}>{t('manualHint')}</Text>
                      </Stack>
                      {manualEditor(s)}
                    </div>

                    <Stack gap="xs">
                      <Text weight="bold" size="sm">{t('finalRecipes')} ({finalRecipes.length})</Text>
                      <div className={chipRow}>
                        {finalRecipes.length === 0 && <Text color="neutral" size="sm">{t('finalRecipesEmpty')}</Text>}
                        {finalRecipes.map((r) => <Tag key={r} size="md" variant="success">{r}</Tag>)}
                      </div>
                    </Stack>

                    <Alert color="info">{t('limitationsHint')}</Alert>
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

/** t() con interpolación simple: reemplaza {x} en la traducción. */
function tf(str, vars) {
  return str.replace(/\{(\w+)\}/g, (_, k) => (vars && vars[k] !== undefined ? vars[k] : `{${k}}`))
}

export default page
