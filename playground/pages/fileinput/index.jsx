import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, FileInput, Text, Block } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'


const usageCode = '<FileInput color="primary" />'

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

  oninit() { loadPageI18n('fileinput') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">File Input</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <FileInput />
        <FileInput color="primary" />
        <FileInput color="secondary" />

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <CodeExample code={usageCode} />
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </Block>
      </Stack>
    )
  }
}
