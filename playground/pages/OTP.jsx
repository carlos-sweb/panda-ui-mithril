import m from 'mithril'
import { css } from '../../styled-system/css'
import { t } from '../i18n/index.js'
import { OTP } from '../../src/index.js'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' })

const usageCode = `<OTP length={6} color="primary" />`

const classRows = [
  { className: 'otp', prop: '<OTP length={...}>', type: 'Component', description: 'For the container label' },
  { className: 'otp-joined', prop: 'joined', type: 'Modifier', description: 'Connects the character boxes together' },
  { className: 'otp-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'otp-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'otp-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'otp-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'otp-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
  { className: 'otp-neutral', prop: 'color="neutral"', type: 'Color', description: 'neutral color' },
  { className: 'otp-primary', prop: 'color="primary"', type: 'Color', description: 'primary color' },
  { className: 'otp-secondary', prop: 'color="secondary"', type: 'Color', description: 'secondary color' },
  { className: 'otp-accent', prop: 'color="accent"', type: 'Color', description: 'accent color' },
  { className: 'otp-success', prop: 'color="success"', type: 'Color', description: 'success color' },
  { className: 'otp-info', prop: 'color="info"', type: 'Color', description: 'info color' },
  { className: 'otp-warning', prop: 'color="warning"', type: 'Color', description: 'warning color' },
  { className: 'otp-error', prop: 'color="error"', type: 'Color', description: 'error color' },
]

export default {
  name: 'OTP',
  category: 'Data Input',
  description: 'One-time password input component for verification codes.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>OTP</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraphs.otp')}
        </p>

        <OTP length={4} />
        <OTP length={6} color="primary" />

        <section>
          <h2 className={sectionTitle}>Usage</h2>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <h2 className={sectionTitle}>Class Reference</h2>
          <ClassTable rows={classRows} />
        </section>
      </div>
    )
  }
}
