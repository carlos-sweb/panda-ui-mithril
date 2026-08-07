import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Title, Rating } from '../../../src/index.js'
import { Title, RatingGroup } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const classRows = [
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
        <Title as="h1" size="2">Rating</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <section className={section}>
          <Title as="h3" size="5">Editable (uncontrolled)</Title>
          <Rating defaultValue={vnode.state.uncontrolled} max={5} onchange={(v) => { vnode.state.uncontrolled = v }} />
          <p className={note}>Hover to preview, click to set, re-click the selected star to clear. Value: {vnode.state.uncontrolled}</p>
        </section>

        <section className={section}>
          <Title as="h3" size="5">Editable (controlled)</Title>
          <Rating value={vnode.state.controlled} max={5} onchange={(v) => { vnode.state.controlled = v }} />
          <p className={note}>Integer scores only. Value: {vnode.state.controlled}</p>
        </section>

        <section className={section}>
          <Title as="h3" size="5">Configurable max score</Title>
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
          <Title as="h3" size="5">Readonly (static rating)</Title>
          <div className={row}>
            <Rating value={4} max={5} readonly />
            <Rating value={3} max={5} readonly />
            <Rating value={2} max={3} readonly />
          </div>
          <p className={note}>Use this for ratings left by other users — no hover, no click.</p>
        </section>

        <section className={section}>
          <Title as="h3" size="5">Sizes</Title>
          <div className={row}>
            <Rating value={3} size="xs" readonly />
            <Rating value={3} size="sm" readonly />
            <Rating value={3} size="md" readonly />
            <Rating value={3} size="lg" readonly />
            <Rating value={3} size="xl" readonly />
          </div>
        </section>

        <section className={section}>
          <Title as="h3" size="5">Colors</Title>
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
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <Title as="h2" size="3">With RatingGroup</Title>
          <Title as="h4" size="6">Adds a label above the Rating — ideal for forms and surveys</Title>
          <div className={row}>
            <RatingGroup label="Quality" defaultValue={4} />
            <RatingGroup label="Difficulty" defaultValue={2} color="info" size="lg" />
          </div>
          <p className={css({ fontSize: '0.875rem', opacity: 0.6, marginTop: '0.5rem' })}>
            Use <code>&lt;Rating /&gt;</code> for standalone stars. Use{' '}
            <code>&lt;RatingGroup /&gt;</code> when you need a label. See the{' '}
            <a href="#!/ratinggroup" className={css({ color: 'token(colors.primary)', textDecoration: 'underline' })}>
              RatingGroup page
            </a>{' '}for full API.
          </p>
        </section>

        <section>
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </section>
      </div>
    )
  }
}
