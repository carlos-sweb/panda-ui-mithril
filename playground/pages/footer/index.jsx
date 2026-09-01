import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Footer, FooterTitle, Link, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const surface = css({ background: 'token(colors.base-200)', padding: '2.5rem', borderRadius: 'var(--radius-box)' })

const usageCodeJsx = `import m from 'mithril'
import { Footer, FooterTitle, Link } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Footer className="...">
          <div>
            <FooterTitle>Services</FooterTitle>
            <Link hover={false}>Branding</Link>
            <Link hover={false}>Design</Link>
          </div>
          <div>
            <FooterTitle>Company</FooterTitle>
            <Link hover={false}>About us</Link>
            <Link hover={false}>Contact</Link>
          </div>
        </Footer>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Footer, FooterTitle, Link } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Footer, { className: '...' }, [
      m('div', null, [
        m(FooterTitle, null, 'Services'),
        m(Link, { hover: false }, 'Branding'),
        m(Link, { hover: false }, 'Design')
      ]),
      m('div', null, [
        m(FooterTitle, null, 'Company'),
        m(Link, { hover: false }, 'About us'),
        m(Link, { hover: false }, 'Contact')
      ])
    ])
  }
}`

export default {
  name: 'Footer',
  category: 'Navigation',
  description: 'Footer component for site footers with links and information.',

  oninit() { loadPageI18n('footer') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Footer</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('columns')}</Title>
          <Footer horizontal className={surface}>
            <div>
              <FooterTitle>Services</FooterTitle>
              <Link hover={false}>Branding</Link>
              <Link hover={false}>Design</Link>
              <Link hover={false}>Marketing</Link>
            </div>
            <div>
              <FooterTitle>Company</FooterTitle>
              <Link hover={false}>About us</Link>
              <Link hover={false}>Contact</Link>
              <Link hover={false}>Jobs</Link>
            </div>
            <div>
              <FooterTitle>Legal</FooterTitle>
              <Link hover={false}>Terms of use</Link>
              <Link hover={false}>Privacy policy</Link>
            </div>
          </Footer>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('centered')}</Title>
          <Footer center className={surface}>
            <div>
              <FooterTitle>panda-ui-mithril</FooterTitle>
              <Stack direction="row" gap="sm">
                <Link href="#">GitHub</Link>
                <Link href="#">npm</Link>
                <Link href="#">Docs</Link>
              </Stack>
            </div>
          </Footer>
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
