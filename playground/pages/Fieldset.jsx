import m from 'mithril'
import { css } from '../../styled-system/css'
import { Fieldset, TextInput } from '../../src/index.js'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' })

const usageCode = `<Fieldset legend="Personal Information">
  <TextInput placeholder="Name" />
  <TextInput placeholder="Email" />
</Fieldset>`

const classRows = [
  { className: 'fieldset', prop: '<Fieldset>', type: 'Component', description: 'for the fieldset container' },
  { className: 'label', prop: '<Label>', type: 'Component', description: 'label for inputs — use the separate Label component' },
  { className: 'fieldset-legend', prop: 'legend="..."', type: 'Part', description: 'for the title of the fieldset' },
]

export default {
  name: 'Fieldset',
  category: 'Data Input',
  description: 'Fieldset component for grouping related form fields.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Fieldset</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Fieldset component for grouping related form fields.
        </p>

        <Fieldset legend="Personal Information">
          <TextInput placeholder="Name" />
          <TextInput placeholder="Email" />
        </Fieldset>

        <section>
          <h2 className={sectionTitle}>Usage</h2>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <h2 className={sectionTitle}>Class Reference</h2>
          <ClassTable rows={classRows} />
        </section>
      </div>
    )
  }
}
