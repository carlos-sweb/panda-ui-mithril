import m from 'mithril'
import { css } from '../../styled-system/css'
import { Steps, Step } from '../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Steps',
  category: 'Navigation',
  description: 'Steps component for showing progress through a multi-step process.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Steps</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Steps component for showing progress through a multi-step process.
        </p>

        <Steps>
          <Step primary>Register</Step>
          <Step primary>Choose Plan</Step>
          <Step>Purchase</Step>
          <Step>Receive</Step>
        </Steps>
      </div>
    )
  }
}
