import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Menu, MenuItem, MenuTitle, Text, Block, Badge } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const surface = css({ background: 'token(colors.base-200)', borderRadius: 'var(--radius-box)' })
const callbackResult = css({
  padding: '0.5rem 1rem',
  background: 'token(colors.base-300)',
  borderRadius: 'var(--radius-box)',
  fontSize: '0.875rem',
  marginTop: '0.5rem',
})

const usageCode = `<Menu>
  <MenuItem active>Dashboard</MenuItem>
  <MenuItem>Settings</MenuItem>
  <MenuTitle>Actions</MenuTitle>
  <MenuItem>Profile</MenuItem>
  <MenuItem disabled>Logout</MenuItem>
</Menu>`

const autoActiveCode = `// Menu manages active state automatically
// defaultActive sets the initially selected item (index)
m(Menu, { autoActive: true, defaultActive: 1 }, [
  m(MenuItem, 'Dashboard'),
  m(MenuItem, 'Settings'),   // ← active by default
  m(MenuItem, 'Profile'),
])`

const callbackCode = `// Auto active + callback for external sync
m(Menu, {
  autoActive: true,
  onActiveChange: (index) => {
    m.route.set(routes[index])
  }
}, [
  m(MenuItem, 'Dashboard'),
  m(MenuItem, 'Settings'),
])`

const classRows = [
  { className: 'menu', prop: '<Menu>', type: 'Component', description: 'Menu container' },
  { className: 'menu-title', prop: '<MenuTitle>', type: 'Part', description: 'Section title inside a menu' },
  { className: 'menu-dropdown', prop: '<MenuDropdown>', type: 'Part', description: 'Nested submenu list' },
  { className: 'menu-dropdown-toggle', prop: '<MenuDropdownToggle>', type: 'Part', description: 'Toggle link for a submenu' },
  { className: 'menu-active', prop: '<MenuItem active> / autoActive', type: 'Modifier', description: 'Highlights an item as active/selected' },
  { className: 'menu-disabled', prop: '<MenuItem disabled>', type: 'Modifier', description: 'Disables an item' },
  { className: 'menu-horizontal', prop: 'horizontal', type: 'Placement', description: 'Shows the menu horizontally' },
  { className: 'menu-vertical', prop: '(default)', type: 'Placement', description: 'Shows the menu vertically', isDefault: true },
  { className: 'menu-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'menu-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'menu-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'menu-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'menu-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
  { className: '—', prop: 'autoActive', type: 'Prop', description: 'Menu tracks active item automatically on click' },
  { className: '—', prop: 'defaultActive', type: 'Prop', description: 'Index of initially active item (with autoActive)' },
  { className: '—', prop: 'onActiveChange', type: 'Prop', description: 'Callback fired when active item changes (index: number)' },
]

export default {
  name: 'Menu',
  category: 'Navigation',
  description: 'Menu component for navigation menus and sidebars.',

  oninit(vnode) {
    loadPageI18n('menu')
    vnode.state.callbackIndex = null
  },
  view(vnode) {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Menu</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">Vertical (default)</Title>
          <Menu className={surface}>
            <MenuItem active>Dashboard</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuTitle>Actions</MenuTitle>
            <MenuItem>Profile</MenuItem>
            <MenuItem disabled>Logout</MenuItem>
          </Menu>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Horizontal</Title>
          <Menu horizontal className={surface}>
            <MenuItem active>Home</MenuItem>
            <MenuItem>Docs</MenuItem>
            <MenuItem>About</MenuItem>
          </Menu>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Auto Active</Title>
          <Text color="neutral" className={css({ marginBottom: '0.75rem' })}>
            {t('autoActiveDescription')}
          </Text>
          <Menu autoActive defaultActive={1} className={surface}>
            <MenuItem>Dashboard</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem>Profile</MenuItem>
            <MenuItem>Notifications</MenuItem>
          </Menu>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Auto Active + Callback</Title>
          <Text color="neutral" className={css({ marginBottom: '0.75rem' })}>
            {t('callbackDescription')}
          </Text>
          <Menu
            defaultActive={1}
            autoActive
            className={surface}
            onActiveChange={(index) => { vnode.state.callbackIndex = index }}
          >
            <MenuItem>Dashboard</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuItem >Profile</MenuItem>
          </Menu>
          {vnode.state.callbackIndex !== null && (
            <div className={callbackResult}>
              <Badge color="primary">onActiveChange</Badge> Index: {vnode.state.callbackIndex}
            </div>
          )}
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <CodeExample code={usageCode} />
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">autoActive</Title>
          <CodeExample code={autoActiveCode} />
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">onActiveChange</Title>
          <CodeExample code={callbackCode} />
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </Block>
      </Stack>
    )
  }
}
