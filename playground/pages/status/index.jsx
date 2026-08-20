import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Status, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const usageCodeJsx = `import m from 'mithril'
import { Status } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Status color="success" />
        <Status color="error" size="lg" />
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Status } from 'panda-ui-mithril'

export const StatusPage = {
  view() {
    return m('div', null, [
      m(Status, { color: 'success' }),
      m(Status, { color: 'error', size: 'lg' })
    ])
  }
}`

const classRows = [
  { className: 'status', prop: '<Status>', type: 'Component', description: 'Status icon' },
  { className: 'status-neutral', prop: 'color="neutral"', type: 'Color', description: 'neutral color' },
  { className: 'status-primary', prop: 'color="primary"', type: 'Color', description: 'primary color' },
  { className: 'status-secondary', prop: 'color="secondary"', type: 'Color', description: 'secondary color' },
  { className: 'status-accent', prop: 'color="accent"', type: 'Color', description: 'accent color' },
  { className: 'status-info', prop: 'color="info"', type: 'Color', description: 'info color' },
  { className: 'status-success', prop: 'color="success"', type: 'Color', description: 'success color' },
  { className: 'status-warning', prop: 'color="warning"', type: 'Color', description: 'warning color' },
  { className: 'status-error', prop: 'color="error"', type: 'Color', description: 'error color' },
  { className: 'status-xs', prop: 'size="xs"', type: 'Size', description: 'extra small size' },
  { className: 'status-sm', prop: 'size="sm"', type: 'Size', description: 'small size' },
  { className: 'status-md', prop: 'size="md" (default)', type: 'Size', description: 'medium size', isDefault: true },
  { className: 'status-lg', prop: 'size="lg"', type: 'Size', description: 'large size' },
  { className: 'status-xl', prop: 'size="xl"', type: 'Size', description: 'extra large size' },
]

export default {
  name: 'Status',
  category: 'Feedback',
  description: 'Status indicator component for showing online/offline states.',

  oninit() { loadPageI18n('status') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Status</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Stack direction="row" gap="sm" wrap="wrap">
          <Status color="primary" />
          <Status color="secondary" />
          <Status color="accent" />
          <Status color="info" />
          <Status color="success" />
          <Status color="warning" />
          <Status color="error" />
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
