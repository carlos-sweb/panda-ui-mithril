import m from 'mithril'
import { pagination } from '../../../styled-system/recipes'
import { button } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-mithril'

// Calcula la lista de páginas a mostrar (números y '...'): boundaries en los
// extremos, siblings alrededor de la página actual, con elipsis donde haga
// falta. Mismo enfoque que Mantine/welcome-ui.
function getRange(page, pageCount, siblings, boundaries) {
  const totalShown = boundaries * 2 + siblings * 2 + 3
  if (pageCount <= totalShown) {
    return Array.from({ length: pageCount }, (_, i) => i + 1)
  }

  const startPage = Math.max(1, page - siblings, boundaries + 1)
  const endPage = Math.min(pageCount, page + siblings, pageCount - boundaries)

  const items = []
  if (boundaries > 0) {
    for (let i = 1; i <= boundaries; i++) items.push(i)
  }
  if (startPage > boundaries + 1) items.push('...')
  for (let i = startPage; i <= endPage; i++) items.push(i)
  if (endPage < pageCount - boundaries) items.push('...')
  if (boundaries > 0) {
    for (let i = pageCount - boundaries + 1; i <= pageCount; i++) items.push(i)
  }
  return items
}

/**
 * Componente Pagination. Navegación data-driven entre páginas: recibe `page`
 * (actual) y `pageCount`, y emite `onchange(page)` al hacer click. `variant`
 * pega los botones (joined, default) o los separa (separated); `shape` elige
 * botones cuadrados o circulares. `siblings`/`boundaries` controlan cuántas
 * páginas se muestran alrededor de la actual y en los extremos (con elipsis
 * cuando el rango es grande).
 *
 * Uso típico (controlado por el consumidor):
 *   m(Pagination, { page, pageCount, onchange: (p) => { page = p } })
 *
 * @type {import('mithril').Component<import('./index').PaginationAttrs>}
 */
export const Pagination = {
  oninit(vnode) {
    // Modo no-controlado: si el consumidor pasa `defaultPage` y no controla
    // `page`, el componente gestiona su propia página internamente.
    vnode.state.page = vnode.attrs.defaultPage ?? 1
  },

  view(vnode) {
    const {
      page: pageProp,
      pageCount = 1,
      onchange,
      variant = 'joined',
      shape = 'square',
      size = 'md',
      siblings = 1,
      boundaries = 1,
      withControls = true,
      withEdges = false,
      hideWithOnePage = false,
      getHref,
      prevLabel,
      nextLabel,
      firstLabel,
      lastLabel,
      'aria-label': ariaLabel = 'Pagination',
      className,
      ...rest
    } = vnode.attrs

    const styles = pagination({ variant, shape, size })

    // Modo compositivo (retrocompatibilidad): si hay children explícitos,
    // se renderizan dentro del contenedor con los estilos base.
    if (vnode.children != null && vnode.children.length > 0) {
      return m('div', {
        className: cx('pagination', styles, className),
        role: 'navigation',
        'aria-label': ariaLabel,
        ...rest
      }, vnode.children)
    }

    const isControlled = pageProp !== undefined
    const current = isControlled ? pageProp : vnode.state.page
    const safePage = Math.min(Math.max(1, current), Math.max(1, pageCount))
    if (hideWithOnePage && pageCount <= 1) return null

    const setPage = (next) => {
      const clamped = Math.min(Math.max(1, next), Math.max(1, pageCount))
      if (onchange) onchange(clamped)
      if (!isControlled) {
        vnode.state.page = clamped
        m.redraw()
      }
    }

    const makeItem = (label, { active = false, disabled = false, isControl = false, navTo } = {}) => {
      const attrs = {
        className: cx(
          'btn pagination-item',
          button({ size, shape, active })
        ),
        'aria-label': isControl ? undefined : String(label),
        'aria-current': active ? 'page' : undefined,
      }
      const href = getHref && !disabled ? getHref(navTo) : undefined

      const click = (e) => {
        if (disabled) return
        if (href) e.preventDefault()
        setPage(navTo)
      }

      if (href !== undefined) {
        return m('a', { ...attrs, href, onclick: click }, label)
      }
      return m('button', { ...attrs, type: 'button', disabled, onclick: click }, label)
    }

    const items = []
    if (withEdges) {
      items.push(makeItem(firstLabel != null ? firstLabel : m(ChevronsLeft, { size: 16 }), {
        isControl: true,
        disabled: safePage === 1,
        navTo: 1,
      }))
    }
    if (withControls) {
      items.push(makeItem(prevLabel != null ? prevLabel : m(ChevronLeft, { size: 16 }), {
        isControl: true,
        disabled: safePage === 1,
        navTo: safePage - 1,
      }))
    }

    getRange(safePage, pageCount, siblings, boundaries).forEach((item) => {
      if (item === '...') {
        items.push(m('span', {
          className: 'pagination-ellipsis',
          'aria-hidden': 'true',
        }, '…'))
        return
      }
      items.push(makeItem(item, {
        active: item === safePage,
        navTo: item,
      }))
    })

    if (withControls) {
      items.push(makeItem(nextLabel != null ? nextLabel : m(ChevronRight, { size: 16 }), {
        isControl: true,
        disabled: safePage === pageCount,
        navTo: safePage + 1,
      }))
    }
    if (withEdges) {
      items.push(makeItem(lastLabel != null ? lastLabel : m(ChevronsRight, { size: 16 }), {
        isControl: true,
        disabled: safePage === pageCount,
        navTo: pageCount,
      }))
    }

    // Teclado: ←/→ navegan prev/next cuando el foco está dentro del root.
    const onkeydown = (e) => {
      if (e.key !== 'ArrowLeft' && e.key !== 'ArrowRight') return
      const next = e.key === 'ArrowLeft' ? safePage - 1 : safePage + 1
      if (next < 1 || next > pageCount) return
      e.preventDefault()
      setPage(next)
    }

    return m('div', {
      className: cx('pagination', styles, className),
      role: 'navigation',
      'aria-label': ariaLabel,
      onkeydown,
      ...rest
    }, items)
  }
}

/**
 * Componente PaginationButton. Botón individual de paginación (escape hatch
 * para uso compositivo manual): `active` marca la página actual y `disabled`
 * deshabilita. Reutiliza el recipe Button.
 *
 * @type {import('mithril').Component<import('./index').PaginationButtonAttrs>}
 */
export const PaginationButton = {
  view(vnode) {
    const { active, disabled, className, ...rest } = vnode.attrs

    return m('button', {
      type: 'button',
      className: cx('btn pagination-item', button({ active }), className),
      disabled,
      'aria-current': active ? 'page' : undefined,
      ...rest
    }, vnode.children)
  }
}
