import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Alert } from '../../../src/index.js'
import { Info, CheckCircle, AlertTriangle, AlertCircle, X, ChevronRight } from 'lucide-mithril'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const sectionStack = css({ display: 'flex', flexDirection: 'column', gap: '0.75rem' })
const sectionDesc = css({ opacity: 0.6, marginBottom: '1rem', maxWidth: '600px' })

const usageCode = `<Alert color="info">
  <Info />
  <span>12 unread messages. Tap to see.</span>
</Alert>

<Alert variant="soft" color="success">
  <CheckCircle />
  <span>Your purchase has been confirmed!</span>
</Alert>

<Alert direction="vertical" color="warning">
  <AlertTriangle />
  <span>Warning: Invalid email address!</span>
</Alert>`

const classRows = [
  { className: 'alert', prop: '<Alert>', type: 'Component', description: 'Container for displaying an important message' },
  { className: 'alert-info', prop: 'color="info"', type: 'Color', description: 'Info alert color' },
  { className: 'alert-success', prop: 'color="success"', type: 'Color', description: 'Success alert color' },
  { className: 'alert-warning', prop: 'color="warning"', type: 'Color', description: 'Warning alert color' },
  { className: 'alert-error', prop: 'color="error"', type: 'Color', description: 'Error alert color' },
  { className: 'alert-outline', prop: 'variant="outline"', type: 'Style', description: 'Transparent background with a colored border' },
  { className: 'alert-dash', prop: 'variant="dash"', type: 'Style', description: 'Transparent background with a dashed border' },
  { className: 'alert-soft', prop: 'variant="soft"', type: 'Style', description: 'Soft background tint with no border' },
  { className: 'alert-horizontal', prop: 'direction="horizontal" (default)', type: 'Direction', description: 'Lays out content in a row', isDefault: true },
  { className: 'alert-vertical', prop: 'direction="vertical"', type: 'Direction', description: 'Stacks content in a column — useful on mobile' },
]

export default {
  name: 'Alert',
  category: 'Feedback',
  description: 'Alert component for displaying important messages and notifications.',

  oninit() { loadPageI18n('alert') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Alert</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        {/* Neutral Alert (no color) */}
        <section>
          <Title as="h2" size="3">Neutral (No Color)</Title>
          <p className={sectionDesc}>Without a `color` prop, the alert falls back to a neutral base-200 background.</p>
          <div className={sectionStack}>
            <Alert>
              <ChevronRight />
              <span>Neutral alert without a color prop.</span>
            </Alert>
          </div>
        </section>

        {/* Base Alert */}
        <section>
          <Title as="h2" size="3">Base Alert</Title>
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
          <Title as="h2" size="3">Soft Style</Title>
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
          <Title as="h2" size="3">Outline Style</Title>
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
          <Title as="h2" size="3">Dash Style</Title>
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
          <Title as="h2" size="3">With Buttons + Responsive</Title>
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
          <Title as="h2" size="3">With Title and Description</Title>
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
          <Title as="h2" size="3">Horizontal Direction (Default)</Title>
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
          <Title as="h2" size="3">Vertical Direction</Title>
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

        {/* Style + Direction Combined */}
        <section>
          <Title as="h2" size="3">Style + Vertical Direction</Title>
          <p className={sectionDesc}>The `variant` prop (soft, outline, dash) combines with `direction="vertical"`.</p>
          <div className={sectionStack}>
            <Alert variant="soft" direction="vertical" color="warning">
              <AlertTriangle />
              <span>Soft + vertical warning alert</span>
            </Alert>
            <Alert variant="outline" direction="vertical" color="error">
              <AlertCircle />
              <span>Outline + vertical error alert</span>
            </Alert>
            <Alert variant="dash" direction="vertical" color="success">
              <CheckCircle />
              <span>Dash + vertical success alert</span>
            </Alert>
          </div>
        </section>

        {/* Without Icons */}
        <section>
          <Title as="h2" size="3">Without Icons</Title>
          <p className={sectionDesc}>Alerts can be used without icons.</p>
          <div className={sectionStack}>
            <Alert color="info">Info alert without icon</Alert>
            <Alert color="success">Success alert without icon</Alert>
            <Alert color="warning">Warning alert without icon</Alert>
            <Alert color="error">Error alert without icon</Alert>
          </div>
        </section>

        <section>
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </section>
      </Stack>
    )
  }
}