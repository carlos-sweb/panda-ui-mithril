import m from 'mithril'
import { css } from '../../styled-system/css'
import { Label, TextInput } from '../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Label',
  category: 'Data Input',
  description: 'Label component for form field labels with floating variant.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Label</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Label component for form field labels with floating variant.
        </p>

        <Label>Regular Label</Label>
        <Label floating>
          <TextInput placeholder="Type here..." />
          <span>Floating Label</span>
        </Label>
      </div>
    )
  }
}
