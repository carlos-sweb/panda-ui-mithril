import m from 'mithril'
import { css } from '../../styled-system/css'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Collapse',
  category: 'Layout',
  description: 'Collapse component for toggling visibility of content sections.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Collapse</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Collapse component for toggling visibility of content sections.
        </p>

        <div style={css({ padding: '2rem', background: 'base-200', borderRadius: '0.5rem', textAlign: 'center' })}>
          <p>Collapse component coming soon.</p>
        </div>
      </div>
    )
  }
}
