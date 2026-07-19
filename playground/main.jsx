import m from 'mithril'
import { css } from '../styled-system/css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import './style.css'

import { Navbar } from './components/Navbar.jsx'
import { Sidebar } from './components/Sidebar.jsx'
import { SearchModal } from './components/SearchModal.jsx'
import { Landing } from './pages/Landing.jsx'

const componentPages = import.meta.glob('./pages/*.jsx', { eager: true })

// Build routes - only page components, no layout wrapper
const routes = {
  '/': { render: () => m(Landing) },
}

Object.keys(componentPages).forEach(path => {
  const fileName = path.split('/').pop().replace('.jsx', '')
  const routeName = `/${fileName.toLowerCase()}`
  const Component = componentPages[path].default
  routes[routeName] = { render: () => m(Component) }
})

routes['/:component...'] = {
  render: () => m(Landing)
}

// Theme persistence
const getSavedTheme = () => localStorage.getItem('panda-ui-theme') || 'light'
const setSavedTheme = (theme) => localStorage.setItem('panda-ui-theme', theme)

// Apply saved theme before mount
const savedTheme = getSavedTheme()
document.documentElement.setAttribute('data-theme', savedTheme)

// Layout component - mounted once on body, persists across route changes
const Layout = {
  oninit(vnode) {
    vnode.state.isMobileOpen = false
    vnode.state.isSearchOpen = false
    vnode.state.isDark = getSavedTheme() === 'dark'
  },

  oncreate(vnode) {
    m.route.prefix = '#!'
    m.route(document.getElementById('view-dynamic'), '/', routes)
  },

  view(vnode) {
    return (
      <div style={css({ display: 'flex', height: '100vh', overflow: 'hidden' })}>
        <Sidebar
          isMobileOpen={vnode.state.isMobileOpen}
          onMobileClose={() => { vnode.state.isMobileOpen = false }}
        />

        <div style={css({ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 })}>
          <Navbar
            onSearchOpen={() => { vnode.state.isSearchOpen = true }}
            onToggleSidebar={() => { vnode.state.isMobileOpen = !vnode.state.isMobileOpen }}
            isDark={vnode.state.isDark}
            onToggleTheme={() => {
              vnode.state.isDark = !vnode.state.isDark
              const theme = vnode.state.isDark ? 'dark' : 'light'
              document.documentElement.setAttribute('data-theme', theme)
              setSavedTheme(theme)
            }}
          />

          <main id="view-dynamic" />
        </div>

        {vnode.state.isSearchOpen && (
          <SearchModal onclose={() => { vnode.state.isSearchOpen = false }} />
        )}

        {vnode.state.isMobileOpen && (
          <div
            style={css({
              position: 'fixed',
              inset: 0,
              background: 'oklch(0% 0 0 / 50%)',
              zIndex: 80,
              '@media (min-width: 769px)': { display: 'none' },
            })}
            onclick={() => { vnode.state.isMobileOpen = false }}
          />
        )}
      </div>
    )
  }
}

// Mount layout once on body - never re-mounts
m.mount(document.body, Layout)
