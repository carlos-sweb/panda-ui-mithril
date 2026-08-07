import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { FAB, FABMain, FABAction } from '../../../src/index.js'
import { Plus, Pencil, Trash2, Share2 } from 'lucide-mithril'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })

const usageCode = `<FAB>
  <FABMain><Plus size={22} /></FABMain>
  <FABAction label="Edit"><Pencil size={18} /></FABAction>
  <FABAction label="Share"><Share2 size={18} /></FABAction>
  <FABAction label="Delete"><Trash2 size={18} /></FABAction>
</FAB>`

const classRows = [
  { className: 'fab', prop: '<FAB>', type: 'Component', description: 'Container, fixed to the bottom-right corner of the viewport' },
  { className: '(trigger)', prop: '<FABMain>', type: 'Part', description: 'Focusable/clickable trigger — clicking or focusing it reveals the actions' },
  { className: '(action)', prop: '<FABAction label="...">', type: 'Part', description: 'An action button revealed when the FAB is open' },
  { className: 'fab-flower', type: 'Modifier', description: 'Opens actions in a quarter-circle arrangement instead of vertically — not supported by this component' },
]

export default {
  name: 'FAB',
  category: 'Actions',
  description: 'Floating Action Button represents the primary action of a screen.',

  oninit() { loadPageI18n('fab') },
  view() {
    return (
      <div className={stack}>
        <Title as="h1" size="2">FAB</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <FAB>
          <FABMain><Plus size={22} /></FABMain>
          <FABAction label="Edit"><Pencil size={18} /></FABAction>
          <FABAction label="Share"><Share2 size={18} /></FABAction>
          <FABAction label="Delete"><Trash2 size={18} /></FABAction>
        </FAB>

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
