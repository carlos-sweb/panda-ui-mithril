import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Container, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const usageCodeJsx = `import m from 'mithril'
import { Container } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Container maxWidth="desktop"><h2>Centered content</h2></Container>
        <Container fluid><p>Full width with side padding</p></Container>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Container } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m('div', null, [
      m(Container, { maxWidth: 'desktop' }, m('h2', null, 'Centered content')),
      m(Container, { fluid: true }, m('p', null, 'Full width with side padding'))
    ])
  }
}`

const classRows = [
  { className: 'container', prop: '<Container>', type: 'Component', description: 'Responsive centered container with max-width' },
  { className: 'container-fullhd', prop: 'maxWidth="fullhd" (default)', type: 'Size', description: 'Max 1344px', isDefault: true },
  { className: 'container-widescreen', prop: 'maxWidth="widescreen"', type: 'Size', description: 'Max 1152px' },
  { className: 'container-desktop', prop: 'maxWidth="desktop"', type: 'Size', description: 'Max 960px' },
  { className: 'container-tablet', prop: 'maxWidth="tablet"', type: 'Size', description: 'Max 768px' },
  { className: 'container-fluid', prop: 'fluid', type: 'Modifier', description: 'Full width with 2rem side padding' },
]

const demo = css({ bg: 'token(colors.base-200)', p: '1rem', borderRadius: '0.25rem', textAlign: 'center' })

export default {
  oninit() { loadPageI18n('container') },
  view() {
    return (<Stack gap="lg">
      <Title as="h1" size="2">Container</Title>
      <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>{t('paragraph')}</Text>
      <Block spacing="lg"><Title as="h2" size="3">{t('common.usage')}</Title>
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
      <Block spacing="lg"><Title as="h2" size="3">Max Widths</Title>
        <Container maxWidth="tablet"><div className={demo}>tablet — 768px</div></Container>
        <br />
        <Container maxWidth="desktop"><div className={demo}>desktop — 960px</div></Container>
        <br />
        <Container><div className={demo}>fullhd — 1344px (default)</div></Container>
      </Block>
      <Block spacing="lg"><Title as="h2" size="3">{t('common.classReference')}</Title><ClassTable rows={classRows} /></Block>
    </Stack>)
  }
}
