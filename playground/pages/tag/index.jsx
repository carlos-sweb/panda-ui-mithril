import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Title, Tag } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import { Sparkles, Hash } from 'lucide-mithril'

const section = css({ marginBottom: '2rem' })
const row = css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })

const usageCode = `<Tag>Default</Tag>
<Tag variant="info">Info</Tag>
<Tag variant="success">Success</Tag>
<Tag icon={Sparkles}>With icon</Tag>
<Tag onRemove={(e) => console.log(e)}>Removable</Tag>
<Tag clickable>Clickable</Tag>`

const classRows = [
  { className: 'tag', prop: '<Tag>', type: 'Component', description: 'Container element' },
  { className: 'tag-info', prop: 'variant="info"', type: 'Color', description: 'Info variant' },
  { className: 'tag-success', prop: 'variant="success"', type: 'Color', description: 'Success variant' },
  { className: 'tag-warning', prop: 'variant="warning"', type: 'Color', description: 'Warning variant' },
  { className: 'tag-error', prop: 'variant="error"', type: 'Color', description: 'Error variant' },
  { className: 'tag-outline', prop: 'variant="outline"', type: 'Style', description: 'Outline variant' },
  { className: 'tag-dash', prop: 'variant="dash"', type: 'Style', description: 'Dash variant' },
  { className: 'tag-soft', prop: 'variant="soft"', type: 'Style', description: 'Soft variant' },
  { className: 'tag-ghost', prop: 'variant="ghost"', type: 'Style', description: 'Ghost variant' },
  { className: 'tag-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'tag-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'tag-icon', prop: 'icon={...}', type: 'Element', description: 'Lucide icon alongside text' },
  { className: 'tag-remove', prop: 'onRemove={...}', type: 'Action', description: 'Shows an X button that calls onRemove' },
  { className: 'tag-clickable', prop: 'clickable', type: 'Modifier', description: 'Renders as a button with hover state' },
  { className: 'tag-disabled', prop: 'disabled', type: 'State', description: 'Disabled state' },
]

export default {
  name: 'Tag',
  category: 'Data Display',
  description: 'Tag — small interactive UI element to label, categorize, or filter content.',

  oninit() { loadPageI18n('tag') },
  view() {
    return (
      <div>
        <Title as="h1" size="2">Tag</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Small interactive UI element to label, categorize, or filter content. Supports icons, remove actions, and clickable states.
        </p>

        <section className={section}>
          <Title as="h3" size="5">Variants</Title>
          <div className={row}>
            <Tag>Default</Tag>
            <Tag variant="info">Info</Tag>
            <Tag variant="success">Success</Tag>
            <Tag variant="warning">Warning</Tag>
            <Tag variant="error">Error</Tag>
          </div>
        </section>

        <section className={section}>
          <Title as="h3" size="5">Styles</Title>
          <div className={row}>
            <Tag variant="outline">Outline</Tag>
            <Tag variant="dash">Dash</Tag>
            <Tag variant="soft">Soft</Tag>
            <Tag variant="ghost">Ghost</Tag>
          </div>
        </section>

        <section className={section}>
          <Title as="h3" size="5">Sizes</Title>
          <div className={row}>
            <Tag size="md">Medium (md)</Tag>
            <Tag size="lg">Large (lg)</Tag>
          </div>
        </section>

        <section className={section}>
          <Title as="h3" size="5">With icon</Title>
          <div className={row}>
            <Tag icon={Sparkles}>AI Generated</Tag>
            <Tag variant="info" icon={Hash}>Channel</Tag>
          </div>
        </section>

        <section className={section}>
          <Title as="h3" size="5">One character (square)</Title>
          <div className={row}>
            <Tag>A</Tag>
            <Tag variant="success">S</Tag>
            <Tag variant="error">E</Tag>
          </div>
        </section>

        <section className={section}>
          <Title as="h3" size="5">Clickable</Title>
          <div className={row}>
            <Tag clickable>Click me</Tag>
            <Tag clickable variant="info">Info</Tag>
            <Tag clickable variant="success">Success</Tag>
            <Tag clickable disabled>Disabled</Tag>
          </div>
        </section>

        <section className={section}>
          <Title as="h3" size="5">On remove</Title>
          <div className={row}>
            <Tag onRemove={(e) => console.log('removed', e)}>Removable</Tag>
            <Tag variant="info" onRemove={(e) => console.log('removed', e)}>Info</Tag>
          </div>
        </section>

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
