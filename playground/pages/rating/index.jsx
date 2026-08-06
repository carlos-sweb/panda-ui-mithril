import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Rating } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const section = css({ marginBottom: '2rem' })
const row = css({ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' })
const column = css({ display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' })
const scaleRow = css({ display: 'flex', alignItems: 'center', gap: '0.75rem' })
const scaleLabel = css({ fontSize: '0.875rem', opacity: 0.6, minWidth: '3.5rem' })
const note = css({ fontSize: '0.875rem', opacity: 0.6, marginTop: '0.5rem' })
const valueText = css({ fontSize: '0.875rem', opacity: 0.6 })

const usageCode = `// Uncontrolled: internal state, defaultValue initializes
<Rating defaultValue={3} max={5} onchange={(v) => console.log(v)} />

// Controlled: value + onchange
<Rating value={state.rating} max={5} onchange={(v) => (state.rating = v)} />

// Static (someone else's rating) — no interaction
<Rating value={3} max={5} readonly />

// Configurable max score: 1-3 scale, 1-5 scale, etc. (defaults to 5)
<Rating defaultValue={2} max={3} />
<Rating defaultValue={4} max={10} />

// Re-click the selected star to clear (value 0)`

const classRows = [
  { className: 'rating', prop: '<Rating value={...} max={...}>', type: 'Component', description: 'Rating container (flex row of stars)' },
  { className: 'rating-star', prop: '(internal)', type: 'Part', description: 'Each star is a lucide Star icon; filled/empty states via recipe' },
  { className: 'rating-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'rating-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'rating-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'rating-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'rating-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
]

export default {
  oninit(vnode) {
    loadPageI18n('rating')
    // uncontrolled demo state
    vnode.state.uncontrolled = 3
    // controlled demo state
    vnode.state.controlled = 2
    // custom max demo state
    vnode.state.threeStars = 2
    vnode.state.fourStars = 2
    vnode.state.tenStars = 7
  },

  name: 'Rating',
  category: 'Data Input',
  description: 'Rating component for displaying star ratings.',

  view(vnode) {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Rating</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <section className={section}>
          <h3 className={heading}>Editable (uncontrolled)</h3>
          <Rating defaultValue={vnode.state.uncontrolled} max={5} onchange={(v) => { vnode.state.uncontrolled = v }} />
          <p className={note}>Hover to preview, click to set, re-click the selected star to clear. Value: {vnode.state.uncontrolled}</p>
        </section>

        <section className={section}>
          <h3 className={heading}>Editable (controlled)</h3>
          <Rating value={vnode.state.controlled} max={5} onchange={(v) => { vnode.state.controlled = v }} />
          <p className={note}>Integer scores only. Value: {vnode.state.controlled}</p>
        </section>

        <section className={section}>
          <h3 className={heading}>Configurable max score</h3>
          <div className={column}>
            <div className={scaleRow}>
              <span className={scaleLabel}>1-3</span>
              <Rating defaultValue={vnode.state.threeStars} max={3} onchange={(v) => { vnode.state.threeStars = v }} />
              <span className={valueText}>Value: {vnode.state.threeStars}</span>
            </div>
            <div className={scaleRow}>
              <span className={scaleLabel}>1-4</span>
              <Rating defaultValue={vnode.state.fourStars} max={4} onchange={(v) => { vnode.state.fourStars = v }} />
              <span className={valueText}>Value: {vnode.state.fourStars}</span>
            </div>
            <div className={scaleRow}>
              <span className={scaleLabel}>1-10</span>
              <Rating defaultValue={vnode.state.tenStars} max={10} onchange={(v) => { vnode.state.tenStars = v }} />
              <span className={valueText}>Value: {vnode.state.tenStars}</span>
            </div>
          </div>
          <p className={note}>Set <code>max</code> to any value: a 1-3 scale, 1-5 (default), even 1-10.</p>
        </section>

        <section className={section}>
          <h3 className={heading}>Readonly (static rating)</h3>
          <div className={row}>
            <Rating value={4} max={5} readonly />
            <Rating value={3} max={5} readonly />
            <Rating value={2} max={3} readonly />
          </div>
          <p className={note}>Use this for ratings left by other users — no hover, no click.</p>
        </section>

        <section className={section}>
          <h3 className={heading}>Sizes</h3>
          <div className={row}>
            <Rating value={3} size="xs" readonly />
            <Rating value={3} size="sm" readonly />
            <Rating value={3} size="md" readonly />
            <Rating value={3} size="lg" readonly />
            <Rating value={3} size="xl" readonly />
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Colors</h3>
          <div className={row}>
            <Rating value={4} readonly />
            <Rating value={4} color="warning" readonly />
            <Rating value={4} color="success" readonly />
            <Rating value={4} color="error" readonly />
            <Rating value={4} color="primary" readonly />
          </div>
          <p className={note}>Default color is warning (yellow); override with any DaisyColor.</p>
        </section>

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
