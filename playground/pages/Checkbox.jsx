import m from 'mithril'
import { css } from '../../styled-system/css'
import { Checkbox } from '../../src/index.js'

const section = css({ marginBottom: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const row = css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Checkbox',
  category: 'Data Input',
  description: 'Checkbox component for toggling options on/off.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Checkbox</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Checkbox component for toggling options on/off.
        </p>

        <section className={section}>
          <h3 className={heading}>Colors</h3>
          <div className={row}>
            <Checkbox />
            <Checkbox checked />
            <Checkbox color="primary" checked />
            <Checkbox color="secondary" checked />
            <Checkbox color="accent" checked />
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Sizes</h3>
          <div className={row}>
            <Checkbox size="xs" checked />
            <Checkbox size="sm" checked />
            <Checkbox size="md" checked />
            <Checkbox size="lg" checked />
            <Checkbox size="xl" checked />
          </div>
        </section>
      </div>
    )
  }
}
