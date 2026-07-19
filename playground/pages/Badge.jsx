import m from 'mithril'
import { css } from '../../styled-system/css'
import { Badge } from '../../src/index.js'

const section = css({ marginBottom: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const row = css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Badge',
  category: 'Data Display',
  description: 'Badges are used to highlight an item\'s status for quick recognition.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Badge</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Badges are used to highlight an item's status for quick recognition.
        </p>

        <section className={section}>
          <h3 className={heading}>Colors</h3>
          <div className={row}>
            <Badge color="neutral">Neutral</Badge>
            <Badge color="primary">Primary</Badge>
            <Badge color="secondary">Secondary</Badge>
            <Badge color="accent">Accent</Badge>
            <Badge color="info">Info</Badge>
            <Badge color="success">Success</Badge>
            <Badge color="warning">Warning</Badge>
            <Badge color="error">Error</Badge>
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Variants</h3>
          <div className={row}>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="dash">Dash</Badge>
            <Badge variant="ghost">Ghost</Badge>
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Sizes</h3>
          <div className={row}>
            <Badge size="xs">XS</Badge>
            <Badge size="sm">SM</Badge>
            <Badge size="md">MD</Badge>
            <Badge size="lg">LG</Badge>
            <Badge size="xl">XL</Badge>
          </div>
        </section>
      </div>
    )
  }
}
