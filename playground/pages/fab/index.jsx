import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, FAB, FABMain, FABAction, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { Plus, Pencil, Trash2, Share2 } from 'lucide-mithril'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'


const usageCodeJsx = `import m from 'mithril'
import { FAB, FABMain, FABAction } from 'panda-ui-mithril'
import { Plus, Pencil, Trash2, Share2 } from 'lucide-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <FAB>
          <FABMain><Plus size={22} /></FABMain>
          <FABAction label="Edit"><Pencil size={18} /></FABAction>
          <FABAction label="Share"><Share2 size={18} /></FABAction>
          <FABAction label="Delete"><Trash2 size={18} /></FABAction>
        </FAB>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { FAB, FABMain, FABAction } from 'panda-ui-mithril'
import { Plus, Pencil, Trash2, Share2 } from 'lucide-mithril'

export const MyPage = {
  view() {
    return m(FAB, null, [
      m(FABMain, null, m(Plus, { size: 22 })),
      m(FABAction, { label: 'Edit' }, m(Pencil, { size: 18 })),
      m(FABAction, { label: 'Share' }, m(Share2, { size: 18 })),
      m(FABAction, { label: 'Delete' }, m(Trash2, { size: 18 }))
    ])
  }
}`

export default {
  name: 'FAB',
  category: 'Actions',
  description: 'Floating Action Button represents the primary action of a screen.',

  oninit() { loadPageI18n('fab') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">FAB</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <FAB>
          <FABMain><Plus size={22} /></FABMain>
          <FABAction label="Edit"><Pencil size={18} /></FABAction>
          <FABAction label="Share"><Share2 size={18} /></FABAction>
          <FABAction label="Delete"><Trash2 size={18} /></FABAction>
        </FAB>

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
