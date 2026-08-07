import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Title, Label, TextInput } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' })

const usageCode = `<Label>Regular Label</Label>

<Label floating>
  <TextInput placeholder="Type here..." />
  <span>Floating Label</span>
</Label>`

const classRows = [
  { className: 'label', prop: '<Label>', type: 'Component', description: 'For styling the text next to an input field (or select)' },
  { className: 'floating-label', prop: 'floating', type: 'Component', description: 'For the parent of an input field (or select) and a span that floats above the input field when the field is focused' },
]

export default {
  name: 'Label',
  category: 'Data Input',
  description: 'Label component for form field labels with floating variant.',

  oninit() { loadPageI18n('label') },
  view() {
    return (
      <div className={stack}>
        <Title as="h1" size="2">Label</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <Label>Regular Label</Label>
        <Label floating>
          <TextInput placeholder="Type here..." />
          <span>Floating Label</span>
        </Label>

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
