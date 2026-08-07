import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Steps, Step, StepIcon } from '../../../src/index.js'
import { Check } from 'lucide-mithril'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })
const section = css({ marginBottom: '2rem' })

const usageCode = `<Steps>
  <Step color="primary">Register</Step>
  <Step color="primary">Choose Plan</Step>
  <Step>Purchase</Step>
  <Step>Receive</Step>
</Steps>`

const classRows = [
  { className: 'steps', prop: '<Steps>', type: 'Component', description: 'Steps container' },
  { className: 'step', prop: '<Step color="...">', type: 'Component', description: 'A single step' },
  { className: 'step-icon', prop: '<StepIcon>', type: 'Part', description: 'Custom icon instead of the auto-numbered counter' },
  { className: 'steps-horizontal', prop: '(default)', type: 'Placement', description: 'Shows steps horizontally', isDefault: true },
  { className: 'steps-vertical', prop: 'vertical', type: 'Placement', description: 'Shows steps vertically' },
  { className: 'step-neutral', prop: 'color="neutral"', type: 'Color', description: 'neutral color' },
  { className: 'step-primary', prop: 'color="primary"', type: 'Color', description: 'primary color' },
  { className: 'step-secondary', prop: 'color="secondary"', type: 'Color', description: 'secondary color' },
  { className: 'step-accent', prop: 'color="accent"', type: 'Color', description: 'accent color' },
  { className: 'step-info', prop: 'color="info"', type: 'Color', description: 'info color' },
  { className: 'step-success', prop: 'color="success"', type: 'Color', description: 'success color' },
  { className: 'step-warning', prop: 'color="warning"', type: 'Color', description: 'warning color' },
  { className: 'step-error', prop: 'color="error"', type: 'Color', description: 'error color' },
]

export default {
  name: 'Steps',
  category: 'Navigation',
  description: 'Steps component for showing progress through a multi-step process.',

  oninit() { loadPageI18n('steps') },
  view() {
    return (
      <div className={stack}>
        <Title as="h1" size="2">Steps</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <section className={section}>
          <Title as="h3" size="5">Horizontal (default)</Title>
          <Steps>
            <Step color="primary">Register</Step>
            <Step color="primary">Choose Plan</Step>
            <Step>Purchase</Step>
            <Step>Receive</Step>
          </Steps>
        </section>

        <section className={section}>
          <Title as="h3" size="5">With custom icon</Title>
          <Steps>
            <Step color="success">
              <StepIcon><Check size={16} /></StepIcon>
              Register
            </Step>
            <Step color="success">
              <StepIcon><Check size={16} /></StepIcon>
              Choose Plan
            </Step>
            <Step>Purchase</Step>
          </Steps>
        </section>

        <section className={section}>
          <Title as="h3" size="5">Vertical</Title>
          <Steps vertical>
            <Step color="primary">Register</Step>
            <Step color="primary">Choose Plan</Step>
            <Step>Purchase</Step>
            <Step>Receive</Step>
          </Steps>
        </section>

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
