import m from 'mithril'
import { css } from '../../../styled-system/css'
import { Skeleton } from '../../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Skeleton',
  category: 'Feedback',
  description: 'Skeleton component for loading placeholder content.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Skeleton</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Skeleton component for loading placeholder content.
        </p>

        <div style="width: 250px;">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-4 w-full mt-4" />
          <Skeleton className="h-4 w-3/4 mt-2" />
        </div>
      </div>
    )
  }
}
