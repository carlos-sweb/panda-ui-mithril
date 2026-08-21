import m from 'mithril'
import { css , cx } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Hero, HeroContent, HeroOverlay, Button, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'

import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const surface = css({ background: 'token(colors.base-200)', minHeight: '16rem', borderRadius: 'var(--radius-box)' })
const withImage = css({
  minHeight: '16rem',
  borderRadius: 'var(--radius-box)',
  backgroundImage: 'url(https://picsum.photos/seed/panda-hero/1200/600)',
})
const center = css({ textAlign: 'center' })
const bigTitle = css({ fontSize: '2.5rem', fontWeight: '700' })
const body = css({ paddingBlock: '1rem', maxWidth: '32rem' })
const white = css({ color: 'token(colors.white)' })

const usageCodeJsx = `import m from 'mithril'
import { Hero, HeroContent, HeroOverlay, Button } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Hero>
          <HeroOverlay />
          <HeroContent className="text-white text-center">
            <div>
              <h1>Hello there</h1>
              <p>Provident cupiditate voluptatem esse.</p>
              <Button color="primary">Get Started</Button>
            </div>
          </HeroContent>
        </Hero>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Hero, HeroContent, HeroOverlay, Button } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Hero, null, [
      m(HeroOverlay),
      m(HeroContent, { className: 'text-white text-center' }, [
        m('div', null, [
          m('h1', null, 'Hello there'),
          m('p', null, 'Provident cupiditate voluptatem esse.'),
          m(Button, { color: 'primary' }, 'Get Started')
        ])
      ])
    ])
  }
}`

export default {
  name: 'Hero',
  category: 'Layout',
  description: 'Hero section component for prominent page headers.',

  oninit() { loadPageI18n('hero') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Hero</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">Basic</Title>
          <Hero className={surface}>
            <HeroContent className={center}>
              <div>
                <h1 className={bigTitle}>Hello there</h1>
                <p className={body}>Provident cupiditate voluptatem esse. Quam aut harum voluptatum.</p>
                <Button color="primary">Get Started</Button>
              </div>
            </HeroContent>
          </Hero>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">With background image + overlay</Title>
          <Hero className={withImage}>
            <HeroOverlay />
            <HeroContent className={cx(center, white)}>
              <div>
                <h1 className={bigTitle}>Hello there</h1>
                <p className={body}>Provident cupiditate voluptatem esse. Quam aut harum voluptatum.</p>
                <Button color="primary">Get Started</Button>
              </div>
            </HeroContent>
          </Hero>
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

