import m from 'mithril'
import { css } from '../../styled-system/css'
import { Avatar, AvatarGroup, Badge } from '../../src/index.js'

const section = css({ marginBottom: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const row = css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Avatar',
  category: 'Data Display',
  description: 'Avatar component represents a user or entity with an image or initials.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Avatar</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Avatar component represents a user or entity with an image or initials.
        </p>

        <section className={section}>
          <h3 className={heading}>Sizes</h3>
          <div className={row}>
            <Avatar src="https://i.pravatar.cc/150?u=1" size="xs" />
            <Avatar src="https://i.pravatar.cc/150?u=2" size="sm" />
            <Avatar src="https://i.pravatar.cc/150?u=3" size="md" />
            <Avatar src="https://i.pravatar.cc/150?u=4" size="lg" />
            <Avatar src="https://i.pravatar.cc/150?u=5" size="xl" />
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>With Indicator</h3>
          <div className={row}>
            <div style={css({ position: 'relative', display: 'inline-block' })}>
              <Avatar src="https://i.pravatar.cc/150?u=6" />
              <Badge color="success" className={css({ position: 'absolute', bottom: 0, right: 0, borderRadius: '9999px', padding: '2px 6px', fontSize: '0.625rem' })}>Online</Badge>
            </div>
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Avatar Group</h3>
          <AvatarGroup>
            <Avatar src="https://i.pravatar.cc/150?u=1" />
            <Avatar src="https://i.pravatar.cc/150?u=2" />
            <Avatar src="https://i.pravatar.cc/150?u=3" />
            <Avatar src="https://i.pravatar.cc/150?u=4" />
          </AvatarGroup>
        </section>
      </div>
    )
  }
}
