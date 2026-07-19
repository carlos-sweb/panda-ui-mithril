import m from 'mithril'
import { css } from '../../styled-system/css'
import { Kbd } from '../../src/index.js'

const row = css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Kbd',
  category: 'Data Display',
  description: 'Keyboard key component for displaying keyboard shortcuts.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Kbd</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Keyboard key component for displaying keyboard shortcuts.
        </p>

        <div className={row}>
          <Kbd size="xs">K</Kbd>
          <Kbd size="sm">Shift</Kbd>
          <Kbd size="md">Enter</Kbd>
          <Kbd size="lg">Ctrl</Kbd>
          <Kbd size="xl">Space</Kbd>
        </div>
      </div>
    )
  }
}
