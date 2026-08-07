import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Select } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'


const usageCode = `<Select color="primary">
  <option value="">Pick one</option>
  <option value="1">Option 1</option>
</Select>`

const classRows = [
  { className: 'select', prop: '<Select>', type: 'Component', description: 'For <select> element' },
  { className: 'select-ghost', prop: 'ghost', type: 'Style', description: 'ghost style' },
  { className: 'select-neutral', prop: 'color="neutral"', type: 'Color', description: 'neutral color' },
  { className: 'select-primary', prop: 'color="primary"', type: 'Color', description: 'primary color' },
  { className: 'select-secondary', prop: 'color="secondary"', type: 'Color', description: 'secondary color' },
  { className: 'select-accent', prop: 'color="accent"', type: 'Color', description: 'accent color' },
  { className: 'select-info', prop: 'color="info"', type: 'Color', description: 'info color' },
  { className: 'select-success', prop: 'color="success"', type: 'Color', description: 'success color' },
  { className: 'select-warning', prop: 'color="warning"', type: 'Color', description: 'warning color' },
  { className: 'select-error', prop: 'color="error"', type: 'Color', description: 'error color' },
  { className: 'select-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'select-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'select-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'select-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'select-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
]

export default {
  name: 'Select',
  category: 'Data Input',
  description: 'Select dropdown component for choosing options.',

  oninit() { loadPageI18n('select') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Select</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <Select>
          <option value="">Pick one</option>
          <option value="1">Option 1</option>
          <option value="2">Option 2</option>
        </Select>
        <Select color="primary">
          <option value="">Pick one</option>
          <option value="1">Option 1</option>
        </Select>

        <section>
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </section>
      </Stack>
    )
  }
}
