import m from 'mithril'
import { css } from '../../styled-system/css'

// Not part of the component suite — daisyUI's real drawer is a CSS-only
// hidden-checkbox trick (.drawer-toggle:checked ~ .drawer-side). This project
// prefers real JS state over that (see memory: js-over-daisyui-purity), and
// an off-canvas mobile nav panel is app shell chrome, not a library
// component — so it lives here in the playground, not in src/components.

const overlay = css({
  position: 'fixed',
  inset: 0,
  background: 'oklch(0% 0 0 / 50%)',
  zIndex: 80,
  '@media (min-width: 769px)': { display: 'none' },
})

const side = css({
  position: 'fixed',
  top: 0,
  left: 0,
  bottom: 0,
  zIndex: 90,
  transform: 'translateX(-100%)',
  transition: 'transform 0.25s ease-in-out',
  '@media (min-width: 769px)': { display: 'none' },
})

const sideOpen = css({ transform: 'translateX(0)' })

export const DrawerSide = {
  view(vnode) {
    const { open, onclose, className, ...rest } = vnode.attrs

    return (
      <>
        {open && <div className={overlay} onclick={onclose} />}
        <aside className={`${side} ${open ? sideOpen : ''} ${className || ''}`} {...rest}>
          {vnode.children}
        </aside>
      </>
    )
  }
}
