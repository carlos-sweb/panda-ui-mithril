import m from 'mithril'
import { css } from '../../styled-system/css'
import { Toggle } from '../../src/index.js'

const row = css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Toggle',
  category: 'Data Input',
  description: 'Toggle switch component for binary on/off states.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Toggle</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Toggle switch component for binary on/off states.
        </p>

        <div className={row}>
          <Toggle />
          <Toggle checked />
          <Toggle color="primary" checked />
          <Toggle color="secondary" checked />
        </div>
      </div>
    )
  }
}
