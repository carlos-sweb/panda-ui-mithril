import m from 'mithril'
import { pagination } from '../../../styled-system/recipes'
import { button } from '../../../styled-system/recipes'
import { cx } from '../../../styled-system/css'
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-mithril'
import { t } from '../../i18n.js'

// Computes the list of pages to show (numbers and '...'): boundaries at the
// ends, siblings around the current page, with ellipsis where
// needed. Same approach as Mantine/welcome-ui.
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
 * Pagination component. Data-driven navigation between pages: receives `page`
 * (current) and `pageCount`, and emits `onchange(page)` on click. `variant`
 * joins the buttons (joined, default) or separates them (separated); `shape` chooses
 * square or circular buttons. `siblings`/`boundaries` control how many
 * pages are shown around the current one and at the ends (with ellipsis
 * when the range is large).
 *
 * Typical usage (controlled by the consumer):
 *   m(Pagination, { page, pageCount, onchange: (p) => { page = p } })
 *
 * @type {import('mithril').Component<import('./index').PaginationAttrs>}
 */
export const Pagination = {
  oninit(vnode) {
    // Uncontrolled mode: if the consumer passes `defaultPage` and does not control
    // `page`, the component manages its own page internally.
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
      'aria-label': ariaLabel = t('pagination.ariaLabel'),
      className,
      ...rest
    } = vnode.attrs

    const styles = pagination({ variant, shape, size })

    // Composition mode (backward compatibility): if there are explicit children,
    // they are rendered inside the container with the base styles.
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

    // Keyboard: ←/→ navigate prev/next when focus is inside the root.
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
 * PaginationButton component. Individual pagination button (escape hatch
 * for manual composition use): `active` marks the current page and `disabled`
 * disables it. Reuses the Button recipe.
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
