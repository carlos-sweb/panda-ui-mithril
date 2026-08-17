import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Textarea, Text, Block } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const usageCode = `<Textarea placeholder="Write something..." />
<Textarea color="primary" placeholder="Primary textarea" />`

const classRows = [
  { className: 'textarea', prop: '<Textarea>', type: 'Component', description: 'For <textarea> element' },
  { className: 'textarea-ghost', prop: 'ghost', type: 'Style', description: 'ghost style' },
  { className: 'textarea-neutral', prop: 'color="neutral"', type: 'Color', description: 'neutral color' },
  { className: 'textarea-primary', prop: 'color="primary"', type: 'Color', description: 'primary color' },
  { className: 'textarea-secondary', prop: 'color="secondary"', type: 'Color', description: 'secondary color' },
  { className: 'textarea-accent', prop: 'color="accent"', type: 'Color', description: 'accent color' },
  { className: 'textarea-info', prop: 'color="info"', type: 'Color', description: 'info color' },
  { className: 'textarea-success', prop: 'color="success"', type: 'Color', description: 'success color' },
  { className: 'textarea-warning', prop: 'color="warning"', type: 'Color', description: 'warning color' },
  { className: 'textarea-error', prop: 'color="error"', type: 'Color', description: 'error color' },
  { className: 'textarea-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'textarea-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'textarea-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'textarea-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'textarea-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
]

export default {
  name: 'Textarea',
  category: 'Data Input',
  description: 'Textarea component for multi-line text entry.',

  oninit() { loadPageI18n('textarea') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Textarea</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Textarea placeholder="Write something..." />
        <Textarea color="primary" placeholder="Primary textarea" />

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <CodeExample code={usageCode} />
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </Block>
      </Stack>
    )
  }
}
