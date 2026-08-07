import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { List, ListRow, ListCol, Avatar, Button } from '../../../src/index.js'
import { Play, Heart } from 'lucide-mithril'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })
const wrapper = css({ maxWidth: '32rem', background: 'token(colors.base-100)', borderRadius: 'var(--radius-box)', boxShadow: '0 1px 3px color-mix(in oklab, black 15%, transparent)' })
const kicker = css({ padding: '1rem 1rem 0.5rem', fontSize: '0.75rem', opacity: 0.6, letterSpacing: '0.02em' })
const subtitle = css({ fontSize: '0.75rem', textTransform: 'uppercase', fontWeight: '600', opacity: 0.6 })

const songs = [
  { title: 'Dio Lupa', subtitle: 'Remaining Reason', seed: 1 },
  { title: 'Ellie Beilish', subtitle: 'Bears of a fever', seed: 4 },
  { title: 'Sabrino Gardener', subtitle: 'Cappuccino', seed: 3 },
]

const usageCode = `<List>
  <ListRow>
    <Avatar src="..." size="sm" shape="square" />
    <ListCol grow>
      <div>Dio Lupa</div>
      <div>Remaining Reason</div>
    </ListCol>
    <Button variant="ghost" square><Play size={18} /></Button>
  </ListRow>
</List>`

const classRows = [
  { className: 'list', prop: '<List>', type: 'Component', description: 'A vertical flex layout to include list rows' },
  { className: 'list-row', prop: '<ListRow>', type: 'Component', description: 'The item inside list. A horizontal grid layout to include data' },
  { className: 'list-col-wrap', prop: '<ListCol wrap>', type: 'Modifier', description: 'For one of the direct children of list-row to push it to the next line' },
  { className: 'list-col-grow', prop: '<ListCol grow>', type: 'Modifier', description: 'For one of the direct children of list-row to make it fill the remaining space (2nd child grows by default)' },
]

export default {
  name: 'List',
  category: 'Data Display',
  description: 'List is a vertical layout to display information in rows.',

  oninit() { loadPageI18n('list') },
  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>List</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <div className={wrapper}>
          <div className={kicker}>Most played songs this week</div>
          <List>
            {songs.map((song) => (
              <ListRow key={song.seed} hover>
                <Avatar src={`https://i.pravatar.cc/80?u=${song.seed}`} size="sm" shape="square" />
                <ListCol>
                  <div>{song.title}</div>
                  <div className={subtitle}>{song.subtitle}</div>
                </ListCol>
                <Button variant="ghost" square><Play size={18} /></Button>
                <Button variant="ghost" square><Heart size={18} /></Button>
              </ListRow>
            ))}
          </List>
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
