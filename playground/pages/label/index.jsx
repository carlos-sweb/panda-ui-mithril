import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Label, TextInput } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'


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
      <Stack gap="lg">
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
