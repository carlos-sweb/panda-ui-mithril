import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t } from '../../i18n/index.js'
import { Checkbox } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const section = css({ marginBottom: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const row = css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' })

const usageCode = `<Checkbox color="primary" checked />
<Checkbox size="lg" />`

const classRows = [
  { className: 'checkbox', prop: '<Checkbox>', type: 'Component', description: 'Checkbox' },
  { className: 'checkbox-primary', prop: 'color="primary"', type: 'Color', description: 'primary color' },
  { className: 'checkbox-secondary', prop: 'color="secondary"', type: 'Color', description: 'secondary color' },
  { className: 'checkbox-accent', prop: 'color="accent"', type: 'Color', description: 'accent color' },
  { className: 'checkbox-neutral', prop: 'color="neutral"', type: 'Color', description: 'neutral color' },
  { className: 'checkbox-success', prop: 'color="success"', type: 'Color', description: 'success color' },
  { className: 'checkbox-warning', prop: 'color="warning"', type: 'Color', description: 'warning color' },
  { className: 'checkbox-info', prop: 'color="info"', type: 'Color', description: 'info color' },
  { className: 'checkbox-error', prop: 'color="error"', type: 'Color', description: 'error color' },
  { className: 'checkbox-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'checkbox-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'checkbox-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'checkbox-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'checkbox-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
]

export default {
  name: 'Checkbox',
  category: 'Data Input',
  description: 'Checkbox component for toggling options on/off.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Checkbox</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraphs.checkbox')}
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
