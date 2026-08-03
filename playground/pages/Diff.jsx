import m from 'mithril'
import { css } from '../../styled-system/css'
import { t } from '../i18n/index.js'
import { Diff, DiffItem1, DiffItem2, DiffResizer } from '../../src/index.js'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })
const wrapper = css({ maxWidth: '32rem' })

const usageCode = `<Diff>
  <DiffItem1><img src="before.jpg" alt="Before" /></DiffItem1>
  <DiffItem2><img src="after.jpg" alt="After" /></DiffItem2>
  <DiffResizer />
</Diff>`

const classRows = [
  { className: 'diff', prop: '<Diff>', type: 'Component', description: 'Diff container — drag anywhere on the divider to compare' },
  { className: 'diff-item-1', prop: '<DiffItem1>', type: 'Part', description: 'The item on top (revealed on the left side of the divider)' },
  { className: 'diff-item-2', prop: '<DiffItem2>', type: 'Part', description: 'The item underneath (revealed on the right side of the divider)' },
  { className: 'diff-resizer', prop: '<DiffResizer />', type: 'Part', description: 'The draggable divider handle' },
]

export default {
  name: 'Diff',
  category: 'Layout',
  description: 'Diff component for comparing two images side by side.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Diff</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraphs.diff')}
        </p>

        <div className={wrapper}>
          <Diff>
            <DiffItem1><img src="https://picsum.photos/seed/panda-diff-a/600/338" alt="Before" /></DiffItem1>
            <DiffItem2><img src="https://picsum.photos/seed/panda-diff-b/600/338" alt="After" /></DiffItem2>
            <DiffResizer />
          </Diff>
        </div>

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
