import m from 'mithril'
import { css } from '../../styled-system/css'
import { MousePointerClick, AppWindow, Link, MessageCircleMore, PenLine, PanelsTopLeft, X } from 'lucide-mithril'
import { Menu, MenuItem, MenuTitle, Button } from '../../src/index.js'
import { DrawerSide } from './Drawer.jsx'
import { t } from '../i18n/index.js'

const categories = [
  { i18n: 'sidebar.categories.actions', icon: MousePointerClick, items: ['button', 'fab', 'filter', 'link', 'swap', 'themectrl'] },
  { i18n: 'sidebar.categories.dataDisplay', icon: AppWindow, items: ['avatar', 'badge', 'card', 'chat', 'countdown', 'kbd', 'list', 'mask', 'stat', 'table', 'tag', 'timeline'] },
  { i18n: 'sidebar.categories.navigation', icon: Link, items: ['breadcrumbs', 'footer', 'megamenu', 'menu', 'navbar', 'pagination', 'steps', 'tabs'] },
  { i18n: 'sidebar.categories.feedback', icon: MessageCircleMore, items: ['alert', 'aura', 'indicator', 'loading', 'modal', 'progress', 'radialprogress', 'skeleton', 'status', 'toast', 'tooltip'] },
  { i18n: 'sidebar.categories.dataInput', icon: PenLine, items: ['calendar', 'checkbox', 'fieldset', 'fileinput', 'input', 'label', 'otp', 'radio', 'range', 'rating', 'select', 'textarea', 'toggle'] },
  { i18n: 'sidebar.categories.layout', icon: PanelsTopLeft, items: ['accordion', 'carousel', 'collapse', 'diff', 'divider', 'hero', 'join', 'stack'] },
]

const menu = css({ width: '100%', padding: '0'})

const categoryTitle = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.375rem',
})

const sidebarBase = css({
  width: '260px',
  background: 'token(colors.base-200)',
  borderRight: '1px solid',
  borderColor: 'token(colors.base-300)',
  overflowY: 'auto',
  display: 'flex',
  flexDirection: 'column',
})

const sidebarDesktop = css({
  position: 'fixed',
  top: '64px',
  left: 0,
  bottom: 0,
  '@media (max-width: 768px)': {
    display: 'none',
  },
})

// `m.route.get()` only reflects reality once the router (mounted separately,
// in a different root, inside Layout's oncreate) has resolved — on a hard
// reload the very first Layout/Sidebar render happens before that, so it
// would report the wrong (empty) route and no sidebar item would highlight.
// `location.hash` is set by the browser before any JS runs, so it's correct
// from the first paint.
function getCurrentPath() {
  return location.hash.replace(/^#!/, '') || '/'
}

function navigate(route, onclose) {
  return (e) => {
    e.preventDefault()
    m.route.set(route)
    onclose && onclose()
  }
}

const SidebarContent = {
  view(vnode) {
    const { onclose } = vnode.attrs
    const current = getCurrentPath()

    return (
      <div className={css({ flex: '1', overflowY: 'auto', padding: '0.75rem' })}>
        <div className={css({ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem', '@media (min-width: 769px)': { display: 'none' } })}>
          <Button variant="ghost" square size="sm" onclick={onclose}>
            <X size={18} />
          </Button>
        </div>

        <Menu className={menu} style={{ width: '100%' }}>
          <MenuItem href="#/" active={current === '/'} onclick={navigate('/', onclose)}>Home</MenuItem>

          {categories.map((cat) => [
            <MenuTitle key={`${t(cat.i18n)}-title`}>
              <span className={categoryTitle}>
                <cat.icon size={14} />
                {t(cat.i18n)}
              </span>
            </MenuTitle>,
            ...cat.items.map((key) => {
              const label = key.charAt(0).toUpperCase() + key.slice(1)
              return (
                <MenuItem
                  key={key}
                  href={`#/${key}`}
                  active={current === `/${key}`}
                  onclick={navigate(`/${key}`, onclose)}                  
                >
                  {label}
                </MenuItem>
              )
            }),
          ])}
        </Menu>
      </div>
    )
  }
}

export const Sidebar = {
  view(vnode) {
    const { isMobileOpen, onMobileClose } = vnode.attrs

    return (
      <>
        <aside className={`${sidebarBase} ${sidebarDesktop}`}>
          <SidebarContent onclose={() => {}} />
        </aside>

        <DrawerSide open={isMobileOpen} onclose={onMobileClose} className={sidebarBase}>
          <SidebarContent onclose={onMobileClose} />
        </DrawerSide>
      </>
    )
  }
}
