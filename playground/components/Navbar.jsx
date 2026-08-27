import m from 'mithril'
import { css } from '../../styled-system/css'
import { Search, ExternalLink, Menu as MenuIcon } from 'lucide-mithril'
import { Swap,Navbar as NavbarBase, NavbarStart, NavbarCenter, NavbarEnd, Button, Kbd, ThemeController } from '../../src/index.js'
import { t, currentLang, setLang } from '../i18n/index.js'
import { Sun, Moon } from 'lucide-mithril'


// El position fixed, z-index, tamaño y borde vienen de las variantes del
// recipe (`position="fixed" size="md" border`); aquí solo queda el look
// específico del shell (grid de 3 zonas, altura fija y fondo base-200).
const navbarFixed = css({
  height: '64px',
  minHeight: '64px',
  background: 'token(colors.base-200)',
  padding: '0 1rem',
})

const brand = css({
  fontSize: '1.25rem',
  fontWeight: '700',
  textDecoration: 'none',
  color: 'token(colors.base-content)',
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
      <NavbarBase className={navbarFixed} position="fixed" size="md" border style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', alignItems: 'center' }}>
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
            <span>PUM</span>            
          </a>
        </NavbarStart>

        <NavbarCenter className={css({ display: 'flex', justifyContent: 'center' })} style={{ width: 'auto' }}>                    
          <Button onclick={onSearchOpen} >
            <Search size={16} className={css({ opacity: 0.5 })} />
            <span>{t('common.searchPlaceholder')}&nbsp;&nbsp;&nbsp;</span>
            <Kbd size="sm" className={css({ marginLeft: 'auto' })}>⌘K</Kbd>
          </Button>
        </NavbarCenter>

        <NavbarEnd className={css({ gap: '0.25rem' })} style={{ width: 'auto' }}>
          <Button variant="ghost" size="sm" href="https://www.npmjs.com/package/panda-ui-mithril" target="_blank" className={css({ display: { base: 'none', md: 'inline-flex' } })}>
            npm <ExternalLink size={14} className={css({ opacity: 0.5 })} />
          </Button>

          <Button variant="ghost" size="sm" href="https://github.com/carlos-sweb/panda-ui-mithril" target="_blank" className={css({ display: { base: 'none', md: 'inline-flex' } })}>
            GitHub <ExternalLink size={14} className={css({ opacity: 0.5 })} />
          </Button>

          <label className={themeLabel} title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}>
            <Swap
              checked={isDark}
              onchange={(checked) => onToggleTheme(checked ? 'dark' : undefined)}
              on={<Sun size={24} />}
              off={<Moon size={24} />}
            />
          </label>
          
          <Button
            variant="ghost"
            size="sm"
            onclick={() => setLang(currentLang() === 'es' ? 'en' : 'es')}
            className={css({ fontFamily: 'monospace', fontWeight: '700', fontSize: '0.7rem' })}
          >
            {currentLang() === 'es' ? 'EN' : 'ES'}
          </Button>
        </NavbarEnd>
      </NavbarBase>
    )
  }
}

