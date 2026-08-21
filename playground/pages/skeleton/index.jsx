import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Skeleton, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const box = css({ width: '250px' })
const line1 = css({ height: '8rem', width: '100%' })
const line2 = css({ height: '1rem', width: '100%', marginTop: '1rem' })
const line3 = css({ height: '1rem', width: '75%', marginTop: '0.5rem' })

const usageCodeJsx = `import m from 'mithril'
import { Skeleton } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Skeleton style="height: 8rem; width: 100%" />
        <Skeleton style="height: 1rem; width: 100%" />
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Skeleton } from 'panda-ui-mithril'

export const SkeletonPage = {
  view() {
    return m('div', null, [
      m(Skeleton, { style: 'height: 8rem; width: 100%' }),
      m(Skeleton, { style: 'height: 1rem; width: 100%' })
    ])
  }
}`

export default {
  name: 'Skeleton',
  category: 'Feedback',
  description: 'Skeleton component for loading placeholder content.',

  oninit() { loadPageI18n('skeleton') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Skeleton</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <div className={box}>
          <Skeleton className={line1} />
          <Skeleton className={line2} />
          <Skeleton className={line3} />
        </div>

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
          <ClassTable rows={tableToRows(table)} />
        </Block>
      </Stack>
    )
  }
}
