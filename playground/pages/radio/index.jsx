import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Radio } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const section = css({ marginBottom: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const row = css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' })

const usageCode = `<Radio name="option" color="primary" checked />
<Radio name="option" size="lg" />`

const classRows = [
  { className: 'radio', prop: '<Radio>', type: 'Component', description: 'For radio input' },
  { className: 'radio-neutral', prop: 'color="neutral"', type: 'Color', description: 'neutral color' },
  { className: 'radio-primary', prop: 'color="primary"', type: 'Color', description: 'primary color' },
  { className: 'radio-secondary', prop: 'color="secondary"', type: 'Color', description: 'secondary color' },
  { className: 'radio-accent', prop: 'color="accent"', type: 'Color', description: 'accent color' },
  { className: 'radio-success', prop: 'color="success"', type: 'Color', description: 'success color' },
  { className: 'radio-warning', prop: 'color="warning"', type: 'Color', description: 'warning color' },
  { className: 'radio-info', prop: 'color="info"', type: 'Color', description: 'info color' },
  { className: 'radio-error', prop: 'color="error"', type: 'Color', description: 'error color' },
  { className: 'radio-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'radio-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'radio-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'radio-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'radio-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
]

export default {
  name: 'Radio',
  category: 'Data Input',
  description: 'Radio button component for selecting one option from a set.',

  oninit() { loadPageI18n('radio') },
  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Radio</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
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
