import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { ButtonGroup, Button } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const section = css({ marginBottom: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })

const usageCode = `<ButtonGroup>
  <Button>Left</Button>
  <Button>Center</Button>
  <Button>Right</Button>
</ButtonGroup>

<ButtonGroup color="primary">
  <Button>1</Button>
  <Button>2</Button>
  <Button>3</Button>
</ButtonGroup>`

const classRows = [
  { className: 'btn-group', prop: '<ButtonGroup>', type: 'Component', description: 'Button group container (unifies borders)' },
]

export default {
  name: 'ButtonGroup',
  category: 'Actions',
  description: 'Button group — joins buttons horizontally with unified borders.',

  oninit() { loadPageI18n('buttongroup') },
  view() {
    return (
      <div>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>ButtonGroup</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <section className={section}>
          <h3 className={heading}>Default</h3>
          <ButtonGroup>
            <Button>Left</Button>
            <Button>Center</Button>
            <Button>Right</Button>
          </ButtonGroup>
        </section>

        <section className={section}>
          <h3 className={heading}>With color</h3>
          <ButtonGroup color="primary">
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        </section>

        <section className={section}>
          <h3 className={heading}>With variant</h3>
          <ButtonGroup variant="outline">
            <Button>Yes</Button>
            <Button>No</Button>
          </ButtonGroup>
        </section>

        <section className={section}>
          <h3 className={heading}>With size</h3>
          <ButtonGroup size="lg">
            <Button>A</Button>
            <Button>B</Button>
            <Button>C</Button>
          </ButtonGroup>
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
