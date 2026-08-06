import m from 'mithril'
import { css } from '../../../styled-system/css'

export const ComponentPage = {
  view(vnode) {
    const { name, demo } = vnode.attrs
    const title = name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Component'

    if (!demo) {
      return m('div', { style: css({ maxWidth: '720px' }) }, [
        m('h1', { style: css({ fontSize: '1.75rem', fontWeight: '700', marginBottom: '0.5rem' }) },
          title
        ),
        m('p', { style: css({ color: 'token(colors.base-content)', opacity: 0.5, marginBottom: '2rem' }) },
          'Demo coming soon.'
        ),
      ])
    }

    return m('div', { style: css({ maxWidth: '720px' }) }, [
      m('h1', { style: css({ fontSize: '1.75rem', fontWeight: '700', marginBottom: '1.5rem' }) },
        title
      ),
      m(demo),
    ])
  }
}
