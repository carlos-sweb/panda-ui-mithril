import m from 'mithril'
import { css } from '../../../styled-system/css'
import { Stack } from '../../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Stack',
  category: 'Layout',
  description: 'Stack component for vertical layout with consistent spacing.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Stack</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Stack component for vertical layout with consistent spacing.
        </p>

        <Stack>
          <div className="bg-base-200 p-4 rounded-box">Item 1</div>
          <div className="bg-base-200 p-4 rounded-box">Item 2</div>
          <div className="bg-base-200 p-4 rounded-box">Item 3</div>
        </Stack>
      </div>
    )
  }
}
