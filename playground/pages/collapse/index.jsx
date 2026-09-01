import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Collapse, CollapseTitle, CollapseContent, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { Collapse, CollapseTitle, CollapseContent } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Collapse plus border>
          <CollapseTitle>How do I create an account?</CollapseTitle>
          <CollapseContent>
            Click the "Sign Up" button in the top right corner and follow the registration process.
          </CollapseContent>
        </Collapse>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Collapse, CollapseTitle, CollapseContent } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Collapse, { plus: true, border: true }, [
      m(CollapseTitle, null, 'How do I create an account?'),
      m(CollapseContent, null,
        'Click the "Sign Up" button in the top right corner and follow the registration process.'
      )
    ])
  }
}`

export default {
  name: 'Collapse',
  category: 'Layout',
  description: 'Collapse component for toggling visibility of content sections.',

  oninit() { loadPageI18n('collapse') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Collapse</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('arrow')}</Title>
          <Collapse arrow border>
            <CollapseTitle>How do I create an account?</CollapseTitle>
            <CollapseContent>
              Click the "Sign Up" button in the top right corner and follow the registration process.
            </CollapseContent>
          </Collapse>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('plusMinus')}</Title>
          <Collapse plus border>
            <CollapseTitle>Can I cancel my subscription?</CollapseTitle>
            <CollapseContent>
              Yes, you can cancel anytime from your account settings — no questions asked.
            </CollapseContent>
          </Collapse>
        </Block>

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
