import m from 'mithril'
import { css } from '../../../styled-system/css'
import { OTP } from '../../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'OTP',
  category: 'Data Input',
  description: 'One-time password input component for verification codes.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>OTP</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          One-time password input component for verification codes.
        </p>

        <OTP length={4} />
        <OTP length={6} color="primary" />
      </div>
    )
  }
}
