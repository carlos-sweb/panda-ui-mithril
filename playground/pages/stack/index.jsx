import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Title, Stack, Button, Box, Text, Block } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const item = css({ bg: 'token(colors.base-200)', p: '1rem', borderRadius: '0.25rem', textAlign: 'center' })

const usageCode = `<Stack gap="md">
  <Box>Item 1</Box>
  <Box>Item 2</Box>
</Stack>

<Stack direction="row" gap="sm" align="center">
  <Button>Save</Button>
  <Button variant="outline">Cancel</Button>
</Stack>`

const classRows = [
  { className: 'stack', prop: '<Stack>', type: 'Component', description: 'Flex container that stacks children with gap' },
  { className: 'stack-column', prop: 'direction="column" (default)', type: 'Direction', description: 'Stack vertically', isDefault: true },
  { className: 'stack-row', prop: 'direction="row"', type: 'Direction', description: 'Stack horizontally' },
  { className: 'stack-xs|sm|md|lg|xl', prop: 'gap="xs|sm|md|lg|xl"', type: 'Size', description: 'Gap between children. Scales with viewport.' },
  { className: 'stack-align-*', prop: 'align="start|center|end|stretch"', type: 'Alignment', description: 'Cross-axis alignment' },
  { className: 'stack-justify-*', prop: 'justify="start|center|end|between|around"', type: 'Alignment', description: 'Main-axis justification' },
]

export default {
  oninit() { loadPageI18n('stack') },
  view() {
    return (<Stack gap="lg">
      <Title as="h1" size="2">Stack</Title>
      <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>{t('paragraph')}</Text>
      <Block spacing="lg"><Title as="h2" size="3">{t('common.usage')}</Title><CodeExample code={usageCode} language="jsx" /></Block>

      <Block spacing="lg"><Title as="h2" size="3">VStack (vertical)</Title>
        <Stack gap="md">
          <div className={item}>Item 1</div>
          <div className={item}>Item 2</div>
          <div className={item}>Item 3</div>
        </Stack>
      </Block>

      <Block spacing="lg"><Title as="h2" size="3">HStack (horizontal)</Title>
        <Stack direction="row" gap="md">
          <Button>Save</Button>
          <Button variant="outline">Cancel</Button>
          <Button variant="ghost">Help</Button>
        </Stack>
      </Block>

      <Block spacing="lg"><Title as="h2" size="3">Gap sizes</Title>
        <Stack gap="xs"><div className={item}>xs gap</div><div className={item}>xs gap</div></Stack>
        <br />
        <Stack gap="sm"><div className={item}>sm gap</div><div className={item}>sm gap</div></Stack>
        <br />
        <Stack gap="md"><div className={item}>md gap (default)</div><div className={item}>md gap</div></Stack>
        <br />
        <Stack gap="lg"><div className={item}>lg gap</div><div className={item}>lg gap</div></Stack>
      </Block>

      <Block spacing="lg"><Title as="h2" size="3">Alignment</Title>
        <Box>
          <Stack gap="sm" align="start"><div className={item}>align start</div><div className={item}>align start</div></Stack>
          <br />
          <Stack gap="sm" align="center"><div className={item}>align center</div><div className={item}>align center</div></Stack>
          <br />
          <Stack gap="sm" align="end"><div className={item}>align end</div><div className={item}>align end</div></Stack>
        </Box>
      </Block>

      <Block spacing="lg"><Title as="h2" size="3">Justify</Title>
        <Box>
          <Stack direction="row" gap="sm" justify="between">
            <div className={item}>left</div><div className={item}>right</div>
          </Stack>
        </Box>
      </Block>

      <Block spacing="lg"><Title as="h2" size="3">{t('common.classReference')}</Title><ClassTable rows={classRows} /></Block>
    </Stack>)
  }
}
