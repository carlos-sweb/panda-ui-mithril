import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Checkbox, Text, Block } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

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

  oninit() { loadPageI18n('checkbox') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Checkbox</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">Colors</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Checkbox />
            <Checkbox checked />
            <Checkbox color="primary" checked />
            <Checkbox color="secondary" checked />
            <Checkbox color="accent" checked />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Sizes</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Checkbox size="xs" checked />
            <Checkbox size="sm" checked />
            <Checkbox size="md" checked />
            <Checkbox size="lg" checked />
            <Checkbox size="xl" checked />
          </Stack>
        </Block>

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
