import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Status } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const row = css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' })

const usageCode = `<Status color="success" />
<Status color="error" size="lg" />`

const classRows = [
  { className: 'status', prop: '<Status>', type: 'Component', description: 'Status icon' },
  { className: 'status-neutral', prop: 'color="neutral"', type: 'Color', description: 'neutral color' },
  { className: 'status-primary', prop: 'color="primary"', type: 'Color', description: 'primary color' },
  { className: 'status-secondary', prop: 'color="secondary"', type: 'Color', description: 'secondary color' },
  { className: 'status-accent', prop: 'color="accent"', type: 'Color', description: 'accent color' },
  { className: 'status-info', prop: 'color="info"', type: 'Color', description: 'info color' },
  { className: 'status-success', prop: 'color="success"', type: 'Color', description: 'success color' },
  { className: 'status-warning', prop: 'color="warning"', type: 'Color', description: 'warning color' },
  { className: 'status-error', prop: 'color="error"', type: 'Color', description: 'error color' },
  { className: 'status-xs', prop: 'size="xs"', type: 'Size', description: 'extra small size' },
  { className: 'status-sm', prop: 'size="sm"', type: 'Size', description: 'small size' },
  { className: 'status-md', prop: 'size="md" (default)', type: 'Size', description: 'medium size', isDefault: true },
  { className: 'status-lg', prop: 'size="lg"', type: 'Size', description: 'large size' },
  { className: 'status-xl', prop: 'size="xl"', type: 'Size', description: 'extra large size' },
]

export default {
  name: 'Status',
  category: 'Feedback',
  description: 'Status indicator component for showing online/offline states.',

  oninit() { loadPageI18n('status') },
  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Status</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <div className={row}>
          <Status color="primary" />
          <Status color="secondary" />
          <Status color="accent" />
          <Status color="info" />
          <Status color="success" />
          <Status color="warning" />
          <Status color="error" />
        </div>

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
