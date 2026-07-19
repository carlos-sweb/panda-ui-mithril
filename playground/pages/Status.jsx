import m from 'mithril'
import { css } from '../../styled-system/css'
import { Status } from '../../src/index.js'

const row = css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Status',
  category: 'Feedback',
  description: 'Status indicator component for showing online/offline states.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Status</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Status indicator component for showing online/offline states.
        </p>

        <div className={row}>
          <Status color="primary" />
          <Status color="secondary" />
          <Status color="accent" />
          <Status color="info" />
          <Status color="success" />
          <Status color="warning" />
          <Status color="error" />
        </div>
      </div>
    )
  }
}
