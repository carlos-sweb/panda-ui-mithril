import m from 'mithril'
import { css } from '../../../styled-system/css'
import { Button } from '../../../src/index.js'

const section = css({ marginBottom: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const row = css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Button',
  category: 'Actions',
  description: 'Buttons allow users to take actions and make choices with a single tap.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Button</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Buttons allow users to take actions and make choices with a single tap. They communicate what will happen when the user touches them.
        </p>

        <section className={section}>
          <h3 className={heading}>Colors</h3>
          <div className={row}>
            <Button color="neutral">Neutral</Button>
            <Button color="primary">Primary</Button>
            <Button color="secondary">Secondary</Button>
            <Button color="accent">Accent</Button>
            <Button color="info">Info</Button>
            <Button color="success">Success</Button>
            <Button color="warning">Warning</Button>
            <Button color="error">Error</Button>
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Variants</h3>
          <div className={row}>
            <Button variant="outline">Outline</Button>
            <Button variant="dash">Dash</Button>
            <Button variant="soft">Soft</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Sizes</h3>
          <div className={row}>
            <Button size="xs">XS</Button>
            <Button size="sm">SM</Button>
            <Button size="md">MD</Button>
            <Button size="lg">LG</Button>
            <Button size="xl">XL</Button>
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Shapes</h3>
          <div className={row}>
            <Button square>Square</Button>
            <Button circle>Circle</Button>
            <Button wide>Wide</Button>
            <Button block>Block</Button>
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>States</h3>
          <div className={row}>
            <Button active>Active</Button>
            <Button disabled>Disabled</Button>
          </div>
        </section>
      </div>
    )
  }
}
