import m from 'mithril'
import { X } from 'lucide-mithril'
import { Button } from '../Button'
import { cx } from '../../utils/cx'

const iconSizes = { xs: 12, sm: 14, md: 16, lg: 18, xl: 20 }

/**
 * CloseButton — a circular button with an X icon that scales with the button size.
 * Supports all Button props (color, variant, size, disabled, etc.).
 *
 * @type {import('mithril').Component<import('./index').CloseButtonAttrs>}
 */
export const CloseButton = {
  view(vnode) {
    const { size, className, ...rest } = vnode.attrs
    return m(Button, {
      shape: 'circle',
      size,
      className: cx('close-button', className),
      ...rest,
    }, m(X, { size: iconSizes[size] || 16 }))
  }
}
