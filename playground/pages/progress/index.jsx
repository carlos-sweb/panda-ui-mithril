import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Progress } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'


const usageCode = `<Progress value={70} max={100} color="primary" />`

const classRows = [
  { className: 'progress', prop: '<Progress value={...} max={...}>', type: 'Component', description: 'For <progress> tag' },
  { className: 'progress-neutral', prop: 'color="neutral"', type: 'Color', description: 'neutral color' },
  { className: 'progress-primary', prop: 'color="primary"', type: 'Color', description: 'primary color' },
  { className: 'progress-secondary', prop: 'color="secondary"', type: 'Color', description: 'secondary color' },
  { className: 'progress-accent', prop: 'color="accent"', type: 'Color', description: 'accent color' },
  { className: 'progress-info', prop: 'color="info"', type: 'Color', description: 'info color' },
  { className: 'progress-success', prop: 'color="success"', type: 'Color', description: 'success color' },
  { className: 'progress-warning', prop: 'color="warning"', type: 'Color', description: 'warning color' },
  { className: 'progress-error', prop: 'color="error"', type: 'Color', description: 'error color' },
]

export default {
  name: 'Progress',
  category: 'Feedback',
  description: 'Progress bar component for showing completion status.',

  oninit() { loadPageI18n('progress') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Progress</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <Progress value={0} max={100} />
        <Progress value={25} max={100} color="primary" />
        <Progress value={50} max={100} color="secondary" />
        <Progress value={75} max={100} color="accent" />
        <Progress value={100} max={100} color="success" />

        <section>
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </section>
      </div>
    )
  }
}
