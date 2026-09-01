import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Timeline, TimelineItem, TimelineStart, TimelineMiddle, TimelineEnd, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CircleCheck } from 'lucide-mithril'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const icon = css({ color: 'token(colors.primary)' })

const events = ['1984', '1998', '2001', '2007', '2015']
const labels = ['First Macintosh', 'iMac', 'iPod', 'iPhone', 'Apple Watch']

const usageCodeJsx = `import m from 'mithril'
import { Timeline, TimelineItem, TimelineStart, TimelineMiddle, TimelineEnd } from 'panda-ui-mithril'
import { CircleCheck } from 'lucide-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Timeline>
          <TimelineItem hrAfter>
            <TimelineStart>1984</TimelineStart>
            <TimelineMiddle><CircleCheck size={20} /></TimelineMiddle>
            <TimelineEnd box>First Macintosh</TimelineEnd>
          </TimelineItem>
          <TimelineItem hrBefore>
            <TimelineStart>1998</TimelineStart>
            <TimelineMiddle><CircleCheck size={20} /></TimelineMiddle>
            <TimelineEnd box>iMac</TimelineEnd>
          </TimelineItem>
        </Timeline>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Timeline, TimelineItem, TimelineStart, TimelineMiddle, TimelineEnd } from 'panda-ui-mithril'
import { CircleCheck } from 'lucide-mithril'

export const TimelinePage = {
  view() {
    return m(Timeline, null, [
      m(TimelineItem, { hrAfter: true }, [
        m(TimelineStart, null, '1984'),
        m(TimelineMiddle, null, m(CircleCheck, { size: 20 })),
        m(TimelineEnd, { box: true }, 'First Macintosh')
      ]),
      m(TimelineItem, { hrBefore: true }, [
        m(TimelineStart, null, '1998'),
        m(TimelineMiddle, null, m(CircleCheck, { size: 20 })),
        m(TimelineEnd, { box: true }, 'iMac')
      ])
    ])
  }
}`

export default {
  name: 'Timeline',
  category: 'Data Display',
  description: 'Timeline component for displaying chronological events.',

  oninit() { loadPageI18n('timeline') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Timeline</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('common.subtitles.horizontalDefault')}</Title>
          <Timeline>
            {events.map((year, i) => (
              <TimelineItem key={year} hrBefore={i > 0} hrAfter={i < events.length - 1}>
                <TimelineStart>{year}</TimelineStart>
                <TimelineMiddle><CircleCheck size={20} className={icon} /></TimelineMiddle>
                <TimelineEnd box>{labels[i]}</TimelineEnd>
              </TimelineItem>
            ))}
          </Timeline>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('common.subtitles.vertical')}</Title>
          <Timeline vertical>
            {events.slice(0, 3).map((year, i) => (
              <TimelineItem key={year} hrBefore={i > 0} hrAfter={i < 2}>
                <TimelineStart>{year}</TimelineStart>
                <TimelineMiddle><CircleCheck size={20} className={icon} /></TimelineMiddle>
                <TimelineEnd box>{labels[i]}</TimelineEnd>
              </TimelineItem>
            ))}
          </Timeline>
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
