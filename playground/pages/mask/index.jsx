import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Mask } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const row = css({ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' })

const usageCode = `<Mask src="/avatar.jpg" shape="circle" />
<Mask src="/avatar.jpg" shape="hexagon" />
<Mask src="/avatar.jpg" shape="star" />`

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
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <div className={row}>
          <Mask src="https://picsum.photos/100/100" shape="circle" className="w-20 h-20" />
          <Mask src="https://picsum.photos/100/100" shape="hexagon" className="w-20 h-20" />
          <Mask src="https://picsum.photos/100/100" shape="diamond" className="w-20 h-20" />
          <Mask src="https://picsum.photos/100/100" shape="triangle" className="w-20 h-20" />
          <Mask src="https://picsum.photos/100/100" shape="star" className="w-20 h-20" />
        </div>

        <section>
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </section>
      </div>
    )
  }
}
