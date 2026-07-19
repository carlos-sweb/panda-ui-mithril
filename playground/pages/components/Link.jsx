import m from 'mithril'
import { css } from '../../../styled-system/css'
import { Link } from '../../../src/index.js'

const row = css({ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' })

export default {
  name: 'Link',
  category: 'Actions',
  description: 'Link component for navigation with styled anchor tags.',

  view() {
    return (
      <div>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Link</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Link component for navigation with styled anchor tags.
        </p>

        <div className={row}>
          <Link href="#">Default</Link>
          <Link href="#" color="primary">Primary</Link>
          <Link href="#" color="secondary">Secondary</Link>
          <Link href="#" color="accent">Accent</Link>
        </div>
      </div>
    )
  }
}
