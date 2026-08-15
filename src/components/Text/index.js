import m from 'mithril'
import { text } from '../../../styled-system/recipes'
import { cx } from '../../utils/cx'

/**
 * Text — typography helper component.
 * Renders a semantic text element (`<p>` by default) with visual style props.
 *
 * @type {import('mithril').Component<import('./index').TextAttrs>}
 */
export const Text = {
  view(vnode) {
    const {
      as = 'p',
      size,
      color,
      align,
      transform,
      weight,
      truncate,
      italic,
      className,
      ...rest
    } = vnode.attrs

    return m(as, {
      className: cx('text', text({
        size,
        color,
        align,
        transform,
        weight,
        truncate,
        italic,
      }), className),
      ...rest,
    }, vnode.children)
  }
}
