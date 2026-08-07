import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Diff, DiffItem1, DiffItem2, DiffResizer } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

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

  oninit() { loadPageI18n('diff') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Diff</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <div className={wrapper}>
          <Diff>
            <DiffItem1><img src="https://picsum.photos/seed/panda-diff-a/600/338" alt="Before" /></DiffItem1>
            <DiffItem2><img src="https://picsum.photos/seed/panda-diff-b/600/338" alt="After" /></DiffItem2>
            <DiffResizer />
          </Diff>
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
