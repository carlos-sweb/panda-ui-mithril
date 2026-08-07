import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Breadcrumbs } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'


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

  oninit() { loadPageI18n('breadcrumbs') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Breadcrumbs</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
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
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </section>
      </div>
    )
  }
}
