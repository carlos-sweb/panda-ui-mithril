import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Breadcrumbs, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'


const usageCodeJsx = `import m from 'mithril'
import { Breadcrumbs } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '#' },
            { label: 'Docs', href: '#' },
            { label: 'Components' },
          ]}
        />
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Breadcrumbs } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Breadcrumbs, {
      items: [
        { label: 'Home', href: '#' },
        { label: 'Docs', href: '#' },
        { label: 'Components' }
      ]
    })
  }
}`

const classRows = [
  { className: 'breadcrumbs', prop: '<Breadcrumbs items={...}>', type: 'Component', description: 'Wrapper around a <ul>' },
]

export default {
  name: 'Breadcrumbs',
  category: 'Navigation',
  description: 'Breadcrumbs help users understand their location in the site hierarchy.',

  oninit() { loadPageI18n('breadcrumbs') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Breadcrumbs</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Breadcrumbs
          items={[
            { label: 'Home', href: '#' },
            { label: 'Docs', href: '#' },
            { label: 'Components' },
          ]}
        />

        <Breadcrumbs>
          <li><a href="#">Home</a></li>
          <li><a href="#">Docs</a></li>
          <li>Manual (children)</li>
        </Breadcrumbs>

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
          <ClassTable rows={classRows} />
        </Block>
      </Stack>
    )
  }
}
