import m from 'mithril'
import { css } from '../../../styled-system/css'
import {
  Stack, Title, Text, Button, Card, CardBody, TextInput, Alert, Block,
  Columns, Column, Select, Checkbox, Tag, Tabs, Tab, TabContent,
} from '../../../src/index.js'
import { t, loadPageI18n, currentLang } from '../../i18n/index.js'

/**
 * Página Fonts — edita las tipografías del theme (tokens.fonts) y permite
 * buscar e instalar fuentes desde Fontsource (https://fontsource.org/), el
 * proveedor por defecto de esta exploración.
 *
 * Tokens (igual que antes):
 *   GET/POST /api/theme → pum/theme/fonts.ts
 * Fuentes:
 *   GET  /api/fonts/search?q=      → resultados de Fontsource (proxy)
 *   GET  /api/fonts/installed      → fuentes instaladas (metadata.json por dir)
 *   POST /api/fonts/install        → descarga woff2 + genera {raiz}/fonts.css
 *   POST /api/fonts/uninstall      → borra la fuente + regenera fonts.css
 *   GET  /api/fonts/css/{id}       → @font-face con urls locales (preview)
 *   GET  /api/fonts/file/{id}/{f}  → sirve el woff2 instalado
 *
 * Instalar es self-hosting: los woff2 viven en el proyecto objetivo y el
 * consumidor carga {raiz}/fonts.css (el editor muestra el import exacto).
 */

// ── utilidades css() de la página (generadas en config-ui.css) ──────────────
const fieldRow = css({
  display: 'grid',
  gridTemplateColumns: '200px 1fr',
  gap: '0.75rem',
  alignItems: 'center',
  '@media (max-width: 768px)': { gridTemplateColumns: '1fr' },
})

const tokenName = css({
  fontFamily: 'monospace',
  fontSize: '0.8125rem',
})

// Fila de resultado (búsqueda e instaladas): familia + tags + botones.
const resultRow = css({
  padding: '0.5rem 0',
})

// Línea de metadatos de un resultado (categoría, licencia, badge variable…).
const resultMeta = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '0.375rem',
  marginTop: '0.125rem',
})

// Panel expandido de preview + opciones de instalación.
const previewPanel = css({
  border: '1px solid',
  borderColor: 'base-300',
  borderRadius: '0.5rem',
  padding: '0.75rem',
  marginTop: '0.5rem',
})

// Preview "Aa" y texto de muestra — la familia viene por custom property
// (--preview-font) para poder variarla por fila sin estilos inline.
const previewBig = css({
  fontFamily: 'var(--preview-font)',
  fontSize: '2rem',
  lineHeight: '1.2',
  marginBottom: '0.375rem',
})

const previewSample = css({
  fontFamily: 'var(--preview-font)',
  fontSize: '1rem',
  lineHeight: '1.5',
  color: 'base-content',
})

// Opción de peso: checkbox + número en línea.
const weightOption = css({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.375rem',
  cursor: 'pointer',
})

// Línea de import que el consumidor debe añadir en su entrada de la app.
const importCode = css({
  display: 'block',
  fontFamily: 'monospace',
  fontSize: '0.8125rem',
  marginTop: '0.25rem',
})

/** Escapa una family para usarla como string CSS (comillas simples). */
function cssStr(v) {
  return String(v).replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

/** t() con interpolación: tf('a.b', { x }) reemplaza {x} en la traducción. */
function tf(path, vars) {
  return t(path).replace(/\{(\w+)\}/g, (_, k) => (vars && vars[k] !== undefined ? vars[k] : `{${k}}`))
}

// ── estado / acciones ────────────────────────────────────────────────────────
function loadInstalled(s) {
  s.installedLoading = true
  s.installedError = null
  fetch('/api/fonts/installed')
    .then((r) => r.json())
    .then((d) => {
      s.installedLoading = false
      if (d.ok) {
        s.installed = d.fonts || []
        s.fontsCssRel = d.fontsCssRel || 'fonts.css'
      } else {
        s.installedError = d.error || 'Failed to load installed fonts'
      }
      m.redraw()
    })
    .catch((e) => {
      s.installedLoading = false
      s.installedError = String(e)
      m.redraw()
    })
}

function runSearch(s) {
  const q = s.query.trim()
  const seq = ++s.searchSeq
  if (!q) {
    s.results = null
    s.searching = false
    s.searchError = null
    m.redraw()
    return
  }
  s.searching = true
  s.searchError = null
  fetch('/api/fonts/search?q=' + encodeURIComponent(q))
    .then((r) => r.json())
    .then((d) => {
      if (seq !== s.searchSeq) return // respuesta obsoleta
      s.searching = false
      if (d.ok) s.results = d.results || []
      else s.searchError = d.error || 'Search failed'
      m.redraw()
    })
    .catch((e) => {
      if (seq !== s.searchSeq) return
      s.searching = false
      s.searchError = String(e)
      m.redraw()
    })
}

// Expande un resultado de búsqueda: preview vía CDN (CORS abierto) + defaults.
function expandResult(s, f) {
  if (s.expand === 's:' + f.id) {
    s.expand = null
    s.previewCss = ''
    return
  }
  s.expand = 's:' + f.id
  s.installError = null
  s.installOk = null
  const w400 = f.weights.includes(400)
  const w700 = f.weights.includes(700)
  s.installWeights = w400 ? (w700 ? [400, 700] : [400]) : (w700 ? [700] : [f.weights[0]])
  // El toggle de italic es opt-in: el checkbox solo se muestra si la fuente
  // tiene estilo italic, pero arranca desmarcado.
  s.installItalic = false
  s.installSubset = f.defSubset || (f.subsets && f.subsets[0]) || 'latin'
  s.previewFamily = '"' + f.family + '", sans-serif'
  // Un solo @font-face (peso base que tenga la fuente) para el preview.
  const w = w400 ? 400 : f.weights[0]
  s.previewCss = [
    "@font-face {",
    `  font-family: '${cssStr(f.family)}';`,
    '  font-style: normal;',
    '  font-display: swap;',
    `  font-weight: ${w};`,
    `  src: url('https://cdn.jsdelivr.net/fontsource/fonts/${f.id}@latest/${s.installSubset}-${w}-normal.woff2') format('woff2');`,
    '}',
  ].join('\n')
}

// Expande una instalada: preview con los woff2 locales servidos por el editor.
function expandInstalled(s, f) {
  if (s.expand === 'i:' + f.id) {
    s.expand = null
    s.previewCss = ''
    return
  }
  s.expand = 'i:' + f.id
  s.previewFamily = '"' + f.family + '", sans-serif'
  s.previewCss = ''
  fetch('/api/fonts/css/' + f.id)
    .then((r) => r.text())
    .then((cssText) => {
      if (s.expand === 'i:' + f.id) {
        s.previewCss = cssText
        m.redraw()
      }
    })
    .catch(() => {
      if (s.expand === 'i:' + f.id) {
        s.previewCss = ''
        m.redraw()
      }
    })
}

function toggleWeight(s, w) {
  s.installWeights = s.installWeights.includes(w)
    ? s.installWeights.filter((x) => x !== w)
    : [...s.installWeights, w].sort((a, b) => a - b)
}

function install(s, f) {
  s.installing = true
  s.installError = null
  s.installOk = null
  fetch('/api/fonts/install', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: f.id,
      weights: s.installWeights,
      styles: s.installItalic ? ['normal', 'italic'] : ['normal'],
      subsets: [s.installSubset],
    }),
  })
    .then((r) => r.json())
    .then((res) => {
      s.installing = false
      if (!res.ok) throw new Error(res.error || 'Install failed')
      s.installOk = { family: res.font.family, importHint: res.importHint, fontsCssRel: res.fontsCssRel }
      loadInstalled(s)
      m.redraw()
    })
    .catch((e) => {
      s.installing = false
      s.installError = String(e)
      m.redraw()
    })
}

function uninstall(s, f) {
  s.uninstalling = f.id
  fetch('/api/fonts/uninstall', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: f.id }),
  })
    .then((r) => r.json())
    .then((res) => {
      s.uninstalling = null
      if (!res.ok) throw new Error(res.error || 'Uninstall failed')
      if (s.expand === 'i:' + f.id) {
        s.expand = null
        s.previewCss = ''
      }
      loadInstalled(s)
      m.redraw()
    })
    .catch((e) => {
      s.uninstalling = null
      s.installError = String(e)
      m.redraw()
    })
}

// ── vnodes por fila ──────────────────────────────────────────────────────────
/** Preview compartido (se renderiza dentro del panel expandido). */
function previewBlock(s) {
  if (!s.previewCss) return null
  return (
    <Block spacing="sm">
      <Text className={previewBig} style={{ '--preview-font': s.previewFamily }}>Aa</Text>
      <Text className={previewSample} style={{ '--preview-font': s.previewFamily }}>
        {t('sample')}
      </Text>
    </Block>
  )
}

/** Panel de opciones de instalación (dentro del resultado expandido). */
function installPanel(s, f) {
  const installedIds = s.installed.map((i) => i.id)
  const already = installedIds.includes(f.id)
  return (
    <Stack gap="md" className={previewPanel}>
      {previewBlock(s)}
      <Columns gap="sm" centered>
        <Column narrow>
          <Text as="span" weight="semibold" size="sm">{t('search.subset')}</Text>
        </Column>
        <Column>
          <Select
            size="sm"
            value={s.installSubset}
            onchange={(e) => { s.installSubset = e.target.value }}
          >
            {f.subsets.map((sub) => m('option', { key: sub, value: sub }, sub))}
          </Select>
        </Column>
      </Columns>
      <Stack direction="row" gap="md">
        {f.weights.map((w) => (
          <label key={w} className={weightOption}>
            <Checkbox
              size="sm"
              checked={s.installWeights.includes(w)}
              onchange={() => toggleWeight(s, w)}
            />
            <Text as="span" size="sm">{w}</Text>
          </label>
        ))}
      </Stack>
      {f.styles.includes('italic') && (
        <label className={weightOption}>
          <Checkbox
            size="sm"
            checked={s.installItalic}
            onchange={(e) => { s.installItalic = e.target.checked }}
          />
          <Text as="span" size="sm">{t('search.italic')}</Text>
        </label>
      )}
      {s.installError && <Alert color="error">{t('errorPrefix')}{s.installError}</Alert>}
      {s.installOk && (
        <Alert color="success">
          <Text as="span">{tf('search.installedSuccess', { family: s.installOk.family })}</Text>
          <code className={importCode}>{s.installOk.importHint}</code>
        </Alert>
      )}
      <Stack direction="row" gap="sm" align="center">
        <Button
          color="primary"
          size="sm"
          disabled={s.installing || s.installWeights.length === 0}
          onclick={() => install(s, f)}
        >
          {s.installing ? t('search.installing') : (already ? t('search.reinstall') : t('search.install'))}
        </Button>
        <Text color="neutral" size="sm">
          {already ? t('search.alreadyInstalled') : t('search.downloadsHint')}
        </Text>
      </Stack>
    </Stack>
  )
}

const page = {
  oninit(vnode) {
    const s = vnode.state
    loadPageI18n('fonts')
    s.loading = true
    s.saving = false
    s.error = null
    s.saved = false
    s.fonts = {}
    s.themeRel = 'pum/theme'

    // estado de fuentes
    s.installed = []
    s.installedLoading = true
    s.installedError = null
    s.fontsCssRel = 'fonts.css'
    s.query = ''
    s.results = null
    s.searching = false
    s.searchError = null
    s.searchSeq = 0
    s.expand = null
    s.previewCss = ''
    s.previewFamily = ''
    s.installSubset = ''
    s.installWeights = []
    s.installItalic = false
    s.installing = false
    s.installError = null
    s.installOk = null
    s.uninstalling = null

    fetch('/api/theme')
      .then((r) => r.json())
      .then((data) => {
        if (data && data.ok === false) {
          s.loading = false
          s.error = data.error || 'Theme not found'
          m.redraw()
          return
        }
        s.themeRel = data.themeRel || 'pum/theme'
        s.fonts = JSON.parse(JSON.stringify(data.fonts || {}))
        s.loading = false
        m.redraw()
      })
      .catch((e) => {
        s.loading = false
        s.error = String(e)
        m.redraw()
      })

    loadInstalled(s)
  },

  view(vnode) {
    const s = vnode.state
    const names = Object.keys(s.fonts)
    const installedIds = s.installed.map((i) => i.id)

    const save = () => {
      s.saving = true
      s.saved = false
      fetch('/api/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fonts: s.fonts }),
      })
        .then((r) => r.json())
        .then(async (res) => {
          if (!res.ok) throw new Error(res.error || 'Save failed')
          await fetch('/api/rebuild', { method: 'POST' })
          s.saving = false
          s.saved = true
          m.redraw()
        })
        .catch((e) => { s.saving = false; s.error = String(e); m.redraw() })
    }

    // Filas de resultados de búsqueda (array plano y keyed: regla de Mithril).
    const searchRows = (s.results || []).flatMap((f) => {
      const expanded = s.expand === 's:' + f.id
      return [
        <Columns
          key={'r-' + f.id}
          gap="sm"
          centered
          className={resultRow}
        >
          <Column>
            <Text weight="semibold" size="md">{f.family}</Text>
            <Text as="div" className={resultMeta}>
              {f.category && <Tag size="md">{f.category}</Tag>}
              {f.license && <Tag size="md">{f.license}</Tag>}
              {f.variable && <Tag size="md" variant="info">{t('search.variable')}</Tag>}
              {installedIds.includes(f.id) && <Tag size="md" variant="success">{t('search.installed')}</Tag>}
              <Text as="span" size="sm" color="neutral">
                {tf('search.weightsCount', { count: f.weights.length, subsets: f.subsets.join(', ') })}
              </Text>
            </Text>
          </Column>
          <Column narrow>
            <Button
              variant="outline"
              size="sm"
              onclick={() => expandResult(s, f)}
            >
              {expanded ? t('search.close') : t('search.previewAndInstall')}
            </Button>
          </Column>
        </Columns>,
        expanded ? (
          <Block key={'p-' + f.id} spacing="sm">
            {installPanel(s, f)}
          </Block>
        ) : null,
      ].filter(Boolean)
    })

    // Filas de fuentes instaladas.
    const installedRows = s.installed.map((f) => {
      const expanded = s.expand === 'i:' + f.id
      return [
        <Columns
          key={'i-' + f.id}
          gap="sm"
          centered
          className={resultRow}
        >
          <Column>
            <Text weight="semibold" size="md">{f.family}</Text>
            <Text as="div" className={resultMeta}>
              {f.weights.map((w) => <Tag key={w} size="md">{w}</Tag>)}
              {f.styles.includes('italic') && <Tag size="md" variant="info">{t('installed.italic')}</Tag>}
              {f.variable && <Tag size="md" variant="info">{t('installed.variable')}</Tag>}
              <Text as="span" size="sm" color="neutral">
                {tf('installed.summary', {
                  subsets: f.subsets.join(', '),
                  date: new Date(f.installedAt).toLocaleDateString(currentLang()),
                })}
              </Text>
            </Text>
          </Column>
          <Column narrow>
            <Button variant="outline" size="sm" onclick={() => expandInstalled(s, f)}>
              {expanded ? t('installed.hidePreview') : t('installed.preview')}
            </Button>
          </Column>
          <Column narrow>
            <Button
              variant="ghost"
              size="sm"
              disabled={s.uninstalling === f.id}
              onclick={() => uninstall(s, f)}
            >
              {s.uninstalling === f.id ? t('installed.removing') : t('installed.uninstall')}
            </Button>
          </Column>
        </Columns>,
        expanded ? (
          <Block key={'pi-' + f.id} spacing="sm" className={previewPanel}>
            {previewBlock(s) || <Text color="neutral" size="sm">{t('installed.loadingPreview')}</Text>}
          </Block>
        ) : null,
      ].filter(Boolean)
    })

    return (
      <Stack gap="lg">
        <Title as="h1" size="2">{t('title')}</Title>
        <Text color="neutral">
          {t('introPre')} <code>{s.themeRel}/fonts.ts</code> {t('introAnd')} <code>{s.themeRel}/../fonts/</code>{t('introPost')}
        </Text>

        {s.loading && <Alert color="info">{t('loadingTheme')}</Alert>}
        {s.error && <Alert color="error">{t('errorPrefix')}{s.error}</Alert>}
        {s.saved && !s.saving && <Alert color="success">{t('savedAndRebuilt')}</Alert>}

        {!s.loading && !s.error && (
          <Tabs boxed defaultActive="tokens">
            <Tab ref="tokens">{t('tabs.tokens')}</Tab>
            <Tab ref="search">{t('tabs.search')}</Tab>
            <Tab ref="installed">{t('tabs.installed')}</Tab>

            {/* Principal (sin título interior): editor de stacks del theme */}
            <TabContent ref="tokens">
              <Card>
                <CardBody>
                  <Stack gap="md">
                    {names.map((name) => (
                      <div key={name} className={fieldRow}>
                        <Text weight="bold" className={tokenName}>{name}</Text>
                        <TextInput
                          value={s.fonts[name] || ''}
                          placeholder={t('token.placeholder')}
                          oninput={(e) => { s.fonts[name] = e.target.value }}
                        />
                      </div>
                    ))}
                    <Block spacing="sm" />
                    <Stack direction="row" gap="sm">
                      <Button color="primary" onclick={save} disabled={s.saving}>{s.saving ? t('token.saving') : t('token.save')}</Button>
                      <Button variant="ghost" onclick={() => location.reload()}>{t('token.reload')}</Button>
                    </Stack>
                  </Stack>
                </CardBody>
              </Card>
            </TabContent>

            <TabContent ref="search">
              <Card>
                <CardBody>
                  <Stack gap="md">
                    <Text color="neutral">
                      {t('search.intro')}
                    </Text>
                    <TextInput
                      value={s.query}
                      placeholder={t('search.placeholder')}
                      oninput={(e) => {
                        s.query = e.target.value
                        clearTimeout(s._debounce)
                        s._debounce = setTimeout(() => runSearch(s), 250)
                      }}
                    />
                    {s.searching && <Text color="neutral">{t('search.searching')}</Text>}
                    {s.searchError && <Alert color="error">{t('errorPrefix')}{s.searchError}</Alert>}
                    {s.results !== null && s.results.length === 0 && !s.searching && (
                      <Text color="neutral">{tf('search.noResults', { query: s.query })}</Text>
                    )}
                    {searchRows}
                  </Stack>
                </CardBody>
              </Card>
            </TabContent>

            <TabContent ref="installed">
              <Stack gap="md">
                {/* Guía persistente del paso manual de carga: sin este import los
                    @font-face existen pero la app no los carga. */}
                {s.installed.length > 0 && (
                  <Alert color="info">
                    <Text as="span">{t('installed.banner')}</Text>
                    <code className={importCode}>import './{s.fontsCssRel}'</code>
                  </Alert>
                )}
                <Card>
                  <CardBody>
                    <Stack gap="md">
                      {s.installedLoading && <Alert color="info">{t('installed.loading')}</Alert>}
                      {s.installedError && <Alert color="error">{t('errorPrefix')}{s.installedError}</Alert>}
                      {!s.installedLoading && !s.installedError && s.installed.length === 0 && (
                        <Text color="neutral">
                          {t('installed.empty')}
                        </Text>
                      )}
                      {installedRows}
                    </Stack>
                  </CardBody>
                </Card>
              </Stack>
            </TabContent>
          </Tabs>
        )}

        {s.previewCss && m('style', s.previewCss)}
      </Stack>
    )
  },
}

export default page
