import m from 'mithril'
import { css } from '../../../styled-system/css'
import {
  Stack, Title, Text, Button, Card, CardBody, TextInput, Alert, Block,
  Tag, Tabs, Tab, TabContent, Loading, List, ListRow, ListCol,
  Select, Checkbox, Textarea,
} from '../../../src/index.js'
import { t, loadPageI18n } from '../../i18n/index.js'
import { schemaFor, PANDA_PLUGIN_ID } from '../../postcss-schemas'

/**
 * Página Postcss — plugins de PostCSS por paquetes npm (modelo fonts).
 *
 * Flujo: el listado OFICIAL de postcss.org/docs/postcss-plugins es el
 * catálogo; "Install" ejecuta `bun add {paquete}` y el plugin queda
 * DISPONIBLE (node_modules). La viñeta "Configure" gestiona el PIPELINE del
 * build css: qué plugins corren y con qué opciones — se persiste en
 * {raiz}/postcss.json (fuente de verdad del editor; que el build lea ese
 * archivo es la fase posterior, loader data-driven).
 *
 * El editor de opciones se genera del esquema curado (postcss-schemas.ts);
 * plugins sin esquema → editor JSON libre.
 *
 * API:
 *   GET  /api/postcss/catalog?q=   catálogo oficial (proxy postcss.org)
 *   GET  /api/postcss/available    plugins del catálogo en node_modules
 *   POST /api/postcss/install      bun add {paquete npm resuelto}
 *   POST /api/postcss/remove       bun remove {paquete}
 *   GET  /api/postcss/config       pipeline ({raiz}/postcss.json)
 *   POST /api/postcss/config       escribe el pipeline
 */

// ── utilidades css() de la página ────────────────────────────────────────────
const pluginName = css({
  fontFamily: 'monospace',
  fontSize: '0.8125rem',
})

const pluginMeta = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '0.375rem',
  marginTop: '0.25rem',
})

const pluginDescription = css({
  marginTop: '0.25rem',
})

const pluginLink = css({
  fontSize: '0.75rem',
  opacity: 0.7,
})

const categoryTitle = css({
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  fontSize: '0.75rem',
  opacity: 0.7,
  marginTop: '0.75rem',
  marginBottom: '0.25rem',
})

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

const noteText = css({
  fontSize: '0.75rem',
  opacity: 0.7,
})

/** t() con interpolación: tf('a.b', { x }) reemplaza {x} en la traducción. */
function tf(path, vars) {
  return t(path).replace(/\{(\w+)\}/g, (_, k) => (vars && vars[k] !== undefined ? vars[k] : `{${k}}`))
}

// ── estado / acciones: catálogo y available (viñetas install/available) ──────
function runCatalogSearch(s) {
  const q = s.query.trim()
  const seq = ++s.searchSeq
  s.searching = true
  s.searchError = null
  fetch('/api/postcss/catalog?q=' + encodeURIComponent(q))
    .then((r) => r.json())
    .then((d) => {
      if (seq !== s.searchSeq) return
      s.searching = false
      if (d.ok) s.categories = d.categories || []
      else s.searchError = d.error || 'Catalog failed'
      m.redraw()
    })
    .catch((e) => {
      if (seq !== s.searchSeq) return
      s.searching = false
      s.searchError = String(e)
      m.redraw()
    })
}

function installPlugin(s, p) {
  s.installBusy = p.name
  s.installMsg = null
  s.installError = null
  fetch('/api/postcss/install', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: p.name }),
  })
    .then((r) => r.json())
    .then((d) => {
      s.installBusy = null
      if (d.ok) {
        s.installMsg = { name: d.name, pkg: d.pkg }
        s.installed = { ...(s.installed || {}), [d.pkg]: true, [d.name]: true }
        loadAvailable(s)
      } else {
        s.installError = d.error || 'Install failed'
      }
      m.redraw()
    })
    .catch((e) => {
      s.installBusy = null
      s.installError = String(e)
      m.redraw()
    })
}

function loadAvailable(s) {
  s.availableLoading = true
  s.availableError = null
  fetch('/api/postcss/available')
    .then((r) => r.json())
    .then((d) => {
      s.availableLoading = false
      if (d.ok) {
        s.available = d.available || []
        s.installed = {}
        for (const p of s.available) {
          s.installed[p.npm] = true
          s.installed[p.name] = true
        }
      } else {
        s.availableError = d.error || 'Failed to load available plugins'
      }
      m.redraw()
    })
    .catch((e) => {
      s.availableLoading = false
      s.availableError = String(e)
      m.redraw()
    })
}

function removePlugin(s, p) {
  s.removeBusy = p.pkg || p.name
  s.removeError = null
  s.removeMsg = null
  fetch('/api/postcss/remove', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pkg: p.pkg || p.name }),
  })
    .then((r) => r.json())
    .then((d) => {
      s.removeBusy = null
      if (d.ok) {
        s.removeMsg = tf('available.removed', { pkg: d.pkg })
        loadAvailable(s)
      } else {
        s.removeError = d.error || 'Remove failed'
      }
      m.redraw()
    })
    .catch((e) => {
      s.removeBusy = null
      s.removeError = String(e)
      m.redraw()
    })
}

// ── estado / acciones: pipeline config (viñeta configure) ────────────────────
function loadConfig(s) {
  s.configLoading = true
  s.configError = null
  fetch('/api/postcss/config')
    .then((r) => r.json())
    .then((d) => {
      s.configLoading = false
      if (d.ok) {
        s.configPath = d.path
        s.buildPath = d.buildPath
        s.hasConfig = !!d.hasConfig
        // Copia editable: plugins [{ id, enabled, options }] (panda base
        // siempre primero) + build { entry, output } + drafts JSON.
        s.plugins = (d.plugins || []).map((pl) => ({
          id: pl.id,
          enabled: pl.enabled !== false,
          options: { ...(pl.options || {}) },
        }))
        s.build = { entry: d.build?.entry || '', output: d.build?.output || '' }
        s.jsonDrafts = {}
      } else {
        s.configError = d.error || 'Failed to load pipeline config'
      }
      m.redraw()
    })
    .catch((e) => {
      s.configLoading = false
      s.configError = String(e)
      m.redraw()
    })
}

/** Añade un plugin instalado (available) al pipeline local. */
function addToPipeline(s, p) {
  const id = p.pkg || p.name
  if (s.plugins.some((x) => x.id === id)) return
  s.plugins.push({ id, enabled: true, options: {} })
  s.pickOpen = false
  m.redraw()
}

/** Quita un plugin del pipeline local (el de Panda es base, no se quita). */
function removeFromPipeline(s, id) {
  if (id === PANDA_PLUGIN_ID) return
  s.plugins = s.plugins.filter((x) => x.id !== id)
  m.redraw()
}

/** Opciones editables del esquema; null si el plugin no tiene esquema curado. */
function editableFor(id) {
  const schema = schemaFor(id)
  return schema ? schema.options.filter((o) => o.editable !== false) : null
}

/** Notas (opciones función) del esquema del plugin. */
function notesFor(id) {
  return schemaFor(id)?.notes || []
}

/** Convierte el draft JSON de una opción a su valor real; null si inválido. */
function parseJsonDraft(s, id, key) {
  const raw = s.jsonDrafts[id]?.[key]
  if (raw === undefined) return { ok: true, value: undefined }
  try {
    return { ok: true, value: JSON.parse(raw) }
  } catch (e) {
    return { ok: false, error: String(e instanceof Error ? e.message : e) }
  }
}

/** Valida/parsea los drafts JSON antes de guardar. Devuelve error o null. */
function jsonDraftError(s) {
  for (const id of Object.keys(s.jsonDrafts || {})) {
    for (const key of Object.keys(s.jsonDrafts[id])) {
      const label = key === '__all__' ? 'options' : key
      const r = parseJsonDraft(s, id, key)
      if (!r.ok) {
        return tf('configure.invalidJson', { key: label, error: r.error })
      }
    }
  }
  return null
}

function saveConfig(s) {
  const draftErr = jsonDraftError(s)
  if (draftErr) {
    s.configError = draftErr
    return
  }
  s.savingConfig = true
  s.savedConfig = false
  s.configError = null
  // Materializa drafts JSON válidos en options.
  const plugins = s.plugins.map((pl) => {
    const options = { ...pl.options }
    const drafts = s.jsonDrafts?.[pl.id] || {}
    // El draft __all__ (JSON libre de plugins sin esquema) reemplaza options.
    if (drafts.__all__ !== undefined) {
      const r = parseJsonDraft(s, pl.id, '__all__')
      if (r.ok && r.value && typeof r.value === 'object' && !Array.isArray(r.value)) {
        return { id: pl.id, enabled: pl.enabled, options: r.value }
      }
      return { id: pl.id, enabled: pl.enabled, options }
    }
    for (const key of Object.keys(drafts)) {
      const r = parseJsonDraft(s, pl.id, key)
      if (r.ok && r.value !== undefined) options[key] = r.value
    }
    return { id: pl.id, enabled: pl.enabled, options }
  })
  fetch('/api/postcss/config', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      plugins,
      build: { entry: s.build.entry, output: s.build.output },
    }),
  })
    .then((r) => r.json())
    .then((d) => {
      s.savingConfig = false
      if (d.ok) {
        s.savedConfig = true
        s.configPath = d.path
        s.buildPath = d.buildPath
        s.jsonDrafts = {}
        loadConfig(s) // recarga con lo persistido (options normalizadas)
      } else {
        s.configError = d.error || 'Save failed'
      }
      m.redraw()
    })
    .catch((e) => {
      s.savingConfig = false
      s.configError = String(e)
      m.redraw()
    })
}

/** Dispara el rebuild postcss-aware del proyecto (POST /api/rebuild). */
function rebuild(s) {
  s.rebuilding = true
  s.rebuildMsg = null
  s.rebuildError = null
  fetch('/api/rebuild', { method: 'POST' })
    .then((r) => r.json())
    .then((d) => {
      s.rebuilding = false
      if (d.ok) {
        s.rebuildMsg = d.mode === 'postcss'
          ? `postcss → ${s.build.output} ✓`
          : 'Rebuilt (codegen + cssgen) ✓'
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

/** Fija el valor de una opción (sin draft): string/number/boolean/enum/array. */
function setOption(s, pl, key, value) {
  pl.options[key] = value
  // Si había un draft JSON de esta key, se descarta (edición tipada manda).
  if (s.jsonDrafts?.[pl.id]) delete s.jsonDrafts[pl.id][key]
}

// ── helpers de render: editor de opciones ────────────────────────────────────
/** Select de enum: el value de <option> es el ÍNDICE (conserva el tipo real). */
function enumIndex(e, opts) {
  return opts.map((o) => o.value).findIndex((v) => String(v) === String(e.target.value))
}

/** Editor de una opción según su tipo (llama setOption al cambiar). */
function optionEditor(s, pl, opt) {
  const current = pl.options[opt.key]
  const { type, key, placeholder } = opt

  if (type === 'boolean') {
    return (
      <Checkbox
        size="md"
        aria-label={opt.key}
        checked={current === true}
        onchange={(e) => setOption(s, pl, key, !!e.target.checked)}
      />
    )
  }

  if (type === 'enum') {
    const opts = opt.enum || []
    const idx = opts.findIndex((o) => String(o.value) === String(current))
    return (
      <Select
        size="md"
        value={idx === -1 ? '' : String(idx)}
        onchange={(e) => {
          const i = Number(e.target.value)
          if (opts[i]) setOption(s, pl, key, opts[i].value)
        }}
      >
        {current === undefined && <option value="">{t('configure.enumDefault')}</option>}
        {opts.map((o, i) => (
          <option key={String(o.value) + i} value={String(i)}>{o.label}</option>
        ))}
      </Select>
    )
  }

  if (type === 'number') {
    return (
      <TextInput
        size="md"
        type="number"
        value={current === undefined ? '' : String(current)}
        placeholder={placeholder || (opt.default !== undefined ? String(opt.default) : '')}
        oninput={(e) => {
          const v = e.target.value
          setOption(s, pl, key, v === '' ? undefined : Number(v))
        }}
      />
    )
  }

  if (type === 'array') {
    const arr = Array.isArray(current) ? current : []
    return (
      <Stack gap="xs">
        {arr.map((item, i) => (
          <Stack key={i} direction="row" gap="sm">
            <TextInput
              size="md"
              value={String(item)}
              oninput={(e) => {
                const next = arr.slice()
                next[i] = e.target.value
                setOption(s, pl, key, next)
              }}
            />
            <Button
              size="sm"
              variant="ghost"
              square
              aria-label={t('configure.removeItem')}
              onclick={() => {
                const next = arr.slice()
                next.splice(i, 1)
                setOption(s, pl, key, next)
              }}
            >
              ×
            </Button>
          </Stack>
        ))}
        <div>
          <Button size="sm" variant="outline" onclick={() => setOption(s, pl, key, [...arr, ''])}>
            + {t('configure.addItem')}
          </Button>
        </div>
      </Stack>
    )
  }

  if (type === 'json') {
    const draft = s.jsonDrafts?.[pl.id]?.[key]
    const text = draft !== undefined
      ? draft
      : current === undefined
        ? ''
        : JSON.stringify(current, null, 2)
    return (
      <div>
        <Textarea
          rows={4}
          value={text}
          placeholder="{}"
          oninput={(e) => {
            s.jsonDrafts = s.jsonDrafts || {}
            s.jsonDrafts[pl.id] = s.jsonDrafts[pl.id] || {}
            s.jsonDrafts[pl.id][key] = e.target.value
          }}
        />
        <Text color="neutral" size="sm" className={noteText}>{t('configure.noSchema')}</Text>
      </div>
    )
  }

  // string y regex: input de texto plano.
  return (
    <TextInput
      size="md"
      value={current === undefined ? '' : String(current)}
      placeholder={placeholder || (opt.default !== undefined ? String(opt.default) : '')}
      oninput={(e) => setOption(s, pl, key, e.target.value)}
    />
  )
}

/** Cuerpo del editor de un plugin: filas de opciones del esquema (o JSON libre). */
function pluginEditor(s, pl) {
  const schema = schemaFor(pl.id)
  const editables = editableFor(pl.id)

  if (schema && editables && editables.length > 0) {
    return (
      <Stack gap="sm">
        {editables.map((opt) => (
          <div key={opt.key} className={optionRow}>
            <Stack gap="0">
              <Text weight="bold" size="sm" className={css({ fontFamily: 'monospace', fontSize: '0.8125rem' })}>
                {opt.key}
              </Text>
              {opt.description && (
                <Text color="neutral" size="sm" className={optionHelp}>{opt.description}</Text>
              )}
            </Stack>
            <div>{optionEditor(s, pl, opt)}</div>
          </div>
        ))}
        {notesFor(pl.id).length > 0 && (
          <Stack gap="0">
            {notesFor(pl.id).map((n, i) => (
              <Text key={i} color="neutral" size="sm" className={noteText}>{n}</Text>
            ))}
          </Stack>
        )}
      </Stack>
    )
  }

  // Sin esquema: editor JSON libre de TODAS las opciones.
  const draft = s.jsonDrafts?.[pl.id]?.__all__
  const text = draft !== undefined
    ? draft
    : Object.keys(pl.options).length === 0
      ? ''
      : JSON.stringify(pl.options, null, 2)
  return (
    <div>
      <Text color="neutral" size="sm">{t('configure.noSchema')}</Text>
      <Textarea
        rows={6}
        value={text}
        placeholder='{ "option": "value" }'
        oninput={(e) => {
          s.jsonDrafts = s.jsonDrafts || {}
          s.jsonDrafts[pl.id] = s.jsonDrafts[pl.id] || {}
          s.jsonDrafts[pl.id].__all__ = e.target.value
        }}
      />
    </div>
  )
}

/** Fila de la viñeta Configure ("Añadir desde Available"). */
function availableRow(s, p) {
  const id = p.pkg || p.name
  return (
    <ListRow>
      <ListCol grow>{pluginContent(p)}</ListCol>
      <Button size="sm" color="primary" onclick={() => addToPipeline(s, p)}>
        {t('available.addToPipeline')}
      </Button>
    </ListRow>
  )
}

// ── filas compartidas (viñetas install/available) ────────────────────────────
/** Contenido de una fila de plugin: nombre + meta + descripción. */
function pluginContent(p) {
  return (
    <div className={css({ minWidth: 0 })}>
      <Text weight="bold" className={pluginName}>{p.name}</Text>
      {p.npm !== p.name && (
        <div className={pluginMeta}>
          <Tag size="md" variant="ghost">{tf('available.npm', { pkg: p.npm })}</Tag>
        </div>
      )}
      {p.url && (
        <div className={pluginMeta}>
          <a href={p.url} target="_blank" rel="noreferrer" className={pluginLink}>
            {t('install.seeMore')}
          </a>
        </div>
      )}
      <Text color="neutral" size="sm" className={pluginDescription}>
        {p.description}
      </Text>
    </div>
  )
}

/** Botón Install (o Tag installed) al lado derecho de la fila. */
function pluginAction(s, p) {
  const installed = !!(s.installed[p.npm] || s.installed[p.name])
  if (installed) return <Tag size="md" variant="success">{t('install.installed')}</Tag>
  return (
    <Button
      size="sm"
      color="primary"
      disabled={s.installBusy !== null}
      onclick={() => installPlugin(s, p)}
    >
      {s.installBusy === p.name ? t('install.installing') : t('install.install')}
    </Button>
  )
}

/** Fila de plugin de catálogo (ListRow con acción a la derecha). */
function pluginRow(s, p) {
  return (
    <ListRow>
      <ListCol grow>{pluginContent(p)}</ListCol>
      {pluginAction(s, p)}
    </ListRow>
  )
}

const page = {
  oninit(vnode) {
    loadPageI18n('postcss')
    const s = vnode.state
    s.loading = true
    s.error = null
    s.categories = null
    s.query = ''
    s.searching = false
    s.searchSeq = 0
    s.installed = {}
    s.available = []
    s.availableLoading = false
    s.installBusy = null
    s.installMsg = null
    s.installError = null
    s.removeBusy = null
    s.removeMsg = null
    s.removeError = null
    // pipeline config
    s.configLoading = false
    s.configError = null
    s.configPath = null
    s.buildPath = null
    s.hasConfig = false
    s.plugins = []
    s.build = { entry: 'pum/index.css', output: 'styled-system/styles.css' }
    s.jsonDrafts = {}
    s.savingConfig = false
    s.savedConfig = false
    s.rebuilding = false
    s.rebuildMsg = null
    s.rebuildError = null
    s.pickOpen = false

    // Carga inicial: catálogo + available + pipeline en paralelo.
    fetch('/api/postcss/catalog?q=')
      .then((r) => r.json())
      .then((d) => {
        s.loading = false
        if (d.ok) s.categories = d.categories || []
        else s.error = d.error || 'Catalog failed'
        m.redraw()
      })
      .catch((e) => {
        s.loading = false
        s.error = String(e)
        m.redraw()
      })
    loadAvailable(s)
    loadConfig(s)
  },

  view(vnode) {
    const s = vnode.state
    const pickable = s.pickOpen
      ? s.available.filter((p) => !s.plugins.some((x) => x.id === (p.pkg || p.name)))
      : []

    return (
      <Stack gap="lg">
        <Title as="h1" size="2">{t('title')}</Title>
        <Text color="neutral">{t('intro')}</Text>

        {s.error && <Alert color="error">{s.error}</Alert>}

        {s.loading && (
          <Stack align="center" gap="sm">
            <Loading variant="spinner" size="lg" />
            <Text color="neutral" size="sm">{t('loadingCatalog')}</Text>
          </Stack>
        )}

        {!s.loading && !s.error && (
          <Tabs boxed defaultActive="install">
            <Tab ref="install">{t('tabs.install')}</Tab>
            <Tab ref="available">{t('tabs.available')}</Tab>
            <Tab ref="configure">{t('tabs.configure')}</Tab>

            <TabContent ref="install">
              <Card>
                <CardBody>
                  <Stack gap="md">
                    <Text color="neutral">{t('install.intro')}</Text>
                    <TextInput
                      value={s.query}
                      placeholder={t('install.placeholder')}
                      oninput={(e) => {
                        s.query = e.target.value
                        clearTimeout(s._debounce)
                        s._debounce = setTimeout(() => runCatalogSearch(s), 250)
                      }}
                    />
                    {s.searchError && <Alert color="error">{t('errorPrefix')}{s.searchError}</Alert>}
                    {s.installError && <Alert color="error">{t('errorPrefix')}{s.installError}</Alert>}
                    {s.installMsg && (
                      <Alert color="success">{tf('install.installedHint', { name: s.installMsg.name, pkg: s.installMsg.pkg })}</Alert>
                    )}
                    {s.searching && (
                      <Stack align="center" gap="sm">
                        <Loading variant="spinner" size="md" />
                        <Text color="neutral" size="sm">{t('loadingCatalog')}</Text>
                      </Stack>
                    )}
                    {!s.searching && s.categories && s.categories.length === 0 && (
                      <Text color="neutral">{tf('install.noResults', { query: s.query })}</Text>
                    )}
                    {!s.searching && s.categories && s.categories.length > 0 && (
                      <div>
                        {s.categories.map((cat) => (
                          <div key={cat.id}>
                            <div className={categoryTitle}>{cat.name}</div>
                            <List data={cat.plugins} render={(p) => pluginRow(s, p)} />
                          </div>
                        ))}
                      </div>
                    )}
                  </Stack>
                </CardBody>
              </Card>
            </TabContent>

            <TabContent ref="available">
              <Card>
                <CardBody>
                  <Stack gap="md">
                    <Text color="neutral">{t('available.intro')}</Text>
                    {s.availableLoading && (
                      <Stack align="center" gap="sm">
                        <Loading variant="spinner" size="md" />
                        <Text color="neutral" size="sm">{t('available.loading')}</Text>
                      </Stack>
                    )}
                    {s.availableError && <Alert color="error">{t('errorPrefix')}{s.availableError}</Alert>}
                    {s.removeError && <Alert color="error">{t('errorPrefix')}{s.removeError}</Alert>}
                    {s.removeMsg && <Alert color="success">{s.removeMsg}</Alert>}
                    {!s.availableLoading && !s.availableError && s.available.length === 0 && (
                      <Text color="neutral">{t('available.empty')}</Text>
                    )}
                    {!s.availableLoading && s.available.length > 0 && (
                      <List
                        data={s.available}
                        empty={<Text color="neutral">{t('available.empty')}</Text>}
                        render={(p) => (
                          <ListRow>
                            <ListCol grow>{pluginContent(p)}</ListCol>
                            <Stack direction="row" gap="sm" align="center">
                              {s.plugins.some((x) => x.id === (p.pkg || p.name)) && (
                                <Tag size="md" variant="success">{t('available.inPipeline')}</Tag>
                              )}
                              <Button
                                size="sm"
                                variant="ghost"
                                disabled={s.removeBusy !== null}
                                onclick={() => removePlugin(s, p)}
                              >
                                {s.removeBusy === (p.pkg || p.name) ? t('available.removing') : t('available.remove')}
                              </Button>
                            </Stack>
                          </ListRow>
                        )}
                      />
                    )}
                  </Stack>
                </CardBody>
              </Card>
            </TabContent>

            <TabContent ref="configure">
              <Card>
                <CardBody>
                  <Stack gap="md">
                    <Text color="neutral">
                      {t('configure.intro')} {s.configPath && <code>{s.configPath}</code>}
                      {s.buildPath && s.buildPath !== s.configPath ? ` + ${s.buildPath}` : ''}.
                    </Text>
                    {!s.hasConfig && !s.configLoading && (
                      <Alert color="info">{t('configure.noConfigYet')}</Alert>
                    )}
                    {s.configLoading && (
                      <Stack align="center" gap="sm">
                        <Loading variant="spinner" size="md" />
                        <Text color="neutral" size="sm">{t('available.loading')}</Text>
                      </Stack>
                    )}
                    {s.configError && <Alert color="error">{t('errorPrefix')}{s.configError}</Alert>}
                    {s.savedConfig && !s.savingConfig && <Alert color="success">{t('savedAndRebuilt')}</Alert>}
                    {s.rebuildMsg && !s.rebuilding && <Alert color="success">{s.rebuildMsg}</Alert>}
                    {s.rebuildError && !s.rebuilding && <Alert color="error">{t('errorPrefix')}{s.rebuildError}</Alert>}

                    {!s.configLoading && (
                      <Stack gap="md">
                        {s.plugins.length === 0 && (
                          <Text color="neutral">{t('configure.empty')}</Text>
                        )}

                        <div>
                          {s.plugins.map((pl) => (
                            <Card key={pl.id}>
                              <CardBody>
                                <Stack gap="md">
                                  <Stack direction="row" align="center" className={css({ justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' })}>
                                    <Stack direction="row" gap="sm" align="center">
                                      <Text weight="bold" className={pluginName}>{pl.id}</Text>
                                      {pl.id === PANDA_PLUGIN_ID
                                        ? <Tag size="md" variant="info">{t('configure.pandaBase')}</Tag>
                                        : pl.enabled
                                          ? <Tag size="md" variant="success">{t('configure.enabled')}</Tag>
                                          : <Tag size="md" variant="ghost">{t('configure.disabled')}</Tag>}
                                      {!schemaFor(pl.id) && (
                                        <Tag size="md" variant="ghost">{t('configure.noSchema')}</Tag>
                                      )}
                                    </Stack>
                                    <Stack direction="row" gap="sm" align="center">
                                      {pl.id !== PANDA_PLUGIN_ID && (
                                        <>
                                          <Checkbox
                                            checked={pl.enabled}
                                            onchange={(e) => { pl.enabled = !!e.target.checked }}
                                          >
                                            {t('configure.enabled')}
                                          </Checkbox>
                                          <Button
                                            size="sm"
                                            variant="ghost"
                                            onclick={() => removeFromPipeline(s, pl.id)}
                                          >
                                            {t('configure.removeFromPipeline')}
                                          </Button>
                                        </>
                                      )}
                                    </Stack>
                                  </Stack>
                                  {pluginEditor(s, pl)}
                                </Stack>
                              </CardBody>
                            </Card>
                          ))}
                        </div>

                        {s.available.length > 0 && (
                          <div>
                            <Button variant="outline" size="sm" onclick={() => { s.pickOpen = !s.pickOpen }}>
                              {t('configure.addFromAvailable')}
                            </Button>
                            {s.pickOpen && (
                              <Stack gap="sm" className={css({ marginTop: '0.5rem' })}>
                                <Text color="neutral" size="sm">{t('configure.addFromAvailableHint')}</Text>
                                <List
                                  data={pickable}
                                  empty={<Text color="neutral">{t('available.empty')}</Text>}
                                  render={(p) => availableRow(s, p)}
                                />
                              </Stack>
                            )}
                          </div>
                        )}

                        {/* Build: entry + output del pipeline postcss */}
                        <Card>
                          <CardBody>
                            <Stack gap="md">
                              <Text weight="bold">{t('configure.buildTitle')}</Text>
                              <Text color="neutral" size="sm">{t('configure.buildHint')}</Text>
                              <div className={optionRow}>
                                <Text weight="bold" size="sm">{t('configure.entry')}</Text>
                                <TextInput
                                  size="md"
                                  value={s.build.entry}
                                  placeholder="pum/index.css"
                                  oninput={(e) => { s.build.entry = e.target.value }}
                                />
                              </div>
                              <div className={optionRow}>
                                <Text weight="bold" size="sm">{t('configure.output')}</Text>
                                <TextInput
                                  size="md"
                                  value={s.build.output}
                                  placeholder="styled-system/styles.css"
                                  oninput={(e) => { s.build.output = e.target.value }}
                                />
                              </div>
                            </Stack>
                          </CardBody>
                        </Card>

                        <Block spacing="sm" />
                        <Stack direction="row" gap="sm" align="center">
                          <Button color="primary" disabled={s.savingConfig} onclick={() => saveConfig(s)}>
                            {s.savingConfig ? t('configure.saving') : t('configure.save')}
                          </Button>
                          <Button variant="outline" disabled={s.rebuilding} onclick={() => rebuild(s)}>
                            {s.rebuilding ? t('configure.rebuilding') : t('configure.rebuild')}
                          </Button>
                          <Button variant="ghost" onclick={() => location.reload()}>{t('configure.reload')}</Button>
                        </Stack>
                      </Stack>
                    )}
                  </Stack>
                </CardBody>
              </Card>
            </TabContent>
          </Tabs>
        )}
      </Stack>
    )
  },
}

export default page
