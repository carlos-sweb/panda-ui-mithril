import m from 'mithril'
import { css } from '../../styled-system/css'
import { t } from '../i18n/index.js'
import { Loading } from '../../src/index.js'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const row = css({ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' })

const usageCode = `<Loading variant="spinner" />
<Loading variant="dots" size="lg" />`

const classRows = [
  { className: 'loading', prop: '<Loading variant="...">', type: 'Component', description: 'Loading element' },
  { className: 'loading-spinner', prop: 'variant="spinner"', type: 'Style', description: 'spinner animation' },
  { className: 'loading-dots', prop: 'variant="dots"', type: 'Style', description: 'dots animation' },
  { className: 'loading-ring', prop: 'variant="ring"', type: 'Style', description: 'ring animation' },
  { className: 'loading-ball', prop: 'variant="ball"', type: 'Style', description: 'ball animation' },
  { className: 'loading-bars', prop: 'variant="bars"', type: 'Style', description: 'bars animation' },
  { className: 'loading-infinity', prop: 'variant="infinity"', type: 'Style', description: 'infinity animation' },
  { className: 'loading-xs', prop: 'size="xs"', type: 'Size', description: 'extra small size' },
  { className: 'loading-sm', prop: 'size="sm"', type: 'Size', description: 'small size' },
  { className: 'loading-md', prop: 'size="md" (default)', type: 'Size', description: 'medium size', isDefault: true },
  { className: 'loading-lg', prop: 'size="lg"', type: 'Size', description: 'large size' },
  { className: 'loading-xl', prop: 'size="xl"', type: 'Size', description: 'extra large size' },
]

export default {
  name: 'Loading',
  category: 'Feedback',
  description: 'Loading indicator component for showing progress and wait states.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Loading</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraphs.loading')}
        </p>

        <div className={row}>
          <Loading variant="spinner" />
          <Loading variant="ring" />
          <Loading variant="ball" />
          <Loading variant="bars" />
          <Loading variant="infinity" />
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
