import m from 'mithril'
import { css } from '../../../styled-system/css'
import { Megamenu, MegamenuActive } from '../../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Megamenu',
  category: 'Navigation',
  description: 'Mega menu component for large dropdown navigation menus.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Megamenu</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Mega menu component for large dropdown navigation menus.
        </p>

        <Megamenu>
          <MegamenuActive />
          <div className="grid grid-cols-3 gap-4">
            <div><h3 className="font-bold">Category 1</h3></div>
            <div><h3 className="font-bold">Category 2</h3></div>
            <div><h3 className="font-bold">Category 3</h3></div>
          </div>
        </Megamenu>
      </div>
    )
  }
}
