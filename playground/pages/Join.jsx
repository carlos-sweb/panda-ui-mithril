import m from 'mithril'
import { css } from '../../styled-system/css'
import { t } from '../i18n/index.js'
import { Join, JoinItem, PaginationButton } from '../../src/index.js'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const section = css({ marginBottom: '2rem' })

const usageCode = `<Join>
  <PaginationButton>Button 1</PaginationButton>
  <PaginationButton>Button 2</PaginationButton>
  <PaginationButton>Button 3</PaginationButton>
</Join>`

const classRows = [
  { className: 'join', prop: '<Join>', type: 'Component', description: 'For grouping multiple items' },
  { className: 'join-item', prop: '<JoinItem>', type: 'Part', description: 'Item inside join. Can be a button, input, etc.' },
  { className: 'join-horizontal', prop: '(default)', type: 'Placement', description: 'Shows items horizontally', isDefault: true },
  { className: 'join-vertical', prop: 'vertical', type: 'Placement', description: 'Shows items vertically' },
]

export default {
  name: 'Join',
  category: 'Layout',
  description: 'Join component for grouping elements together.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Join</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraphs.join')}
        </p>

        <section className={section}>
          <h3 className={heading}>Generic items</h3>
          <Join>
            <JoinItem>Button 1</JoinItem>
            <JoinItem>Button 2</JoinItem>
            <JoinItem>Button 3</JoinItem>
          </Join>
        </section>

        <section className={section}>
          <h3 className={heading}>Combined with Button (via PaginationButton)</h3>
          <Join>
            <PaginationButton>Button 1</PaginationButton>
            <PaginationButton active>Button 2</PaginationButton>
            <PaginationButton>Button 3</PaginationButton>
          </Join>
        </section>

        <section className={section}>
          <h3 className={heading}>Vertical</h3>
          <Join vertical>
            <JoinItem>Item 1</JoinItem>
            <JoinItem>Item 2</JoinItem>
            <JoinItem>Item 3</JoinItem>
          </Join>
        </section>

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
