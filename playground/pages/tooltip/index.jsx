import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Button, Tooltip, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const usageCodeJsx = `import m from 'mithril'
import { Tooltip, Button } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Tooltip tip="Top" position="top">
          <Button>Top</Button>
        </Tooltip>
        <Tooltip tip="Info" color="primary">
          <Button>Primary</Button>
        </Tooltip>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Tooltip, Button } from 'panda-ui-mithril'

export const TooltipPage = {
  view() {
    return m('div', null, [
      m(Tooltip, { tip: 'Top', position: 'top' }, [
        m(Button, null, 'Top')
      ]),
      m(Tooltip, { tip: 'Info', color: 'primary' }, [
        m(Button, null, 'Primary')
      ])
    ])
  }
}`

const classRows = [
  { className: 'tooltip', prop: '<Tooltip tip="...">', type: 'Component', description: 'Container element' },
  { className: 'tooltip-content', type: 'Part', description: 'Optional. Setting a div as the content of the tooltip instead of the `data-tip` text — not supported by this component, only the `tip` attribute is' },
  { className: 'tooltip-top', prop: 'position="top" (default)', type: 'Placement', description: 'Put tooltip on top', isDefault: true },
  { className: 'tooltip-bottom', prop: 'position="bottom"', type: 'Placement', description: 'Put tooltip on bottom' },
  { className: 'tooltip-left', prop: 'position="left"', type: 'Placement', description: 'Put tooltip on left' },
  { className: 'tooltip-right', prop: 'position="right"', type: 'Placement', description: 'Put tooltip on right' },
  { className: 'tooltip-start', type: 'Placement', description: 'Align tooltip on start — not supported by this component' },
  { className: 'tooltip-center', type: 'Placement', description: 'Align tooltip on center — not supported by this component' },
  { className: 'tooltip-end', type: 'Placement', description: 'Align tooltip on end — not supported by this component' },
  { className: 'tooltip-open', prop: 'open', type: 'Modifier', description: 'Force open tooltip' },
  { className: 'tooltip-neutral', prop: 'color="neutral" (default)', type: 'Color', description: 'neutral color', isDefault: true },
  { className: 'tooltip-primary', prop: 'color="primary"', type: 'Color', description: 'primary color' },
  { className: 'tooltip-secondary', prop: 'color="secondary"', type: 'Color', description: 'secondary color' },
  { className: 'tooltip-accent', prop: 'color="accent"', type: 'Color', description: 'accent color' },
  { className: 'tooltip-info', prop: 'color="info"', type: 'Color', description: 'info color' },
  { className: 'tooltip-success', prop: 'color="success"', type: 'Color', description: 'success color' },
  { className: 'tooltip-warning', prop: 'color="warning"', type: 'Color', description: 'warning color' },
  { className: 'tooltip-error', prop: 'color="error"', type: 'Color', description: 'error color' },
]

export default {
  name: 'Tooltip',
  category: 'Feedback',
  description: 'Tooltip component for showing additional information on hover.',

  oninit() { loadPageI18n('tooltip') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Tooltip</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Stack direction="row" gap="sm" wrap="wrap">
          <Tooltip tip="Top" position="top"><Button>Top</Button></Tooltip>
          <Tooltip tip="Bottom" position="bottom"><Button>Bottom</Button></Tooltip>
          <Tooltip tip="Left" position="left"><Button>Left</Button></Tooltip>
          <Tooltip tip="Right" position="right"><Button>Right</Button></Tooltip>
        </Stack>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <Tabs defaultActive="jsx" lifted size="lg">
            <Tab ref="jsx">Jsx</Tab>
            <Tab ref="js">Js</Tab>
            <TabContent ref="jsx">
              <CodeExample type="jsx" code={usageCodeJsx} />
            </TabContent>
            <TabContent ref="js">
              <CodeExample type="javascript" code={usageCodeJavascript} />
            </TabContent>
          </Tabs>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </Block>
      </Stack>
    )
  }
}
