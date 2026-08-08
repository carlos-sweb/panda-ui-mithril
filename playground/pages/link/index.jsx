import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Title, Link } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const row = css({ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' })

const usageCode = `<Link href="#">Default</Link>
<Link href="#" color="primary">Primary</Link>
<Link href="#" hover>Hover only</Link>`

const classRows = [
  { className: 'link', prop: 'hover={false}', type: 'Component', description: 'Adds underline — note: this component defaults to hover=true, so pass hover={false} to always show the underline' },
  { className: 'link-hover', prop: 'hover (default)', type: 'Style', description: 'Only shows underline on hover — this is the default, no prop needed', isDefault: true },
  { className: 'link-neutral', prop: 'color="neutral"', type: 'Color', description: 'neutral color' },
  { className: 'link-primary', prop: 'color="primary"', type: 'Color', description: 'primary color' },
  { className: 'link-secondary', prop: 'color="secondary"', type: 'Color', description: 'secondary color' },
  { className: 'link-accent', prop: 'color="accent"', type: 'Color', description: 'accent color' },
  { className: 'link-success', prop: 'color="success"', type: 'Color', description: 'success color' },
  { className: 'link-info', prop: 'color="info"', type: 'Color', description: 'info color' },
  { className: 'link-warning', prop: 'color="warning"', type: 'Color', description: 'warning color' },
  { className: 'link-error', prop: 'color="error"', type: 'Color', description: 'error color' },
]

export default {
  name: 'Link',
  category: 'Actions',
  description: 'Link component for navigation with styled anchor tags.',

  oninit() { loadPageI18n('link') },
  view() {
    return (
      <div>
        <Title as="h1" size="2">Link</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <div className={row}>
          <Link href="#!/link">Default</Link>
          <Link href="#!/link" color="primary">Primary</Link>
          <Link href="#!/link" color="secondary">Secondary</Link>
          <Link href="#!/link" color="accent">Accent</Link>
        </div>

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
