import m from 'mithril'
import { css } from '../../../styled-system/css'
import { Aura } from '../../../src/index.js'

const row = css({ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Aura',
  category: 'Feedback',
  description: 'Aura component for displaying pulsing indicators.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Aura</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Aura component for displaying pulsing indicators.
        </p>

        <div className={row}>
          <Aura size="sm" color="primary" />
          <Aura size="md" color="secondary" pulse />
          <Aura size="lg" color="accent" />
          <Aura size="md" color="success" pulse />
          <Aura size="md" color="error" />
        </div>
      </div>
    )
  }
}
