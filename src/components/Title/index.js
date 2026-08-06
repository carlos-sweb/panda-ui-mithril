import m from 'mithril'
import { titleStyles } from '../../recipes/title'
import { cx } from '../../utils/cx'

const tagSizes = { h1: '1', h2: '2', h3: '3', h4: '4', h5: '5', h6: '6', p: '7', span: '7', div: '7' }

/**
 * Title — typography helper component.
 * Renders a semantic HTML heading or text element with visual style props.
 *
 * @type {import('mithril').Component<import('./index').TitleAttrs>}
 */
export const Title = {
  view(vnode) {
    const {
      tag = 'h1',
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

    const resolvedSize = size ?? tagSizes[tag] ?? '1'

    return m(tag, {
      className: cx('title', titleStyles({
        size: resolvedSize,
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
