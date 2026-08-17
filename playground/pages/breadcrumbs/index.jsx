import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Breadcrumbs, Text, Block } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'


const usageCode = `<Breadcrumbs
  items={[
    { label: 'Home', href: '#' },
    { label: 'Docs', href: '#' },
    { label: 'Components' },
  ]}
/>`

const classRows = [
  { className: 'breadcrumbs', prop: '<Breadcrumbs items={...}>', type: 'Component', description: 'Wrapper around a <ul>' },
]

export default {
  name: 'Breadcrumbs',
  category: 'Navigation',
  description: 'Breadcrumbs help users understand their location in the site hierarchy.',

  oninit() { loadPageI18n('breadcrumbs') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Breadcrumbs</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Breadcrumbs
          items={[
            { label: 'Home', href: '#' },
            { label: 'Docs', href: '#' },
            { label: 'Components' },
          ]}
        />

        <Breadcrumbs>
          <li><a href="#">Home</a></li>
          <li><a href="#">Docs</a></li>
          <li>Manual (children)</li>
        </Breadcrumbs>

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
