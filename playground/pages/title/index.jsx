import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Title } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '2rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })
const row = css({ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'baseline' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })

const usageCode = `<Title tag="h1" size="1" color="primary">Hero Title</Title>
<Title tag="h2" size="3" align="center">Section Heading</Title>
<Title tag="p" size="6" transform="capitalize">paragraph text styled as h6</Title>`

const classRows = [
  { className: 'title', prop: '<Title>', type: 'Component', description: 'Typography helper — renders a semantic heading or text element with style props' },
  { className: '—', prop: 'tag', type: '"h1"|"h2"|"h3"|"h4"|"h5"|"h6"|"p"|"span"|"div"', description: 'HTML tag to render. Map from h1→size 1 to h6→6, p→7. Default: h1.' },
  { className: '—', prop: 'size', type: '"1"…"7"', description: 'Font size tier. Overrides the tag implicit size (e.g., h2 with size="1" is the largest). Default 1.' },
  { className: '—', prop: 'color', type: 'PumColor', description: 'Theme color' },
  { className: '—', prop: 'align', type: '"left"|"center"|"right"|"justify"', description: 'Text alignment. Default: left.' },
  { className: '—', prop: 'transform', type: '"capitalize"|"uppercase"|"lowercase"|"none"', description: 'Text transformation. Default: none.' },
  { className: '—', prop: 'weight', type: '"light"|"normal"|"medium"|"semibold"|"bold"|"extrabold"', description: 'Font weight override. Default: normal.' },
  { className: '—', prop: 'truncate', type: 'boolean', description: 'Truncate text with ellipsis on overflow' },
  { className: '—', prop: 'italic', type: 'boolean', description: 'Italic style' },
]

export default {
  oninit() { loadPageI18n('title') },

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Title</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <section>
          <h2 className={sectionTitle}>{t('common.usage')}</h2>
          <CodeExample code={usageCode} language="jsx" />
        </section>

        <section>
          <h2 className={sectionTitle}>Sizes</h2>
          <h4 className={heading}>7 size tiers — from hero to caption</h4>
          <div className={row}>
            <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.25rem' })}>
              <Title size="1">Size 1</Title>
              <Title size="2">Size 2</Title>
              <Title size="3">Size 3</Title>
              <Title size="4">Size 4</Title>
              <Title size="5">Size 5</Title>
              <Title size="6">Size 6</Title>
              <Title size="7">Size 7</Title>
            </div>
          </div>
        </section>

        <section>
          <h2 className={sectionTitle}>Semantic tags</h2>
          <h4 className={heading}>Auto-size from tag (h1→1, h2→2, …)</h4>
          <div className={row}>
            <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.25rem' })}>
              <Title tag="h1">h1 heading</Title>
              <Title tag="h2">h2 heading</Title>
              <Title tag="h3">h3 heading</Title>
              <Title tag="h4">h4 heading</Title>
              <Title tag="h5">h5 heading</Title>
              <Title tag="h6">h6 heading</Title>
              <Title tag="p">p paragraph</Title>
            </div>
          </div>
        </section>

        <section>
          <h2 className={sectionTitle}>Colors</h2>
          <div className={row}>
            <Title tag="h3" color="primary">Primary</Title>
            <Title tag="h3" color="secondary">Secondary</Title>
            <Title tag="h3" color="accent">Accent</Title>
            <Title tag="h3" color="info">Info</Title>
            <Title tag="h3" color="success">Success</Title>
            <Title tag="h3" color="warning">Warning</Title>
            <Title tag="h3" color="error">Error</Title>
          </div>
        </section>

        <section>
          <h2 className={sectionTitle}>Alignment</h2>
          <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '400px', padding: '1rem', border: '1px solid token(colors.base-300)', borderRadius: 'token(radii.md)' })}>
            <Title tag="h4" align="left">Left aligned</Title>
            <Title tag="h4" align="center">Center aligned</Title>
            <Title tag="h4" align="right">Right aligned</Title>
            <Title tag="h4" align="justify">Justify — this text fills the line width evenly</Title>
          </div>
        </section>

        <section>
          <h2 className={sectionTitle}>Transform</h2>
          <div className={row}>
            <Title tag="h4" transform="capitalize">capitalize me</Title>
            <Title tag="h4" transform="uppercase">uppercase me</Title>
            <Title tag="h4" transform="lowercase">LOWERCASE ME</Title>
          </div>
        </section>

        <section>
          <h2 className={sectionTitle}>Weight</h2>
          <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.25rem' })}>
            <Title size="4" weight="light">Light — 300</Title>
            <Title size="4" weight="normal">Normal — 400</Title>
            <Title size="4" weight="medium">Medium — 500</Title>
            <Title size="4" weight="semibold">Semibold — 600</Title>
            <Title size="4" weight="bold">Bold — 700</Title>
            <Title size="4" weight="extrabold">Extrabold — 800</Title>
          </div>
        </section>

        <section>
          <h2 className={sectionTitle}>Truncate & Italic</h2>
          <div className={css({ display: 'flex', flexDirection: 'column', gap: '0.5rem', maxWidth: '300px' })}>
            <Title size="5" truncate>This is a very long title that should truncate with an ellipsis when it overflows its container</Title>
            <Title size="5" italic>Italic text style</Title>
          </div>
        </section>

        <section>
          <h2 className={sectionTitle}>{t('common.classReference')}</h2>
          <ClassTable rows={classRows} />
        </section>
      </div>
    )
  }
}
