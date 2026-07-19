import m from 'mithril'
import { css } from '../../styled-system/css'
import { RadialProgress } from '../../src/index.js'

const row = css({ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'RadialProgress',
  category: 'Feedback',
  description: 'Radial progress component for showing circular progress indicators.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Radial Progress</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Radial progress component for showing circular progress indicators.
        </p>

        <div className={row}>
          <RadialProgress value={0}>0%</RadialProgress>
          <RadialProgress value={25}>25%</RadialProgress>
          <RadialProgress value={50}>50%</RadialProgress>
          <RadialProgress value={75}>75%</RadialProgress>
          <RadialProgress value={100}>100%</RadialProgress>
        </div>
      </div>
    )
  }
}
