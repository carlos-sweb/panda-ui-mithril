import m from 'mithril'
import { css } from '../../../styled-system/css'
import {
  Stack, Title, Text, Button, Card, CardBody, TextInput, Alert,
  Tag, Tabs, Tab, TabContent, Loading, List, ListRow, ListCol,
} from '../../../src/index.js'
import { t, loadPageI18n } from '../../i18n/index.js'

/**
 * Página Postcss — plugins de PostCSS por paquetes npm (modelo fonts).
 *
 * Flujo: el listado OFICIAL de postcss.org/docs/postcss-plugins es el
 * catálogo; "Install" ejecuta `bun add {paquete}` en la raíz del proyecto y
 * el plugin queda DISPONIBLE en node_modules. Cablear los plugins al
 * pipeline de CSS (build) es una fase posterior — aquí solo se gestiona la
 * presencia en node_modules (viñeta "available").
 *
 * API:
 *   GET  /api/postcss/catalog?q=   catálogo oficial (proxy postcss.org)
 *   GET  /api/postcss/available    plugins del catálogo en node_modules
 *   POST /api/postcss/install      bun add {paquete npm resuelto}
 *   POST /api/postcss/remove       bun remove {paquete}
 */

// ── utilidades css() de la página ────────────────────────────────────────────
const pluginName = css({
  fontFamily: 'monospace',
  fontSize: '0.8125rem',
})

// Meta (tags/links) debajo del nombre del plugin.
const pluginMeta = css({
  display: 'flex',
  flexWrap: 'wrap',
  alignItems: 'center',
  gap: '0.375rem',
  marginTop: '0.25rem',
})

// Descripción del plugin, debajo del nombre.
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

/** t() con interpolación: tf('a.b', { x }) reemplaza {x} en la traducción. */
function tf(path, vars) {
  return t(path).replace(/\{(\w+)\}/g, (_, k) => (vars && vars[k] !== undefined ? vars[k] : `{${k}}`))
}

// ── estado / acciones ────────────────────────────────────────────────────────
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
        // Marca instalado localmente + refresca available.
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

// ── filas compartidas ────────────────────────────────────────────────────────
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

    // Carga inicial: catálogo completo (sin q) + disponible en paralelo.
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
  },

  view(vnode) {
    const s = vnode.state

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
                            <Button
                              size="sm"
                              variant="ghost"
                              disabled={s.removeBusy !== null}
                              onclick={() => removePlugin(s, p)}
                            >
                              {s.removeBusy === (p.pkg || p.name) ? t('available.removing') : t('available.remove')}
                            </Button>
                          </ListRow>
                        )}
                      />
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
