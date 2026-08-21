import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Megamenu, MegamenuItem, MegamenuTrigger, MegamenuPanel, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const surface = css({ background: 'token(colors.base-100)', border: '1px solid', borderColor: 'token(colors.base-300)', padding: '0.5rem', borderRadius: 'var(--radius-box)' })
const grid = css({ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1.5rem' })
const colTitle = css({ fontSize: '0.75rem', fontWeight: '600', textTransform: 'uppercase', opacity: 0.5, marginBottom: '0.5rem' })
const link = css({ display: 'block', padding: '0.375rem 0', fontSize: '0.875rem', textDecoration: 'none', color: 'inherit', opacity: 0.8, _hover: { opacity: 1 } })

const usageCodeJsx = `import m from 'mithril'
import { Megamenu, MegamenuItem, MegamenuTrigger, MegamenuPanel } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Megamenu>
          <MegamenuItem>
            <MegamenuTrigger>Products</MegamenuTrigger>
            <MegamenuPanel>
              <div>Analytics</div>
              <div>Automation</div>
            </MegamenuPanel>
          </MegamenuItem>
          <MegamenuItem>
            <MegamenuTrigger href="#!/docs" chevron={false}>Docs</MegamenuTrigger>
          </MegamenuItem>
        </Megamenu>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Megamenu, MegamenuItem, MegamenuTrigger, MegamenuPanel } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Megamenu, null, [
      m(MegamenuItem, null, [
        m(MegamenuTrigger, null, 'Products'),
        m(MegamenuPanel, null, [
          m('div', null, 'Analytics'),
          m('div', null, 'Automation')
        ])
      ]),
      m(MegamenuItem, null, [
        m(MegamenuTrigger, { href: '#!/docs', chevron: false }, 'Docs')
      ])
    ])
  }
}`

export default {
  name: 'Megamenu',
  category: 'Navigation',
  description: 'Mega menu component for large dropdown navigation menus.',

  oninit() { loadPageI18n('megamenu') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Megamenu</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Megamenu className={surface}>
          <MegamenuItem>
            <MegamenuTrigger>Products</MegamenuTrigger>
            <MegamenuPanel>
              <div className={grid}>
                <div>
                  <div className={colTitle}>Platform</div>
                  <a className={link} href="#!/">Analytics</a>
                  <a className={link} href="#!/">Automation</a>
                  <a className={link} href="#!/">Reporting</a>
                </div>
                <div>
                  <div className={colTitle}>Tools</div>
                  <a className={link} href="#!/">Integrations</a>
                  <a className={link} href="#!/">API</a>
                </div>
              </div>
            </MegamenuPanel>
          </MegamenuItem>

          <MegamenuItem>
            <MegamenuTrigger>Solutions</MegamenuTrigger>
            <MegamenuPanel>
              <div className={colTitle}>By team</div>
              <a className={link} href="#!/">Engineering</a>
              <a className={link} href="#!/">Design</a>
              <a className={link} href="#!/">Marketing</a>
            </MegamenuPanel>
          </MegamenuItem>

          <MegamenuItem>
            <MegamenuTrigger href="#!/" chevron={false}>Pricing</MegamenuTrigger>
          </MegamenuItem>
        </Megamenu>

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
