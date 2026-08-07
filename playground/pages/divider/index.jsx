import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Divider } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' })

const usageCode = `<Divider>OR</Divider>
<Divider color="primary">Primary</Divider>
<Divider direction="vertical">Vertical</Divider>`

const classRows = [
  { className: 'divider', prop: '<Divider>', type: 'Component', description: 'A divider line between two elements' },
  { className: 'divider-neutral', prop: 'color="neutral"', type: 'Color', description: 'neutral color' },
  { className: 'divider-primary', prop: 'color="primary"', type: 'Color', description: 'primary color' },
  { className: 'divider-secondary', prop: 'color="secondary"', type: 'Color', description: 'secondary color' },
  { className: 'divider-accent', prop: 'color="accent"', type: 'Color', description: 'accent color' },
  { className: 'divider-success', prop: 'color="success"', type: 'Color', description: 'success color' },
  { className: 'divider-warning', prop: 'color="warning"', type: 'Color', description: 'warning color' },
  { className: 'divider-info', prop: 'color="info"', type: 'Color', description: 'info color' },
  { className: 'divider-error', prop: 'color="error"', type: 'Color', description: 'error color' },
  { className: 'divider-vertical', prop: 'direction="horizontal" (default)', type: 'Direction', description: 'Divide vertical elements (on top of each other) — this is the default, no prop needed', isDefault: true },
  { className: 'divider-horizontal', prop: 'direction="vertical"', type: 'Direction', description: 'Divide horizontal elements (next to each other) — note: this component\'s direction prop names the opposite of its class name' },
  { className: 'divider-start', prop: 'placement="start"', type: 'Placement', description: 'Pushes the divider text to the start' },
  { className: 'divider-end', prop: 'placement="end"', type: 'Placement', description: 'Pushes the divider text to the end' },
]

export default {
  name: 'Divider',
  category: 'Layout',
  description: 'Divider component for separating content sections.',

  oninit() { loadPageI18n('divider') },
  view() {
    return (
      <div className={stack}>
        <Title as="h1" size="2">Divider</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <Divider>OR</Divider>
        <Divider color="primary">Primary</Divider>
        <Divider color="success">Success</Divider>

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
