import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Title, Columns, Column } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '2rem' })

const usageCode = `<Columns gap="md">
  <Column width={4}><div>Sidebar</div></Column>
  <Column width={8}><div>Content</div></Column>
</Columns>`

const classRows = [
  { className: 'columns', prop: '<Columns>', type: 'Component', description: 'Flexbox row container, wraps on mobile' },
  { className: 'columns-gap-sm|md|lg', prop: 'gap="sm|md|lg"', type: 'Size', description: 'Gap between columns' },
  { className: 'columns-vertical', prop: 'vertical', type: 'Modifier', description: 'Stack vertically' },
  { className: 'column', prop: '<Column>', type: 'Part', description: 'Flex child column' },
  { className: 'column-1|2|3|4|6|8|9|12', prop: 'width="1..12"', type: 'Size', description: 'Fractional width / 12' },
  { className: 'column-narrow', prop: 'narrow', type: 'Modifier', description: 'Flex: none (fit content)' },
]

const cell = css({ bg: 'token(colors.base-200)', p: '1rem', borderRadius: '0.25rem', textAlign: 'center' })

export default {
  oninit() { loadPageI18n('columns') },
  view() {
    return (<div className={stack}>
      <Title as="h1" size="2">Columns</Title>
      <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>{t('paragraph')}</p>
      <section><Title as="h2" size="3">{t('common.usage')}</Title><CodeExample code={usageCode} language="jsx" /></section>
      <section><Title as="h2" size="3">Equal width</Title>
        <Columns gap="md">
          <Column><div className={cell}>Col 1</div></Column>
          <Column><div className={cell}>Col 2</div></Column>
          <Column><div className={cell}>Col 3</div></Column>
        </Columns>
      </section>
      <section><Title as="h2" size="3">Fixed widths (4+8)</Title>
        <Columns gap="md">
          <Column width={4}><div className={cell}>4/12</div></Column>
          <Column width={8}><div className={cell}>8/12</div></Column>
        </Columns>
      </section>
      <section><Title as="h2" size="3">Narrow column</Title>
        <Columns gap="md">
          <Column narrow><div className={cell}>Auto</div></Column>
          <Column><div className={cell}>Fills rest</div></Column>
        </Columns>
      </section>
      <section><Title as="h2" size="3">{t('common.classReference')}</Title><ClassTable rows={classRows} /></section>
    </div>)
  }
}
