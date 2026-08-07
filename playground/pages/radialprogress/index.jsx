import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, RadialProgress } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const row = css({ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'center' })

const usageCode = `<RadialProgress value={70}>70%</RadialProgress>`

const classRows = [
  { className: 'radial-progress', prop: '<RadialProgress value={...}>', type: 'Component', description: 'Shows a radial progress' },
]

export default {
  name: 'RadialProgress',
  category: 'Feedback',
  description: 'Radial progress component for showing circular progress indicators.',

  oninit() { loadPageI18n('radialprogress') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Radial Progress</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <div className={row}>
          <RadialProgress value={0}>0%</RadialProgress>
          <RadialProgress value={25}>25%</RadialProgress>
          <RadialProgress value={50}>50%</RadialProgress>
          <RadialProgress value={75}>75%</RadialProgress>
          <RadialProgress value={100}>100%</RadialProgress>
        </div>

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
