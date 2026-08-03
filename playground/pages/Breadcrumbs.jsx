import m from 'mithril'
import { css } from '../../styled-system/css'
import { t } from '../i18n/index.js'
import { Breadcrumbs } from '../../src/index.js'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' })

const usageCode = `<Breadcrumbs
  items={[
    { label: 'Home', href: '#' },
    { label: 'Docs', href: '#' },
    { label: 'Components' },
  ]}
/>`

const classRows = [
  { className: 'breadcrumbs', prop: '<Breadcrumbs items={...}>', type: 'Component', description: 'Wrapper around a <ul>' },
]

export default {
  name: 'Breadcrumbs',
  category: 'Navigation',
  description: 'Breadcrumbs help users understand their location in the site hierarchy.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Breadcrumbs</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraphs.breadcrumbs')}
        </p>

        <Breadcrumbs
          items={[
            { label: 'Home', href: '#' },
            { label: 'Docs', href: '#' },
            { label: 'Components' },
          ]}
        />

        <Breadcrumbs>
          <li><a href="#">Home</a></li>
          <li><a href="#">Docs</a></li>
          <li>Manual (children)</li>
        </Breadcrumbs>

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
