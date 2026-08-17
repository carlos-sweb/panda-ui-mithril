import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, RadialProgress, Text, Block } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

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
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Stack direction="row" gap="md" wrap="wrap">
          <RadialProgress value={0}>0%</RadialProgress>
          <RadialProgress value={25}>25%</RadialProgress>
          <RadialProgress value={50}>50%</RadialProgress>
          <RadialProgress value={75}>75%</RadialProgress>
          <RadialProgress value={100}>100%</RadialProgress>
        </Stack>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <CodeExample code={usageCode} />
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </Block>
      </Stack>
    )
  }
}
