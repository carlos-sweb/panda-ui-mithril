import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, ColorPicker, Button, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { ColorPicker, Button } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <ColorPicker defaultValue="#623CEA" onchange={(hex) => console.log(hex)} />
        <ColorPicker value="#ff8800" copy={false} />

        {/* Dropdown: el prop trigger convierte el picker en un dropdown */}
        <ColorPicker defaultValue="#7c3aed" trigger="Pick a color" />
        <ColorPicker
          defaultValue="#2563eb"
          trigger={(hex) => (
            <Button variant="outline" size="sm">
              <span style={{ display: 'inline-block', width: '1rem', height: '1rem', borderRadius: '0.25rem', background: hex, border: '1px solid rgba(0,0,0,0.15)', marginRight: '0.375rem', verticalAlign: 'middle' }} />
              {hex}
            </Button>
          )}
        />
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { ColorPicker, Button } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m('div', null, [
      m(ColorPicker, { defaultValue: '#623CEA', onchange: (hex) => console.log(hex) }),
      m(ColorPicker, { value: '#ff8800', copy: false }),

      // Dropdown: el prop trigger convierte el picker en un dropdown
      m(ColorPicker, { defaultValue: '#7c3aed', trigger: 'Pick a color' }),
      m(ColorPicker, {
        defaultValue: '#2563eb',
        trigger: (hex) => m(Button, { variant: 'outline', size: 'sm' }, [
          m('span', { style: { display: 'inline-block', width: '1rem', height: '1rem', borderRadius: '0.25rem', background: hex, border: '1px solid rgba(0,0,0,0.15)', marginRight: '0.375rem', verticalAlign: 'middle' } }),
          hex
        ])
      })
    ])
  }
}`

export default {
  name: 'ColorPicker',
  category: 'Data Input',
  description: 'Professional multi-space color picker (Picker 2D, HSB, HSL, RGB, CMYK, LAB).',

  oninit() { loadPageI18n('colorpicker') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">ColorPicker</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('basicTitle')}</Title>
          <Text size="sm" color="neutral">{t('basicDesc')}</Text>
          <Stack direction="row" gap="md" wrap="wrap" alignItems="flex-start">
            <ColorPicker defaultValue="#623CEA" />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('controlledTitle')}</Title>
          <Text size="sm" color="neutral">{t('controlledDesc')}</Text>
          <ControlledDemo />
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('noCopyTitle')}</Title>
          <Text size="sm" color="neutral">{t('noCopyDesc')}</Text>
          <Stack direction="row" gap="md" wrap="wrap" alignItems="flex-start">
            <ColorPicker defaultValue="#0ea5e9" copy={false} />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('modesTitle')}</Title>
          <Text size="sm" color="neutral">{t('modesDesc')}</Text>
          <Stack direction="row" gap="md" wrap="wrap" alignItems="flex-start">
            <ColorPicker defaultValue="#f97316" size="sm" />
            <ColorPicker defaultValue="#10b981" size="lg" />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('restrictedModesTitle')}</Title>
          <Text size="sm" color="neutral">{t('restrictedModesDesc')}</Text>
          <Stack direction="row" gap="md" wrap="wrap" alignItems="flex-start">
            <ColorPicker defaultValue="#8b5cf6" modes={['picker', 'rgb']} />
            <ColorPicker defaultValue="#0ea5e9" excludeModes={['lab']} />
            <ColorPicker defaultValue="#84cc16" modes={['rgb']} />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('dropdownTitle')}</Title>
          <Text size="sm" color="neutral">{t('dropdownDesc')}</Text>
          <Stack direction="row" gap="md" wrap="wrap" alignItems="flex-start">
            <ColorPicker defaultValue="#7c3aed" trigger="Pick a color" />
            <ColorPicker
              defaultValue="#2563eb"
              trigger={(hex) => (
                <Button variant="outline" size="sm">
                  <span style={{ display: 'inline-block', width: '1rem', height: '1rem', borderRadius: '0.25rem', background: hex, marginRight: '0.375rem', verticalAlign: 'middle', border: '1px solid rgba(0,0,0,0.15)' }} />
                  {hex}
                </Button>
              )}
            />
            <ColorPicker defaultValue="#dc2626" trigger="Close on the left" close="start" />
            <ColorPicker defaultValue="#0d9488" trigger="No close button" close={false} />
          </Stack>
        </Block>

        <Title as="h2" size="3">{t('common.usage')}</Title>
        <Tabs defaultActive="jsx" lifted size="lg">
          <Tab ref="jsx">Jsx</Tab>
          <Tab ref="js">Js</Tab>
          <TabContent ref="jsx">
            <CodeExample copyId="colorpicker-jsx-copy" type="jsx" code={usageCodeJsx} />
          </TabContent>
          <TabContent ref="js">
            <CodeExample copyId="colorpicker-js-copy" type="javascript" code={usageCodeJavascript} />
          </TabContent>
        </Tabs>

        <Title as="h2" size="3">{t('common.classReference')}</Title>
        <ClassTable rows={tableToRows(table)} />
      </Stack>
    )
  }
}

/** Demo controlada: el padre guarda el hex y lo muestra. */
const ControlledDemo = {
  oninit(vnode) {
    vnode.state.hex = '#db2777'
  },
  view(vnode) {
    return (
      <Stack gap="sm">
        <ColorPicker
          value={vnode.state.hex}
          onchange={(hex) => { vnode.state.hex = hex }}
        />
        <Text size="sm" color="neutral">
          <code>{vnode.state.hex}</code>
        </Text>
      </Stack>
    )
  }
}
