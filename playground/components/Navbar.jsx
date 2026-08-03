import m from 'mithril'
import { css } from '../../styled-system/css'
import { Search, ExternalLink, Menu as MenuIcon } from 'lucide-mithril'
import { Navbar as NavbarBase, NavbarStart, NavbarCenter, NavbarEnd, Button, Kbd, ThemeController } from '../../src/index.js'

const navbarFixed = css({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  height: '64px',
  minHeight: '64px',
  background: 'token(colors.base-200)',
  borderBottom: '1px solid',
  borderColor: 'token(colors.base-300)',
  padding: '0 1rem',
  zIndex: 50,
})

const brand = css({
  fontSize: '1.25rem',
  fontWeight: '700',
  textDecoration: 'none',
  color: 'token(colors.base-content)',
})

const searchBtn = css({
  display: { base: 'none', md: 'flex' },
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.5rem 1rem',
  borderRadius: '0.5rem',
  fontSize: '0.875rem',
  background: 'token(colors.base-100)',
  border: '1px solid',
  borderColor: 'token(colors.base-300)',
  color: 'token(colors.base-content)',
  opacity: 0.7,
  cursor: 'pointer',
  transition: 'all 0.15s',
  width: '100%',
  maxWidth: '400px',
  _hover: { opacity: 1, borderColor: 'token(colors.base-content/20)' },
})

const themeLabel = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.375rem',
  padding: '0 0.375rem',
})

export const Navbar = {
  view(vnode) {
    const { onSearchOpen, onToggleSidebar, isDark, onToggleTheme } = vnode.attrs

    return (
      <NavbarBase className={navbarFixed} style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center' }}>
        <NavbarStart className={css({ gap: '0.5rem' })} style={{ width: 'auto' }}>
          <Button
            variant="ghost"
            square
            className={css({ display: { base: 'inline-flex', md: 'none' } })}
            onclick={onToggleSidebar}
          >
            <MenuIcon size={20} />
          </Button>

          <a
            href="#/"
            onclick={(e) => { e.preventDefault(); m.route.set('/') }}
            className={brand}
          >
            <span className={css({ display: { base: 'none', md: 'inline' } })}>panda-ui-mithril</span>
            <span className={css({ display: { base: 'inline', md: 'none' } })}>PUM</span>
          </a>
        </NavbarStart>

        <NavbarCenter className={css({ display: 'flex', justifyContent: 'center' })} style={{ width: 'auto' }}>
          <Button
            variant="ghost"
            square
            className={css({ display: { base: 'inline-flex', md: 'none' } })}
            onclick={onSearchOpen}
          >
            <Search size={18} />
          </Button>

          <button className={searchBtn} onclick={onSearchOpen}>
            <Search size={16} className={css({ opacity: 0.5 })} />
            <span>Search components...</span>
            <Kbd size="sm" className={css({ marginLeft: 'auto' })}>⌘K</Kbd>
          </button>
        </NavbarCenter>

        <NavbarEnd className={css({ gap: '0.25rem' })} style={{ width: 'auto' }}>
          <Button variant="ghost" size="sm" href="https://www.npmjs.com/package/panda-ui-mithril" target="_blank" className={css({ display: { base: 'none', md: 'inline-flex' } })}>
            npm <ExternalLink size={14} className={css({ opacity: 0.5 })} />
          </Button>

          <Button variant="ghost" size="sm" href="https://github.com/carlos-sweb/panda-ui-mithril" target="_blank" className={css({ display: { base: 'none', md: 'inline-flex' } })}>
            GitHub <ExternalLink size={14} className={css({ opacity: 0.5 })} />
          </Button>

          <label className={themeLabel} title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
            <ThemeController theme="dark" checked={isDark} onchange={onToggleTheme} />
          </label>
        </NavbarEnd>
      </NavbarBase>
    )
  }
}
