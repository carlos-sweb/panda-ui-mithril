import m from 'mithril'
import { css } from '../../styled-system/css'
import { TextInput } from '../../src/index.js'

const section = css({ marginBottom: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'TextInput',
  category: 'Data Input',
  description: 'Text input component for single-line text entry.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>TextInput</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Text input component for single-line text entry.
        </p>

        <TextInput placeholder="Enter text..." />
        <TextInput color="primary" placeholder="Primary input" />
        <TextInput color="error" placeholder="Error input" />

        <section className={section}>
          <h3 className={heading}>Sizes</h3>
          <TextInput size="xs" placeholder="XS" />
          <TextInput size="sm" placeholder="SM" />
          <TextInput size="md" placeholder="MD" />
          <TextInput size="lg" placeholder="LG" />
          <TextInput size="xl" placeholder="XL" />
        </section>
      </div>
    )
  }
}
