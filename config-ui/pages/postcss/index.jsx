import m from 'mithril'
import { css } from '../../../styled-system/css'
import {
  Stack, Title, Text, Button, Card, CardBody, TextInput, Alert, Block,
  Tag, Tabs, Tab, TabContent, Loading, List, ListRow, ListCol, ListDragHandle,
  Select, Checkbox, Textarea,
  Collapse, CollapseTitle, CollapseContent,
} from '../../../src/index.js'
import { t, loadPageI18n } from '../../i18n/index.js'
import { schemaFor, PANDA_PLUGIN_ID } from '../../postcss-schemas'

/**
 * Postcss page — PostCSS plugins as npm packages (fonts model).
 *
 * Flow: the OFFICIAL listing of postcss.org/docs/postcss-plugins is the
 * catalog; "Install" runs `bun add {package}` and the plugin becomes
 * AVAILABLE (node_modules). The "Configure" tab manages the PIPELINE of the
 * build css: which plugins run and with which options — persisted in
 * {root}/postcss.json (the editor's source of truth; having the build read
 * that file is the later phase, a data-driven loader).
 *
 * The options editor is generated from the curated schema (postcss-schemas.ts);
 * plugins without a schema → free JSON editor.
 *
 * API:
 *   GET  /api/postcss/catalog?q=   official catalog (postcss.org proxy)
 *   GET  /api/postcss/available    catalog plugins in node_modules
 *   POST /api/postcss/install      bun add {resolved npm package}
 *   POST /api/postcss/remove       bun remove {package}
 *   GET  /api/postcss/config       pipeline ({root}/postcss.json)
 *   POST /api/postcss/config       writes the pipeline
 */

// ── css() utilities of the page ────────────────────────────────────────────
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

/** t() with interpolation: tf('a.b', { x }) replaces {x} in the translation. */
function tf(path, vars) {
  return t(path).replace(/\{(\w+)\}/g, (_, k) => (vars && vars[k] !== undefined ? vars[k] : `{${k}}`))
}

/** Human-readable size: 512 B · 170.4 KB · 1.2 MB (1 decimal, rounded up). */
function formatBytes(n) {
  if (typeof n !== 'number' || !isFinite(n) || n < 0) return ''
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / (1024 * 1024)).toFixed(2)} MB`
}

/**
 * Output CSS size text from the server stat
 * (`{ bytes, gzipBytes }`): "170.4 KB (gzip 24.1 KB)" — gzip is what
 * actually travels over the network. Empty string if there is no stat.
 */
function outputSizeLabel(stat) {
  if (!stat || typeof stat.bytes !== 'number') return ''
  const raw = formatBytes(stat.bytes)
  const gz = typeof stat.gzipBytes === 'number' ? formatBytes(stat.gzipBytes) : ''
  return gz ? tf('configure.sizeWithGzip', { size: raw, gzip: gz }) : raw
}

// ── state / actions: catalog and available (install/available tabs) ──────
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

// ── state / actions: pipeline config (configure tab) ────────────────────
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
        // Editable copy: plugins [{ id, enabled, options }] (panda base
        // always first) + build { entry, output } + JSON drafts.
        s.plugins = (d.plugins || []).map((pl) => ({
          id: pl.id,
          enabled: pl.enabled !== false,
          options: { ...(pl.options || {}) },
        }))
        s.build = { entry: d.build?.entry || '', output: d.build?.output || '' }
        s.outputStat = d.outputStat || null
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

/** Adds an installed plugin (available) to the local pipeline. */
function addToPipeline(s, p) {
  const id = p.pkg || p.name
  if (s.plugins.some((x) => x.id === id)) return
  s.plugins.push({ id, enabled: true, options: {} })
  s.pickOpen = false
  m.redraw()
}

/** Removes a plugin from the local pipeline (Panda's is the base, it is not removed). */
function removeFromPipeline(s, id) {
  if (id === PANDA_PLUGIN_ID) return
  s.plugins = s.plugins.filter((x) => x.id !== id)
  m.redraw()
}

/**
 * Reorders the pipeline after a drag (List `sortable`, controlled): `next` is
 * the new order of ONLY the non-Panda plugins (Panda is the pipeline base,
 * rendered fixed outside the `data` array that List reorders and here it is
 * prepended again). The order of this array is what `serializeManagedBlock`
 * (postcss-api.ts) writes as-is into postcss.config.cjs, so it IS the real
 * execution order of the pipeline.
 */
function reorderPipeline(s, next) {
  s.plugins = [s.plugins.find((p) => p.id === PANDA_PLUGIN_ID), ...next].filter(Boolean)
}

/** Editable options from the schema; null if the plugin has no curated schema. */
function editableFor(id) {
  const schema = schemaFor(id)
  return schema ? schema.options.filter((o) => o.editable !== false) : null
}

/** Notes (function options) from the plugin schema. */
function notesFor(id) {
  return schemaFor(id)?.notes || []
}

/** Converts an option's JSON draft to its real value; null if invalid. */
function parseJsonDraft(s, id, key) {
  const raw = s.jsonDrafts[id]?.[key]
  if (raw === undefined) return { ok: true, value: undefined }
  try {
    return { ok: true, value: JSON.parse(raw) }
  } catch (e) {
    return { ok: false, error: String(e instanceof Error ? e.message : e) }
  }
}

/** Validates/parses the JSON drafts before saving. Returns an error or null. */
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
  // Materializes valid JSON drafts into options.
  const plugins = s.plugins.map((pl) => {
    const options = { ...pl.options }
    const drafts = s.jsonDrafts?.[pl.id] || {}
    // The __all__ draft (free JSON for plugins without a schema) replaces options.
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
        loadConfig(s) // reloads with what was persisted (normalized options)
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

/** Triggers the project's postcss-aware rebuild (POST /api/rebuild). */
function rebuild(s) {
  s.rebuilding = true
  s.rebuildMsg = null
  s.rebuildError = null
  fetch('/api/rebuild', { method: 'POST' })
    .then((r) => r.json())
    .then((d) => {
      s.rebuilding = false
      if (d.ok) {
        // The server returns the size of the already regenerated output CSS.
        s.outputStat = d.output || null
        const size = s.outputStat ? tf('configure.sizeSuffix', { size: outputSizeLabel(s.outputStat) }) : ''
        s.rebuildMsg = d.mode === 'postcss'
          ? tf('configure.rebuiltPostcss', { output: s.build.output, size })
          : tf('configure.rebuiltCssgen', { size })
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

/** Sets an option value (no draft): string/number/boolean/enum/array. */
function setOption(s, pl, key, value) {
  pl.options[key] = value
  // If there was a JSON draft for this key, it is discarded (typed editing wins).
  if (s.jsonDrafts?.[pl.id]) delete s.jsonDrafts[pl.id][key]
}

// ── render helpers: options editor ────────────────────────────────────
/** Enum Select: the <option> value is the INDEX (keeps the real type). */
function enumIndex(e, opts) {
  return opts.map((o) => o.value).findIndex((v) => String(v) === String(e.target.value))
}

/** Editor for an option according to its type (calls setOption on change). */
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
          <Stack key={i} direction="row" gap="sm" align="center">
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

  // string and regex: plain text input.
  return (
    <TextInput
      size="md"
      value={current === undefined ? '' : String(current)}
      placeholder={placeholder || (opt.default !== undefined ? String(opt.default) : '')}
      oninput={(e) => setOption(s, pl, key, e.target.value)}
    />
  )
}

/** Body of a plugin editor: schema option rows (or free JSON). */
function pluginEditor(s, pl) {
  const schema = schemaFor(pl.id)
  const editables = editableFor(pl.id)

  if (schema && editables && editables.length > 0) {
    return (
      <Stack gap="sm">
        {editables.map((opt) => (
          <div key={opt.key} className={optionRow}>
            <Stack gap="xs">
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
          <Stack gap="xs">
            {notesFor(pl.id).map((n, i) => (
              <Text key={i} color="neutral" size="sm" className={noteText}>{n}</Text>
            ))}
          </Stack>
        )}
      </Stack>
    )
  }

  // No schema: free JSON editor for ALL options.
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

/**
 * Collapse for a pipeline plugin (title with tags + options editor).
 * Shared between the static Panda row (`header`, not draggable) and
 * each draggable List row — same content, the difference being that
 * Panda has no enabled checkbox and no remove button (it is the base).
 */
function pluginCollapse(s, pl, defaultOpen) {
  const isPanda = pl.id === PANDA_PLUGIN_ID
  return (
    <Collapse arrow border defaultChecked={defaultOpen}>
      <CollapseTitle>
        <Stack direction="row" gap="sm" align="center" className={css({ flexWrap: 'wrap' })}>
          <Text weight="bold" className={pluginName}>{pl.id}</Text>
          {isPanda
            ? <Tag size="md" variant="info">{t('configure.pandaBase')}</Tag>
            : pl.enabled
              ? <Tag size="md" variant="success">{t('configure.enabled')}</Tag>
              : <Tag size="md" variant="ghost">{t('configure.disabled')}</Tag>}
          {!schemaFor(pl.id) && (
            <Tag size="md" variant="ghost">{t('configure.noSchema')}</Tag>
          )}
        </Stack>
      </CollapseTitle>
      <CollapseContent>
        <Stack gap="md" className={css({ paddingTop: '0.5rem' })}>
          {!isPanda && (
            <Stack direction="row" gap="sm" align="center">
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
            </Stack>
          )}
          {pluginEditor(s, pl)}
        </Stack>
      </CollapseContent>
    </Collapse>
  )
}

/** Row of the Configure tab ("Add from Available"). */
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

// ── shared rows (install/available tabs) ────────────────────────────
/** Content of a plugin row: name + meta + description. */
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

/** Install button (or installed Tag) on the right side of the row. */
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

/** Catalog plugin row (ListRow with the action on the right). */
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
    // On-disk output CSS size (returned by GET /api/postcss/config and
    // refreshed on every /api/rebuild).
    s.outputStat = null
    s.jsonDrafts = {}
    s.savingConfig = false
    s.savedConfig = false
    s.rebuilding = false
    s.rebuildMsg = null
    s.rebuildError = null
    s.pickOpen = false

    // Initial load: catalog + available + pipeline in parallel.
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

                        {/* Panda is the pipeline base (PANDA_PLUGIN_ID):
                            fixed at the top and not draggable, so it lives outside
                            the sortable List. reorderPipeline reinserts it
                            always in the first position when saving. */}
                        {s.plugins.find((pl) => pl.id === PANDA_PLUGIN_ID) && (
                          <div className={css({ marginBottom: '0.5rem' })}>
                            {pluginCollapse(s, s.plugins.find((pl) => pl.id === PANDA_PLUGIN_ID), true)}
                          </div>
                        )}

                        <List
                          data={s.plugins.filter((pl) => pl.id !== PANDA_PLUGIN_ID)}
                          itemKey={(pl) => pl.id}
                          sortable
                          onReorder={(next) => reorderPipeline(s, next)}
                          render={(pl) => (
                            <ListRow>
                              <ListDragHandle aria-label={t('configure.dragToReorder')} />
                              <ListCol grow>{pluginCollapse(s, pl, false)}</ListCol>
                            </ListRow>
                          )}
                        />

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

                        {/* Build: entry + output of the postcss pipeline */}
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
                                <Stack gap="xs">
                                  <TextInput
                                    size="md"
                                    value={s.build.output}
                                    placeholder="styled-system/styles.css"
                                    oninput={(e) => { s.build.output = e.target.value }}
                                  />
                                  <Text size="sm" color="neutral">
                                    {s.outputStat
                                      ? outputSizeLabel(s.outputStat)
                                      : t('configure.outputSizeUnknown')}
                                  </Text>
                                </Stack>
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
