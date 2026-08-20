import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Indicator, Badge, Button, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const usageCodeJsx = `import m from 'mithril'
import { Indicator, Badge, Button } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Indicator position="end top">
          <Badge color="secondary" className="indicator-item">New</Badge>
          <Button>Main content</Button>
        </Indicator>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Indicator, Badge, Button } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Indicator, { position: 'end top' }, [
      m(Badge, { color: 'secondary', className: 'indicator-item' }, 'New'),
      m(Button, null, 'Main content')
    ])
  }
}`

const classRows = [
  { className: 'indicator', prop: '<Indicator>', type: 'Component', description: 'Container element' },
  { className: 'indicator-item', prop: 'item={...} or className="indicator-item"', type: 'Part', description: 'will be placed on the corner of sibling' },
  { className: 'indicator-start', prop: 'position="start"', type: 'Placement', description: 'align horizontally to the start' },
  { className: 'indicator-center', prop: 'position="center"', type: 'Placement', description: 'align horizontally to the center' },
  { className: 'indicator-end', prop: 'position="end" (default)', type: 'Placement', description: 'align horizontally to the end', isDefault: true },
  { className: 'indicator-top', prop: 'position="top" (default)', type: 'Placement', description: 'align vertically to top', isDefault: true },
  { className: 'indicator-middle', prop: 'position="middle"', type: 'Placement', description: 'align vertically to middle' },
  { className: 'indicator-bottom', prop: 'position="bottom"', type: 'Placement', description: 'align vertically to bottom' },
]

export default {
  name: 'Indicator',
  category: 'Feedback',
  description: 'Indicator component for adding badges or dots to other elements.',

  oninit() { loadPageI18n('indicator') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Indicator</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Stack direction="row" gap="md" wrap="wrap">
          <Indicator position="end top">
            <Badge color="secondary" className="indicator-item">New</Badge>
            <Button>Main content</Button>
          </Indicator>
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
