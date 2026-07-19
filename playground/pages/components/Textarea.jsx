import m from 'mithril'
import { css } from '../../../styled-system/css'
import { Textarea } from '../../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Textarea',
  category: 'Data Input',
  description: 'Textarea component for multi-line text entry.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Textarea</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Textarea component for multi-line text entry.
        </p>

        <Textarea placeholder="Write something..." />
        <Textarea color="primary" placeholder="Primary textarea" />
      </div>
    )
  }
}
