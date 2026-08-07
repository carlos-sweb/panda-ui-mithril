import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, TextInput } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const section = css({ marginBottom: '2rem' })

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

  oninit() { loadPageI18n('input') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">TextInput</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <TextInput placeholder="Enter text..." />
        <TextInput color="primary" placeholder="Primary input" />
        <TextInput color="error" placeholder="Error input" />

        <section className={section}>
          <Title as="h3" size="5">Sizes</Title>
          <TextInput size="xs" placeholder="XS" />
          <TextInput size="sm" placeholder="SM" />
          <TextInput size="md" placeholder="MD" />
          <TextInput size="lg" placeholder="LG" />
          <TextInput size="xl" placeholder="XL" />
        </section>

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
