import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Title, Box } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '2rem' })
const sectionBox = css({ display: 'flex', flexDirection: 'column', gap: '0.75rem' })
const row = css({ display: 'flex', gap: '1rem', flexWrap: 'wrap' })

const usageCode = `<Box padding="lg" shadow="md"><p>Content in a box</p></Box>`

const classRows = [
  { className: 'box', prop: '<Box>', type: 'Component', description: 'Bordered container with padding and shadow' },
  { className: 'box-sm|md|lg', prop: 'padding="sm|md|lg"', type: 'Size', description: 'Small / medium / large padding' },
  { className: 'box-shadow-sm|md|lg|none', prop: 'shadow="sm|md|lg|none"', type: 'Modifier', description: 'Shadow depth' },
]

export default {
  oninit() { loadPageI18n('box') },
  view() {
    return (<div className={stack}>
      <Title as="h1" size="2">Box</Title>
      <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>{t('paragraph')}</p>
      <section><Title as="h2" size="3">{t('common.usage')}</Title><CodeExample code={usageCode} language="jsx" /></section>
      <section className={sectionBox}>
        <Title as="h2" size="3">Padding</Title>
        <div className={row}>
          <Box padding="sm">Small padding</Box>
          <Box>Medium (default)</Box>
          <Box padding="lg">Large padding</Box>
        </div>
      </section>
      <section className={sectionBox}>
        <Title as="h2" size="3">Shadow</Title>
        <div className={row}>
          <Box shadow="none">No shadow</Box>
          <Box shadow="sm">Small shadow</Box>
          <Box>Medium (default)</Box>
          <Box shadow="lg">Large shadow</Box>
        </div>
      </section>
      <section><Title as="h2" size="3">{t('common.classReference')}</Title><ClassTable rows={classRows} /></section>
    </div>)
  }
}
