import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Divider, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'


const usageCodeJsx = `import m from 'mithril'
import { Divider } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Divider>OR</Divider>
        <Divider color="primary">Primary</Divider>
        <Divider direction="vertical">Vertical</Divider>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Divider } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m('div', null, [
      m(Divider, null, 'OR'),
      m(Divider, { color: 'primary' }, 'Primary'),
      m(Divider, { direction: 'vertical' }, 'Vertical')
    ])
  }
}`

const classRows = [
  { className: 'divider', prop: '<Divider>', type: 'Component', description: 'A divider line between two elements' },
  { className: 'divider-neutral', prop: 'color="neutral"', type: 'Color', description: 'neutral color' },
  { className: 'divider-primary', prop: 'color="primary"', type: 'Color', description: 'primary color' },
  { className: 'divider-secondary', prop: 'color="secondary"', type: 'Color', description: 'secondary color' },
  { className: 'divider-accent', prop: 'color="accent"', type: 'Color', description: 'accent color' },
  { className: 'divider-success', prop: 'color="success"', type: 'Color', description: 'success color' },
  { className: 'divider-warning', prop: 'color="warning"', type: 'Color', description: 'warning color' },
  { className: 'divider-info', prop: 'color="info"', type: 'Color', description: 'info color' },
  { className: 'divider-error', prop: 'color="error"', type: 'Color', description: 'error color' },
  { className: 'divider-vertical', prop: 'direction="horizontal" (default)', type: 'Direction', description: 'Divide vertical elements (on top of each other) — this is the default, no prop needed', isDefault: true },
  { className: 'divider-horizontal', prop: 'direction="vertical"', type: 'Direction', description: 'Divide horizontal elements (next to each other) — note: this component\'s direction prop names the opposite of its class name' },
  { className: 'divider-start', prop: 'placement="start"', type: 'Placement', description: 'Pushes the divider text to the start' },
  { className: 'divider-end', prop: 'placement="end"', type: 'Placement', description: 'Pushes the divider text to the end' },
]

export default {
  name: 'Divider',
  category: 'Layout',
  description: 'Divider component for separating content sections.',

  oninit() { loadPageI18n('divider') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Divider</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Divider>OR</Divider>
        <Divider color="primary">Primary</Divider>
        <Divider color="success">Success</Divider>

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
