import m from 'mithril'
import { css } from '../../styled-system/css'
import { Palette, Type, Ruler, CircleDot, X } from 'lucide-mithril'
import { Menu, MenuItem, MenuTitle, Button, Drawer, DrawerBox, DrawerBackdrop } from '../../src/index.js'
import { t } from '../i18n/index.js'

// Categorías del editor del theme
const categories = [
  { i18n: 'sidebar.categories.colors', icon: Palette, items: ['colors'] },
  { i18n: 'sidebar.categories.typography', icon: Type, items: ['fonts'] },
  { i18n: 'sidebar.categories.spacing', icon: Ruler, items: ['spacing'] },
  { i18n: 'sidebar.categories.radii', icon: CircleDot, items: ['radii'] },
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

// El Drawer de la librería trae un ::backdrop nativo (negro 40% + blur).
// El drawer móvil custom anterior usaba negro 50% sin blur — lo replicamos
// para que la migración no cambie el aspecto del overlay. Los utilities
// (capa utilities) ganan al recipe (capa recipes), así que el override aplica.
const mobileDrawerBackdrop = css({
  '&::backdrop': {
    backgroundColor: 'oklch(0% 0 0 / 50%)',
    backdropFilter: 'none',
  },
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
  return location.hash.replace(/^#!/, '') || '/colors'
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
          {categories.map((cat) => [
            <MenuTitle key={`${t(cat.i18n)}-title`}>
              <span className={categoryTitle}>
                <cat.icon size={14} />
                {t(cat.i18n)}
              </span>
            </MenuTitle>,
            ...cat.items.map((key) => (
              <MenuItem
                key={key}
                href={`#/${key}`}
                active={current === `/${key}`}
                onclick={navigate(`/${key}`, onclose)}
              >
                {t('sidebar.items.' + key)}
              </MenuItem>
            )),
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

        <Drawer
          position="start"
          size="260px"
          aria-label="Navigation"
          open={isMobileOpen}
          onclose={onMobileClose}
          className={mobileDrawerBackdrop}
        >
          <DrawerBox className={sidebarBase}>
            <SidebarContent onclose={onMobileClose} />
          </DrawerBox>
          <DrawerBackdrop onclick={onMobileClose} />
        </Drawer>
      </>
    )
  }
}
