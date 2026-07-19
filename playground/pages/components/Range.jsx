import m from 'mithril'
import { css } from '../../../styled-system/css'
import { Range } from '../../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Range',
  category: 'Data Input',
  description: 'Range slider component for selecting values within a range.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Range</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Range slider component for selecting values within a range.
        </p>

        <Range value={40} max={100} />
        <Range value={60} max={100} color="primary" />
        <Range value={80} max={100} color="secondary" />
      </div>
    )
  }
}
