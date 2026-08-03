import m from 'mithril'
import { css } from '../../styled-system/css'
import { t } from '../i18n/index.js'
import { Button, Loading } from '../../src/index.js'
import { Heart } from 'lucide-mithril'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const section = css({ marginBottom: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const row = css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' })

const usageCode = `<Button color="primary">Primary</Button>
<Button variant="outline" color="error" size="lg">Error</Button>
<Button circle><Heart size={20} /></Button>`

const classRows = [
  { className: 'btn', prop: '<Button>', type: 'Component', description: 'Button' },
  { className: 'btn-neutral', prop: 'color="neutral"', type: 'Color', description: 'neutral color' },
  { className: 'btn-primary', prop: 'color="primary"', type: 'Color', description: 'primary color' },
  { className: 'btn-secondary', prop: 'color="secondary"', type: 'Color', description: 'secondary color' },
  { className: 'btn-accent', prop: 'color="accent"', type: 'Color', description: 'accent color' },
  { className: 'btn-info', prop: 'color="info"', type: 'Color', description: 'info color' },
  { className: 'btn-success', prop: 'color="success"', type: 'Color', description: 'success color' },
  { className: 'btn-warning', prop: 'color="warning"', type: 'Color', description: 'warning color' },
  { className: 'btn-error', prop: 'color="error"', type: 'Color', description: 'error color' },
  { className: 'btn-outline', prop: 'variant="outline"', type: 'Style', description: 'outline style' },
  { className: 'btn-dash', prop: 'variant="dash"', type: 'Style', description: 'dash style' },
  { className: 'btn-soft', prop: 'variant="soft"', type: 'Style', description: 'soft style' },
  { className: 'btn-ghost', prop: 'variant="ghost"', type: 'Style', description: 'ghost style' },
  { className: 'btn-link', prop: 'variant="link"', type: 'Style', description: 'looks like a link' },
  { className: 'btn-active', prop: 'active', type: 'Behavior', description: 'looks active' },
  { className: 'btn-disabled', prop: 'disabled', type: 'Behavior', description: 'looks disabled — pass className="btn-disabled" instead if you need it to still be clickable' },
  { className: 'btn-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'btn-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'btn-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'btn-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'btn-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
  { className: 'btn-wide', prop: 'wide', type: 'Modifier', description: 'more horizontal padding' },
  { className: 'btn-block', prop: 'block', type: 'Modifier', description: 'Full width' },
  { className: 'btn-square', prop: 'square', type: 'Modifier', description: '1:1 ratio' },
  { className: 'btn-circle', prop: 'circle', type: 'Modifier', description: '1:1 ratio with rounded corners' },
]

export default {
  name: 'Button',
  category: 'Actions',
  description: 'Buttons allow users to take actions and make choices with a single tap.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Button</h1>        
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraphs.button')}
        </p>

        <section>
          <h3 className={heading}>Default</h3>
          <div className={row}>
            <Button>Default</Button>
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
          <h3 className={heading}>Responsive</h3>
          <p className={css({ opacity: 0.6, marginBottom: '0.5rem', fontSize: '0.875rem' })}>
            Responsive button sizes require Panda CSS responsive variants (not yet implemented in cva)
          </p>
          <div className={row}>
            <Button size="xs">Responsive (xs)</Button>
          </div>
        </section>

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
          <h3 className={heading}>Soft colors</h3>
          <div className={row}>
            <Button variant="soft" color="neutral">Neutral</Button>
            <Button variant="soft" color="primary">Primary</Button>
            <Button variant="soft" color="secondary">Secondary</Button>
            <Button variant="soft" color="accent">Accent</Button>
            <Button variant="soft" color="info">Info</Button>
            <Button variant="soft" color="success">Success</Button>
            <Button variant="soft" color="warning">Warning</Button>
            <Button variant="soft" color="error">Error</Button>
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Outline colors</h3>
          <div className={row}>
            <Button variant="outline" color="neutral">Neutral</Button>
            <Button variant="outline" color="primary">Primary</Button>
            <Button variant="outline" color="secondary">Secondary</Button>
            <Button variant="outline" color="accent">Accent</Button>
            <Button variant="outline" color="info">Info</Button>
            <Button variant="outline" color="success">Success</Button>
            <Button variant="outline" color="warning">Warning</Button>
            <Button variant="outline" color="error">Error</Button>
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Dash colors</h3>
          <div className={row}>
            <Button variant="dash" color="neutral">Neutral</Button>
            <Button variant="dash" color="primary">Primary</Button>
            <Button variant="dash" color="secondary">Secondary</Button>
            <Button variant="dash" color="accent">Accent</Button>
            <Button variant="dash" color="info">Info</Button>
            <Button variant="dash" color="success">Success</Button>
            <Button variant="dash" color="warning">Warning</Button>
            <Button variant="dash" color="error">Error</Button>
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Neutral on light background</h3>
          <div style={{ background: 'white', padding: '1rem' }}>
            <div className={row}>
              <Button variant="outline">Outline</Button>
              <Button variant="dash">Dash</Button>
            </div>
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Active colors</h3>
          <div className={row}>
            <Button active color="neutral">Neutral</Button>
            <Button active color="primary">Primary</Button>
            <Button active color="secondary">Secondary</Button>
            <Button active color="accent">Accent</Button>
            <Button active color="info">Info</Button>
            <Button active color="success">Success</Button>
            <Button active color="warning">Warning</Button>
            <Button active color="error">Error</Button>
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Ghost + Link</h3>
          <div className={row}>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Wide</h3>
          <div className={row}>
            <Button wide>Wide</Button>
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Disabled</h3>
          <div className={row}>
            <Button disabled>Disabled (attribute)</Button>
            <Button className="btn-disabled">Disabled (class)</Button>
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Square + Circle</h3>
          <div className={row}>
            <Button square><Heart size={20} /></Button>
            <Button circle><Heart size={20} /></Button>
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Button with icon</h3>
          <div className={row}>
            <Button><Heart size={20} /> Like</Button>
            <Button>Like <Heart size={20} /></Button>
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Block</h3>
          <div className={row}>
            <Button block>Block</Button>
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Loading spinner</h3>
          <div className={row}>
            <Button square><Loading /></Button>
            <Button><Loading /> Loading</Button>
          </div>
        </section>

        <section>
          <h2 className={sectionTitle}>{t('common.usage')}</h2>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <h2 className={sectionTitle}>{t('common.classReference')}</h2>
          <ClassTable rows={classRows} />
        </section>
      </div>
    )
  }
}
