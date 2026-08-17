import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Kbd, Text, Block } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const usageCode = `<Kbd size="xs">K</Kbd>
<Kbd size="sm">Shift</Kbd>
<Kbd size="md">Enter</Kbd>
<Kbd size="lg">Ctrl</Kbd>
<Kbd size="xl">Space</Kbd>`

const classRows = [
  { className: 'kbd', prop: '<Kbd>', type: 'Component', description: 'Do show a keyboard key or a shortcut key' },
  { className: 'kbd-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'kbd-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'kbd-md', prop: 'size="md"', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'kbd-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'kbd-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
]

export default {
  name: 'Kbd',
  category: 'Data Display',
  description: 'Keyboard key component for displaying keyboard shortcuts.',

  oninit() { loadPageI18n('kbd') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Kbd</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Stack direction="row" gap="sm" wrap="wrap">
          <Kbd size="xs">K</Kbd>
          <Kbd size="sm">Shift</Kbd>
          <Kbd size="md">Enter</Kbd>
          <Kbd size="lg">Ctrl</Kbd>
          <Kbd size="xl">Space</Kbd>
        </Stack>

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
