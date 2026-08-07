import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Button, Box } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '2rem' })
const st = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })
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
    return (<div className={stack}>
      <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Stack</h1>
      <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>{t('paragraph')}</p>
      <section><h2 className={st}>{t('common.usage')}</h2><CodeExample code={usageCode} language="jsx" /></section>

      <section><h2 className={st}>VStack (vertical)</h2>
        <Stack gap="md">
          <div className={item}>Item 1</div>
          <div className={item}>Item 2</div>
          <div className={item}>Item 3</div>
        </Stack>
      </section>

      <section><h2 className={st}>HStack (horizontal)</h2>
        <Stack direction="row" gap="md">
          <Button>Save</Button>
          <Button variant="outline">Cancel</Button>
          <Button variant="ghost">Help</Button>
        </Stack>
      </section>

      <section><h2 className={st}>Gap sizes</h2>
        <Stack gap="xs"><div className={item}>xs gap</div><div className={item}>xs gap</div></Stack>
        <br />
        <Stack gap="sm"><div className={item}>sm gap</div><div className={item}>sm gap</div></Stack>
        <br />
        <Stack gap="md"><div className={item}>md gap (default)</div><div className={item}>md gap</div></Stack>
        <br />
        <Stack gap="lg"><div className={item}>lg gap</div><div className={item}>lg gap</div></Stack>
      </section>

      <section><h2 className={st}>Alignment</h2>
        <Box>
          <Stack gap="sm" align="start"><div className={item}>align start</div><div className={item}>align start</div></Stack>
          <br />
          <Stack gap="sm" align="center"><div className={item}>align center</div><div className={item}>align center</div></Stack>
          <br />
          <Stack gap="sm" align="end"><div className={item}>align end</div><div className={item}>align end</div></Stack>
        </Box>
      </section>

      <section><h2 className={st}>Justify</h2>
        <Box>
          <Stack direction="row" gap="sm" justify="between">
            <div className={item}>left</div><div className={item}>right</div>
          </Stack>
        </Box>
      </section>

      <section><h2 className={st}>{t('common.classReference')}</h2><ClassTable rows={classRows} /></section>
    </div>)
  }
}
