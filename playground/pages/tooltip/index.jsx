import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t } from '../../i18n/index.js'
import { Button, Tooltip } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const row = css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem' })

const usageCode = `<Tooltip tip="Top" position="top">
  <Button>Top</Button>
</Tooltip>
<Tooltip tip="Info" color="primary">
  <Button>Primary</Button>
</Tooltip>`

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

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Tooltip</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraphs.tooltip')}
        </p>

        <div className={row}>
          <Tooltip tip="Top" position="top"><Button>Top</Button></Tooltip>
          <Tooltip tip="Bottom" position="bottom"><Button>Bottom</Button></Tooltip>
          <Tooltip tip="Left" position="left"><Button>Left</Button></Tooltip>
          <Tooltip tip="Right" position="right"><Button>Right</Button></Tooltip>
        </div>

        <section>
          <h2 className={sectionTitle}>{t('common.usage')}</h2>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <h2 className={sectionTitle}>{t('common.classReference')}</h2>
          <ClassTable rows={classRows} />
        </section>
      </div>
    )
  }
}
