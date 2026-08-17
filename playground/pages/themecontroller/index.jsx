import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, ThemeController, Swap, Text, Block } from '../../../src/index.js'
import { Sun, Moon } from 'lucide-mithril'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const label = css({ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' })

const getTheme = () => document.documentElement.getAttribute('data-theme') || 'light'
const setTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme)
  localStorage.setItem('panda-ui-theme', theme)
}

const usageCode = `<ThemeController
  theme="dark"
  checked={currentTheme === 'dark'}
  onchange={(theme) => setTheme(theme || 'light')}
/>`

const classRows = [
  { className: 'theme-controller', prop: '<ThemeController theme="...">', type: 'Component', description: 'A checkbox/radio that reports its checked state — wire onchange to set data-theme yourself (this project switches themes via JS, not the CSS-only :has() trick from the reference implementation)' },
]

export default {
  oninit(vnode) {
    loadPageI18n('themecontroller')
    vnode.state.theme = getTheme()
  },

  name: 'ThemeController',
  category: 'Actions',
  description: 'Theme controller toggle for switching between light and dark themes.',

  view(vnode) {
    const isDark = vnode.state.theme === 'dark'
    const change = (theme) => {
      vnode.state.theme = theme || 'light'
      setTheme(vnode.state.theme)
    }

    return (
      <Stack gap="lg">
        <Title as="h1" size="2">ThemeController</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">As a toggle</Title>
          <Stack direction="row" gap="md">
            <label className={label}>
              <ThemeController theme="dark" checked={isDark} onchange={change} />
              <span>Dark mode</span>
            </label>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">As a checkbox</Title>
          <Stack direction="row" gap="md">
            <label className={label}>
              <ThemeController variant="checkbox" theme="dark" checked={isDark} onchange={change} color="primary" />
              <span>Dark mode</span>
            </label>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">As a swap (sun/moon)</Title>
          <Stack direction="row" gap="md">
            <Swap
              style="rotate"
              checked={isDark}
              onchange={(e) => change(e.target.checked ? 'dark' : undefined)}
              on={<Moon size={24} />}
              off={<Sun size={24} />}
            />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <CodeExample code={usageCode} />
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </Block>
      </Stack>
    )
  }
}
