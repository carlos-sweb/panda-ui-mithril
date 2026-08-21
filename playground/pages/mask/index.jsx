import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Mask, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { Mask } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Mask src="/avatar.jpg" shape="circle" />
        <Mask src="/avatar.jpg" shape="hexagon" />
        <Mask src="/avatar.jpg" shape="star" />
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Mask } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m('div', null, [
      m(Mask, { src: '/avatar.jpg', shape: 'circle' }),
      m(Mask, { src: '/avatar.jpg', shape: 'hexagon' }),
      m(Mask, { src: '/avatar.jpg', shape: 'star' })
    ])
  }
}`

export default {
  name: 'Mask',
  category: 'Data Display',
  description: 'Mask component for applying shapes to images.',

  oninit() { loadPageI18n('mask') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Mask</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Stack direction="row" gap="md" wrap="wrap">
          <Mask src="https://picsum.photos/100/100" shape="circle" className="w-20 h-20" />
          <Mask src="https://picsum.photos/100/100" shape="hexagon" className="w-20 h-20" />
          <Mask src="https://picsum.photos/100/100" shape="diamond" className="w-20 h-20" />
          <Mask src="https://picsum.photos/100/100" shape="triangle" className="w-20 h-20" />
          <Mask src="https://picsum.photos/100/100" shape="star" className="w-20 h-20" />
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
          <ClassTable rows={tableToRows(table)} />
        </Block>
      </Stack>
    )
  }
}
