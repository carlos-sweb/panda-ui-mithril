import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Stats, Stat, StatTitle, StatValue, StatDesc, StatFigure, StatActions, Button, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { Wallet, Users, ThumbsUp } from 'lucide-mithril'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const shadow = css({ boxShadow: '0 1px 3px color-mix(in oklab, black 15%, transparent)' })

const usageCodeJsx = `import m from 'mithril'
import { Stats, Stat, StatFigure, StatTitle, StatValue, StatDesc } from 'panda-ui-mithril'
import { Wallet } from 'lucide-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Stats>
          <Stat>
            <StatFigure><Wallet size={32} /></StatFigure>
            <StatTitle>Total Downloads</StatTitle>
            <StatValue>31K</StatValue>
            <StatDesc>From January 1 - February 1</StatDesc>
          </Stat>
        </Stats>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Stats, Stat, StatFigure, StatTitle, StatValue, StatDesc } from 'panda-ui-mithril'
import { Wallet } from 'lucide-mithril'

export const StatsPage = {
  view() {
    return m(Stats, null, [
      m(Stat, null, [
        m(StatFigure, null, m(Wallet, { size: 32 })),
        m(StatTitle, null, 'Total Downloads'),
        m(StatValue, null, '31K'),
        m(StatDesc, null, 'From January 1 - February 1')
      ])
    ])
  }
}`

export default {
  name: 'Stats',
  category: 'Data Display',
  description: 'Stats are used to show numerical data.',

  oninit() { loadPageI18n('stat') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Stats</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('withFiguresActions')}</Title>
          <Stats className={shadow}>
            <Stat>
              <StatFigure><Wallet size={32} /></StatFigure>
              <StatTitle>Total Downloads</StatTitle>
              <StatValue>31K</StatValue>
              <StatDesc>From January 1 - February 1</StatDesc>
            </Stat>
            <Stat>
              <StatFigure><Users size={32} /></StatFigure>
              <StatTitle>New Users</StatTitle>
              <StatValue>4,200</StatValue>
              <StatDesc>↗︎ 400 (22%)</StatDesc>
            </Stat>
            <Stat>
              <StatFigure><ThumbsUp size={32} /></StatFigure>
              <StatTitle>New Registers</StatTitle>
              <StatValue>1,200</StatValue>
              <StatActions>
                <Button size="sm" color="success">Add</Button>
              </StatActions>
            </Stat>
          </Stats>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('common.subtitles.vertical')}</Title>
          <Stats vertical className={shadow}>
            <Stat>
              <StatTitle>Total Downloads</StatTitle>
              <StatValue>31K</StatValue>
              <StatDesc>From January 1 - February 1</StatDesc>
            </Stat>
            <Stat>
              <StatTitle>New Users</StatTitle>
              <StatValue>4,200</StatValue>
              <StatDesc>42% more than last month</StatDesc>
            </Stat>
          </Stats>
        </Block>

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
