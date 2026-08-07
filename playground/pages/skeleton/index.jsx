import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Skeleton } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' })
const box = css({ width: '250px' })
const line1 = css({ height: '8rem', width: '100%' })
const line2 = css({ height: '1rem', width: '100%', marginTop: '1rem' })
const line3 = css({ height: '1rem', width: '75%', marginTop: '0.5rem' })

const usageCode = `<Skeleton style="height: 8rem; width: 100%" />
<Skeleton style="height: 1rem; width: 100%" />`

const classRows = [
  { className: 'skeleton', prop: '<Skeleton>', type: 'Component', description: 'A placeholder div with loading animation' },
  { className: 'skeleton-text', prop: 'text', type: 'Modifier', description: 'Animates the text color instead of background color' },
]

export default {
  name: 'Skeleton',
  category: 'Feedback',
  description: 'Skeleton component for loading placeholder content.',

  oninit() { loadPageI18n('skeleton') },
  view() {
    return (
      <div className={stack}>
        <Title as="h1" size="2">Skeleton</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <div className={box}>
          <Skeleton className={line1} />
          <Skeleton className={line2} />
          <Skeleton className={line3} />
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
