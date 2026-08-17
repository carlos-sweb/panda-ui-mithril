import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Range, Text, Block } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'


const usageCode = '<Range value={40} max={100} color="primary" />'

const classRows = [
  { className: 'range', prop: '<Range value={...} max={...}>', type: 'Component', description: 'For <input type="range"> tag' },
  { className: 'range-neutral', prop: 'color="neutral"', type: 'Color', description: 'neutral color' },
  { className: 'range-primary', prop: 'color="primary"', type: 'Color', description: 'primary color' },
  { className: 'range-secondary', prop: 'color="secondary"', type: 'Color', description: 'secondary color' },
  { className: 'range-accent', prop: 'color="accent"', type: 'Color', description: 'accent color' },
  { className: 'range-success', prop: 'color="success"', type: 'Color', description: 'success color' },
  { className: 'range-warning', prop: 'color="warning"', type: 'Color', description: 'warning color' },
  { className: 'range-info', prop: 'color="info"', type: 'Color', description: 'info color' },
  { className: 'range-error', prop: 'color="error"', type: 'Color', description: 'error color' },
  { className: 'range-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'range-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'range-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'range-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'range-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
  { className: 'range-vertical', prop: 'vertical', type: 'Direction', description: 'Vertical slider' },
]

export default {
  name: 'Range',
  category: 'Data Input',
  description: 'Range slider component for selecting values within a range.',

  oninit() { loadPageI18n('range') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Range</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Range value={40} max={100} />
        <Range value={60} max={100} color="primary" />
        <Range value={80} max={100} color="secondary" />

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
