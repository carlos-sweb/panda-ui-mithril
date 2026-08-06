import m from 'mithril'
import { css } from '../../styled-system/css'
import { t } from '../i18n/index.js'
import { ButtonClose } from '../../src/index.js'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const section = css({ marginBottom: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const row = css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })

const usageCode = `<ButtonClose />
<ButtonClose color="primary" />
<ButtonClose size="lg" />
<ButtonClose variant="outline" />
<ButtonClose disabled />`

const classRows = [
  { className: 'btn-close', prop: '<ButtonClose>', type: 'Component', description: 'Circular button with X icon' },
  { className: 'btn-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'btn-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'btn-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'btn-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'btn-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
]

export default {
  name: 'ButtonClose',
  category: 'Actions',
  description: 'Circular close button with an X icon that scales with the button size.',

  view() {
    return (
      <div>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>ButtonClose</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraphs.buttonclose')}
        </p>

        <section className={section}>
          <h3 className={heading}>Default</h3>
          <div className={row}>
            <ButtonClose />
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Sizes</h3>
          <div className={row}>
            <ButtonClose size="xs" />
            <ButtonClose size="sm" />
            <ButtonClose size="md" />
            <ButtonClose size="lg" />
            <ButtonClose size="xl" />
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Colors</h3>
          <div className={row}>
            <ButtonClose />
            <ButtonClose color="primary" />
            <ButtonClose color="secondary" />
            <ButtonClose color="success" />
            <ButtonClose color="error" />
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Variants</h3>
          <div className={row}>
            <ButtonClose />
            <ButtonClose variant="outline" />
            <ButtonClose variant="soft" />
            <ButtonClose variant="ghost" />
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Disabled</h3>
          <div className={row}>
            <ButtonClose disabled />
          </div>
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
