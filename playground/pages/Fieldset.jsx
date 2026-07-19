import m from 'mithril'
import { css } from '../../styled-system/css'
import { Fieldset, TextInput } from '../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Fieldset',
  category: 'Data Input',
  description: 'Fieldset component for grouping related form fields.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Fieldset</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Fieldset component for grouping related form fields.
        </p>

        <Fieldset legend="Personal Information">
          <TextInput placeholder="Name" />
          <TextInput placeholder="Email" />
        </Fieldset>
      </div>
    )
  }
}
