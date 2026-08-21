import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Card, CardBody, CardTitle, CardActions, CardFigure, Button, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

import image_card1 from './../../assets/card/card1.jpg'
import image_card2 from './../../assets/card/card2.jpg'
import image_card3 from './../../assets/card/card3.jpg'

const surface = css({ background: 'token(colors.base-100)', boxShadow: '0 1px 3px color-mix(in oklab, black 15%, transparent)', width: '20rem' })
const surfaceSide = css({ background: 'token(colors.base-100)', boxShadow: '0 1px 3px color-mix(in oklab, black 15%, transparent)' })
const img200 = css({ width: '100%', height: '10rem', objectFit: 'cover' })
const imgSide = css({ width: '12rem', height: '100%', objectFit: 'cover' })

const usageCodeJsx = `import m from 'mithril'
import { Card, CardFigure, CardBody, CardTitle, CardActions, Button } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Card className="bg-base-100 shadow-sm w-96">
          <CardFigure><img src="..." alt="..." /></CardFigure>
          <CardBody>
            <CardTitle>Card Title</CardTitle>
            <p>A card has a figure, a body, and inside body a title and actions.</p>
            <CardActions justify="end">
              <Button color="primary">Buy Now</Button>
            </CardActions>
          </CardBody>
        </Card>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Card, CardFigure, CardBody, CardTitle, CardActions, Button } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Card, { className: 'bg-base-100 shadow-sm w-96' }, [
      m(CardFigure, null, m('img', { src: '...', alt: '...' })),
      m(CardBody, null, [
        m(CardTitle, null, 'Card Title'),
        m('p', null, 'A card has a figure, a body, and inside body a title and actions.'),
        m(CardActions, { justify: 'end' }, [
          m(Button, { color: 'primary' }, 'Buy Now')
        ])
      ])
    ])
  }
}`

export default {
  name: 'Card',
  category: 'Data Display',
  description: 'Cards are used to group and display content in a contained layout.',

  oninit() { loadPageI18n('card') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Card</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">With figure + actions</Title>
          <Stack direction="row" gap="sm">
            <Card className={surface}>
              <CardFigure><img className={img200} src={image_card1} alt="Random" /></CardFigure>
              <CardBody>
                <CardTitle>Card Title</CardTitle>
                <p>A card has a figure, a body, and inside body a title and actions.</p>
                <CardActions justify="end">
                  <Button color="primary" size="sm">Buy Now</Button>
                </CardActions>
              </CardBody>
            </Card>

            <Card border className={css({ width: '20rem', background: 'token(colors.base-100)' })}>
              <CardBody>
                <CardTitle>Bordered</CardTitle>
                <p>This card has a border and no shadow.</p>
                <CardActions justify="end">
                  <Button size="sm">Action</Button>
                </CardActions>
              </CardBody>
            </Card>

            <Card dash className={css({ width: '20rem', background: 'token(colors.base-100)' })}>
              <CardBody>
                <CardTitle>Dashed</CardTitle>
                <p>This card uses a dashed border style.</p>
              </CardBody>
            </Card>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Side layout</Title>
          <Card side className={surfaceSide}>
            <CardFigure><img className={imgSide} src={image_card2} alt="Random" /></CardFigure>
            <CardBody>
              <CardTitle>Side Card</CardTitle>
              <p>The figure sits to the side instead of on top.</p>
              <CardActions justify="end">
                <Button color="primary" size="sm">Buy Now</Button>
              </CardActions>
            </CardBody>
          </Card>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Image full (background)</Title>
          <Card imageFull className={css({ width: '20rem', height: '16rem' })}>
            <CardFigure><img className={css({ width: '100%', height: '100%', objectFit: 'cover' })} src={image_card3} alt="Random" /></CardFigure>
            <CardBody>
              <CardTitle>Full image</CardTitle>
              <p>The image becomes the card's background, text sits on top.</p>
              <CardActions justify="end">
                <Button color="primary" size="sm">Buy Now</Button>
              </CardActions>
            </CardBody>
          </Card>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Sizes</Title>
          <Stack direction="row" gap="sm">
            <Card size="xs" border className={css({ width: '12rem', background: 'token(colors.base-100)' })}>
              <CardBody><CardTitle>XS</CardTitle><p>Extra small</p></CardBody>
            </Card>
            <Card size="lg" border className={css({ width: '16rem', background: 'token(colors.base-100)' })}>
              <CardBody><CardTitle>LG</CardTitle><p>Large size</p></CardBody>
            </Card>
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
