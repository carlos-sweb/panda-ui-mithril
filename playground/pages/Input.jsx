import m from 'mithril'
import { css } from '../../styled-system/css'
import { t } from '../i18n/index.js'
import { TextInput } from '../../src/index.js'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const section = css({ marginBottom: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' })

const usageCode = `<TextInput placeholder="Enter text..." />
<TextInput color="primary" placeholder="Primary input" />
<TextInput size="lg" placeholder="Large" />`

const classRows = [
  { className: 'input', prop: '<TextInput>', type: 'Component', description: 'For <input type="text"> tag or a wrapper of <input type="text"> tag' },
  { className: 'input-ghost', prop: 'ghost', type: 'Style', description: 'ghost style' },
  { className: 'input-neutral', prop: 'color="neutral"', type: 'Color', description: 'neutral color' },
  { className: 'input-primary', prop: 'color="primary"', type: 'Color', description: 'primary color' },
  { className: 'input-secondary', prop: 'color="secondary"', type: 'Color', description: 'secondary color' },
  { className: 'input-accent', prop: 'color="accent"', type: 'Color', description: 'accent color' },
  { className: 'input-info', prop: 'color="info"', type: 'Color', description: 'info color' },
  { className: 'input-success', prop: 'color="success"', type: 'Color', description: 'success color' },
  { className: 'input-warning', prop: 'color="warning"', type: 'Color', description: 'warning color' },
  { className: 'input-error', prop: 'color="error"', type: 'Color', description: 'error color' },
  { className: 'input-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'input-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'input-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'input-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'input-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
]

export default {
  name: 'TextInput',
  category: 'Data Input',
  description: 'Text input component for single-line text entry.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>TextInput</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraphs.input')}
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
