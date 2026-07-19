import m from 'mithril'
import { css } from '../../styled-system/css'
import { Loading } from '../../src/index.js'

const row = css({ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Loading',
  category: 'Feedback',
  description: 'Loading indicator component for showing progress and wait states.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Loading</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Loading indicator component for showing progress and wait states.
        </p>

        <div className={row}>
          <Loading variant="spinner" />
          <Loading variant="ring" />
          <Loading variant="ball" />
          <Loading variant="bars" />
          <Loading variant="infinity" />
        </div>
      </div>
    )
  }
}
