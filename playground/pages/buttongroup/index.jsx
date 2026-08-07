import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Title, ButtonGroup, Button } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const section = css({ marginBottom: '2rem' })
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
        <Title as="h1" size="2">ButtonGroup</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <section className={section}>
          <Title as="h3" size="5">Default</Title>
          <ButtonGroup>
            <Button>Left</Button>
            <Button>Center</Button>
            <Button>Right</Button>
          </ButtonGroup>
        </section>

        <section className={section}>
          <Title as="h3" size="5">With color</Title>
          <ButtonGroup color="primary">
            <Button>1</Button>
            <Button>2</Button>
            <Button>3</Button>
          </ButtonGroup>
        </section>

        <section className={section}>
          <Title as="h3" size="5">With variant</Title>
          <ButtonGroup variant="outline">
            <Button>Yes</Button>
            <Button>No</Button>
          </ButtonGroup>
        </section>

        <section className={section}>
          <Title as="h3" size="5">With size</Title>
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
