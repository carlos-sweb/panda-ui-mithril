import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Block, Indicator, Badge, Button } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const row = css({ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' })

const usageCode = `<Indicator position="end top">
  <Badge color="secondary" className="indicator-item">New</Badge>
  <Button>Main content</Button>
</Indicator>`

const classRows = [
  { className: 'indicator', prop: '<Indicator>', type: 'Component', description: 'Container element' },
  { className: 'indicator-item', prop: 'item={...} or className="indicator-item"', type: 'Part', description: 'will be placed on the corner of sibling' },
  { className: 'indicator-start', prop: 'position="start"', type: 'Placement', description: 'align horizontally to the start' },
  { className: 'indicator-center', prop: 'position="center"', type: 'Placement', description: 'align horizontally to the center' },
  { className: 'indicator-end', prop: 'position="end" (default)', type: 'Placement', description: 'align horizontally to the end', isDefault: true },
  { className: 'indicator-top', prop: 'position="top" (default)', type: 'Placement', description: 'align vertically to top', isDefault: true },
  { className: 'indicator-middle', prop: 'position="middle"', type: 'Placement', description: 'align vertically to middle' },
  { className: 'indicator-bottom', prop: 'position="bottom"', type: 'Placement', description: 'align vertically to bottom' },
]

export default {
  name: 'Indicator',
  category: 'Feedback',
  description: 'Indicator component for adding badges or dots to other elements.',

  oninit() { loadPageI18n('indicator') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Indicator</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <Stack direction="row" gap="sm" align="center">
          <Indicator position="end top">
            <Badge color="secondary" className="indicator-item">New</Badge>
            <Button>Main content</Button>
          </Indicator>
        </Stack>

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
