import m from 'mithril'
import { css } from '../../../styled-system/css'
import {
  Stack, Title, Text, Button, Card, CardBody, TextInput, Alert, Block,
  Columns, Column, Select, Checkbox, Tag, Tabs, Tab, TabContent,
} from '../../../src/index.js'
import { t, loadPageI18n } from '../../i18n/index.js'

/**
 * Página Fonts — tipografías del theme por paquetes npm (@fontsource).
 *
 * Flujo (sin paso intermedio de "instalar"): el catálogo de Fontsource sirve
 * para BUSCAR; "Add" ejecuta `bun add @fontsource/{id}` y la fuente queda
 * DISPONIBLE (node_modules); "Assign" es la única operación que CARGA la
 * fuente al sistema (token en fonts.ts + globalFontface → cssgen la compila
 * en styles.css). El CSS solo contiene familias asignadas y usadas.
 *
 * API:
 *   GET  /api/fonts/search?q=      catálogo (proxy Fontsource)
 *   POST /api/fonts/add            bun add @fontsource/{id}
 *   GET  /api/fonts/available      paquetes en node_modules + estado cargado
 *   POST /api/fonts/assign         token + faces (globalFontface) + rebuild
 *   POST /api/fonts/unassign       reset de tokens + quita del bloque
 *   POST /api/fonts/remove         bun remove @fontsource/{id}
 *   GET  /api/fonts/file/{id}/{f}  woff2 del paquete (preview local)
 */

// ── utilidades css() de la página ────────────────────────────────────────────
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

// Fila de resultado (búsqueda y disponibles): familia + tags + botones.
const resultRow = css({
  padding: '0.5rem 0',
})

// Línea de metadatos de un resultado (categoría, licencia, pesos…).
const resultMeta = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '0.375rem',
  marginTop: '0.125rem',
})

// Panel expandido de preview + opciones.
const previewPanel = css({
  border: '1px solid',
  borderColor: 'base-300',
  borderRadius: '0.5rem',
  padding: '0.75rem',
  marginTop: '0.5rem',
})

// Preview "Aa" y texto de muestra — familia por custom property.
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

/** Escapa una family para usarla como string CSS (comillas simples). */
function cssStr(v) {
  return String(v).replace(/\\/g, '\\\\').replace(/'/g, "\\'")
}

/** t() con interpolación: tf('a.b', { x }) reemplaza {x} en la traducción. */
function tf(path, vars) {
  return t(path).replace(/\{(\w+)\}/g, (_, k) => (vars && vars[k] !== undefined ? vars[k] : `{${k}}`))
}

/** URL CDN (jsDelivr npm) de un archivo de paquete — preview sin instalación. */
function cdnPackageFile(id, subset, weight, style) {
  return `https://cdn.jsdelivr.net/npm/@fontsource/${id}@latest/files/${id}-${subset}-${weight}-${style}.woff2`
}

// ── estado / acciones ────────────────────────────────────────────────────────
function reloadAvailable(s) {
  s.availableLoading = true
  s.availableError = null
  fetch('/api/fonts/available')
    .then((r) => r.json())
    .then((d) => {
      s.availableLoading = false
      if (d.ok) {
        s.available = d.available || []
        s.loaded = d.loaded || []
        s.wired = !!d.wired
        if (d.migrated && d.migrated.length) s.migrated = d.migrated
      } else {
        s.availableError = d.error || 'Failed to load available fonts'
      }
      m.redraw()
    })
    .catch((e) => {
      s.availableLoading = false
      s.availableError = String(e)
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
      if (seq !== s.searchSeq) return
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

// Expande un resultado de búsqueda: preview vía CDN (CORS abierto).
function expandResult(s, f) {
  if (s.expand === 's:' + f.id) {
    s.expand = null
    s.previewCss = ''
    return
  }
  s.expand = 's:' + f.id
  s.previewFamily = '"' + f.family + '", sans-serif'
  const w400 = f.weights.includes(400)
  const w = w400 ? 400 : f.weights[0]
  const subset = f.defSubset || (f.subsets && f.subsets[0]) || 'latin'
  s.previewCss = [
    "@font-face {",
    `  font-family: '${cssStr(f.family)}';`,
    '  font-style: normal;',
    '  font-display: swap;',
    `  font-weight: ${w};`,
    `  src: url('${cdnPackageFile(f.id, subset, w, 'normal')}') format('woff2');`,
    '}',
  ].join('\n')
}

// Expande una fuente disponible: preview con el woff2 local del paquete.
function expandAvailable(s, f) {
  const scopeKey = 'a:' + (f.variable ? 'v' : 's') + f.id
  if (s.expand === scopeKey) {
    s.expand = null
    s.previewCss = ''
    return
  }
  s.expand = scopeKey
  s.previewFamily = '"' + f.family + '", sans-serif'
  const subset = f.defSubset || 'latin'
  if (f.variable) {
    // Variable: un woff2 por subset×estilo que cubre todo el rango de pesos.
    s.previewCss = [
      "@font-face {",
      `  font-family: '${cssStr(f.family)}';`,
      '  font-style: normal;',
      '  font-display: swap;',
      '  font-weight: 100 900;',
      `  src: url('/api/fonts/file/${f.id}/${f.id}-${subset}-wght-normal.woff2?variable=1') format('woff2-variations');`,
      '}',
    ].join('\n')
    return
  }
  const w400 = f.weights.includes(400)
  const w = w400 ? 400 : f.weights[0]
  s.previewCss = [
    "@font-face {",
    `  font-family: '${cssStr(f.family)}';`,
    '  font-style: normal;',
    '  font-display: swap;',
    `  font-weight: ${w};`,
    `  src: url('/api/fonts/file/${f.id}/${f.id}-${subset}-${w}-normal.woff2') format('woff2');`,
    '}',
  ].join('\n')
}

// Preview compartido (se renderiza dentro del panel expandido).
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

/** Añade el paquete @fontsource/{id} (bun add) — queda disponible. */
function doAdd(s, f, variable) {
  if (variable) s.addingVarId = f.id
  else s.addingId = f.id
  s.addError = null
  s.addOk = null
  fetch('/api/fonts/add', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: f.id, variable: !!variable }),
  })
    .then((r) => r.json())
    .then((res) => {
      s.addingId = null
      s.addingVarId = null
      if (!res.ok) throw new Error(res.error || 'Add failed')
      s.addOk = { id: f.id, variable: !!variable, family: f.family }
      reloadAvailable(s)
      m.redraw()
    })
    .catch((e) => {
      s.addingId = null
      s.addingVarId = null
      s.addError = String(e)
      m.redraw()
    })
}

/** Abre/cierra el panel de asignación de una fuente disponible. */
function toggleAssign(s, f) {
  const key = (f.variable ? 'v' : 's') + f.id
  if (s.assignFor === key) {
    s.assignFor = null
    return
  }
  s.assignFor = key
  s.assignToken = Object.keys(s.fonts)[0] || 'sans'
  const w400 = f.weights.includes(400)
  const w700 = f.weights.includes(700)
  // Variable: un solo archivo cubre todos los pesos — no se seleccionan pesos.
  s.assignWeights = f.variable ? [] : (w400 ? (w700 ? [400, 700] : [400]) : (w700 ? [700] : [f.weights[0]]))
  s.assignItalic = false
  s.assignSubset = f.defSubset || 'latin'
  s.assignError = null
  s.assignOk = null
}

function toggleWeight(s, w) {
  s.assignWeights = s.assignWeights.includes(w)
    ? s.assignWeights.filter((x) => x !== w)
    : [...s.assignWeights, w].sort((a, b) => a - b)
}

/** Asigna la fuente a un token — la operación que la carga en el CSS. */
function doAssign(s, f) {
  s.assigningId = (f.variable ? 'v' : 's') + f.id
  s.assignError = null
  s.assignOk = null
  fetch('/api/fonts/assign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: f.id,
      variable: !!f.variable,
      token: s.assignToken,
      weights: f.variable ? undefined : s.assignWeights,
      styles: s.assignItalic ? ['normal', 'italic'] : ['normal'],
      subsets: [s.assignSubset],
    }),
  })
    .then((r) => r.json())
    .then((res) => {
      s.assigningId = null
      if (!res.ok) throw new Error(res.error || 'Assign failed')
      s.fonts[res.token] = res.value
      s.assignOk = tf('available.assignedOk', { family: res.family, token: res.token })
      reloadAvailable(s)
      m.redraw()
    })
    .catch((e) => {
      s.assigningId = null
      s.assignError = String(e)
      m.redraw()
    })
}

/** Desasigna: resetea tokens + quita la familia del bloque. */
function doUnassign(s, f) {
  s.unassigningId = f.id
  fetch('/api/fonts/unassign', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: f.id, variable: !!f.variable }),
  })
    .then((r) => r.json())
    .then((res) => {
      s.unassigningId = null
      if (!res.ok) throw new Error(res.error || 'Unassign failed')
      ;(res.resetTokens || []).forEach((tk) => {
        s.fonts[tk] = tk.includes('mono') ? 'monospace' : 'system-ui, sans-serif'
      })
      if (s.assignFor === (f.variable ? 'v' : 's') + f.id) s.assignFor = null
      reloadAvailable(s)
      m.redraw()
    })
    .catch((e) => {
      s.unassigningId = null
      s.availableError = String(e)
      m.redraw()
    })
}

/** Elimina el paquete (bun remove). */
function doRemove(s, f) {
  s.removingId = f.id
  fetch('/api/fonts/remove', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ id: f.id, variable: !!f.variable }),
  })
    .then((r) => r.json())
    .then((res) => {
      s.removingId = null
      if (!res.ok) throw new Error(res.error || 'Remove failed')
      ;(res.resetTokens || []).forEach((tk) => {
        s.fonts[tk] = tk.includes('mono') ? 'monospace' : 'system-ui, sans-serif'
      })
      if (s.assignFor === (f.variable ? 'v' : 's') + f.id) s.assignFor = null
      reloadAvailable(s)
      m.redraw()
    })
    .catch((e) => {
      s.removingId = null
      s.availableError = String(e)
      m.redraw()
    })
}

/** Añade un rol tipográfico nuevo a fonts.ts (p. ej. display2) + rebuild. */
function doAddRole(s) {
  const name = (s.newRoleName || '').trim()
  if (!/^[a-z0-9-]+$/.test(name)) {
    s.roleError = t('roles.invalid')
    return
  }
  if (s.fonts[name]) {
    s.roleError = tf('roles.exists', { name })
    return
  }
  const value = (s.newRoleValue || '').trim()
    || (name.includes('mono') ? 'monospace' : 'system-ui, sans-serif')
  s.roleBusy = true
  s.roleError = null
  s.roleMsg = null
  fetch('/api/theme', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fonts: s.fonts, fontAdd: { [name]: value } }),
  })
    .then((r) => r.json())
    .then(async (res) => {
      if (!res.ok) throw new Error(res.error || 'Add role failed')
      await fetch('/api/rebuild', { method: 'POST' })
      s.fonts[name] = value
      s.newRoleName = ''
      s.newRoleValue = ''
      s.roleBusy = false
      s.roleMsg = tf('roles.added', { name })
      m.redraw()
    })
    .catch((e) => {
      s.roleBusy = false
      s.roleError = String(e)
      m.redraw()
    })
}

/** Elimina un rol tipográfico de fonts.ts (prune del bloque incluido). */
function doRemoveRole(s, name) {
  if (Object.keys(s.fonts).length <= 1) return
  const fonts = { ...s.fonts }
  delete fonts[name]
  s.roleBusy = true
  s.roleError = null
  s.roleMsg = null
  fetch('/api/theme', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fonts, fontRemove: [name] }),
  })
    .then((r) => r.json())
    .then(async (res) => {
      if (!res.ok) throw new Error(res.error || 'Remove role failed')
      await fetch('/api/rebuild', { method: 'POST' })
      delete s.fonts[name]
      s.roleBusy = false
      reloadAvailable(s)
      m.redraw()
    })
    .catch((e) => {
      s.roleBusy = false
      s.roleError = String(e)
      m.redraw()
    })
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

    // búsqueda (catálogo)
    s.query = ''
    s.results = null
    s.searching = false
    s.searchError = null
    s.searchSeq = 0
    s.addingId = null
    s.addingVarId = null
    s.addError = null
    s.addOk = null

    // disponibles + cargadas
    s.available = []
    s.loaded = []
    s.availableLoading = true
    s.availableError = null
    s.wired = false
    s.migrated = null

    // preview / asignación
    s.expand = null
    s.previewCss = ''
    s.previewFamily = ''
    s.assignFor = null
    s.assignToken = ''
    s.assignWeights = []
    s.assignItalic = false
    s.assignSubset = ''
    s.assigningId = null
    s.assignError = null
    s.assignOk = null
    s.unassigningId = null
    s.removingId = null
    // roles tipográficos (pestaña Tipografías)
    s.newRoleName = ''
    s.newRoleValue = ''
    s.roleBusy = false
    s.roleError = null
    s.roleMsg = null

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

    reloadAvailable(s)
  },

  view(vnode) {
    const s = vnode.state
    const names = Object.keys(s.fonts)

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

    const scopeId = (f) => (f.variable ? 'v' : 's') + f.id
    const availStatic = new Set(s.available.filter((a) => !a.variable).map((a) => a.id))
    const availVar = new Set(s.available.filter((a) => a.variable).map((a) => a.id))
    const loadedByKey = Object.fromEntries(s.loaded.map((l) => [scopeId(l), l]))

    // Filas de resultados de búsqueda (array plano y keyed).
    const searchRows = (s.results || []).flatMap((f) => {
      const expanded = s.expand === 's:' + f.id
      return [
        <Columns key={'r-' + f.id} gap="sm" centered className={resultRow}>
          <Column>
            <Text weight="semibold" size="md">{f.family}</Text>
            <Text as="div" className={resultMeta}>
              {f.category && <Tag size="md">{f.category}</Tag>}
              {f.license && <Tag size="md">{f.license}</Tag>}
              {f.variable && <Tag size="md" variant="info">{t('search.variable')}</Tag>}
              {(availStatic.has(f.id) || availVar.has(f.id)) && <Tag size="md" variant="success">{t('search.available')}</Tag>}
              <Text as="span" size="sm" color="neutral">
                {tf('search.weightsCount', { count: f.weights.length, subsets: f.subsets.join(', ') })}
              </Text>
            </Text>
          </Column>
          <Column narrow>
            <Button variant="outline" size="sm" onclick={() => expandResult(s, f)}>
              {expanded ? t('search.close') : t('search.preview')}
            </Button>
          </Column>
          <Column narrow>
            <Stack direction="column" gap="sm" align="end">
              <Button
                color="primary"
                size="sm"
                disabled={s.addingId === f.id || availStatic.has(f.id)}
                onclick={() => doAdd(s, f, false)}
              >
                {availStatic.has(f.id)
                  ? t('search.added')
                  : (s.addingId === f.id ? t('search.adding') : t('search.add'))}
              </Button>
              {f.variable && (
                <Button
                  variant="outline"
                  size="sm"
                  disabled={s.addingVarId === f.id || availVar.has(f.id)}
                  onclick={() => doAdd(s, f, true)}
                >
                  {availVar.has(f.id)
                    ? t('search.addedVar')
                    : (s.addingVarId === f.id ? t('search.adding') : t('search.addVar'))}
                </Button>
              )}
            </Stack>
          </Column>
        </Columns>,
        expanded ? (
          <Block key={'p-' + f.id} spacing="sm" className={previewPanel}>
            <Stack gap="md">
              {previewBlock(s)}
              {s.addError && s.addOk === null && <Alert color="error">{t('errorPrefix')}{s.addError}</Alert>}
              {s.addOk && s.addOk.id === f.id && <Alert color="success">{tf('search.addedHint', { family: f.family })}</Alert>}
              <Text color="neutral" size="sm">{tf('search.addInfo', { pkg: '@fontsource/' + f.id })}</Text>
            </Stack>
          </Block>
        ) : null,
      ].filter(Boolean)
    })

    // Filas de fuentes disponibles (node_modules y @fontsource-variable).
    const availableRows = s.available.map((f) => {
      const key = scopeId(f)
      const loaded = loadedByKey[key]
      const expanded = s.expand === 'a:' + key
      const assignOpen = s.assignFor === key
      return [
        <Columns key={'a-' + key} gap="sm" centered className={resultRow}>
          <Column>
            <Text weight="semibold" size="md">{f.family}</Text>
            <Text as="div" className={resultMeta}>
              {f.license && <Tag size="md">{f.license}</Tag>}
              <Tag size="md" variant="info">{tf('available.version', { version: f.version })}</Tag>
              {f.variable && <Tag size="md" variant="info">{t('available.variable')}</Tag>}
              {loaded && (loaded.tokens || []).map((tk) => (
                <Tag key={tk} size="md" variant="success">{tf('available.usedBy', { token: tk })}</Tag>
              ))}
              <Text as="span" size="sm" color="neutral">
                {tf('search.weightsCount', { count: f.weights.length, subsets: f.subsets.join(', ') })}
              </Text>
            </Text>
          </Column>
          <Column narrow>
            <Button variant="outline" size="sm" onclick={() => expandAvailable(s, f)}>
              {expanded ? t('search.close') : t('search.preview')}
            </Button>
          </Column>
          {!loaded ? (
            <Column narrow>
              <Button color="primary" size="sm" onclick={() => toggleAssign(s, f)}>
                {assignOpen ? t('search.close') : t('available.assign')}
              </Button>
            </Column>
          ) : (
            <Column narrow>
              <Button
                variant="outline"
                size="sm"
                disabled={s.unassigningId === key}
                onclick={() => doUnassign(s, f)}
              >
                {s.unassigningId === key ? t('available.unassigning') : t('available.unassign')}
              </Button>
            </Column>
          )}
          <Column narrow>
            <Button
              variant="ghost"
              size="sm"
              disabled={s.removingId === key}
              onclick={() => doRemove(s, f)}
            >
              {s.removingId === key ? t('available.removing') : t('available.remove')}
            </Button>
          </Column>
        </Columns>,
        assignOpen ? (
          <Block key={'aa-' + key} spacing="sm" className={previewPanel}>
            <Stack gap="md">
              <Columns gap="sm" centered>
                <Column narrow>
                  <Text as="span" weight="semibold" size="sm">{t('available.assignToken')}</Text>
                </Column>
                <Column>
                  <Select size="sm" value={s.assignToken} onchange={(e) => { s.assignToken = e.target.value }}>
                    {names.map((tk) => m('option', { key: tk, value: tk }, tk))}
                  </Select>
                </Column>
              </Columns>
              {f.variable ? (
                <Text color="neutral" size="sm">{t('available.variableHint')}</Text>
              ) : (
                <Stack direction="row" gap="md">
                  {f.weights.map((w) => (
                    <label key={w} className={weightOption}>
                      <Checkbox size="sm" checked={s.assignWeights.includes(w)} onchange={() => toggleWeight(s, w)} />
                      <Text as="span" size="sm">{w}</Text>
                    </label>
                  ))}
                </Stack>
              )}
              {f.styles.includes('italic') && (
                <label className={weightOption}>
                  <Checkbox size="sm" checked={s.assignItalic} onchange={(e) => { s.assignItalic = e.target.checked }} />
                  <Text as="span" size="sm">{t('available.assignItalic')}</Text>
                </label>
              )}
              <Columns gap="sm" centered>
                <Column narrow>
                  <Text as="span" weight="semibold" size="sm">{t('available.assignSubset')}</Text>
                </Column>
                <Column>
                  <Select size="sm" value={s.assignSubset} onchange={(e) => { s.assignSubset = e.target.value }}>
                    {f.subsets.map((sub) => m('option', { key: sub, value: sub }, sub))}
                  </Select>
                </Column>
              </Columns>
              {s.assignError && <Alert color="error">{t('errorPrefix')}{s.assignError}</Alert>}
              {s.assignOk && <Alert color="success">{s.assignOk}</Alert>}
              <Stack direction="row" gap="sm" align="center">
                <Button
                  color="primary"
                  size="sm"
                  disabled={s.assigningId === key || (!f.variable && s.assignWeights.length === 0)}
                  onclick={() => doAssign(s, f)}
                >
                  {s.assigningId === key ? t('available.assigning') : t('available.assignBtn')}
                </Button>
                <Text color="neutral" size="sm">{t('available.assignHint')}</Text>
              </Stack>
            </Stack>
          </Block>
        ) : null,
        expanded ? (
          <Block key={'ap-' + key} spacing="sm" className={previewPanel}>
            {previewBlock(s)}
          </Block>
        ) : null,
      ].filter(Boolean)
    })


    return (
      <Stack gap="lg">
        <Title as="h1" size="2">{t('title')}</Title>
        <Text color="neutral">
          {t('introPre')} <code>styled-system/styles.css</code> {t('introMid')} <code>{s.themeRel}/fonts.ts</code>.
        </Text>

        {s.loading && <Alert color="info">{t('loadingTheme')}</Alert>}
        {s.error && <Alert color="error">{t('errorPrefix')}{s.error}</Alert>}
        {s.saved && !s.saving && <Alert color="success">{t('savedAndRebuilt')}</Alert>}
        {s.migrated && (
          <Alert color="info">{tf('available.migrated', { ids: s.migrated.join(', ') })}</Alert>
        )}

        {!s.loading && !s.error && (
          <Tabs boxed defaultActive="tokens">
            <Tab ref="tokens">{t('tabs.tokens')}</Tab>
            <Tab ref="search">{t('tabs.search')}</Tab>
            <Tab ref="available">{t('tabs.available')}</Tab>

            {/* Principal (sin título interior): editor de stacks del theme */}
            <TabContent ref="tokens">
              <Card>
                <CardBody>
                  <Stack gap="md">
                    {names.map((name) => (
                      <Columns key={name} gap="sm" centered>
                        <Column width={2}>
                          <Text weight="bold" className={tokenName}>{name}</Text>
                        </Column>
                        <Column>
                          <TextInput
                            value={s.fonts[name] || ''}
                            placeholder={t('token.placeholder')}
                            oninput={(e) => { s.fonts[name] = e.target.value }}
                          />
                        </Column>
                        <Column narrow>
                          <Button
                            variant="ghost"
                            size="sm"
                            square
                            disabled={names.length <= 1}
                            aria-label={tf('roles.removeLabel', { name })}
                            onclick={() => doRemoveRole(s, name)}
                          >
                            ×
                          </Button>
                        </Column>
                      </Columns>
                    ))}
                    <Block spacing="sm" />
                    <Stack direction="row" gap="sm" align="center">
                      <TextInput
                        size="sm"
                        value={s.newRoleName || ''}
                        placeholder={t('roles.namePlaceholder')}
                        oninput={(e) => { s.newRoleName = e.target.value }}
                      />
                      <TextInput
                        size="sm"
                        value={s.newRoleValue || ''}
                        placeholder={t('roles.valuePlaceholder')}
                        oninput={(e) => { s.newRoleValue = e.target.value }}
                      />
                      <Button variant="outline" size="sm" disabled={s.roleBusy} onclick={() => doAddRole(s)}>
                        {s.roleBusy ? t('roles.adding') : t('roles.add')}
                      </Button>
                    </Stack>
                    {s.roleError && <Alert color="error">{s.roleError}</Alert>}
                    {s.roleMsg && <Alert color="success">{s.roleMsg}</Alert>}
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
                    <Text color="neutral">{t('search.intro')}</Text>
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

            <TabContent ref="available">
              <Stack gap="md">
                {s.wired && <Alert color="success">{t('available.wired')}</Alert>}
                <Card>
                  <CardBody>
                    <Stack gap="md">
                      <Text color="neutral">{t('available.intro')}</Text>
                      {s.availableLoading && <Alert color="info">{t('available.loading')}</Alert>}
                      {s.availableError && <Alert color="error">{t('errorPrefix')}{s.availableError}</Alert>}
                      {!s.availableLoading && !s.availableError && s.available.length === 0 && (
                        <Text color="neutral">{t('available.empty')}</Text>
                      )}
                      {availableRows}
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
