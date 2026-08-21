import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Box, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { Box } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Box padding="lg" shadow="md"><p>Content in a box</p></Box>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Box } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Box, { padding: 'lg', shadow: 'md' },
      m('p', null, 'Content in a box')
    )
  }
}`

export default {
  oninit() { loadPageI18n('box') },
  view() {
    return (<Stack gap="lg">
      <Title as="h1" size="2">Box</Title>
      <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>{t('paragraph')}</Text>
      <Block spacing="lg"><Title as="h2" size="3">{t('common.usage')}</Title>
        <Tabs defaultActive="jsx" lifted size="lg">
          <Tab ref="jsx">Jsx</Tab>
          <Tab ref="js">Js</Tab>
          <TabContent ref="jsx">
            <CodeExample copyId="box-jsx-copy" type="jsx" code={usageCodeJsx} />
          </TabContent>
          <TabContent ref="js">
            <CodeExample copyId="box-js-copy" type="javascript" code={usageCodeJavascript} />
          </TabContent>
        </Tabs>
      </Block>
      <Block spacing="lg">
        <Title as="h2" size="3">Padding</Title>
        <Stack direction="row" gap="sm">
          <Box padding="sm">Small padding</Box>
          <Box>Medium (default)</Box>
          <Box padding="lg">Large padding</Box>
        </Stack>
      </Block>
      <Block spacing="lg">
        <Title as="h2" size="3">Shadow</Title>
        <Stack direction="row" gap="sm">
          <Box shadow="none">No shadow</Box>
          <Box shadow="sm">Small shadow</Box>
          <Box>Medium (default)</Box>
          <Box shadow="lg">Large shadow</Box>
        </Stack>
      </Block>
      <Block spacing="lg"><Title as="h2" size="3">{t('common.classReference')}</Title><ClassTable rows={tableToRows(table)} /></Block>
    </Stack>)
  }
}
