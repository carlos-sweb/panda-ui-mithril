import m from 'mithril'
import { css } from '../../../styled-system/css'
import { Button, FAB, FABMain, FABAction } from '../../../src/index.js'

const row = css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' })

export default {
  name: 'FAB',
  category: 'Actions',
  description: 'Floating Action Button represents the primary action of a screen.',

  view() {
    return (
      <div>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>FAB</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Floating Action Button represents the primary action of a screen. It appears in front of all screen content.
        </p>

        <div className={row} style={css({ height: '300px', position: 'relative' })}>
          <FAB>
            <FABMain><Button color="primary" circle size="lg">+</Button></FABMain>
            <FABAction label="Add"><Button circle size="lg">A</Button></FABAction>
            <FABAction label="Edit"><Button circle size="lg">B</Button></FABAction>
          </FAB>
        </div>
      </div>
    )
  }
}
