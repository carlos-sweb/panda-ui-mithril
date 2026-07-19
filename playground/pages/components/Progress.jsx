import m from 'mithril'
import { css } from '../../../styled-system/css'
import { Progress } from '../../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Progress',
  category: 'Feedback',
  description: 'Progress bar component for showing completion status.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Progress</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Progress bar component for showing completion status.
        </p>

        <Progress value={0} max={100} />
        <Progress value={25} max={100} color="primary" />
        <Progress value={50} max={100} color="secondary" />
        <Progress value={75} max={100} color="accent" />
        <Progress value={100} max={100} color="success" />
      </div>
    )
  }
}
