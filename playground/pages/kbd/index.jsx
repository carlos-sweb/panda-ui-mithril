import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Kbd } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const row = css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' })

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
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <div className={row}>
          <Kbd size="xs">K</Kbd>
          <Kbd size="sm">Shift</Kbd>
          <Kbd size="md">Enter</Kbd>
          <Kbd size="lg">Ctrl</Kbd>
          <Kbd size="xl">Space</Kbd>
        </div>

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
