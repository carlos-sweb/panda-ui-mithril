import m from 'mithril'
import { css } from '../../styled-system/css'
import { t } from '../i18n/index.js'
import { Indicator, Badge, Button } from '../../src/index.js'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const row = css({ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' })

const usageCode = `<Indicator position="end top">
  <Badge color="secondary" className="indicator-item">New</Badge>
  <Button>Main content</Button>
</Indicator>`

const classRows = [
  { className: 'indicator', prop: '<Indicator>', type: 'Component', description: 'Container element' },
  { className: 'indicator-item', prop: 'item={...} or className="indicator-item"', type: 'Part', description: 'will be placed on the corner of sibling' },
  { className: 'indicator-start', prop: 'position="start"', type: 'Placement', description: 'align horizontally to the start' },
  { className: 'indicator-center', prop: 'position="center"', type: 'Placement', description: 'align horizontally to the center' },
  { className: 'indicator-end', prop: 'position="end" (default)', type: 'Placement', description: 'align horizontally to the end', isDefault: true },
  { className: 'indicator-top', prop: 'position="top" (default)', type: 'Placement', description: 'align vertically to top', isDefault: true },
  { className: 'indicator-middle', prop: 'position="middle"', type: 'Placement', description: 'align vertically to middle' },
  { className: 'indicator-bottom', prop: 'position="bottom"', type: 'Placement', description: 'align vertically to bottom' },
]

export default {
  name: 'Indicator',
  category: 'Feedback',
  description: 'Indicator component for adding badges or dots to other elements.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Indicator</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraphs.indicator')}
        </p>

        <div className={row}>
          <Indicator position="end top">
            <Badge color="secondary" className="indicator-item">New</Badge>
            <Button>Main content</Button>
          </Indicator>
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
