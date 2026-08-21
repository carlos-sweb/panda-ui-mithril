import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Aura, Button, Card, CardBody, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const cardSurface = css({ background: 'token(colors.base-100)', width: '14rem' })
const primaryColor = css({ color: 'token(colors.primary)' })

const usageCodeJsx = `import m from 'mithril'
import { Aura, Button, Card, CardBody } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Aura>
          <Button>Button with aura</Button>
        </Aura>

        <Aura variant="holo" shape="box">
          <Card className="bg-base-100">
            <CardBody><p>This card has aura</p></CardBody>
          </Card>
        </Aura>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Aura, Button, Card, CardBody } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m('div', null, [
      m(Aura, null,
        m(Button, null, 'Button with aura')
      ),

      m(Aura, { variant: 'holo', shape: 'box' },
        m(Card, { className: 'bg-base-100' },
          m(CardBody, null,
            m('p', null, 'This card has aura')
          )
        )
      )
    ])
  }
}`

export default {
  name: 'Aura',
  category: 'Feedback',
  description: 'Aura is a border light effect that can wrap around any component.',

  oninit() { loadPageI18n('aura') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Aura</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">Around a button (default)</Title>
          <Stack direction="row" gap="sm">
            <Aura shape="field" className={primaryColor}>
              <Button color="primary">Upgrade now</Button>
            </Aura>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Around a card</Title>
          <Stack direction="row" gap="sm">
            <Aura shape="box">
              <Card className={cardSurface}>
                <CardBody><p>This card has aura</p></CardBody>
              </Card>
            </Aura>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Variants</Title>
          <Stack direction="row" gap="sm">
            <Aura variant="dual" shape="field" className={primaryColor}><Button>dual</Button></Aura>
            <Aura variant="rainbow" shape="field"><Button>rainbow</Button></Aura>
            <Aura variant="holo" shape="field"><Button>holo</Button></Aura>
            <Aura variant="gold" shape="field"><Button>gold</Button></Aura>
            <Aura variant="silver" shape="field"><Button>silver</Button></Aura>
            <Aura variant="glow" shape="field" className={primaryColor}><Button>glow</Button></Aura>
          </Stack>
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
