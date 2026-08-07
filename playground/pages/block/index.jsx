import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Block } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '2rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })
const sectionBox = css({ display: 'flex', flexDirection: 'column', gap: '0.75rem' })

const usageCode = `<Block spacing="md">
  <p>First block</p>
  <p>Second block — spaced from first, no margin after</p>
</Block>`

const classRows = [
  { className: 'block', prop: '<Block>', type: 'Component', description: 'Vertical spacer between siblings' },
  { className: 'block-sm', prop: 'spacing="sm"', type: 'Size', description: '1rem spacing' },
  { className: 'block-md', prop: 'spacing="md" (default)', type: 'Size', description: '1.5rem spacing', isDefault: true },
  { className: 'block-lg', prop: 'spacing="lg"', type: 'Size', description: '2rem spacing' },
]

export default {
  oninit() { loadPageI18n('block') },
  view() {
    return (<div className={stack}>
      <Title as="h1" size="2">Block</Title>
      <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>{t('paragraph')}</p>
      <section>
        <h2 className={sectionTitle}>{t('common.usage')}</h2>
        <CodeExample code={usageCode} language="jsx" />
      </section>
      <section className={sectionBox}>
        <h2 className={sectionTitle}>Spacing</h2>
        <div className={css({ border: '1px solid token(colors.base-300)', borderRadius: 'token(radii.md)', padding: '1rem' })}>
          <Block spacing="sm"><div className={css({ bg: 'token(colors.base-300)', p: '1rem', borderRadius: '0.25rem' })}>sm — 1rem</div></Block>
          <Block spacing="md"><div className={css({ bg: 'token(colors.base-300)', p: '1rem', borderRadius: '0.25rem' })}>md — 1.5rem</div></Block>
          <Block spacing="lg"><div className={css({ bg: 'token(colors.base-300)', p: '1rem', borderRadius: '0.25rem' })}>lg — 2rem</div></Block>
        </div>
      </section>
      <section>
        <h2 className={sectionTitle}>{t('common.classReference')}</h2>
        <ClassTable rows={classRows} />
      </section>
    </div>)
  }
}
