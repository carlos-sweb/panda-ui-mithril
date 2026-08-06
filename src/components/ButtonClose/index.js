import m from 'mithril'
import { X } from 'lucide-mithril'
import { Button } from '../Button/index.jsx'
import { cx } from '../../utils/cx'

const iconSizes = { xs: 12, sm: 14, md: 16, lg: 18, xl: 20 }

/**
 * CloseButton — a circular button with an X icon that scales with the button size.
 * Supports all Button props (color, variant, size, disabled, etc.).
 *
 * @type {import('mithril').Component<import('./index').CloseButtonAttrs>}
 */
export const ButtonClose = {
  view(vnode) {
    const { size, shape, strokeWidth, 'stroke-width': swKebab, className, ...rest } = vnode.attrs
    const sw = swKebab ?? strokeWidth ?? 3
    return m(Button, {
      circle: shape !== 'square',
      square: shape === 'square',
      size,
      className: cx('close-button', className),
      ...rest,
    }, m(X, { size: iconSizes[size] || 16, 'stroke-width': sw }))
  }
}
