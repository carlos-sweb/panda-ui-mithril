import m from 'mithril'
import { X } from 'lucide-mithril'
import { tagRecipe } from '../../recipes/tag'
import { cx } from '../../utils/cx'

/**
 * Tag — small interactive UI element to label, categorize, or filter content.
 *
 * @param {object} vnode - Mithril vnode
 * @param {'default'|'info'|'success'|'warning'|'error'} [vnode.attrs.variant]
 * @param {'md'|'lg'} [vnode.attrs.size]
 * @param {import('mithril').Vnode} [vnode.attrs.icon] - Lucide icon component
 * @param {(e: Event) => void} [vnode.attrs.onRemove] - Shows an X button
 * @param {boolean} [vnode.attrs.clickable]
 * @param {boolean} [vnode.attrs.disabled]
 * @type {import('mithril').Component<import('./index').TagAttrs>}
 */
export const Tag = {
  view(vnode) {
    const { variant, size, icon, onRemove, clickable, disabled, className, ...rest } = vnode.attrs
    const children = vnode.children
    const isOneChar = typeof children === 'string' && children.length === 1

    return m(clickable ? 'button' : 'span', {
      className: cx('tag', tagRecipe({ variant, size, clickable, disabled, square: isOneChar }), className),
      type: clickable ? 'button' : undefined,
      disabled,
      ...rest,
    }, [
      icon && m('span', { className: 'tag-icon' }, m(icon, { size: 14 })),
      m('span', { className: 'tag-label' }, children),
      onRemove && m('button', {
        type: 'button',
        className: 'tag-remove',
        onclick: (e) => { e.stopPropagation(); onRemove(e) },
      }, m(X, { size: 12, 'stroke-width': 2 })),
    ])
  }
}
