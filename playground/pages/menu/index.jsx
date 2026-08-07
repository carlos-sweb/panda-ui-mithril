import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Menu, MenuItem, MenuTitle } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const section = css({ marginBottom: '2rem' })
const surface = css({ background: 'token(colors.base-200)', borderRadius: 'var(--radius-box)' })

const usageCode = `<Menu>
  <MenuItem active>Dashboard</MenuItem>
  <MenuItem>Settings</MenuItem>
  <MenuTitle>Actions</MenuTitle>
  <MenuItem>Profile</MenuItem>
  <MenuItem disabled>Logout</MenuItem>
</Menu>`

const classRows = [
  { className: 'menu', prop: '<Menu>', type: 'Component', description: 'Menu container' },
  { className: 'menu-title', prop: '<MenuTitle>', type: 'Part', description: 'Section title inside a menu' },
  { className: 'menu-dropdown', prop: '<MenuDropdown>', type: 'Part', description: 'Nested submenu list' },
  { className: 'menu-dropdown-toggle', prop: '<MenuDropdownToggle>', type: 'Part', description: 'Toggle link for a submenu' },
  { className: 'menu-active', prop: '<MenuItem active>', type: 'Modifier', description: 'Highlights an item as active/selected' },
  { className: 'menu-disabled', prop: '<MenuItem disabled>', type: 'Modifier', description: 'Disables an item' },
  { className: 'menu-horizontal', prop: 'horizontal', type: 'Placement', description: 'Shows the menu horizontally' },
  { className: 'menu-vertical', prop: '(default)', type: 'Placement', description: 'Shows the menu vertically', isDefault: true },
  { className: 'menu-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'menu-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'menu-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'menu-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'menu-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
]

export default {
  name: 'Menu',
  category: 'Navigation',
  description: 'Menu component for navigation menus and sidebars.',

  oninit() { loadPageI18n('menu') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Menu</Title>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </p>

        <section className={section}>
          <Title as="h3" size="5">Vertical (default)</Title>
          <Menu className={surface}>
            <MenuItem active>Dashboard</MenuItem>
            <MenuItem>Settings</MenuItem>
            <MenuTitle>Actions</MenuTitle>
            <MenuItem>Profile</MenuItem>
            <MenuItem disabled>Logout</MenuItem>
          </Menu>
        </section>

        <section className={section}>
          <Title as="h3" size="5">Horizontal</Title>
          <Menu horizontal className={surface}>
            <MenuItem active>Home</MenuItem>
            <MenuItem>Docs</MenuItem>
            <MenuItem>About</MenuItem>
          </Menu>
        </section>

        <section>
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </section>
      </Stack>
    )
  }
}
