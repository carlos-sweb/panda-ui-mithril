import m from 'mithril'
import { css } from '../../styled-system/css'
import { Breadcrumbs } from '../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Breadcrumbs',
  category: 'Navigation',
  description: 'Breadcrumbs help users understand their location in the site hierarchy.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Breadcrumbs</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Breadcrumbs help users understand their location in the site hierarchy.
        </p>

        <Breadcrumbs
          items={[
            { label: 'Home', href: '#' },
            { label: 'Docs', href: '#' },
            { label: 'Components' },
          ]}
        />
      </div>
    )
  }
}
