import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Avatar, AvatarGroup } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const section = css({ marginBottom: '2rem' })
const row = css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })

const usageCode = `<Avatar src="https://i.pravatar.cc/150?u=1" size="lg" status="online" />
<Avatar placeholder>AB</Avatar>
<AvatarGroup>
  <Avatar src="https://i.pravatar.cc/150?u=1" />
  <Avatar src="https://i.pravatar.cc/150?u=2" />
</AvatarGroup>`

const classRows = [
  { className: 'avatar', prop: '<Avatar src={...}>', type: 'Component', description: 'Avatar' },
  { className: 'avatar-group', prop: '<AvatarGroup>', type: 'Component', description: 'Container for multiple avatars' },
  { className: 'avatar-online', prop: 'status="online"', type: 'Modifier', description: 'shows a green dot as online indicator' },
  { className: 'avatar-offline', prop: 'status="offline"', type: 'Modifier', description: 'shows a gray dot as offline indicator' },
  { className: 'avatar-placeholder', prop: 'placeholder', type: 'Modifier', description: 'To show letters/initials as avatar placeholder' },
  { className: 'w-* rounded-full', prop: 'shape="circle" (default)', type: 'Style', description: 'Circular avatar', isDefault: true },
  { className: 'w-* rounded', prop: 'shape="square"', type: 'Style', description: 'Rounded-square avatar' },
]

export default {
  name: 'Avatar',
  category: 'Data Display',
  description: 'Avatar component represents a user or entity with an image or initials.',

  oninit() { loadPageI18n('avatar') },
  view() {
    return (
      <div className={stack}>
        <Title as="h1" size="2">Avatar</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <section className={section}>
          <Title as="h3" size="5">Sizes</Title>
          <div className={row}>
            <Avatar src="https://i.pravatar.cc/150?u=1" size="xs" />
            <Avatar src="https://i.pravatar.cc/150?u=2" size="sm" />
            <Avatar src="https://i.pravatar.cc/150?u=3" size="md" />
            <Avatar src="https://i.pravatar.cc/150?u=4" size="lg" />
            <Avatar src="https://i.pravatar.cc/150?u=5" size="xl" />
          </div>
        </section>

        <section className={section}>
          <Title as="h3" size="5">Shape</Title>
          <div className={row}>
            <Avatar src="https://i.pravatar.cc/150?u=7" size="lg" shape="circle" />
            <Avatar src="https://i.pravatar.cc/150?u=8" size="lg" shape="square" />
          </div>
        </section>

        <section className={section}>
          <Title as="h3" size="5">Status indicator</Title>
          <div className={row}>
            <Avatar src="https://i.pravatar.cc/150?u=6" status="online" />
            <Avatar src="https://i.pravatar.cc/150?u=9" status="offline" />
          </div>
        </section>

        <section className={section}>
          <Title as="h3" size="5">Placeholder (No Image)</Title>
          <div className={row}>
            <Avatar placeholder>AB</Avatar>
            <Avatar placeholder size="lg">CD</Avatar>
          </div>
        </section>

        <section className={section}>
          <Title as="h3" size="5">Avatar Group</Title>
          <AvatarGroup>
            <Avatar src="https://i.pravatar.cc/150?u=1" />
            <Avatar src="https://i.pravatar.cc/150?u=2" />
            <Avatar src="https://i.pravatar.cc/150?u=3" />
            <Avatar src="https://i.pravatar.cc/150?u=4" />
          </AvatarGroup>
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
