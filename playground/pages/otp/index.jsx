import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, OTP, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'


const usageCodeJsx = `import m from 'mithril'
import { OTP } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <OTP length={6} color="primary" />
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { OTP } from 'panda-ui-mithril'

export const OTPPage = {
  view() {
    return m(OTP, { length: 6, color: 'primary' })
  }
}`

export default {
  name: 'OTP',
  category: 'Data Input',
  description: 'One-time password input component for verification codes.',

  oninit() { loadPageI18n('otp') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">OTP</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <OTP length={4} />
        <OTP length={6} color="primary" />

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
