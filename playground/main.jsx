import m from 'mithril'
import { css } from '../styled-system/css'
import '@fontsource/poppins/400.css'
import '@fontsource/poppins/500.css'
import '@fontsource/poppins/600.css'
import '@fontsource/poppins/700.css'
import './style.css'

import { Navbar } from './components/Navbar.jsx'
import { Sidebar } from './components/Sidebar.jsx'
import { SearchModal } from './components/SearchModal.jsx'
// Named exports (these pages use export const, not export default)
import { Landing } from './pages/Landing.jsx'
import { ComponentPage } from './pages/ComponentPage.jsx'

// Default exports (these pages use export default)
import Accordion from './pages/Accordion.jsx'
import Alert from './pages/Alert.jsx'
import Aura from './pages/Aura.jsx'
import Avatar from './pages/Avatar.jsx'
import Badge from './pages/Badge.jsx'
import Breadcrumbs from './pages/Breadcrumbs.jsx'
import Button from './pages/Button.jsx'
import Calendar from './pages/Calendar.jsx'
import Card from './pages/Card.jsx'
import Carousel from './pages/Carousel.jsx'
import Chat from './pages/Chat.jsx'
import Checkbox from './pages/Checkbox.jsx'
import Collapse from './pages/Collapse.jsx'
import Countdown from './pages/Countdown.jsx'
import Diff from './pages/Diff.jsx'
import Divider from './pages/Divider.jsx'
import FAB from './pages/FAB.jsx'
import Fieldset from './pages/Fieldset.jsx'
import FileInput from './pages/FileInput.jsx'
import Filter from './pages/Filter.jsx'
import Footer from './pages/Footer.jsx'
import Hero from './pages/Hero.jsx'
import Indicator from './pages/Indicator.jsx'
import Input from './pages/Input.jsx'
import Join from './pages/Join.jsx'
import Kbd from './pages/Kbd.jsx'
import Label from './pages/Label.jsx'
import Link from './pages/Link.jsx'
import List from './pages/List.jsx'
import Loading from './pages/Loading.jsx'
import Mask from './pages/Mask.jsx'
import Megamenu from './pages/Megamenu.jsx'
import Menu from './pages/Menu.jsx'
import Modal from './pages/Modal.jsx'
import NavbarPage from './pages/Navbar.jsx'
import OTP from './pages/OTP.jsx'
import Pagination from './pages/Pagination.jsx'
import Progress from './pages/Progress.jsx'
import RadialProgress from './pages/RadialProgress.jsx'
import Radio from './pages/Radio.jsx'
import Range from './pages/Range.jsx'
import Rating from './pages/Rating.jsx'
import Select from './pages/Select.jsx'
import Skeleton from './pages/Skeleton.jsx'
import Stack from './pages/Stack.jsx'
import Stats from './pages/Stats.jsx'
import Status from './pages/Status.jsx'
import Steps from './pages/Steps.jsx'
import Swap from './pages/Swap.jsx'
import Table from './pages/Table.jsx'
import Tabs from './pages/Tabs.jsx'
import Textarea from './pages/Textarea.jsx'
import ThemeController from './pages/ThemeController.jsx'
import Timeline from './pages/Timeline.jsx'
import Toast from './pages/Toast.jsx'
import Toggle from './pages/Toggle.jsx'
import Tooltip from './pages/Tooltip.jsx'

// Build routes - only page components, no layout wrapper
const routes = {
  '/': { render: () => m(Landing) },
  '/accordion': { render: () => m(Accordion) },
  '/alert': { render: () => m(Alert) },
  '/aura': { render: () => m(Aura) },
  '/avatar': { render: () => m(Avatar) },
  '/badge': { render: () => m(Badge) },
  '/breadcrumbs': { render: () => m(Breadcrumbs) },
  '/button': { render: () => m(Button) },
  '/calendar': { render: () => m(Calendar) },
  '/card': { render: () => m(Card) },
  '/carousel': { render: () => m(Carousel) },
  '/chat': { render: () => m(Chat) },
  '/checkbox': { render: () => m(Checkbox) },
  '/collapse': { render: () => m(Collapse) },
  '/componentpage': { render: () => m(ComponentPage) },
  '/countdown': { render: () => m(Countdown) },
  '/diff': { render: () => m(Diff) },
  '/divider': { render: () => m(Divider) },
  '/fab': { render: () => m(FAB) },
  '/fieldset': { render: () => m(Fieldset) },
  '/fileinput': { render: () => m(FileInput) },
  '/filter': { render: () => m(Filter) },
  '/footer': { render: () => m(Footer) },
  '/hero': { render: () => m(Hero) },
  '/indicator': { render: () => m(Indicator) },
  '/input': { render: () => m(Input) },
  '/join': { render: () => m(Join) },
  '/kbd': { render: () => m(Kbd) },
  '/label': { render: () => m(Label) },
  '/link': { render: () => m(Link) },
  '/list': { render: () => m(List) },
  '/loading': { render: () => m(Loading) },
  '/mask': { render: () => m(Mask) },
  '/megamenu': { render: () => m(Megamenu) },
  '/menu': { render: () => m(Menu) },
  '/modal': { render: () => m(Modal) },
  '/navbar': { render: () => m(NavbarPage) },
  '/otp': { render: () => m(OTP) },
  '/pagination': { render: () => m(Pagination) },
  '/progress': { render: () => m(Progress) },
  '/radialprogress': { render: () => m(RadialProgress) },
  '/radio': { render: () => m(Radio) },
  '/range': { render: () => m(Range) },
  '/rating': { render: () => m(Rating) },
  '/select': { render: () => m(Select) },
  '/skeleton': { render: () => m(Skeleton) },
  '/stack': { render: () => m(Stack) },
  '/stats': { render: () => m(Stats) },
  '/status': { render: () => m(Status) },
  '/steps': { render: () => m(Steps) },
  '/swap': { render: () => m(Swap) },
  '/table': { render: () => m(Table) },
  '/tabs': { render: () => m(Tabs) },
  '/textarea': { render: () => m(Textarea) },
  '/themecontroller': { render: () => m(ThemeController) },
  '/timeline': { render: () => m(Timeline) },
  '/toast': { render: () => m(Toast) },
  '/toggle': { render: () => m(Toggle) },
  '/tooltip': { render: () => m(Tooltip) },
}

routes['/:component...'] = {
  render: () => m(Landing)
}

// Theme persistence
const getSavedTheme = () => localStorage.getItem('panda-ui-theme') || 'light'
const setSavedTheme = (theme) => localStorage.setItem('panda-ui-theme', theme)

// Apply saved theme before mount
const savedTheme = getSavedTheme()
document.documentElement.setAttribute('data-theme', savedTheme)

// Layout component - mounted once on body, persists across route changes
const Layout = {
  oninit(vnode) {
    vnode.state.isMobileOpen = false
    vnode.state.isSearchOpen = false
    vnode.state.isDark = getSavedTheme() === 'dark'
  },

  oncreate(vnode) {
    m.route.prefix = '#!'
    m.route(document.getElementById('view-dynamic'), '/', routes)
  },

  view(vnode) {
    return (
      <div className={css({ display: 'flex', height: '100vh', overflow: 'hidden' })}>
        <Sidebar
          isMobileOpen={vnode.state.isMobileOpen}
          onMobileClose={() => { vnode.state.isMobileOpen = false }}
        />

        <div className={css({ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 })}>
          <Navbar
            onSearchOpen={() => { vnode.state.isSearchOpen = true }}
            onToggleSidebar={() => { vnode.state.isMobileOpen = !vnode.state.isMobileOpen }}
            isDark={vnode.state.isDark}
            onToggleTheme={() => {
              vnode.state.isDark = !vnode.state.isDark
              const theme = vnode.state.isDark ? 'dark' : 'light'
              document.documentElement.setAttribute('data-theme', theme)
              setSavedTheme(theme)
            }}
          />

          <main id="view-dynamic" />
        </div>

        {vnode.state.isSearchOpen && (
          <SearchModal onclose={() => { vnode.state.isSearchOpen = false }} />
        )}

        {vnode.state.isMobileOpen && (
          <div
            className={css({
              position: 'fixed',
              inset: 0,
              background: 'oklch(0% 0 0 / 50%)',
              zIndex: 80,
              '@media (min-width: 769px)': { display: 'none' },
            })}
            onclick={() => { vnode.state.isMobileOpen = false }}
          />
        )}
      </div>
    )
  }
}

// Mount layout once on body - never re-mounts
m.mount(document.body, Layout)
