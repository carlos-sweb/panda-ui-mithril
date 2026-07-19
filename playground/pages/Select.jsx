import m from 'mithril'
import { css } from '../../styled-system/css'
import { Select } from '../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Select',
  category: 'Data Input',
  description: 'Select dropdown component for choosing options.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Select</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Select dropdown component for choosing options.
        </p>

        <Select>
          <option value="">Pick one</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </Select>
        <Select color="primary">
          <option value="">Pick one</option>
          <option value="1">Option 1</option>
        </Select>
      </div>
    )
  }
}
