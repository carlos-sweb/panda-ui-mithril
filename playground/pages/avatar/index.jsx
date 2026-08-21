import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Avatar, AvatarGroup, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

import avatar1 from '../../assets/avatar/avatar1.jpg'
import avatar2 from '../../assets/avatar/avatar2.jpg'
import avatar3 from '../../assets/avatar/avatar3.jpg'
import avatar4 from '../../assets/avatar/avatar4.jpg'
import avatar5 from '../../assets/avatar/avatar5.jpg'
import avatar6 from '../../assets/avatar/avatar6.jpg'
import avatar7 from '../../assets/avatar/avatar7.jpg'
import avatar8 from '../../assets/avatar/avatar8.jpg'
import avatar9 from '../../assets/avatar/avatar9.jpg'

const usageCodeJsx = `import m from 'mithril'
import { Avatar, AvatarGroup } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <Avatar src="https://i.pravatar.cc/150?u=1" size="lg" status="online" />
        <Avatar placeholder>AB</Avatar>
        <AvatarGroup>
          <Avatar src="https://i.pravatar.cc/150?u=1" />
          <Avatar src="https://i.pravatar.cc/150?u=2" />
        </AvatarGroup>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Avatar, AvatarGroup } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m('div', null, [
      m(Avatar, { src: 'https://i.pravatar.cc/150?u=1', size: 'lg', status: 'online' }),
      m(Avatar, { placeholder: true }, 'AB'),
      m(AvatarGroup, null, [
        m(Avatar, { src: 'https://i.pravatar.cc/150?u=1' }),
        m(Avatar, { src: 'https://i.pravatar.cc/150?u=2' })
      ])
    ])
  }
}`

export default {
  name: 'Avatar',
  category: 'Data Display',
  description: 'Avatar component represents a user or entity with an image or initials.',

  oninit() { loadPageI18n('avatar') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Avatar</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">Sizes</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Avatar src={avatar1} size="xs" />
            <Avatar src={avatar2} size="sm" />
            <Avatar src={avatar3} size="md" />
            <Avatar src={avatar4} size="lg" />
            <Avatar src={avatar5} size="xl" />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Shape</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Avatar src={avatar7} size="lg" shape="circle" />
            <Avatar src={avatar8} size="lg" shape="square" />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Status indicator</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Avatar src={avatar6} status="online" />
            <Avatar src={avatar9} status="offline" />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Placeholder (No Image)</Title>
          <Stack direction="row" gap="sm" wrap="wrap">
            <Avatar placeholder>AB</Avatar>
            <Avatar placeholder size="lg">CD</Avatar>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Avatar Group</Title>
          <AvatarGroup>
            <Avatar src={avatar1} />
            <Avatar src={avatar2} />
            <Avatar src={avatar3} />
            <Avatar src={avatar4} />
          </AvatarGroup>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <Tabs defaultActive="jsx" lifted size="lg">
            <Tab ref="jsx">Jsx</Tab>
            <Tab ref="js">Js</Tab>
            <TabContent ref="jsx">
              <CodeExample copyId="avatar-jsx-copy" type="jsx" code={usageCodeJsx} />
            </TabContent>
            <TabContent ref="js">
              <CodeExample copyId="avatar-js-copy" type="javascript" code={usageCodeJavascript} />
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
