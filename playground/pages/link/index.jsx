import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Link, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { Link } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Link href="#">Default</Link>
        <Link href="#" color="primary">Primary</Link>
        <Link href="#" hover>Hover only</Link>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Link } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m('div', null, [
      m(Link, { href: '#' }, 'Default'),
      m(Link, { href: '#', color: 'primary' }, 'Primary'),
      m(Link, { href: '#', hover: true }, 'Hover only')
    ])
  }
}`

export default {
  name: 'Link',
  category: 'Actions',
  description: 'Link component for navigation with styled anchor tags.',

  oninit() { loadPageI18n('link') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Link</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Stack direction="row" gap="md" wrap="wrap">
          <Link href="#!/link">Default</Link>
          <Link href="#!/link" color="primary">Primary</Link>
          <Link href="#!/link" color="secondary">Secondary</Link>
          <Link href="#!/link" color="accent">Accent</Link>
        </Stack>

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
