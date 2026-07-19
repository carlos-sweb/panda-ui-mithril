import m from 'mithril'
import { css } from '../../../styled-system/css'
import { Mask } from '../../../src/index.js'

const row = css({ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Mask',
  category: 'Data Display',
  description: 'Mask component for applying shapes to images.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Mask</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Mask component for applying shapes to images.
        </p>

        <div className={row}>
          <Mask src="https://picsum.photos/100/100" shape="circle" className="w-20 h-20" />
          <Mask src="https://picsum.photos/100/100" shape="hexagon" className="w-20 h-20" />
          <Mask src="https://picsum.photos/100/100" shape="diamond" className="w-20 h-20" />
          <Mask src="https://picsum.photos/100/100" shape="triangle" className="w-20 h-20" />
          <Mask src="https://picsum.photos/100/100" shape="star" className="w-20 h-20" />
        </div>
      </div>
    )
  }
}
