import m from 'mithril'
import { css } from '../../styled-system/css'
import { Search, ExternalLink, Moon, Sun, Menu } from 'lucide-mithril'

const navLink = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.375rem',
  padding: '0.5rem 0.75rem',
  borderRadius: '0.5rem',
  fontSize: '0.875rem',
  textDecoration: 'none',
  color: 'base-content',
  transition: 'background 0.15s',
  _hover: { background: 'base-300' },
})

const searchBtn = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem 1rem',
  borderRadius: '0.5rem',
  fontSize: '0.875rem',
  background: 'base-100',
  border: '1px solid',
  borderColor: 'base-300',
  color: 'base-content',
  opacity: 0.7,
  cursor: 'pointer',
  transition: 'all 0.15s',
  minWidth: '280px',
  _hover: { opacity: 1, borderColor: 'base-content/20%' },
})

const kbd = css({
  display: 'inline-flex',
  alignItems: 'center',
  padding: '0.125rem 0.375rem',
  borderRadius: '0.25rem',
  fontSize: '0.6875rem',
  fontFamily: 'monospace',
  background: 'base-200',
  border: '1px solid',
  borderColor: 'base-300',
  marginLeft: 'auto',
})

export const Navbar = {
  view(vnode) {
    const { onSearchOpen, onToggleSidebar, isDark, onToggleTheme } = vnode.attrs

    return (
      <header
        className={css({
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          height: '64px',
          background: 'base-200',
          borderBottom: '1px solid',
          borderColor: 'base-300',
          display: 'flex',
          alignItems: 'center',
          padding: '0 1.5rem',
          zIndex: 50,
        })}
      >
        <div className={css({ display: 'flex', alignItems: 'center', gap: '1rem' })}>
          <button
            className={css({
              display: { base: 'flex', md: 'none' },
              alignItems: 'center',
              justifyContent: 'center',
              width: '2rem',
              height: '2rem',
              borderRadius: '0.375rem',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: 'base-content',
              transition: 'background 0.15s',
              _hover: { background: 'base-300' },
            })}
            onclick={onToggleSidebar}
          >
            <Menu size={20} />
          </button>

          <a
            href="#/"
            onclick={(e) => { e.preventDefault(); m.route.set('/') }}
            className={css({
              fontSize: '1.25rem',
              fontWeight: '700',
              textDecoration: 'none',
              color: 'base-content',
            })}
          >
            panda-ui
          </a>
        </div>

        <div className={css({ flex: 1, display: 'flex', justifyContent: 'center', padding: '0 2rem' })}>
          <button className={searchBtn} onclick={onSearchOpen}>
            <Search size={16} className={css({ opacity: 0.5 })} />
            <span>Search components...</span>
            <span className={kbd}>⌘K</span>
          </button>
        </div>

        <div className={css({ display: 'flex', alignItems: 'center', gap: '0.5rem' })}>
          <a
            href="https://www.npmjs.com/package/panda-ui-mithril"
            target="_blank"
            className={navLink}
          >
            <span>npm</span>
            <ExternalLink size={14} className={css({ opacity: 0.5 })} />
          </a>

          <a
            href="https://github.com/carlos-sweb/panda-ui-mithril"
            target="_blank"
            className={navLink}
          >
            <span>GitHub</span>
            <ExternalLink size={14} className={css({ opacity: 0.5 })} />
          </a>

          <button
            className={css({
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '2.25rem',
              height: '2.25rem',
              borderRadius: '0.5rem',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              color: 'base-content',
              transition: 'background 0.15s',
              _hover: { background: 'base-300' },
            })}
            onclick={onToggleTheme}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </header>
    )
  }
}
