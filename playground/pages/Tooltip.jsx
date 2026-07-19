import m from 'mithril'
import { css } from '../../styled-system/css'
import { Button, Tooltip } from '../../src/index.js'

const row = css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Tooltip',
  category: 'Feedback',
  description: 'Tooltip component for showing additional information on hover.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Tooltip</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Tooltip component for showing additional information on hover.
        </p>

        <div className={row}>
          <Tooltip tip="Top" position="top"><Button>Top</Button></Tooltip>
          <Tooltip tip="Bottom" position="bottom"><Button>Bottom</Button></Tooltip>
          <Tooltip tip="Left" position="left"><Button>Left</Button></Tooltip>
          <Tooltip tip="Right" position="right"><Button>Right</Button></Tooltip>
        </div>
      </div>
    )
  }
}
