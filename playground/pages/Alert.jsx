import m from 'mithril'
import { css } from '../../styled-system/css'
import { Alert } from '../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Alert',
  category: 'Feedback',
  description: 'Alert component for displaying important messages and notifications.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Alert</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Alert component for displaying important messages and notifications.
        </p>

        <Alert color="info">Info alert message</Alert>
        <Alert color="success">Success alert message</Alert>
        <Alert color="warning">Warning alert message</Alert>
        <Alert color="error">Error alert message</Alert>
        <Alert variant="outline" color="info">Outline info</Alert>
        <Alert variant="dash" color="success">Dash success</Alert>
      </div>
    )
  }
}
