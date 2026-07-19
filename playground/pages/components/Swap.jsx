import m from 'mithril'
import { css } from '../../../styled-system/css'
import { Swap } from '../../../src/index.js'

const row = css({ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' })

export default {
  name: 'Swap',
  category: 'Actions',
  description: 'Swap elements with a transition animation.',

  view() {
    return (
      <div>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Swap</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Swap elements with a transition animation.
        </p>

        <div className={row}>
          <Swap on="On" off="Off" style="rotate" active />
          <Swap on="On" off="Off" style="flip" />
        </div>
      </div>
    )
  }
}
