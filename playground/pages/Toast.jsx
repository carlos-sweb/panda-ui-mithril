import m from 'mithril'
import { css } from '../../styled-system/css'
import { Toast, Alert } from '../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Toast',
  category: 'Feedback',
  description: 'Toast component for showing temporary notifications.',

  view() {
    return <div className={stack}>{<h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Toast</h1>}{<p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>Toast component for showing temporary notifications.</p>}{<Toast position="bottom end">{<Alert color="info">Toast notification!</Alert>}</Toast>}</div>
  }
}
