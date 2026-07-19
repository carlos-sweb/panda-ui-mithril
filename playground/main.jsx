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

// Dynamic import of all component pages
const componentPages = import.meta.glob('./pages/components/*.jsx', { eager: true })

const Layout = {
  oninit(vnode) {
    vnode.state.isMobileOpen = false
    vnode.state.isSearchOpen = false
    vnode.state.isDark = document.documentElement.getAttribute('data-theme') === 'dark'
  },

  view(vnode) {
    return (
      <div style={css({ minHeight: '100vh' })}>
        <Navbar
          onSearchOpen={() => { vnode.state.isSearchOpen = true }}
          onToggleSidebar={() => { vnode.state.isMobileOpen = !vnode.state.isMobileOpen }}
          isDark={vnode.state.isDark}
          onToggleTheme={() => {
            vnode.state.isDark = !vnode.state.isDark
            document.documentElement.setAttribute('data-theme', vnode.state.isDark ? 'dark' : 'light')
          }}
        />

        <Sidebar
          isMobileOpen={vnode.state.isMobileOpen}
          onMobileClose={() => { vnode.state.isMobileOpen = false }}
        />

        <main
          style={css({
            marginLeft: '260px',
            marginTop: '64px',
            padding: '2rem 3rem',
            minHeight: 'calc(100vh - 64px)',
            '@media (max-width: 768px)': {
              marginLeft: 0,
              padding: '1.5rem',
            },
          })}
        >
          {vnode.children}
        </main>

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

// Build routes from component pages
const routes = {
  '/': { render: () => <Layout><Landing /></Layout> },
}

// Map component page files to routes
Object.keys(componentPages).forEach(path => {
  // Extract component name from path: ./pages/components/Button.jsx -> button
  const fileName = path.split('/').pop().replace('.jsx', '')
  const routeName = `/${fileName.toLowerCase()}`
  const Component = componentPages[path].default
  
  routes[routeName] = {
    render: () => <Layout><Component /></Layout>
  }
})

// Fallback route for unknown paths
routes['/:component...'] = {
  render: () => <Layout><Landing /></Layout>
}

m.route.prefix = '#'
m.route(document.getElementById('app'), '/', routes)
