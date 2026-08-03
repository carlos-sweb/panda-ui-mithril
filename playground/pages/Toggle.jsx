import m from 'mithril'
import { css } from '../../styled-system/css'
import { t } from '../i18n/index.js'
import { Toggle } from '../../src/index.js'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const row = css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' })

const usageCode = `<Toggle color="primary" checked />
<Toggle size="lg" />`

const classRows = [
  { className: 'toggle', prop: '<Toggle>', type: 'Component', description: 'For <input type="checkbox">' },
  { className: 'toggle-primary', prop: 'color="primary"', type: 'Color', description: 'primary color' },
  { className: 'toggle-secondary', prop: 'color="secondary"', type: 'Color', description: 'secondary color' },
  { className: 'toggle-accent', prop: 'color="accent"', type: 'Color', description: 'accent color' },
  { className: 'toggle-neutral', prop: 'color="neutral"', type: 'Color', description: 'neutral color' },
  { className: 'toggle-success', prop: 'color="success"', type: 'Color', description: 'success color' },
  { className: 'toggle-warning', prop: 'color="warning"', type: 'Color', description: 'warning color' },
  { className: 'toggle-info', prop: 'color="info"', type: 'Color', description: 'info color' },
  { className: 'toggle-error', prop: 'color="error"', type: 'Color', description: 'error color' },
  { className: 'toggle-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'toggle-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'toggle-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'toggle-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'toggle-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
]

export default {
  name: 'Toggle',
  category: 'Data Input',
  description: 'Toggle switch component for binary on/off states.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Toggle</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraphs.toggle')}
        </p>

        <div className={row}>
          <Toggle />
          <Toggle checked />
          <Toggle color="primary" checked />
          <Toggle color="secondary" checked />
        </div>

        <section>
          <h2 className={sectionTitle}>Usage</h2>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <h2 className={sectionTitle}>Class Reference</h2>
          <ClassTable rows={classRows} />
        </section>
      </div>
    )
  }
}
