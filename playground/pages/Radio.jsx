import m from 'mithril'
import { css } from '../../styled-system/css'
import { Radio } from '../../src/index.js'

const section = css({ marginBottom: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const row = css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Radio',
  category: 'Data Input',
  description: 'Radio button component for selecting one option from a set.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Radio</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Radio button component for selecting one option from a set.
        </p>

        <section className={section}>
          <h3 className={heading}>Colors</h3>
          <div className={row}>
            <Radio name="r1" checked />
            <Radio name="r1" color="primary" checked />
            <Radio name="r1" color="secondary" checked />
            <Radio name="r1" color="accent" checked />
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Sizes</h3>
          <div className={row}>
            <Radio name="r2" size="xs" checked />
            <Radio name="r2" size="sm" checked />
            <Radio name="r2" size="md" checked />
            <Radio name="r2" size="lg" checked />
            <Radio name="r2" size="xl" checked />
          </div>
        </section>
      </div>
    )
  }
}
