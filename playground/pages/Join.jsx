import m from 'mithril'
import { css } from '../../styled-system/css'
import { Join, JoinItem } from '../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Join',
  category: 'Layout',
  description: 'Join component for grouping elements together.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Join</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Join component for grouping elements together.
        </p>

        <Join>
          <JoinItem>Button 1</JoinItem>
          <JoinItem>Button 2</JoinItem>
          <JoinItem>Button 3</JoinItem>
        </Join>
      </div>
    )
  }
}
