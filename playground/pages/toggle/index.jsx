import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Toggle, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const usageCodeJsx = `import m from 'mithril'
import { Toggle } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Toggle color="primary" checked />
        <Toggle size="lg" />
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Toggle } from 'panda-ui-mithril'

export const TogglePage = {
  view() {
    return m('div', null, [
      m(Toggle, { color: 'primary', checked: true }),
      m(Toggle, { size: 'lg' })
    ])
  }
}`

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
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Stack direction="row" gap="sm" wrap="wrap">
          <Toggle />
          <Toggle checked />
          <Toggle color="primary" checked />
          <Toggle color="secondary" checked />
        </Stack>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <Tabs defaultActive="jsx" lifted size="lg">
            <Tab ref="jsx">Jsx</Tab>
            <Tab ref="js">Js</Tab>
            <TabContent ref="jsx">
              <CodeExample type="jsx" code={usageCodeJsx} />
            </TabContent>
            <TabContent ref="js">
              <CodeExample type="javascript" code={usageCodeJavascript} />
            </TabContent>
          </Tabs>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </Block>
      </Stack>
    )
  }
}
