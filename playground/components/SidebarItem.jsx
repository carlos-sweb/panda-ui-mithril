import m from 'mithril'
import { css } from '../../styled-system/css'

const linkBase = css({
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  padding: '0.375rem 0.75rem',
  borderRadius: '0.375rem',
  fontSize: '1rem',
  textDecoration: 'none',
  color: 'base-content',
  transition: 'background 0.15s, color 0.15s',
  cursor: 'pointer',
  _hover: { background: 'base-300' },
})

const linkActive = css({
  background: 'primary',
  color: 'primary-content',
  _hover: { background: 'primary' },
})

export const SidebarItem = {
  view(vnode) {
    const { label, route, active, onclick } = vnode.attrs

    return (
      <a
        href={`#${route}`}
        onclick={(e) => {
          e.preventDefault()
          m.route.set(route)
          onclick && onclick()
        }}
        className={`${linkBase} ${active ? linkActive : ''}`}
      >
        {label}
      </a>
    )
  }
}
