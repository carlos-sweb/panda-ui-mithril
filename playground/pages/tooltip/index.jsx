import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Button, Tooltip, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { Tooltip, Button } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Tooltip tip="Top" position="top">
          <Button>Top</Button>
        </Tooltip>
        <Tooltip tip="Info" color="primary">
          <Button>Primary</Button>
        </Tooltip>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Tooltip, Button } from 'panda-ui-mithril'

export const TooltipPage = {
  view() {
    return m('div', null, [
      m(Tooltip, { tip: 'Top', position: 'top' }, [
        m(Button, null, 'Top')
      ]),
      m(Tooltip, { tip: 'Info', color: 'primary' }, [
        m(Button, null, 'Primary')
      ])
    ])
  }
}`

export default {
  name: 'Tooltip',
  category: 'Feedback',
  description: 'Tooltip component for showing additional information on hover.',

  oninit() { loadPageI18n('tooltip') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Tooltip</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Stack direction="row" gap="sm" wrap="wrap">
          <Tooltip tip="Top" position="top"><Button>Top</Button></Tooltip>
          <Tooltip tip="Bottom" position="bottom"><Button>Bottom</Button></Tooltip>
          <Tooltip tip="Left" position="left"><Button>Left</Button></Tooltip>
          <Tooltip tip="Right" position="right"><Button>Right</Button></Tooltip>
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
