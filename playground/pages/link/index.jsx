import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Link, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

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

const classRows = [
  { className: 'link', prop: 'hover={false}', type: 'Component', description: 'Adds underline — note: this component defaults to hover=true, so pass hover={false} to always show the underline' },
  { className: 'link-hover', prop: 'hover (default)', type: 'Style', description: 'Only shows underline on hover — this is the default, no prop needed', isDefault: true },
  { className: 'link-neutral', prop: 'color="neutral"', type: 'Color', description: 'neutral color' },
  { className: 'link-primary', prop: 'color="primary"', type: 'Color', description: 'primary color' },
  { className: 'link-secondary', prop: 'color="secondary"', type: 'Color', description: 'secondary color' },
  { className: 'link-accent', prop: 'color="accent"', type: 'Color', description: 'accent color' },
  { className: 'link-success', prop: 'color="success"', type: 'Color', description: 'success color' },
  { className: 'link-info', prop: 'color="info"', type: 'Color', description: 'info color' },
  { className: 'link-warning', prop: 'color="warning"', type: 'Color', description: 'warning color' },
  { className: 'link-error', prop: 'color="error"', type: 'Color', description: 'error color' },
]

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
          <ClassTable rows={classRows} />
        </Block>
      </Stack>
    )
  }
}
