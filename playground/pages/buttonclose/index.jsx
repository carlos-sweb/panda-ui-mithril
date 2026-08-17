import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, ButtonClose, Text, Block } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const usageCode = `<ButtonClose />
<ButtonClose color="primary" />
<ButtonClose size="lg" />
<ButtonClose variant="outline" />
<ButtonClose disabled />`

const classRows = [
  { className: 'btn-close', prop: '<ButtonClose>', type: 'Component', description: 'Circular button with X icon — children are ignored' },
  { className: 'btn-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'btn-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'btn-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'btn-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'btn-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
  { className: 'btn-circle', prop: 'shape="circle" (default)', type: 'Shape', description: 'Circle shape', isDefault: true },
  { className: 'btn-square', prop: 'shape="square"', type: 'Shape', description: 'Square shape' },
  { className: 'close-button', prop: 'strokeWidth={3} (default)', type: 'number', description: 'X icon stroke width (lucide prop). Default 3.' },
]

export default {
  name: 'ButtonClose',
  category: 'Actions',
  description: 'Circular close button with an X icon that scales with the button size.',

  oninit() { loadPageI18n('buttonclose') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">ButtonClose</Title>
        
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">Default</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <ButtonClose />
            <ButtonClose>this text is ignored</ButtonClose>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Sizes</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <ButtonClose size="xs" />
            <ButtonClose size="sm" />
            <ButtonClose size="md" />
            <ButtonClose size="lg" />
            <ButtonClose size="xl" />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Colors</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <ButtonClose />
            <ButtonClose color="neutral" />
            <ButtonClose color="primary" />
            <ButtonClose color="secondary" />
            <ButtonClose color="accent" />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Soft colors</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <ButtonClose variant="soft" />
            <ButtonClose variant="soft" color="primary" />
            <ButtonClose variant="soft" color="secondary" />
            <ButtonClose variant="soft" color="success" />
            <ButtonClose variant="soft" color="error" />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Outline colors</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <ButtonClose variant="outline" />
            <ButtonClose variant="outline" color="primary" />
            <ButtonClose variant="outline" color="warning" />
            <ButtonClose variant="outline" color="info" />
            <ButtonClose variant="outline" color="error" />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Ghost + Link</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <ButtonClose variant="ghost" />
            <ButtonClose variant="ghost" color="primary" />
            <ButtonClose variant="link" />
            <ButtonClose variant="link" color="secondary" />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Square + Circle</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <ButtonClose shape="square" />
            <ButtonClose shape="square" color="primary" />
            <ButtonClose shape="circle" color="secondary" />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Disabled</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <ButtonClose disabled />
            <ButtonClose disabled color="primary" />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Stroke Width</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <ButtonClose strokeWidth={1} />
            <ButtonClose strokeWidth={2} />
            <ButtonClose strokeWidth={3} />
            <ButtonClose strokeWidth={4} color="primary" />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Border Width</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <ButtonClose variant="outline" borderWidth={1} />
            <ButtonClose variant="outline" borderWidth={2} />
            <ButtonClose variant="outline" borderWidth={3} color="primary" />
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
