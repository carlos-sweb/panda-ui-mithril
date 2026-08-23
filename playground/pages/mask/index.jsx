import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Mask, Text, Block, Button, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

// Imágenes locales (sin recursos externos): 6 fotos descargadas a
// playground/assets/mask/ — el demo las muestra al azar con el botón.
import mask1 from '../../assets/mask/mask1.jpg'
import mask2 from '../../assets/mask/mask2.jpg'
import mask3 from '../../assets/mask/mask3.jpg'
import mask4 from '../../assets/mask/mask4.jpg'
import mask5 from '../../assets/mask/mask5.jpg'
import mask6 from '../../assets/mask/mask6.jpg'

const masks = [mask1, mask2, mask3, mask4, mask5, mask6]
const shapes = ['circle', 'hexagon', 'diamond', 'triangle', 'star', 'squircle']

// Permuta aleatoria Fisher-Yates (random 1-6 sobre el array de imágenes).
function shufflePicks() {
  const picks = [0, 1, 2, 3, 4, 5]
  for (let i = picks.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[picks[i], picks[j]] = [picks[j], picks[i]]
  }
  return picks
}

const usageCodeJsx = `import m from 'mithril'
import { Mask } from 'panda-ui-mithril'
import mask1 from './assets/mask/mask1.jpg'

export const MyPage = {
  view() {
    return (
      <div>
        <Mask src={mask1} shape="circle" size="md" />
        <Mask src={mask1} shape="hexagon" size="md" />
        <Mask src={mask1} shape="star" size="md" />
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Mask } from 'panda-ui-mithril'
import mask1 from './assets/mask/mask1.jpg'

export const MyPage = {
  view() {
    return m('div', null, [
      m(Mask, { src: mask1, shape: 'circle', size: 'md' }),
      m(Mask, { src: mask1, shape: 'hexagon', size: 'md' }),
      m(Mask, { src: mask1, shape: 'star', size: 'md' })
    ])
  }
}`

export default {
  name: 'Mask',
  category: 'Data Display',
  description: 'Mask component for applying shapes to images.',

  oninit(vnode) {
    loadPageI18n('mask')
    vnode.state.picks = shufflePicks()
  },
  view(vnode) {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Mask</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Stack direction="row" gap="md" wrap="wrap" className={css({ alignItems: 'center' })}>
          {shapes.map((shape, i) => (
            <Mask key={shape} src={masks[vnode.state.picks[i]]} shape={shape} size="lg" />
          ))}
          <Button size="sm" variant="soft" onclick={() => { vnode.state.picks = shufflePicks() }}>
            {t('random')} 1–6
          </Button>
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
