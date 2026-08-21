import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Diff, DiffItem1, DiffItem2, DiffResizer, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const wrapper = css({ maxWidth: '32rem' })

const usageCodeJsx = `import m from 'mithril'
import { Diff, DiffItem1, DiffItem2, DiffResizer } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Diff>
          <DiffItem1><img src="before.jpg" alt="Before" /></DiffItem1>
          <DiffItem2><img src="after.jpg" alt="After" /></DiffItem2>
          <DiffResizer />
        </Diff>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Diff, DiffItem1, DiffItem2, DiffResizer } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Diff, null, [
      m(DiffItem1, null, m('img', { src: 'before.jpg', alt: 'Before' })),
      m(DiffItem2, null, m('img', { src: 'after.jpg', alt: 'After' })),
      m(DiffResizer)
    ])
  }
}`

export default {
  name: 'Diff',
  category: 'Layout',
  description: 'Diff component for comparing two images side by side.',

  oninit() { loadPageI18n('diff') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Diff</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <div className={wrapper}>
          <Diff>
            <DiffItem1><img src="https://picsum.photos/seed/panda-diff-a/600/338" alt="Before" /></DiffItem1>
            <DiffItem2><img src="https://picsum.photos/seed/panda-diff-b/600/338" alt="After" /></DiffItem2>
            <DiffResizer />
          </Diff>
        </div>

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
