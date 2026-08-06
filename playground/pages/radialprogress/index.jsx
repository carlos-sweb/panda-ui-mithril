import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t } from '../../i18n/index.js'
import { RadialProgress } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const row = css({ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' })

const usageCode = `<RadialProgress value={70}>70%</RadialProgress>`

const classRows = [
  { className: 'radial-progress', prop: '<RadialProgress value={...}>', type: 'Component', description: 'Shows a radial progress' },
]

export default {
  name: 'RadialProgress',
  category: 'Feedback',
  description: 'Radial progress component for showing circular progress indicators.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Radial Progress</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraphs.radialprogress')}
        </p>

        <div className={row}>
          <RadialProgress value={0}>0%</RadialProgress>
          <RadialProgress value={25}>25%</RadialProgress>
          <RadialProgress value={50}>50%</RadialProgress>
          <RadialProgress value={75}>75%</RadialProgress>
          <RadialProgress value={100}>100%</RadialProgress>
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
