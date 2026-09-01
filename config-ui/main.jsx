import m from 'mithril'
import { css, cx } from '../styled-system/css'
import './style.css'

import { Sidebar } from './components/Sidebar.jsx'
import { t, currentLang, setLang } from './i18n/index.js'
import { Search, ExternalLink, Sun, Moon, ChevronDown } from 'lucide-mithril'
import { FlagEs, FlagUs } from 'circle-flags-mithril'
// Alias Pum*: Button/Kbd/Swap colisionan con los imports de páginas de abajo.
import {
  Navbar, NavbarStart, NavbarCenter, NavbarEnd, NavbarBrand, NavbarToggle,
  Button as PumButton, Kbd as PumKbd, Swap as PumSwap, setLocale as PumSetLocale,
  Dropdown as PumDropdown, DropdownTrigger as PumDropdownTrigger,
  DropdownContent as PumDropdownContent, Menu as PumMenu, MenuItem as PumMenuItem
} from '../src/index.js'

// Páginas del editor del theme
import ColorsPage from './pages/colors/index.jsx'
import FontsPage from './pages/fonts/index.jsx'
import SpacingPage from './pages/spacing/index.jsx'
import RadiiPage from './pages/radii/index.jsx'

// Build routes - only page components, no layout wrapper.
// Sin landing propia: el hash por defecto es /colors (Home se eliminó del
// sidebar). El catch-all redirige a /colors para que rutas desconocidas y la
// raíz vacía terminen siempre en #!/colors.
const routes = {
  '/colors': ColorsPage,
  '/fonts': FontsPage,
  '/spacing': SpacingPage,
  '/radii': RadiiPage,
}

routes['/:component...'] = {
  onmatch: () => {
    if (m.route.get() !== '/colors') m.route.set('/colors')
  },
  render: () => m(ColorsPage),
}

// Theme persistence
const getSavedTheme = () => localStorage.getItem('panda-ui-theme') || 'light'
const setSavedTheme = (theme) => localStorage.setItem('panda-ui-theme', theme)

// Apply saved theme before mount
const savedTheme = getSavedTheme()
document.documentElement.setAttribute('data-theme', savedTheme)

// Scroll container for the routed page content. Kept in Panda css() so the
// layout lives with the Layout component; the id is the m.route mount target.
// All padding (incl. the bottom space) lives on the inner content wrapper, not
// on this scroller: Firefox excludes a scroll container's own padding from the
// scrollable overflow, but a plain block's padding is content everywhere.
const mainStyles = css({
  flex: '1',
  overflowY: 'auto',
  marginLeft: '260px',
  marginTop: '64px',
  minHeight: 'calc(100vh - 64px)',
  '@media (max-width: 768px)': {
    marginLeft: '0',
  },
})

// Inner wrapper that receives the routed page; its padding is scrollable
// content in every engine (unlike scroll-container padding in Firefox).
const contentStyles = css({
  padding: '2rem 3rem 3rem',
  '@media (max-width: 768px)': {
    padding: '1.5rem 1.5rem 3rem',
  },
})

// Navbar del shell — composición 100% con componentes de la librería
// (src/components/Navbar). El position fixed, z-index, tamaño y borde vienen
// de las variantes del recipe; aquí solo queda el look específico del shell
// (grid de 3 zonas, altura fija y fondo base-200).
const navbarFixed = css({
  height: '64px',
  minHeight: '64px',
  background: 'token(colors.base-200)',
  padding: '0 1rem',
})

const navbarGrid = { display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center' }

const themeLabel = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.375rem',
  padding: '0 0.375rem',
})

const searchButtonLabel = css({ fontFamily: 'monospace', fontWeight: '700', fontSize: '0.7rem' })

// Idiomas disponibles (en/es). El trigger muestra la bandera del idioma actual
// + su abreviatura + ChevronDown; el menú lista cada idioma con su nombre
// largo (patrón de la página dropdown).
const langs = [
  { code: 'es', name: 'Español', abbr: 'Es', flag: FlagEs },
  { code: 'en', name: 'English', abbr: 'En', flag: FlagUs },
]

const langTrigger = css({ gap: '0.375rem', alignItems: 'center' })
const langChevron = css({ opacity: 0.6 })

// Layout component - mounted once on body, persists across route changes
const Layout = {
  oninit(vnode) {
    vnode.state.isMobileOpen = false
    vnode.state.isDark = getSavedTheme() === 'dark'
    vnode.state._prevRoute = null
  },

  oncreate(vnode) {
    m.route.prefix = '#!'
    m.route(document.getElementById('view-dynamic-content'), '/colors', routes)

    // Ensure language param exists in the URL
    const lang = currentLang()
    if (!m.route.param('lang')) {
      m.route.set(m.route.get(), {}, { ...m.route.param(), lang })
    }

    // Detect route changes; scroll to top and update title
    vnode.state._scrollOnRoute = () => {
      const current = m.route.get()
      if (vnode.state._prevRoute && vnode.state._prevRoute !== current) {
        const el = document.getElementById('view-dynamic')
        if (el) el.scrollTop = 0
      }
      vnode.state._prevRoute = current

      // Set document title based on route
      const pageTitles = {
        '/': 'PUM Config — Theme Editor',
        '/colors': 'Colors — PUM Config',
        '/fonts': 'Fonts — PUM Config',
        '/spacing': 'Spacing — PUM Config',
        '/radii': 'Radii — PUM Config',
      }
      document.title = pageTitles[current] || 'PUM Config — Theme Editor'
    }

    vnode.state.onKeydown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        m.redraw()
      }
    }
    window.addEventListener('keydown', vnode.state.onKeydown)
  },

  onremove(vnode) {
    window.removeEventListener('keydown', vnode.state.onKeydown)
  },

  view(vnode) {
    vnode.state._scrollOnRoute?.()
    const current = langs.find(l => l.code === currentLang()) || langs[0]
    return (
      <div className={css({ display: 'flex', height: '100vh', overflow: 'hidden' })}>
        <Sidebar
          isMobileOpen={vnode.state.isMobileOpen}
          onMobileClose={() => { vnode.state.isMobileOpen = false }}
        />

        <div className={css({ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 })}>
          <Navbar position="fixed" size="md" border className={navbarFixed} style={navbarGrid}>
            <NavbarStart className={css({ gap: '0.5rem' })} style={{ width: 'auto' }}>
              <NavbarToggle
                open={vnode.state.isMobileOpen}
                onclick={() => { vnode.state.isMobileOpen = !vnode.state.isMobileOpen }}
              />
              <NavbarBrand
                href="#/colors"
                onclick={(e) => { e.preventDefault(); m.route.set('/colors') }}
              >
                PUM Config
              </NavbarBrand>
            </NavbarStart>

            <NavbarCenter className={css({ display: 'flex', justifyContent: 'center' })} style={{ width: 'auto' }}>
              <PumButton variant="ghost" size="sm" href="https://github.com/carlos-sweb/panda-ui-mithril" target="_blank" className={css({ display: { base: 'none', md: 'inline-flex' } })}>
                GitHub <ExternalLink size={14} className={css({ opacity: 0.5 })} />
              </PumButton>
            </NavbarCenter>

            <NavbarEnd className={css({ gap: '0.25rem' })} style={{ width: 'auto' }}>
              <label className={themeLabel} title={vnode.state.isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
                <PumSwap
                  checked={vnode.state.isDark}
                  onchange={(checked) => {
                    const next = checked ? 'dark' : 'light'
                    vnode.state.isDark = checked
                    document.documentElement.setAttribute('data-theme', next)
                    setSavedTheme(next)
                  }}
                  on={<Sun size={24} />}
                  off={<Moon size={24} />}
                />
              </label>

              <PumDropdown placement="bottom-end" offset={8}>
                <PumDropdownTrigger>
                  <PumButton
                    variant="ghost"
                    size="sm"
                    className={cx(searchButtonLabel, langTrigger)}
                  >
                    {m(current.flag, { size: 18 })}
                    {current.abbr}
                    <ChevronDown size={14} className={langChevron} />
                  </PumButton>
                </PumDropdownTrigger>
                <PumDropdownContent>
                  <PumMenu>
                    {/* Solo idiomas disponibles: se excluye el actual
                        (si es En → solo Español, y viceversa). */}
                    {langs.filter((l) => l.code !== current.code).map((l) => (
                      <PumMenuItem
                        key={l.code}
                        onclick={() => { PumSetLocale(l.code); setLang(l.code) }}
                      >
                        {m(l.flag, { size: 18 })}
                        {l.name}
                      </PumMenuItem>
                    ))}
                  </PumMenu>
                </PumDropdownContent>
              </PumDropdown>
            </NavbarEnd>
          </Navbar>

          <main id="view-dynamic" className={mainStyles}>
            <div id="view-dynamic-content" className={contentStyles} />
          </main>
        </div>
      </div>
    )
  }
}

// Mount layout once on body - never re-mounts
m.mount(document.body, Layout)
