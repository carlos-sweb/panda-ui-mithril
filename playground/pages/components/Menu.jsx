import m from 'mithril'
import { css } from '../../../styled-system/css'
import { Menu, MenuItem, MenuTitle } from '../../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Menu',
  category: 'Navigation',
  description: 'Menu component for navigation menus and sidebars.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Menu</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Menu component for navigation menus and sidebars.
        </p>

        <Menu className="bg-base-200 rounded-box">
          <MenuItem active>Dashboard</MenuItem>
          <MenuItem>Settings</MenuItem>
          <MenuTitle>Actions</MenuTitle>
          <MenuItem>Profile</MenuItem>
          <MenuItem>Logout</MenuItem>
        </Menu>
      </div>
    )
  }
}
