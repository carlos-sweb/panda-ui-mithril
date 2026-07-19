import m from 'mithril'
import { css } from '../../styled-system/css'
import { MousePointerClick, AppWindow, Link, MessageCircleMore, PenLine, PanelsTopLeft, X } from 'lucide-mithril'
import { SidebarItem } from './SidebarItem.jsx'

const categories = [
  {
    title: 'Actions',
    icon: MousePointerClick,
    items: ['button', 'fab', 'link', 'swap', 'filter', 'themectrl'],
  },
  {
    title: 'Data Display',
    icon: AppWindow,
    items: ['badge', 'avatar', 'card', 'list', 'table', 'stat', 'timeline', 'countdown', 'chat', 'mask', 'kbd'],
  },
  {
    title: 'Navigation',
    icon: Link,
    items: ['navbar', 'breadcrumbs', 'menu', 'tabs', 'pagination', 'steps', 'megamenu', 'footer'],
  },
  {
    title: 'Feedback',
    icon: MessageCircleMore,
    items: ['alert', 'toast', 'modal', 'tooltip', 'loading', 'skeleton', 'progress', 'radialprogress', 'status', 'indicator', 'aura'],
  },
  {
    title: 'Data Input',
    icon: PenLine,
    items: ['input', 'textarea', 'select', 'checkbox', 'radio', 'toggle', 'range', 'fileinput', 'otp', 'rating', 'calendar', 'fieldset', 'label'],
  },
  {
    title: 'Layout',
    icon: PanelsTopLeft,
    items: ['hero', 'divider', 'stack', 'join', 'accordion', 'collapse', 'carousel', 'diff'],
  },
]

const categoryHeader = css({
  display: 'flex',
  alignItems: 'center',
  padding: '0.5rem 0.75rem',
  fontSize: '0.75rem',
  fontWeight: '600',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
  opacity: 0.5,
  cursor: 'pointer',
  borderRadius: '0.375rem',
  transition: 'background 0.15s',
  _hover: { background: 'base-300' },
})

const sidebarBase = css({
  width: '260px',
  background: 'base-200',
  borderRight: '1px solid',
  borderColor: 'base-300',
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

const sidebarMobile = css({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  zIndex: 90,
  transform: 'translateX(-100%)',
  transition: 'transform 0.25s ease-in-out',
  '@media (min-width: 769px)': {
    display: 'none',
  },
})

const sidebarMobileOpen = css({
  transform: 'translateX(0)',
})

const closeBtn = css({
  display: 'flex',
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
})

const SidebarContent = {
  view(vnode) {
    const { onclose } = vnode.attrs
    const current = m.route.get()

    return (
      <div className={css({ flex: '1', overflowY: 'auto', padding: '0.75rem' })}>
        <div className={css({ display: 'flex', justifyContent: 'flex-end', marginBottom: '0.5rem', '@media (min-width: 769px)': { display: 'none' } })}>
          <button className={closeBtn} onclick={onclose}>
            <X size={18} />
          </button>
        </div>

        <SidebarItem label="Home" route="/" active={current === '/'} onclick={onclose} />

        {categories.map((cat) => (
          <div key={cat.title} className={css({ marginTop: '0.5rem' })}>
            <div className={categoryHeader}>
              <cat.icon size={14} className={css({ marginRight: '0.375rem' })} />
              <span>{cat.title}</span>
              <span className={css({ fontSize: '0.625rem', opacity: 0.4 })}>{cat.items.length}</span>
            </div>
            <div className={css({ display: 'flex', flexDirection: 'column', gap: '1px' })}>
              {cat.items.map((key) => {
                const label = key.charAt(0).toUpperCase() + key.slice(1)
                return (
                  <SidebarItem
                    key={key}
                    label={label}
                    route={`/${key}`}
                    active={current === `/${key}`}
                    onclick={onclose}
                  />
                )
              })}
            </div>
          </div>
        ))}
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

        <aside className={`${sidebarBase} ${sidebarMobile} ${isMobileOpen ? sidebarMobileOpen : ''}`}>
          <SidebarContent onclose={onMobileClose} />
        </aside>
      </>
    )
  }
}
