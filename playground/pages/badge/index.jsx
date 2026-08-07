import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Badge } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const section = css({ marginBottom: '2rem' })
const row = css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' })

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

        <section className={section}>
          <Title as="h3" size="5">Colors</Title>
          <div className={row}>
            <Badge color="neutral">Neutral</Badge>
            <Badge color="primary">Primary</Badge>
            <Badge color="secondary">Secondary</Badge>
            <Badge color="accent">Accent</Badge>
            <Badge color="info">Info</Badge>
            <Badge color="success">Success</Badge>
            <Badge color="warning">Warning</Badge>
            <Badge color="error">Error</Badge>
          </div>
        </section>

        <section className={section}>
          <Title as="h3" size="5">Variants</Title>
          <div className={row}>
            <Badge variant="outline">Outline</Badge>
            <Badge variant="dash">Dash</Badge>
            <Badge variant="ghost">Ghost</Badge>
          </div>
        </section>

        <section className={section}>
          <Title as="h3" size="5">Sizes</Title>
          <div className={row}>
            <Badge size="xs">XS</Badge>
            <Badge size="sm">SM</Badge>
            <Badge size="md">MD</Badge>
            <Badge size="lg">LG</Badge>
            <Badge size="xl">XL</Badge>
          </div>
        </section>

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
