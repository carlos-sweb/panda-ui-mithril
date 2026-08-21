import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Block, Text, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { Block } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Block spacing="md">
          <p>First block</p>
          <p>Second block — spaced from first, no margin after</p>
        </Block>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Block } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Block, { spacing: 'md' }, [
      m('p', null, 'First block'),
      m('p', null, 'Second block — spaced from first, no margin after')
    ])
  }
}`

export default {
  oninit() { loadPageI18n('block') },
  view() {
    return (<Stack gap="lg">
      <Title as="h1" size="2">Block</Title>
      <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>{t('paragraph')}</Text>
      <Block spacing="lg">
        <Title as="h2" size="3">{t('common.usage')}</Title>
        <Tabs defaultActive="jsx" lifted size="lg">
          <Tab ref="jsx">Jsx</Tab>
          <Tab ref="js">Js</Tab>
          <TabContent ref="jsx">
            <CodeExample copyId="block-jsx-copy" type="jsx" code={usageCodeJsx} />
          </TabContent>
          <TabContent ref="js">
            <CodeExample copyId="block-js-copy"  type="javascript" code={usageCodeJavascript} />
          </TabContent>
        </Tabs>
      </Block>
      <Block spacing="lg">
        <Title as="h2" size="3">Spacing</Title>
        <div className={css({ border: '1px solid token(colors.base-300)', borderRadius: 'token(radii.md)', padding: '1rem' })}>
          <Block spacing="sm"><div className={css({ bg: 'token(colors.base-300)', p: '1rem', borderRadius: '0.25rem' })}>sm — 1rem</div></Block>
          <Block spacing="md"><div className={css({ bg: 'token(colors.base-300)', p: '1rem', borderRadius: '0.25rem' })}>md — 1.5rem</div></Block>
          <Block spacing="lg"><div className={css({ bg: 'token(colors.base-300)', p: '1rem', borderRadius: '0.25rem' })}>lg — 2rem</div></Block>
        </div>
      </Block>
      <Block spacing="lg">
        <Title as="h2" size="3">{t('common.classReference')}</Title>
        <ClassTable rows={tableToRows(table)} />
      </Block>
    </Stack>)
  }
}
