import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Rating, Text, Block, RatingGroup, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const note = css({ fontSize: '0.875rem', opacity: 0.6, marginTop: '0.5rem' })
const valueText = css({ fontSize: '0.875rem', opacity: 0.6 })

const usageCodeJsx = `import m from 'mithril'
import { Rating } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        // Uncontrolled: internal state, defaultValue initializes
        <Rating defaultValue={3} max={5} onchange={(v) => console.log(v)} />

        // Controlled: value + onchange
        <Rating value={state.rating} max={5} onchange={(v) => (state.rating = v)} />

        // Static (someone else's rating) — no interaction
        <Rating value={3} max={5} readonly />

        // Configurable max score: 1-3 scale, 1-5 scale, etc. (defaults to 5)
        <Rating defaultValue={2} max={3} />
        <Rating defaultValue={4} max={10} />

        // Re-click the selected star to clear (value 0)
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Rating } from 'panda-ui-mithril'

export const RatingPage = {
  view() {
    return m('div', null, [
      // Uncontrolled: internal state
      m(Rating, { defaultValue: 3, max: 5, onchange: (v) => console.log(v) }),
      // Controlled: value + onchange
      m(Rating, { value: state.rating, max: 5, onchange: (v) => (state.rating = v) }),
      // Static (no interaction)
      m(Rating, { value: 3, max: 5, readonly: true }),
      // Configurable max score
      m(Rating, { defaultValue: 2, max: 3 }),
      m(Rating, { defaultValue: 4, max: 10 })
    ])
  }
}`

export default {
  oninit(vnode) {
    loadPageI18n('rating')
    // uncontrolled demo state
    vnode.state.uncontrolled = 3
    // controlled demo state
    vnode.state.controlled = 2
    // custom max demo state
    vnode.state.threeStars = 2
    vnode.state.fourStars = 2
    vnode.state.tenStars = 7
  },

  name: 'Rating',
  category: 'Data Input',
  description: 'Rating component for displaying star ratings.',

  view(vnode) {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Rating</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('editableUncontrolled')}</Title>
          <Rating defaultValue={vnode.state.uncontrolled} max={5} onchange={(v) => { vnode.state.uncontrolled = v }} />
          <p className={note}>Hover to preview, click to set, re-click the selected star to clear. Value: {vnode.state.uncontrolled}</p>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('editableControlled')}</Title>
          <Rating value={vnode.state.controlled} max={5} onchange={(v) => { vnode.state.controlled = v }} />
          <p className={note}>Integer scores only. Value: {vnode.state.controlled}</p>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('configurableMaxScore')}</Title>
          <Stack gap="xs">
            <Stack direction="row" align="center" gap="sm">
              <span className={css({ opacity: 0.6, minWidth: '3.5rem' })}>1-3</span>
              <Rating defaultValue={vnode.state.threeStars} max={3} onchange={(v) => { vnode.state.threeStars = v }} />
              <span className={valueText}>Value: {vnode.state.threeStars}</span>
            </Stack>
            <Stack direction="row" align="center" gap="sm">
              <span className={css({ opacity: 0.6, minWidth: '3.5rem' })}>1-4</span>
              <Rating defaultValue={vnode.state.fourStars} max={4} onchange={(v) => { vnode.state.fourStars = v }} />
              <span className={valueText}>Value: {vnode.state.fourStars}</span>
            </Stack>
            <Stack direction="row" align="center" gap="sm">
              <span className={css({ opacity: 0.6, minWidth: '3.5rem' })}>1-10</span>
              <Rating defaultValue={vnode.state.tenStars} max={10} onchange={(v) => { vnode.state.tenStars = v }} />
              <span className={valueText}>Value: {vnode.state.tenStars}</span>
            </Stack>
          </Stack>
          <p className={note}>{t('configurableMaxNote1')}<code>max</code>{t('configurableMaxNote2')}</p>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('readonlyStatic')}</Title>
          <Stack direction="row" gap="sm">
            <Rating value={4} max={5} readonly />
            <Rating value={3} max={5} readonly />
            <Rating value={2} max={3} readonly />
          </Stack>
          <p className={note}>{t('readonlyNote')}</p>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('common.subtitles.sizes')}</Title>
          <Stack direction="row" gap="sm">
            <Rating value={3} size="xs" readonly />
            <Rating value={3} size="sm" readonly />
            <Rating value={3} size="md" readonly />
            <Rating value={3} size="lg" readonly />
            <Rating value={3} size="xl" readonly />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">{t('common.subtitles.colors')}</Title>
          <Stack direction="row" gap="sm">
            <Rating value={4} readonly />
            <Rating value={4} color="warning" readonly />
            <Rating value={4} color="success" readonly />
            <Rating value={4} color="error" readonly />
            <Rating value={4} color="primary" readonly />
          </Stack>
          <p className={note}>{t('colorsNote')}</p>
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
          <Title as="h2" size="3">{t('withRatingGroup')}</Title>
          <h4 className={heading}>{t('withRatingGroupNote')}</h4>
          <Stack direction="row" gap="sm">
            <RatingGroup label="Quality" defaultValue={4} />
            <RatingGroup label="Difficulty" defaultValue={2} color="info" size="lg" />
          </Stack>
          <p className={css({ fontSize: '0.875rem', opacity: 0.6, marginTop: '0.5rem' })}>
            {t('ratingGroupNote1')}<code>&lt;Rating /&gt;</code>{t('ratingGroupNote2')}
            <code>&lt;RatingGroup /&gt;</code>{t('ratingGroupNote3')}
            <a href="#!/ratinggroup" className={css({ color: 'token(colors.primary)', textDecoration: 'underline' })}>
              {t('ratingGroupPage')}
            </a>{t('ratingGroupNote4')}
          </p>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={tableToRows(table)} />
        </Block>
      </Stack>
    )
  }
}
