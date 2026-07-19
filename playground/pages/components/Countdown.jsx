import m from 'mithril'
import { css } from '../../../styled-system/css'
import { Countdown } from '../../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Countdown',
  category: 'Data Display',
  description: 'Countdown component for displaying remaining time.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Countdown</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Countdown component for displaying remaining time.
        </p>

        <Countdown value={7} />
      </div>
    )
  }
}
