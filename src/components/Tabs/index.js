import m from 'mithril'
import { tabs } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

function resolveVariant(vnode) {
  const { variant, boxed, bordered, lifted } = vnode.attrs
  return boxed ? 'box' : bordered ? 'border' : lifted ? 'lift' : variant ?? 'box'
}

/**
 * Tabs component. `tablist` container of tabs; accepts the direct
 * variant (`box`/`border`/`lift`) or the boolean shortcuts `boxed`/`bordered`/
 * `lifted`, plus the size. Supports controlled (`active`) and uncontrolled
 * (`defaultActive`) mode.
 *
 * @type {import('mithril').Component<import('./index').TabsAttrs>}
 */
export const Tabs = {
  oninit(vnode) {
    // Internal state: which ref is active
    vnode.state.activeRef = vnode.attrs.defaultActive ?? null
  },

  view(vnode) {
    const { 
      active,           // Controlled externally
      defaultActive,    // Uncontrolled initial value
      onActiveChange,   // Callback
      variant, size, boxed, bordered, lifted, 
      className, 
      ...rest 
    } = vnode.attrs
    
    const resolved = resolveVariant(vnode)
    
    // Controlled vs uncontrolled mode
    const activeRef = active !== undefined ? active : vnode.state.activeRef

    // Children may come wrapped in fragments (`tag: '['`) when they are
    // generated with `.map()`. Flatten them first so that the cloning below
    // sees them as direct Tab/TabContent vnodes.
    const flatten = (nodes) => nodes.reduce((acc, node) => {
      if (node == null) return acc
      if (Array.isArray(node)) return acc.concat(flatten(node))
      if (node.tag === '[') return acc.concat(flatten(node.children))
      return acc.concat(node)
    }, [])

    // Clone children and inject active based on ref
    const children = flatten(vnode.children).map(child => {
      if (child.tag === Tab || child.tag === TabContent) {
        return m(child.tag, {
          ...child.attrs,
          active: child.attrs.ref === activeRef
        }, child.children)
      }
      return child
    })
    
    return m('div', {
      role: 'tablist',
      className: cx('tabs', resolved && `tabs-${resolved}`, tabs({ variant: resolved, size }), className),
      // Click handler: detects which tab was clicked
      onclick: (e) => {
        const clickedTab = e.target.closest('[role="tab"]')
        if (!clickedTab) return
        
        const ref = clickedTab.dataset.ref
        if (ref && ref !== activeRef) {
          // Uncontrolled mode: update internal state
          if (active === undefined) {
            vnode.state.activeRef = ref
          }
          // Always call callback
          onActiveChange && onActiveChange(ref)
        }
      },
      // Keyboard navigation
      onkeydown: (e) => {
        const tabs = Array.from(vnode.dom.querySelectorAll('[role="tab"]'))
        const currentIndex = tabs.findIndex(tab => tab === document.activeElement)
        
        if (currentIndex === -1) return
        
        let newIndex = currentIndex
        let shouldPreventDefault = false
        
        switch (e.key) {
          case 'ArrowRight':
          case 'ArrowDown':
            newIndex = (currentIndex + 1) % tabs.length
            shouldPreventDefault = true
            break
          case 'ArrowLeft':
          case 'ArrowUp':
            newIndex = (currentIndex - 1 + tabs.length) % tabs.length
            shouldPreventDefault = true
            break
          case 'Home':
            newIndex = 0
            shouldPreventDefault = true
            break
          case 'End':
            newIndex = tabs.length - 1
            shouldPreventDefault = true
            break
          case 'Enter':
          case ' ':
            // Activate focused tab
            const ref = tabs[currentIndex].dataset.ref
            if (ref && ref !== activeRef) {
              if (active === undefined) {
                vnode.state.activeRef = ref
              }
              onActiveChange && onActiveChange(ref)
            }
            shouldPreventDefault = true
            break
        }
        
        if (shouldPreventDefault) {
          e.preventDefault()
          tabs[newIndex].focus()
        }
      },
      ...rest
    }, children)
  }
}

/**
 * Tab component. Individual tab (`<button role="tab">`); `active` marks
 * the selection and `disabled` disables interaction.
 *
 * @type {import('mithril').Component<import('./index').TabAttrs>}
 */
export const Tab = {
  view(vnode) {
    const { active, disabled, ref, className, ...rest } = vnode.attrs

    return m('button', {
      type: 'button',
      role: 'tab',
      'aria-selected': active ? 'true' : 'false',
      'data-ref': ref,
      className: cx(
        'tabs-tab',
        active && 'tab-active',
        disabled && 'tab-disabled',
        className
      ),
      disabled,
      ...rest
    }, vnode.children)
  }
}

/**
 * TabContent component. Content panel associated with a tab
 * (`role="tabpanel"`); with `active` it is shown.
 *
 * @type {import('mithril').Component<import('./index').TabContentAttrs>}
 */
export const TabContent = {
  view(vnode) {
    const { active, ref, className, ...rest } = vnode.attrs
    return m('div', {
      role: 'tabpanel',
      'data-ref': ref,
      className: cx('tabs-content', active && 'active', className),
      ...rest
    }, vnode.children)
  }
}
