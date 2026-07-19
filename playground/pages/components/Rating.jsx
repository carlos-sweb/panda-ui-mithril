import m from 'mithril'
import { css } from '../../../styled-system/css'
import { Rating } from '../../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Rating',
  category: 'Data Input',
  description: 'Rating component for displaying star ratings.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Rating</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Rating component for displaying star ratings.
        </p>

        <Rating value={3} max={5} />
        <Rating value={4} max={5} size="lg" />
      </div>
    )
  }
}
