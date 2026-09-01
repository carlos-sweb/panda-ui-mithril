import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Grid, Cell, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { Grid, Cell } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Grid cols={3} gap="md">
          <Cell span={2}><div>Wide cell</div></Cell>
          <Cell><div>Normal</div></Cell>
        </Grid>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Grid, Cell } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Grid, { cols: 3, gap: 'md' }, [
      m(Cell, { span: 2 }, m('div', null, 'Wide cell')),
      m(Cell, null, m('div', null, 'Normal'))
    ])
  }
}`

const cell = css({ bg: 'token(colors.base-200)', p: '1rem', borderRadius: '0.25rem', textAlign: 'center' })

export default {
  oninit() { loadPageI18n('grid') },
  view() {
    return (<Stack gap="lg">
      <Title as="h1" size="2">Grid</Title>
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
      <Block spacing="lg"><Title as="h2" size="3">{t('threeColumnsAutoSpan')}</Title>
        <Grid cols={3} gap="md">
          <Cell><div className={cell}>1</div></Cell><Cell><div className={cell}>2</div></Cell><Cell><div className={cell}>3</div></Cell>
          <Cell><div className={cell}>4</div></Cell><Cell><div className={cell}>5</div></Cell><Cell><div className={cell}>6</div></Cell>
        </Grid>
      </Block>
      <Block spacing="lg"><Title as="h2" size="3">{t('spans')}</Title>
        <Grid cols={6} gap="md">
          <Cell span={2}><div className={cell}>span 2</div></Cell>
          <Cell span={4}><div className={cell}>span 4</div></Cell>
          <Cell span={3}><div className={cell}>span 3</div></Cell>
          <Cell span={3}><div className={cell}>span 3</div></Cell>
        </Grid>
      </Block>
      <Block spacing="lg"><Title as="h2" size="3">{t('common.classReference')}</Title><ClassTable rows={tableToRows(table)} /></Block>
    </Stack>)
  }
}
