import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Toggle } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const row = css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' })

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

  oninit() { loadPageI18n('toggle') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Toggle</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <div className={row}>
          <Toggle />
          <Toggle checked />
          <Toggle color="primary" checked />
          <Toggle color="secondary" checked />
        </div>

        <section>
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </section>
      </div>
    )
  }
}
