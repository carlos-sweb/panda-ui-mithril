import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Title, Stack, Button, Box, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const item = css({ bg: 'token(colors.base-200)', p: '1rem', borderRadius: '0.25rem', textAlign: 'center' })

const usageCodeJsx = `import m from 'mithril'
import { Stack, Box, Button } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Stack gap="md">
          <Box>Item 1</Box>
          <Box>Item 2</Box>
        </Stack>

        <Stack direction="row" gap="sm" align="center">
          <Button>Save</Button>
          <Button variant="outline">Cancel</Button>
        </Stack>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Stack, Box, Button } from 'panda-ui-mithril'

export const StackPage = {
  view() {
    return m('div', null, [
      m(Stack, { gap: 'md' }, [
        m(Box, null, 'Item 1'),
        m(Box, null, 'Item 2')
      ]),
      m(Stack, { direction: 'row', gap: 'sm', align: 'center' }, [
        m(Button, null, 'Save'),
        m(Button, { variant: 'outline' }, 'Cancel')
      ])
    ])
  }
}`

export default {
  oninit() { loadPageI18n('stack') },
  view() {
    return (<Stack gap="lg">
      <Title as="h1" size="2">Stack</Title>
      <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>{t('paragraph')}</Text>
      <Block spacing="lg"><Title as="h2" size="3">{t('common.usage')}</Title>
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

      <Block spacing="lg"><Title as="h2" size="3">{t('vstackVertical')}</Title>
        <Stack gap="md">
          <div className={item}>Item 1</div>
          <div className={item}>Item 2</div>
          <div className={item}>Item 3</div>
        </Stack>
      </Block>

      <Block spacing="lg"><Title as="h2" size="3">{t('hstackHorizontal')}</Title>
        <Stack direction="row" gap="md">
          <Button>Save</Button>
          <Button variant="outline">Cancel</Button>
          <Button variant="ghost">Help</Button>
        </Stack>
      </Block>

      <Block spacing="lg"><Title as="h2" size="3">{t('gapSizes')}</Title>
        <Stack gap="xs"><div className={item}>xs gap</div><div className={item}>xs gap</div></Stack>
        <br />
        <Stack gap="sm"><div className={item}>sm gap</div><div className={item}>sm gap</div></Stack>
        <br />
        <Stack gap="md"><div className={item}>md gap (default)</div><div className={item}>md gap</div></Stack>
        <br />
        <Stack gap="lg"><div className={item}>lg gap</div><div className={item}>lg gap</div></Stack>
      </Block>

      <Block spacing="lg"><Title as="h2" size="3">{t('alignment')}</Title>
        <Box>
          <Stack gap="sm" align="start"><div className={item}>align start</div><div className={item}>align start</div></Stack>
          <br />
          <Stack gap="sm" align="center"><div className={item}>align center</div><div className={item}>align center</div></Stack>
          <br />
          <Stack gap="sm" align="end"><div className={item}>align end</div><div className={item}>align end</div></Stack>
        </Box>
      </Block>

      <Block spacing="lg"><Title as="h2" size="3">{t('justify')}</Title>
        <Box>
          <Stack direction="row" gap="sm" justify="between">
            <div className={item}>left</div><div className={item}>right</div>
          </Stack>
        </Box>
      </Block>

      <Block spacing="lg"><Title as="h2" size="3">{t('common.classReference')}</Title><ClassTable rows={tableToRows(table)} /></Block>
    </Stack>)
  }
}
