import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Container } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const st = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })

const usageCode = `<Container maxWidth="desktop"><h2>Centered content</h2></Container>
<Container fluid><p>Full width with side padding</p></Container>`

const classRows = [
  { className: 'container', prop: '<Container>', type: 'Component', description: 'Responsive centered container with max-width' },
  { className: 'container-fullhd', prop: 'maxWidth="fullhd" (default)', type: 'Size', description: 'Max 1344px', isDefault: true },
  { className: 'container-widescreen', prop: 'maxWidth="widescreen"', type: 'Size', description: 'Max 1152px' },
  { className: 'container-desktop', prop: 'maxWidth="desktop"', type: 'Size', description: 'Max 960px' },
  { className: 'container-tablet', prop: 'maxWidth="tablet"', type: 'Size', description: 'Max 768px' },
  { className: 'container-fluid', prop: 'fluid', type: 'Modifier', description: 'Full width with 2rem side padding' },
]

const demo = css({ bg: 'token(colors.base-200)', p: '1rem', borderRadius: '0.25rem', textAlign: 'center' })

export default {
  oninit() { loadPageI18n('container') },
  view() {
    return (<Stack gap="lg">
      <Title as="h1" size="2">Container</Title>
      <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>{t('paragraph')}</p>
      <section><h2 className={st}>{t('common.usage')}</h2><CodeExample code={usageCode} language="jsx" /></section>
      <section><h2 className={st}>Max Widths</h2>
        <Container maxWidth="tablet"><div className={demo}>tablet — 768px</div></Container>
        <br />
        <Container maxWidth="desktop"><div className={demo}>desktop — 960px</div></Container>
        <br />
        <Container><div className={demo}>fullhd — 1344px (default)</div></Container>
      </section>
      <section><h2 className={st}>{t('common.classReference')}</h2><ClassTable rows={classRows} /></section>
    </div>)
  }
}
