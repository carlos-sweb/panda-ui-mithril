import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, ButtonGroup, Button, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { ButtonGroup, Button } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <ButtonGroup>
          <Button>Left</Button>
          <Button>Center</Button>
          <Button>Right</Button>
        </ButtonGroup>

        <ButtonGroup color="primary">
          <Button>1</Button>
          <Button>2</Button>
          <Button>3</Button>
        </ButtonGroup>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { ButtonGroup, Button } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m('div', null, [
      m(ButtonGroup, null, [
        m(Button, null, 'Left'),
        m(Button, null, 'Center'),
        m(Button, null, 'Right')
      ]),
      m(ButtonGroup, { color: 'primary' }, [
        m(Button, null, '1'),
        m(Button, null, '2'),
        m(Button, null, '3')
      ])
    ])
  }
}`

export default {
  name: 'ButtonGroup',
  category: 'Actions',
  description: 'Button group — joins buttons horizontally with unified borders.',

  oninit() { loadPageI18n('buttongroup') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">ButtonGroup</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">Default</Title>
          <ButtonGroup>
            <Button>Left</Button>
            <Button>Center</Button>
            <Button>Right</Button>
          </ButtonGroup>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">With color</Title>
          <ButtonGroup color="primary">
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">With variant</Title>
          <ButtonGroup variant="outline">
            <Button>Yes</Button>
            <Button>No</Button>
          </ButtonGroup>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">With size</Title>
          <ButtonGroup size="lg">
            <Button>A</Button>
            <Button>B</Button>
            <Button>C</Button>
          </ButtonGroup>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <Tabs defaultActive="jsx" lifted size="lg">
            <Tab ref="jsx">Jsx</Tab>
            <Tab ref="js">Js</Tab>
            <TabContent ref="jsx">
              <CodeExample copyId="butgroup-jsx-copy" type="jsx" code={usageCodeJsx} />
            </TabContent>
            <TabContent ref="js">
              <CodeExample copyId="buttongroup-js-copy" type="javascript" code={usageCodeJavascript} />
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
