import m from 'mithril'
import { css } from '../styled-system/css'
import '@fontsource/ubuntu/400.css'
import '@fontsource/ubuntu/500.css'
import '@fontsource/ubuntu/700.css'
import '@fontsource/ubuntu/400-italic.css'
import '@fontsource/ubuntu-mono/400.css'
import 'highlight.js/styles/atom-one-dark-reasonable.css'
import './style.css'

import { Navbar } from './components/Navbar.jsx'
import { Sidebar } from './components/Sidebar.jsx'
import { SearchModal } from './components/SearchModal.jsx'
import { t, currentLang, setLang } from './i18n/index.js'
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
import ButtonGroup from './pages/ButtonGroup.jsx'
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
import Stat from './pages/Stat.jsx'
import Status from './pages/Status.jsx'
import Steps from './pages/Steps.jsx'
import Swap from './pages/Swap.jsx'
import TagPage from './pages/Tag.jsx'
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
  '/': Landing,
  '/accordion': Accordion,
  '/alert': Alert,
  '/aura': Aura,
  '/avatar': Avatar,
  '/badge': Badge,
  '/breadcrumbs':Breadcrumbs,
  '/button':Button,
  '/buttongroup':ButtonGroup,
  '/calendar':Calendar,
  '/card':Card,
  '/carousel':Carousel,
  '/chat':Chat,
  '/checkbox':Checkbox,
  '/collapse':Collapse,
  '/componentpage':ComponentPage,
  '/countdown':Countdown,
  '/diff':Diff,
  '/divider':Divider,
  '/fab':FAB,
  '/fieldset':Fieldset,
  '/fileinput':FileInput,
  '/filter':Filter,
  '/footer':Footer,
  '/hero':Hero,
  '/indicator':Indicator,
  '/input':Input,
  '/join':Join,
  '/kbd':Kbd,
  '/label':Label,
  '/link':Link,
  '/list':List,
  '/loading':Loading,
  '/mask':Mask,
  '/megamenu':Megamenu,
  '/menu':Menu,
  '/modal':Modal,
  '/navbar':NavbarPage,
  '/otp':OTP,
  '/pagination':Pagination,
  '/progress':Progress,
  '/radialprogress':RadialProgress,
  '/radio':Radio,
  '/range': Range,
  '/rating': Rating,
  '/select': Select,
  '/skeleton': Skeleton,
  '/stack': Stack,
  '/stat': Stat,
  '/status': Status,
  '/steps': Steps,
  '/swap': Swap,
  '/tag': TagPage,
  '/table': Table,
  '/tabs': Tabs,
  '/textarea': Textarea,
  '/themectrl': ThemeController,
  '/timeline': Timeline,
  '/toast': Toast,
  '/toggle': Toggle,
  '/tooltip': Tooltip,
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

// Scroll container for the routed page content. Kept in Panda css() so the
// layout lives with the Layout component; the id is the m.route mount target.
// All padding (incl. the bottom space) lives on the inner content wrapper, not
// on this scroller: Firefox excludes a scroll container's own padding from the
// scrollable overflow, but a plain block's padding is content everywhere.
const mainStyles = css({
  flex: '1',
  overflowY: 'auto',
  marginLeft: '260px',
  marginTop: '64px',
  minHeight: 'calc(100vh - 64px)',
  '@media (max-width: 768px)': {
    marginLeft: '0',
  },
})

// Inner wrapper that receives the routed page; its padding is scrollable
// content in every engine (unlike scroll-container padding in Firefox).
const contentStyles = css({
  padding: '2rem 3rem 3rem',
  '@media (max-width: 768px)': {
    padding: '1.5rem 1.5rem 3rem',
  },
})

// Layout component - mounted once on body, persists across route changes
const Layout = {
  oninit(vnode) {
    vnode.state.isMobileOpen = false
    vnode.state.isSearchOpen = false
    vnode.state.isDark = getSavedTheme() === 'dark'
  },

  oncreate(vnode) {
    m.route.prefix = '#!'
    m.route(document.getElementById('view-dynamic-content'), '/', routes)

    // Ensure language param exists in the URL
    const lang = currentLang()
    if (!m.route.param('lang')) {
      m.route.set(m.route.get(), {}, { ...m.route.param(), lang })
    }

    vnode.state.onKeydown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        vnode.state.isSearchOpen = true
        m.redraw()
      }
    }
    window.addEventListener('keydown', vnode.state.onKeydown)
  },

  onremove(vnode) {
    window.removeEventListener('keydown', vnode.state.onKeydown)
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
            onToggleTheme={(theme) => {
              const next = theme || 'light'
              vnode.state.isDark = next === 'dark'
              document.documentElement.setAttribute('data-theme', next)
              setSavedTheme(next)
            }}
          />

          <main id="view-dynamic" className={mainStyles}>
            <div id="view-dynamic-content" className={contentStyles} />
          </main>
        </div>

        <SearchModal
          open={vnode.state.isSearchOpen}
          onclose={() => { vnode.state.isSearchOpen = false }}
        />
      </div>
    )
  }
}

// Mount layout once on body - never re-mounts
m.mount(document.body, Layout)
