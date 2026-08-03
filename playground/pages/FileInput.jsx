import m from 'mithril'
import { css } from '../../styled-system/css'
import { t } from '../i18n/index.js'
import { FileInput } from '../../src/index.js'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' })

const usageCode = `<FileInput color="primary" />`

const classRows = [
  { className: 'file-input', prop: '<FileInput>', type: 'Component', description: 'For <input type="file"> element' },
  { className: 'file-input-ghost', prop: 'ghost', type: 'Style', description: 'ghost style' },
  { className: 'file-input-neutral', prop: 'color="neutral"', type: 'Color', description: 'neutral color' },
  { className: 'file-input-primary', prop: 'color="primary"', type: 'Color', description: 'primary color' },
  { className: 'file-input-secondary', prop: 'color="secondary"', type: 'Color', description: 'secondary color' },
  { className: 'file-input-accent', prop: 'color="accent"', type: 'Color', description: 'accent color' },
  { className: 'file-input-info', prop: 'color="info"', type: 'Color', description: 'info color' },
  { className: 'file-input-success', prop: 'color="success"', type: 'Color', description: 'success color' },
  { className: 'file-input-warning', prop: 'color="warning"', type: 'Color', description: 'warning color' },
  { className: 'file-input-error', prop: 'color="error"', type: 'Color', description: 'error color' },
  { className: 'file-input-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'file-input-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'file-input-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'file-input-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'file-input-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
]

export default {
  name: 'FileInput',
  category: 'Data Input',
  description: 'File input component for uploading files.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>File Input</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraphs.fileinput')}
        </p>

        <FileInput />
        <FileInput color="primary" />
        <FileInput color="secondary" />

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
