import m from 'mithril'
import { css } from '../../../styled-system/css'
import { Diff, DiffItem1, DiffItem2, DiffResizer } from '../../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Diff',
  category: 'Layout',
  description: 'Diff component for comparing two images side by side.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Diff</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Diff component for comparing two images side by side.
        </p>

        <Diff className="aspect-16/9 h-64">
          <DiffItem1><img src="https://picsum.photos/400/300?random=1" alt="Before" /></DiffItem1>
          <DiffItem2><img src="https://picsum.photos/400/300?random=2" alt="After" /></DiffItem2>
          <DiffResizer />
        </Diff>
      </div>
    )
  }
}
