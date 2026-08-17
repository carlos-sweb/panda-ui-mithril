import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Tag, Text, Block } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import { Sparkles, Hash } from 'lucide-mithril'

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
      <Stack gap="lg">
        <Title as="h1" size="2">Tag</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          Small interactive UI element to label, categorize, or filter content. Supports icons, remove actions, and clickable states.
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">Variants</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Tag>Default</Tag>
            <Tag variant="info">Info</Tag>
            <Tag variant="success">Success</Tag>
            <Tag variant="warning">Warning</Tag>
            <Tag variant="error">Error</Tag>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Styles</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Tag variant="outline">Outline</Tag>
            <Tag variant="dash">Dash</Tag>
            <Tag variant="soft">Soft</Tag>
            <Tag variant="ghost">Ghost</Tag>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Sizes</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Tag size="md">Medium (md)</Tag>
            <Tag size="lg">Large (lg)</Tag>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">With icon</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Tag icon={Sparkles}>AI Generated</Tag>
            <Tag variant="info" icon={Hash}>Channel</Tag>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">One character (square)</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Tag>A</Tag>
            <Tag variant="success">S</Tag>
            <Tag variant="error">E</Tag>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Clickable</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Tag clickable>Click me</Tag>
            <Tag clickable variant="info">Info</Tag>
            <Tag clickable variant="success">Success</Tag>
            <Tag clickable disabled>Disabled</Tag>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">On remove</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Tag onRemove={(e) => console.log('removed', e)}>Removable</Tag>
            <Tag variant="info" onRemove={(e) => console.log('removed', e)}>Info</Tag>
          </Stack>
        </Block>

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
