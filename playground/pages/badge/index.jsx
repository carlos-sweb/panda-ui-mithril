import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Block, Badge } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'


const usageCode = `<Badge color="primary">Primary</Badge>
<Badge variant="outline" color="success">Outline</Badge>
<Badge size="lg" color="error">Error</Badge>`

const classRows = [
  { className: 'badge', prop: '<Badge>', type: 'Component', description: 'Container element' },
  { className: 'badge-outline', prop: 'variant="outline"', type: 'Style', description: 'outline style' },
  { className: 'badge-dash', prop: 'variant="dash"', type: 'Style', description: 'dash outline style' },
  { className: 'badge-soft', prop: 'variant="soft"', type: 'Style', description: 'soft style' },
  { className: 'badge-ghost', prop: 'variant="ghost"', type: 'Style', description: 'ghost style' },
  { className: 'badge-neutral', prop: 'color="neutral"', type: 'Color', description: 'neutral color' },
  { className: 'badge-primary', prop: 'color="primary"', type: 'Color', description: 'primary color' },
  { className: 'badge-secondary', prop: 'color="secondary"', type: 'Color', description: 'secondary color' },
  { className: 'badge-accent', prop: 'color="accent"', type: 'Color', description: 'accent color' },
  { className: 'badge-info', prop: 'color="info"', type: 'Color', description: 'info color' },
  { className: 'badge-success', prop: 'color="success"', type: 'Color', description: 'success color' },
  { className: 'badge-warning', prop: 'color="warning"', type: 'Color', description: 'warning color' },
  { className: 'badge-error', prop: 'color="error"', type: 'Color', description: 'error color' },
  { className: 'badge-xs', prop: 'size="xs"', type: 'Size', description: 'extra small size' },
  { className: 'badge-sm', prop: 'size="sm"', type: 'Size', description: 'small size' },
  { className: 'badge-md', prop: 'size="md"', type: 'Size', description: 'medium size', isDefault: true },
  { className: 'badge-lg', prop: 'size="lg"', type: 'Size', description: 'large size' },
  { className: 'badge-xl', prop: 'size="xl"', type: 'Size', description: 'extra large size' },
]

export default {
  name: 'Badge',
  category: 'Data Display',
  description: 'Badges are used to highlight an item\'s status for quick recognition.',

  oninit() { loadPageI18n('badge') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Badge</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <Block spacing="lg" as="section">
          <Title as="h3" size="5">Colors</Title>
          <Stack direction="row" gap="sm" align="center">
            <Badge color="neutral">Neutral</Badge>
            <Badge color="primary">Primary</Badge>
            <Badge color="secondary">Secondary</Badge>
            <Badge color="accent">Accent</Badge>
            <Badge color="info">Info</Badge>
            <Badge color="success">Success</Badge>
            <Badge color="warning">Warning</Badge>
            <Badge color="error">Error</Badge>
          </Stack>
        </Block>

        <Block spacing="lg" as="section">
          <Title as="h3" size="5">Variants</Title>
          <Stack direction="row" gap="sm" align="center">
            <Badge variant="outline">Outline</Badge>
            <Badge variant="dash">Dash</Badge>
            <Badge variant="ghost">Ghost</Badge>
          </Stack>
        </Block>

        <Block spacing="lg" as="section">
          <Title as="h3" size="5">Sizes</Title>
          <Stack direction="row" gap="sm" align="center">
            <Badge size="xs">XS</Badge>
            <Badge size="sm">SM</Badge>
            <Badge size="md">MD</Badge>
            <Badge size="lg">LG</Badge>
            <Badge size="xl">XL</Badge>
          </Stack>
        </Block>

        <section>
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </section>
      </Stack>
    )
  }
}
