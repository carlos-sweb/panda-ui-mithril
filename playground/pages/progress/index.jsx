import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Progress, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { Progress } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Progress value={70} max={100} color="primary" />
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Progress } from 'panda-ui-mithril'

export const ProgressPage = {
  view() {
    return m(Progress, { value: 70, max: 100, color: 'primary' })
  }
}`

export default {
  name: 'Progress',
  category: 'Feedback',
  description: 'Progress bar component for showing completion status.',

  oninit() { loadPageI18n('progress') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Progress</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Progress value={0} max={100} />
        <Progress value={25} max={100} color="primary" />
        <Progress value={50} max={100} color="secondary" />
        <Progress value={75} max={100} color="accent" />
        <Progress value={100} max={100} color="success" />

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
