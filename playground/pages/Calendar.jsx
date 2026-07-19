import m from 'mithril'
import { css } from '../../styled-system/css'
import { Calendar } from '../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Calendar',
  category: 'Data Input',
  description: 'Calendar component for selecting dates.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Calendar</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Calendar component for selecting dates.
        </p>

        <Calendar>
          <p>Calendar component placeholder.</p>
        </Calendar>
      </div>
    )
  }
}
