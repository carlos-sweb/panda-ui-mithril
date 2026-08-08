import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const section = css({ marginBottom: '2rem' })

const usageCode = `<Tabs lifted>
  <Tab active={tab === 1} onclick={() => tab = 1}>Tab 1</Tab>
  <Tab active={tab === 2} onclick={() => tab = 2}>Tab 2</Tab>
  <TabContent active={tab === 1} variant="lift">Content for tab 1</TabContent>
  <TabContent active={tab === 2} variant="lift">Content for tab 2</TabContent>
</Tabs>`

const classRows = [
  { className: 'tabs', prop: '<Tabs boxed|bordered|lifted>', type: 'Component', description: 'Tabs container' },
  { className: 'tab', prop: '<Tab active onclick={...}>', type: 'Component', description: 'A single tab — switching is controlled via the `active` prop + your own onclick' },
  { className: 'tab-content', prop: '<TabContent active variant="...">', type: 'Part', description: 'Panel shown for the active tab' },
  { className: 'tab-disabled', prop: '<Tab disabled>', type: 'Modifier', description: 'Disables a tab' },
  { className: 'tabs-box', prop: 'boxed', type: 'Style', description: 'Tabs styled as a pill-shaped button group' },
  { className: 'tabs-border', prop: 'bordered', type: 'Style', description: 'Tabs with a bottom border indicator' },
  { className: 'tabs-lift', prop: 'lifted', type: 'Style', description: 'Tabs that visually connect to their content panel below' },
  { className: 'tabs-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'tabs-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'tabs-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'tabs-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'tabs-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
]

export default {
  oninit(vnode) {
    loadPageI18n('tabs')
    vnode.state.boxed = 1
    vnode.state.border = 1
    vnode.state.lifted = 1
  },

  name: 'Tabs',
  category: 'Navigation',
  description: 'Tabs component for organizing content into tabbed panels.',

  view(vnode) {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Tabs</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <section className={section}>
          <Title as="h3" size="5">Boxed</Title>
          <Tabs boxed>
            {[1, 2, 3].map((n) => (
              <Tab key={n} active={vnode.state.boxed === n} onclick={() => { vnode.state.boxed = n }}>Tab {n}</Tab>
            ))}
          </Tabs>
        </section>

        <section className={section}>
          <Title as="h3" size="5">Border</Title>
          <Tabs bordered>
            {[1, 2, 3].map((n) => (
              <Tab key={n} variant="border" active={vnode.state.border === n} onclick={() => { vnode.state.border = n }}>Tab {n}</Tab>
            ))}
          </Tabs>
        </section>

        <section className={section}>
          <Title as="h3" size="5">Lifted (with content)</Title>
          <Tabs lifted>
            {[1, 2, 3].map((n) => (
              <Tab key={n} variant="lift" active={vnode.state.lifted === n} onclick={() => { vnode.state.lifted = n }}>Tab {n}</Tab>
            ))}
            {[1, 2, 3].map((n) => (
              <TabContent key={n} variant="lift" active={vnode.state.lifted === n}>
                Content for tab {n}.
              </TabContent>
            ))}
          </Tabs>
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
