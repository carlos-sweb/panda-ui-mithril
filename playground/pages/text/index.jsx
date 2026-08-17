import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Text, Title, Block } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })

const usageCode = `<Text>Default paragraph text</Text>
<Text size="lg" color="primary">Larger primary text</Text>
<Text as="span" weight="semibold" transform="uppercase">Inline span</Text>`

const classRows = [
  { className: 'text', prop: '<Text>', type: 'Component', description: 'Typography helper — semantic text element with style props' },
  { className: 'text-size-xs', prop: 'size="xs"', type: 'Size', description: 'Smallest — 0.75rem' },
  { className: 'text-size-sm', prop: 'size="sm"', type: 'Size', description: 'Small — 0.875rem' },
  { className: 'text-size-md', prop: 'size="md" (default)', type: 'Size', description: 'Default body size — 1rem', isDefault: true },
  { className: 'text-size-lg', prop: 'size="lg"', type: 'Size', description: 'Large — 1.125rem' },
  { className: 'text-size-xl', prop: 'size="xl"', type: 'Size', description: 'Largest — 1.25rem' },
  { className: 'text-neutral', prop: 'color="neutral"', type: 'Color', description: 'Neutral color' },
  { className: 'text-primary', prop: 'color="primary"', type: 'Color', description: 'Primary color' },
  { className: 'text-secondary', prop: 'color="secondary"', type: 'Color', description: 'Secondary color' },
  { className: 'text-accent', prop: 'color="accent"', type: 'Color', description: 'Accent color' },
  { className: 'text-info', prop: 'color="info"', type: 'Color', description: 'Info color' },
  { className: 'text-success', prop: 'color="success"', type: 'Color', description: 'Success color' },
  { className: 'text-warning', prop: 'color="warning"', type: 'Color', description: 'Warning color' },
  { className: 'text-error', prop: 'color="error"', type: 'Color', description: 'Error color' },
  { className: 'text-left', prop: 'align="left" (default)', type: 'Alignment', description: 'Left aligned', isDefault: true },
  { className: 'text-center', prop: 'align="center"', type: 'Alignment', description: 'Center aligned' },
  { className: 'text-right', prop: 'align="right"', type: 'Alignment', description: 'Right aligned' },
  { className: 'text-justify', prop: 'align="justify"', type: 'Alignment', description: 'Justified' },
  { className: 'text-capitalize', prop: 'transform="capitalize"', type: 'Transform', description: 'Capitalize each word' },
  { className: 'text-uppercase', prop: 'transform="uppercase"', type: 'Transform', description: 'All uppercase' },
  { className: 'text-lowercase', prop: 'transform="lowercase"', type: 'Transform', description: 'All lowercase' },
  { className: 'text-light', prop: 'weight="light"', type: 'Weight', description: 'Light — 300' },
  { className: 'text-normal', prop: 'weight="normal" (default)', type: 'Weight', description: 'Normal — 400', isDefault: true },
  { className: 'text-medium', prop: 'weight="medium"', type: 'Weight', description: 'Medium — 500' },
  { className: 'text-semibold', prop: 'weight="semibold"', type: 'Weight', description: 'Semibold — 600' },
  { className: 'text-bold', prop: 'weight="bold"', type: 'Weight', description: 'Bold — 700' },
  { className: 'text-extrabold', prop: 'weight="extrabold"', type: 'Weight', description: 'Extrabold — 800' },
  { className: 'text-truncate', prop: 'truncate', type: 'Modifier', description: 'Truncate with ellipsis' },
  { className: 'text-italic', prop: 'italic', type: 'Modifier', description: 'Italic style' },
  { className: 'text-as-p', prop: 'as="p" (default)', type: 'Part', description: 'Render as <p>' },
  { className: 'text-as-span', prop: 'as="span"', type: 'Part', description: 'Render as <span>' },
  { className: 'text-as-div', prop: 'as="div"', type: 'Part', description: 'Render as <div>' },
]

export default {
  oninit() { loadPageI18n('text') },

  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Text</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <CodeExample code={usageCode} language="jsx" />
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">Sizes</Title>
          <Text size="sm" color="neutral" className={heading}>5 size tiers — from small to large</Text>
          <Stack gap="xs">
            <Text size="xs">Size xs</Text>
            <Text size="sm">Size sm</Text>
            <Text size="md">Size md (default)</Text>
            <Text size="lg">Size lg</Text>
            <Text size="xl">Size xl</Text>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">Semantic tags</Title>
          <Text size="sm" color="neutral" className={heading}>as only switches the tag — size stays explicit (default md)</Text>
          <Stack gap="xs">
            <Text as="p">p paragraph (default)</Text>
            <Text as="span">span inline text</Text>
            <Text as="div">div block text</Text>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">Colors</Title>
          <Stack direction="row" gap="sm">
            <Text size="lg" color="neutral">Neutral</Text>
            <Text size="lg" color="primary">Primary</Text>
            <Text size="lg" color="secondary">Secondary</Text>
            <Text size="lg" color="accent">Accent</Text>
            <Text size="lg" color="info">Info</Text>
            <Text size="lg" color="success">Success</Text>
            <Text size="lg" color="warning">Warning</Text>
            <Text size="lg" color="error">Error</Text>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">Alignment</Title>
          <Stack gap="xs" className={css({ maxWidth: '400px', padding: '1rem', border: '1px solid token(colors.base-300)', borderRadius: 'token(radii.md)' })}>
            <Text align="left">Left aligned</Text>
            <Text align="center">Center aligned</Text>
            <Text align="right">Right aligned</Text>
            <Text align="justify">Justify — this text fills the line width evenly</Text>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">Transform</Title>
          <Stack direction="row" gap="sm">
            <Text size="lg" transform="capitalize">capitalize me</Text>
            <Text size="lg" transform="uppercase">uppercase me</Text>
            <Text size="lg" transform="lowercase">LOWERCASE ME</Text>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">Weight</Title>
          <Stack gap="xs">
            <Text size="lg" weight="light">Light — 300</Text>
            <Text size="lg" weight="normal">Normal — 400</Text>
            <Text size="lg" weight="medium">Medium — 500</Text>
            <Text size="lg" weight="semibold">Semibold — 600</Text>
            <Text size="lg" weight="bold">Bold — 700</Text>
            <Text size="lg" weight="extrabold">Extrabold — 800</Text>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">Truncate & Italic</Title>
          <Stack gap="xs" className={css({ maxWidth: '300px' })}>
            <Text size="lg" truncate>This is a very long text that should truncate with an ellipsis when it overflows its container</Text>
            <Text size="lg" italic>Italic text style</Text>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </Block>
      </Stack>
    )
  }
}
