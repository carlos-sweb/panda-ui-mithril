import m from 'mithril'
import { css } from '../../styled-system/css'
import { Alert } from '../../src/index.js'
import { Info, CheckCircle, AlertTriangle, AlertCircle, X, ChevronRight } from 'lucide-mithril'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionStack = css({ display: 'flex', flexDirection: 'column', gap: '0.75rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' })
const sectionDesc = css({ opacity: 0.6, marginBottom: '1rem', maxWidth: '600px' })

export default {
  name: 'Alert',
  category: 'Feedback',
  description: 'Alert component for displaying important messages and notifications.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Alert</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Alert component for displaying important messages and notifications. All variants from daisyUI replicated.
        </p>

        {/* Base Alert */}
        <section>
          <h2 className={sectionTitle}>Base Alert</h2>
          <p className={sectionDesc}>Default alert with different colors.</p>
          <div className={sectionStack}>
            <Alert color="info">
              <Info />
              <span>12 unread messages. Tap to see.</span>
            </Alert>
            <Alert color="success">
              <CheckCircle />
              <span>Your purchase has been confirmed!</span>
            </Alert>
            <Alert color="warning">
              <AlertTriangle />
              <span>Warning: Invalid email address!</span>
            </Alert>
            <Alert color="error">
              <AlertCircle />
              <span>Error! Task failed successfully.</span>
            </Alert>
          </div>
        </section>

        {/* Soft Style */}
        <section>
          <h2 className={sectionTitle}>Soft Style</h2>
          <p className={sectionDesc}>Soft background with no border.</p>
          <div className={sectionStack}>
            <Alert variant="soft" color="info">
              <Info />
              <span>12 unread messages. Tap to see.</span>
            </Alert>
            <Alert variant="soft" color="success">
              <CheckCircle />
              <span>Your purchase has been confirmed!</span>
            </Alert>
            <Alert variant="soft" color="warning">
              <AlertTriangle />
              <span>Warning: Invalid email address!</span>
            </Alert>
            <Alert variant="soft" color="error">
              <AlertCircle />
              <span>Error! Task failed successfully.</span>
            </Alert>
          </div>
        </section>

        {/* Outline Style */}
        <section>
          <h2 className={sectionTitle}>Outline Style</h2>
          <p className={sectionDesc}>Transparent background with colored border.</p>
          <div className={sectionStack}>
            <Alert variant="outline" color="info">
              <Info />
              <span>12 unread messages. Tap to see.</span>
            </Alert>
            <Alert variant="outline" color="success">
              <CheckCircle />
              <span>Your purchase has been confirmed!</span>
            </Alert>
            <Alert variant="outline" color="warning">
              <AlertTriangle />
              <span>Warning: Invalid email address!</span>
            </Alert>
            <Alert variant="outline" color="error">
              <AlertCircle />
              <span>Error! Task failed successfully.</span>
            </Alert>
          </div>
        </section>

        {/* Dash Style */}
        <section>
          <h2 className={sectionTitle}>Dash Style</h2>
          <p className={sectionDesc}>Transparent background with dashed border.</p>
          <div className={sectionStack}>
            <Alert variant="dash" color="info">
              <Info />
              <span>12 unread messages. Tap to see.</span>
            </Alert>
            <Alert variant="dash" color="success">
              <CheckCircle />
              <span>Your purchase has been confirmed!</span>
            </Alert>
            <Alert variant="dash" color="warning">
              <AlertTriangle />
              <span>Warning: Invalid email address!</span>
            </Alert>
            <Alert variant="dash" color="error">
              <AlertCircle />
              <span>Error! Task failed successfully.</span>
            </Alert>
          </div>
        </section>

        {/* With Buttons + Responsive */}
        <section>
          <h2 className={sectionTitle}>With Buttons + Responsive</h2>
          <p className={sectionDesc}>Vertical on mobile, horizontal on desktop. Includes action buttons.</p>
          <Alert direction="vertical" color="info">
            <Info />
            <span>we use cookies for no reason.</span>
            <div className={css({ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' })}>
              <button className={css({ padding: '0.5rem 1rem', fontSize: '0.875rem', border: '1px solid', borderColor: 'currentColor', borderRadius: 'var(--radius-selector)', background: 'transparent', cursor: 'pointer' })}>Deny</button>
              <button className={css({ padding: '0.5rem 1rem', fontSize: '0.875rem', border: '1px solid', borderColor: 'currentColor', borderRadius: 'var(--radius-selector)', background: 'var(--colors-primary)', color: 'var(--colors-primary-content)', cursor: 'pointer' })}>Accept</button>
            </div>
          </Alert>
        </section>

        {/* With Title and Description */}
        <section>
          <h2 className={sectionTitle}>With Title and Description</h2>
          <p className={sectionDesc}>Structured alert with title, description, and action button.</p>
          <Alert direction="vertical" color="info">
            <Info />
            <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.25rem' })}>
              <h3 className={css({ fontWeight: '700', fontSize: '1rem' })}>New message!</h3>
              <div className={css({ fontSize: '0.75rem', opacity: 0.8 })}>You have 1 unread message</div>
            </div>
            <button className={css({ padding: '0.5rem 1rem', fontSize: '0.875rem', border: '1px solid', borderColor: 'currentColor', borderRadius: 'var(--radius-selector)', background: 'transparent', cursor: 'pointer', marginTop: '0.5rem' })}>See</button>
          </Alert>
        </section>

        {/* Horizontal Direction (default) */}
        <section>
          <h2 className={sectionTitle}>Horizontal Direction (Default)</h2>
          <p className={sectionDesc}>Content flows horizontally, good for desktop.</p>
          <div className={sectionStack}>
            <Alert direction="horizontal" color="info">
              <Info />
              <span>Horizontal info alert</span>
            </Alert>
            <Alert direction="horizontal" color="success">
              <CheckCircle />
              <span>Horizontal success alert</span>
            </Alert>
          </div>
        </section>

        {/* Vertical Direction */}
        <section>
          <h2 className={sectionTitle}>Vertical Direction</h2>
          <p className={sectionDesc}>Content stacks vertically, good for mobile.</p>
          <div className={sectionStack}>
            <Alert direction="vertical" color="info">
              <Info />
              <span>Vertical info alert</span>
            </Alert>
            <Alert direction="vertical" color="success">
              <CheckCircle />
              <span>Vertical success alert</span>
            </Alert>
          </div>
        </section>

        {/* Without Icons */}
        <section>
          <h2 className={sectionTitle}>Without Icons</h2>
          <p className={sectionDesc}>Alerts can be used without icons.</p>
          <div className={sectionStack}>
            <Alert color="info">Info alert without icon</Alert>
            <Alert color="success">Success alert without icon</Alert>
            <Alert color="warning">Warning alert without icon</Alert>
            <Alert color="error">Error alert without icon</Alert>
          </div>
        </section>
      </div>
    )
  }
}