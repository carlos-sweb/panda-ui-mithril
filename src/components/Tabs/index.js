import m from 'mithril'
import { tabs } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'

function resolveVariant(vnode) {
  const { variant, boxed, bordered, lifted } = vnode.attrs
  return boxed ? 'box' : bordered ? 'border' : lifted ? 'lift' : variant ?? 'box'
}

/**
 * Componente Tabs. Contenedor `tablist` de pestañas; acepta la variante
 * directa (`box`/`border`/`lift`) o los atajos booleanos `boxed`/`bordered`/
 * `lifted`, más el tamaño. Soporta modo controlado (`active`) y no controlado
 * (`defaultActive`).
 *
 * @type {import('mithril').Component<import('./index').TabsAttrs>}
 */
export const Tabs = {
  oninit(vnode) {
    // Estado interno: qué ref está activo
    vnode.state.activeRef = vnode.attrs.defaultActive ?? null
  },

  view(vnode) {
    const { 
      active,           // Controlado externamente
      defaultActive,    // Valor inicial no controlado
      onActiveChange,   // Callback
      variant, size, boxed, bordered, lifted, 
      className, 
      ...rest 
    } = vnode.attrs
    
    const resolved = resolveVariant(vnode)
    
    // Modo controlado vs no controlado
    const activeRef = active !== undefined ? active : vnode.state.activeRef
    
    // Clonar hijos e inyectar active basado en ref
    const children = vnode.children.map(child => {
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
      // Click handler: detecta qué tab se clickeó
      onclick: (e) => {
        const clickedTab = e.target.closest('[role="tab"]')
        if (!clickedTab) return
        
        const ref = clickedTab.dataset.ref
        if (ref && ref !== activeRef) {
          // Modo no controlado: actualizar estado interno
          if (active === undefined) {
            vnode.state.activeRef = ref
          }
          // Siempre llamar callback
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
            // Activar tab enfocado
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
 * Componente Tab. Pestaña individual (`<button role="tab">`); `active` marca
 * la selección y `disabled` deshabilita la interacción.
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
 * Componente TabContent. Panel de contenido asociado a una pestaña
 * (`role="tabpanel"`); con `active` se muestra.
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
