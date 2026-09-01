import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Steps, Step, StepIcon, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { Check } from 'lucide-mithril'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { Steps, Step } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Steps>
          <Step color="primary">Register</Step>
          <Step color="primary">Choose Plan</Step>
          <Step>Purchase</Step>
          <Step>Receive</Step>
        </Steps>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Steps, Step } from 'panda-ui-mithril'

export const StepsPage = {
  view() {
    return m(Steps, null, [
      m(Step, { color: 'primary' }, 'Register'),
      m(Step, { color: 'primary' }, 'Choose Plan'),
      m(Step, null, 'Purchase'),
      m(Step, null, 'Receive')
    ])
  }
}`

export default {
  name: 'Steps',
  category: 'Navigation',
  description: 'Steps component for showing progress through a multi-step process.',

  oninit() { loadPageI18n('steps') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Steps</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('common.subtitles.horizontalDefault')}</Title>
          <Steps>
            <Step color="primary">Register</Step>
            <Step color="primary">Choose Plan</Step>
            <Step>Purchase</Step>
            <Step>Receive</Step>
          </Steps>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('withCustomIcon')}</Title>
          <Steps>
            <Step color="success">
              <StepIcon><Check size={16} /></StepIcon>
              Register
            </Step>
            <Step color="success">
              <StepIcon><Check size={16} /></StepIcon>
              Choose Plan
            </Step>
            <Step>Purchase</Step>
          </Steps>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('common.subtitles.vertical')}</Title>
          <Steps vertical>
            <Step color="primary">Register</Step>
            <Step color="primary">Choose Plan</Step>
            <Step>Purchase</Step>
            <Step>Receive</Step>
          </Steps>
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
