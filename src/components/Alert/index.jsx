import m from 'mithril'
import { alertStyles } from '../../recipes/alert'
import { cx } from '../../utils/cx'


export const Alert = {
  view(vnode) {
    const {
      variant,
      color,
      direction,
      icon,
      title,
      description,
      className,
      ...rest
    } = vnode.attrs

    const styles = cx(
      alertStyles({ variant, color, direction }),
      className
    )

    const hasIcon = !!icon
    const hasTitle = !!title
    const hasDescription = !!description
    const hasAction = vnode.attrs.action != null

    return (
      <div role="alert" className={styles} {...rest}>
        {hasIcon && (
          <span className={cx('alert-icon', 'shrink-0')}>
            {icon}
          </span>
        )}

        {(hasTitle || hasDescription || vnode.children) && (
          <div className={cx('alert-content', 'min-w-0')}>
            {hasTitle && (
              <h3 className="font-bold">{title}</h3>
            )}
            {hasDescription && (
              <div className="alert-description text-xs">{description}</div>
            )}
            {vnode.children && !hasTitle && !hasDescription && (
              <span>{vnode.children}</span>
            )}
            {vnode.children && (hasTitle || hasDescription) && (
              <div>{vnode.children}</div>
            )}
          </div>
        )}

        {hasAction && (
          <div className={cx('alert-action', 'shrink-0', 'flex', 'gap-2')}>
            {vnode.attrs.action}
          </div>
        )}
      </div>
    )
  }
}