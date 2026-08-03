import m from 'mithril'
import { css } from '../../styled-system/css'
import { t } from '../i18n/index.js'
import { Toast, Alert } from '../../src/index.js'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })
const placementBox = css({
  position: 'relative',
  height: '14rem',
  border: '1px dashed color-mix(in oklab, currentColor 20%, transparent)',
  borderRadius: '0.5rem',
  overflow: 'hidden',
})
const chip = css({
  position: 'absolute',
  fontSize: '0.75rem',
  fontFamily: 'var(--fonts-mono, monospace)',
  padding: '0.25rem 0.5rem',
  borderRadius: '0.25rem',
  background: 'color-mix(in oklab, currentColor 12%, transparent)',
})

const PLACEMENTS = [
  { label: 'top start', top: '0.5rem', left: '0.5rem' },
  { label: 'top center', top: '0.5rem', left: '50%', translateX: true },
  { label: 'top end', top: '0.5rem', right: '0.5rem' },
  { label: 'bottom start', bottom: '0.5rem', left: '0.5rem' },
  { label: 'bottom center', bottom: '0.5rem', left: '50%', translateX: true },
  { label: 'bottom end (default)', bottom: '0.5rem', right: '0.5rem' },
]

const usageCode = `<Toast position="bottom end">
  <Alert color="info">Toast notification!</Alert>
</Toast>`

const classRows = [
  { className: 'toast', prop: '<Toast position="...">', type: 'Component', description: 'Container element, fixed to the viewport' },
  { className: 'toast-start', prop: 'position="... start"', type: 'Placement', description: 'Aligns to the start (left in LTR)' },
  { className: 'toast-center', prop: 'position="... center"', type: 'Placement', description: 'Aligns to the horizontal center' },
  { className: 'toast-end', prop: 'position="... end" (default)', type: 'Placement', description: 'Aligns to the end (right in LTR)', isDefault: true },
  { className: 'toast-top', prop: 'position="top ..."', type: 'Placement', description: 'Aligns to the top' },
  { className: 'toast-middle', prop: 'position="middle ..."', type: 'Placement', description: 'Aligns to the vertical middle' },
  { className: 'toast-bottom', prop: 'position="bottom ..." (default)', type: 'Placement', description: 'Aligns to the bottom', isDefault: true },
]

export default {
  name: 'Toast',
  category: 'Feedback',
  description: 'Toast component for showing temporary notifications.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Toast</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraphs.toast')}
        </p>

        <Toast position="bottom end">
          <Alert color="info">Toast notification!</Alert>
        </Toast>

        <h3 className={css({ fontSize: '0.875rem', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })}>
          Available placements
        </h3>
        <div className={placementBox}>
          {PLACEMENTS.map((p) => (
            <span
              className={chip}
              style={{
                top: p.top,
                bottom: p.bottom,
                left: p.left,
                right: p.right,
                transform: p.translateX ? 'translateX(-50%)' : undefined,
              }}
            >
              {p.label}
            </span>
          ))}
        </div>

        <section>
          <h2 className={sectionTitle}>{t('common.usage')}</h2>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <h2 className={sectionTitle}>{t('common.classReference')}</h2>
          <ClassTable rows={classRows} />
        </section>
      </div>
    )
  }
}
