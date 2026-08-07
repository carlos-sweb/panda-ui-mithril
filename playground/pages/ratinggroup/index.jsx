import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, RatingGroup, Rating } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const row = css({ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })

const usageCode = `<RatingGroup label="Score" defaultValue={3} onchange={(v) => console.log(v)} />
<RatingGroup label="Rating" value={4} onchange={setValue} color="primary" />`

const classRows = [
  { className: 'rating-group', prop: '<RatingGroup>', type: 'Component', description: 'Rating wrapper with label and value display' },
  { className: 'rating-group-label', prop: 'label', type: 'string', description: 'Label text displayed above/beside the stars' },
]

export default {
  oninit() { loadPageI18n('ratinggroup') },

  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">RatingGroup</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <section>
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <CodeExample code={usageCode} language="jsx" />
        </section>

        <section>
          <Title as="h2" size="3">Basic</Title>
          <h4 className={heading}>Wrap Rating with a label that shows the value</h4>
          <div className={row}>
            <RatingGroup label="Score" defaultValue={3} />
            <RatingGroup label="Quality" defaultValue={4} color="secondary" size="lg" />
          </div>
        </section>

        <section>
          <Title as="h2" size="3">Readonly</Title>
          <h4 className={heading}>Display-only: no interaction, label with score</h4>
          <div className={row}>
            <RatingGroup label="Rating" value={4} readonly />
            <RatingGroup label="Performance" value={2} readonly color="info" />
          </div>
        </section>

        <section>
          <Title as="h2" size="3">Colors</Title>
          <div className={row}>
            <RatingGroup label="Default" defaultValue={3} />
            <RatingGroup label="Primary" defaultValue={3} color="primary" />
            <RatingGroup label="Secondary" defaultValue={3} color="secondary" />
            <RatingGroup label="Accent" defaultValue={3} color="accent" />
          </div>
        </section>

        <section>
          <Title as="h2" size="3">Sizes</Title>
          <div className={row}>
            <RatingGroup label="xs" defaultValue={3} size="xs" />
            <RatingGroup label="sm" defaultValue={3} size="sm" />
            <RatingGroup label="md" defaultValue={3} />
            <RatingGroup label="lg" defaultValue={3} size="lg" />
            <RatingGroup label="xl" defaultValue={3} size="xl" />
          </div>
        </section>

        <section>
          <Title as="h2" size="3">Hide value</Title>
          <h4 className={heading}>showValue={'{false}'} — label only, no numeric display</h4>
          <div className={row}>
            <RatingGroup label="Overall" defaultValue={4} showValue={false} />
          </div>
        </section>

        <section>
          <Title as="h2" size="3">With standalone Rating</Title>
          <h4 className={heading}>Compare: Rating (no label) vs RatingGroup (with label)</h4>
          <div className={row}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span className={heading}>Rating</span>
              <Rating defaultValue={3} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <span className={heading}>RatingGroup</span>
              <RatingGroup label="Score" defaultValue={3} />
            </div>
          </div>
        </section>

        <section>
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </section>
      </div>
    )
  }
}
