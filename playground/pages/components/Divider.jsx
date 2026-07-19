import m from 'mithril'
import { css } from '../../../styled-system/css'
import { Divider } from '../../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Divider',
  category: 'Layout',
  description: 'Divider component for separating content sections.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Divider</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Divider component for separating content sections.
        </p>

        <Divider>OR</Divider>
        <Divider color="primary">Primary</Divider>
        <Divider color="success">Success</Divider>
      </div>
    )
  }
}
