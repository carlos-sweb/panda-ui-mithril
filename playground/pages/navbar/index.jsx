import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Navbar, NavbarStart, NavbarCenter, NavbarEnd, Button, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const surface = css({ background: 'token(colors.base-200)', borderRadius: 'var(--radius-box)' })

const usageCodeJsx = `import m from 'mithril'
import { Navbar, NavbarStart, NavbarCenter, NavbarEnd, Button } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Navbar>
          <NavbarStart><Button variant="ghost" size="sm">panda-ui</Button></NavbarStart>
          <NavbarCenter><Button variant="ghost" size="sm">Home</Button></NavbarCenter>
          <NavbarEnd><Button color="primary" size="sm">Get Started</Button></NavbarEnd>
        </Navbar>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Navbar, NavbarStart, NavbarCenter, NavbarEnd, Button } from 'panda-ui-mithril'

export const NavbarPage = {
  view() {
    return m(Navbar, null, [
      m(NavbarStart, null,
        m(Button, { variant: 'ghost', size: 'sm' }, 'panda-ui')
      ),
      m(NavbarCenter, null,
        m(Button, { variant: 'ghost', size: 'sm' }, 'Home')
      ),
      m(NavbarEnd, null,
        m(Button, { color: 'primary', size: 'sm' }, 'Get Started')
      )
    ])
  }
}`

const classRows = [
  { className: 'navbar', prop: '<Navbar>', type: 'Component', description: 'Navbar container' },
  { className: 'navbar-start', prop: '<NavbarStart>', type: 'Part', description: 'Left side of the navbar (50% width)' },
  { className: 'navbar-center', prop: '<NavbarCenter>', type: 'Part', description: 'Middle of the navbar (shrink-to-fit)' },
  { className: 'navbar-end', prop: '<NavbarEnd>', type: 'Part', description: 'Right side of the navbar (50% width)' },
]

export default {
  name: 'Navbar',
  category: 'Navigation',
  description: 'Navbar component for site navigation headers.',

  oninit() { loadPageI18n('navbar') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Navbar</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Navbar className={surface}>
          <NavbarStart><Button variant="ghost" size="sm">panda-ui</Button></NavbarStart>
          <NavbarCenter><Button variant="ghost" size="sm">Home</Button></NavbarCenter>
          <NavbarEnd><Button color="primary" size="sm">Get Started</Button></NavbarEnd>
        </Navbar>

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
