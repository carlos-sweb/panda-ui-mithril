import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Mask, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const usageCodeJsx = `import m from 'mithril'
import { Mask } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Mask src="/avatar.jpg" shape="circle" />
        <Mask src="/avatar.jpg" shape="hexagon" />
        <Mask src="/avatar.jpg" shape="star" />
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Mask } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m('div', null, [
      m(Mask, { src: '/avatar.jpg', shape: 'circle' }),
      m(Mask, { src: '/avatar.jpg', shape: 'hexagon' }),
      m(Mask, { src: '/avatar.jpg', shape: 'star' })
    ])
  }
}`

const classRows = [
  { className: 'mask', prop: '<Mask shape="...">', type: 'Component', description: 'Masks the content with shape' },
  { className: 'mask-squircle', prop: 'shape="squircle"', type: 'Style', description: 'squircle' },
  { className: 'mask-heart', prop: 'shape="heart"', type: 'Style', description: 'heart' },
  { className: 'mask-hexagon', prop: 'shape="hexagon"', type: 'Style', description: 'hexagon vertical' },
  { className: 'mask-hexagon-2', prop: 'shape="hexagon-2"', type: 'Style', description: 'hexagon horizontal' },
  { className: 'mask-decagon', prop: 'shape="decagon"', type: 'Style', description: 'decagon' },
  { className: 'mask-pentagon', prop: 'shape="pentagon"', type: 'Style', description: 'pentagon' },
  { className: 'mask-diamond', prop: 'shape="diamond"', type: 'Style', description: 'diamond' },
  { className: 'mask-square', prop: 'shape="square"', type: 'Style', description: 'square' },
  { className: 'mask-circle', prop: 'shape="circle"', type: 'Style', description: 'circle' },
  { className: 'mask-star', prop: 'shape="star"', type: 'Style', description: 'star' },
  { className: 'mask-star-2', prop: 'shape="star-2"', type: 'Style', description: 'star (bold)' },
  { className: 'mask-triangle', prop: 'shape="triangle"', type: 'Style', description: 'triangle pointing top' },
  { className: 'mask-triangle-2', prop: 'shape="triangle-2"', type: 'Style', description: 'triangle pointing down' },
  { className: 'mask-triangle-3', prop: 'shape="triangle-3"', type: 'Style', description: 'triangle pointing left' },
  { className: 'mask-triangle-4', prop: 'shape="triangle-4"', type: 'Style', description: 'triangle pointing right' },
  { className: 'mask-half-1', prop: 'half={1}', type: 'Modifier', description: 'Crops only the first half of mask' },
  { className: 'mask-half-2', prop: 'half={2}', type: 'Modifier', description: 'Crops only the second half of mask' },
]

export default {
  name: 'Mask',
  category: 'Data Display',
  description: 'Mask component for applying shapes to images.',

  oninit() { loadPageI18n('mask') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Mask</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Stack direction="row" gap="md" wrap="wrap">
          <Mask src="https://picsum.photos/100/100" shape="circle" className="w-20 h-20" />
          <Mask src="https://picsum.photos/100/100" shape="hexagon" className="w-20 h-20" />
          <Mask src="https://picsum.photos/100/100" shape="diamond" className="w-20 h-20" />
          <Mask src="https://picsum.photos/100/100" shape="triangle" className="w-20 h-20" />
          <Mask src="https://picsum.photos/100/100" shape="star" className="w-20 h-20" />
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
