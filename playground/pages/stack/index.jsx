import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t } from '../../i18n/index.js'
import { Stack } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const stackItem = css({ backgroundColor: 'var(--colors-base-200)', padding: '1rem', borderRadius: 'var(--radius-box)' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' })

const usageCode = `<Stack placement="top">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</Stack>`

const classRows = [
  { className: 'stack', prop: '<Stack>', type: 'Component', description: 'Puts the children elements on top of each other' },
  { className: 'stack-top', prop: 'placement="top"', type: 'Modifier', description: 'Aligns the children elements to the top' },
  { className: 'stack-bottom', prop: 'placement="bottom" (default)', type: 'Modifier', description: 'Aligns the children elements to the bottom', isDefault: true },
  { className: 'stack-start', prop: 'placement="start"', type: 'Modifier', description: 'Aligns the children elements to the start (horizontally)' },
  { className: 'stack-end', prop: 'placement="end"', type: 'Modifier', description: 'Aligns the children elements to the end (horizontally)' },
]

export default {
  name: 'Stack',
  category: 'Layout',
  description: 'Stack component for vertical layout with consistent spacing.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Stack</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraphs.stack')}
        </p>

        <Stack>
          <div className={stackItem}>Item 1</div>
          <div className={stackItem}>Item 2</div>
          <div className={stackItem}>Item 3</div>
        </Stack>

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
