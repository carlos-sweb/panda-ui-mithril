import m from 'mithril'
import { Button, Badge, Alert, Card, CardBody, CardTitle, CardActions, TextInput, Textarea, Select, Checkbox, Radio, Toggle, Tabs, Tab, Tooltip, Toast, Modal, ModalBox, ModalAction, Navbar, NavbarStart, NavbarCenter, NavbarEnd, Hero, HeroContent, Footer, FooterTitle, Menu, MenuItem, MenuTitle, Steps, Step, Loading, Skeleton, Divider, Progress, Avatar, AvatarGroup, Kbd, Link, List, ListRow, Accordion, AccordionTitle, AccordionContent, Table, TableContainer, TableRow, TableCell, TableHead, TableThead, TableTbody, Stack, Stat, Stats, StatTitle, StatValue, StatDesc, Timeline, TimelineItem, TimelineStart, TimelineMiddle, TimelineEnd, Indicator, Badge as BadgeComp, Status, Range, Radio as RadioComp, FileInput, OTP, Join, JoinItem, Pagination, PaginationButton, Swap, Rating, Mask, Countdown, RadialProgress, Chat, ChatBubble, ChatHeader, ChatFooter, ChatImage, Diff, DiffItem1, DiffItem2, DiffResizer, Fieldset, Label, Filter, FilterReset, MenuDropdown, MenuDropdownToggle, Megamenu, Footer as FooterComp, FAB, FABAction, FABMain, ThemeController, Carousel, CarouselItem, Menu as MenuComp, ListItem, ListRow as ListRowComp, Calendar, Aura } from '../src/index.js'

const components = {
  button: { name: 'Button', icon: '🔘' },
  badge: { name: 'Badge', icon: '🏷️' },
  alert: { name: 'Alert', icon: '⚠️' },
  card: { name: 'Card', icon: '🃏' },
  input: { name: 'TextInput', icon: '📝' },
  textarea: { name: 'Textarea', icon: '📄' },
  select: { name: 'Select', icon: '📋' },
  checkbox: { name: 'Checkbox', icon: '☑️' },
  radio: { name: 'Radio', icon: '🔘' },
  toggle: { name: 'Toggle', icon: '🔀' },
  tabs: { name: 'Tabs', icon: '📑' },
  tooltip: { name: 'Tooltip', icon: '💬' },
  toast: { name: 'Toast', icon: '🔔' },
  modal: { name: 'Modal', icon: '🪟' },
  navbar: { name: 'Navbar', icon: '🧭' },
  hero: { name: 'Hero', icon: '🦸' },
  footer: { name: 'Footer', icon: '📎' },
  menu: { name: 'Menu', icon: '📁' },
  steps: { name: 'Steps', icon: '👣' },
  loading: { name: 'Loading', icon: '⏳' },
  skeleton: { name: 'Skeleton', icon: '💀' },
  divider: { name: 'Divider', icon: '➖' },
  progress: { name: 'Progress', icon: '📊' },
  avatar: { name: 'Avatar', icon: '👤' },
  kbd: { name: 'Kbd', icon: '⌨️' },
  link: { name: 'Link', icon: '🔗' },
  list: { name: 'List', icon: '📋' },
  accordion: { name: 'Accordion', icon: '🔽' },
  table: { name: 'Table', icon: '📊' },
  stat: { name: 'Stat', icon: '📈' },
  timeline: { name: 'Timeline', icon: '📅' },
  indicator: { name: 'Indicator', icon: '📍' },
  status: { name: 'Status', icon: '🟢' },
  range: { name: 'Range', icon: '🎚️' },
  fileinput: { name: 'FileInput', icon: '📁' },
  otp: { name: 'OTP', icon: '🔑' },
  join: { name: 'Join', icon: '🔗' },
  pagination: { name: 'Pagination', icon: '📄' },
  swap: { name: 'Swap', icon: '🔄' },
  rating: { name: 'Rating', icon: '⭐' },
  mask: { name: 'Mask', icon: '🎭' },
  countdown: { name: 'Countdown', icon: '⏱️' },
  radialprogress: { name: 'RadialProgress', icon: '🎯' },
  chat: { name: 'Chat', icon: '💬' },
  diff: { name: 'Diff', icon: '🔀' },
  fieldset: { name: 'Fieldset', icon: '📦' },
  label: { name: 'Label', icon: '🏷️' },
  filter: { name: 'Filter', icon: '🔍' },
  megamenu: { name: 'Megamenu', icon: '📱' },
  fab: { name: 'FAB', icon: '➕' },
  themectrl: { name: 'ThemeController', icon: '🎨' },
  carousel: { name: 'Carousel', icon: '🎠' },
  calendar: { name: 'Calendar', icon: '📅' },
  aura: { name: 'Aura', icon: '✨' },
  mask: { name: 'Mask', icon: '🎭' },
}

const sidebar = {
  view() {
    return m('div', { style: 'width: 240px; min-height: 100vh; background: var(--color-base-200); padding: 1rem; position: fixed; left: 0; top: 0; overflow-y: auto;' }, [
      m('h2', { style: 'font-size: 1.25rem; font-weight: bold; margin-bottom: 1rem; padding-bottom: 0.5rem; border-bottom: 1px solid var(--color-base-300);' }, 'panda-ui'),
      m('p', { style: 'font-size: 0.75rem; color: var(--color-base-content); opacity: 0.6; margin-bottom: 1rem;' }, 'Mithril.js + Panda CSS'),
      m('div', { style: 'display: flex; flex-direction: column; gap: 0.25rem;' },
        Object.entries(components).map(([key, comp]) =>
          m('a', {
            key,
            href: `#${key}`,
            onclick: (e) => {
              e.preventDefault()
              m.route.set(`/${key}`)
            },
            style: `display: flex; align-items: center; gap: 0.5rem; padding: 0.375rem 0.5rem; border-radius: 0.375rem; font-size: 0.875rem; cursor: pointer; text-decoration: none; color: var(--color-base-content); ${m.route.get() === `/${key}` ? 'background: var(--color-primary); color: white;' : ''}`,
          }, [
            m('span', comp.icon),
            m('span', comp.name),
          ])
        )
      ),
    ])
  }
}

// Demo pages
const demos = {
  button: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Button'),
        m('section', null, [
          m('h3', { style: 'font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;' }, 'Colors'),
          m('div', { style: 'display: flex; gap: 0.5rem; flex-wrap: wrap;' }, [
            m(Button, { color: 'neutral' }, 'Neutral'),
            m(Button, { color: 'primary' }, 'Primary'),
            m(Button, { color: 'secondary' }, 'Secondary'),
            m(Button, { color: 'accent' }, 'Accent'),
            m(Button, { color: 'info' }, 'Info'),
            m(Button, { color: 'success' }, 'Success'),
            m(Button, { color: 'warning' }, 'Warning'),
            m(Button, { color: 'error' }, 'Error'),
          ]),
        ]),
        m('section', null, [
          m('h3', { style: 'font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;' }, 'Variants'),
          m('div', { style: 'display: flex; gap: 0.5rem; flex-wrap: wrap;' }, [
            m(Button, { variant: 'outline' }, 'Outline'),
            m(Button, { variant: 'dash' }, 'Dash'),
            m(Button, { variant: 'soft' }, 'Soft'),
            m(Button, { variant: 'ghost' }, 'Ghost'),
            m(Button, { variant: 'link' }, 'Link'),
          ]),
        ]),
        m('section', null, [
          m('h3', { style: 'font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;' }, 'Sizes'),
          m('div', { style: 'display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;' }, [
            m(Button, { size: 'xs' }, 'XS'),
            m(Button, { size: 'sm' }, 'SM'),
            m(Button, { size: 'md' }, 'MD'),
            m(Button, { size: 'lg' }, 'LG'),
            m(Button, { size: 'xl' }, 'XL'),
          ]),
        ]),
        m('section', null, [
          m('h3', { style: 'font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;' }, 'Shapes'),
          m('div', { style: 'display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;' }, [
            m(Button, { square: true }, 'Square'),
            m(Button, { circle: true }, 'Circle'),
            m(Button, { wide: true }, 'Wide'),
            m(Button, { block: true }, 'Block'),
          ]),
        ]),
      ])
    }
  },
  badge: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Badge'),
        m('section', null, [
          m('h3', { style: 'font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;' }, 'Colors'),
          m('div', { style: 'display: flex; gap: 0.5rem; flex-wrap: wrap;' }, [
            m(Badge, { color: 'neutral' }, 'Neutral'),
            m(Badge, { color: 'primary' }, 'Primary'),
            m(Badge, { color: 'secondary' }, 'Secondary'),
            m(Badge, { color: 'accent' }, 'Accent'),
            m(Badge, { color: 'info' }, 'Info'),
            m(Badge, { color: 'success' }, 'Success'),
            m(Badge, { color: 'warning' }, 'Warning'),
            m(Badge, { color: 'error' }, 'Error'),
          ]),
        ]),
        m('section', null, [
          m('h3', { style: 'font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;' }, 'Variants'),
          m('div', { style: 'display: flex; gap: 0.5rem; flex-wrap: wrap;' }, [
            m(Badge, { variant: 'outline' }, 'Outline'),
            m(Badge, { variant: 'dash' }, 'Dash'),
            m(Badge, { variant: 'ghost' }, 'Ghost'),
          ]),
        ]),
      ])
    }
  },
  alert: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Alert'),
        m(Alert, { color: 'info' }, 'Info alert message'),
        m(Alert, { color: 'success' }, 'Success alert message'),
        m(Alert, { color: 'warning' }, 'Warning alert message'),
        m(Alert, { color: 'error' }, 'Error alert message'),
        m(Alert, { variant: 'outline', color: 'info' }, 'Outline info'),
        m(Alert, { variant: 'dash', color: 'success' }, 'Dash success'),
      ])
    }
  },
  card: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Card'),
        m(Card, { border: true }, [
          m(CardBody, null, [
            m(CardTitle, null, 'Card Title'),
            m('p', null, 'This is a card with a border and some content inside.'),
            m(CardActions, { justify: 'end' }, [
              m(Button, { color: 'primary', size: 'sm' }, 'Action'),
            ]),
          ]),
        ]),
        m(Card, { side: true, className: 'bg-base-100 shadow-xl' }, [
          m('figure', null, [
            m('img', { src: 'https://picsum.photos/200/200', alt: 'Card', style: 'width: 200px; height: 200px; object-fit: cover;' }),
          ]),
          m(CardBody, null, [
            m(CardTitle, null, 'Side Card'),
            m('p', null, 'Card with side layout.'),
          ]),
        ]),
      ])
    }
  },
  input: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'TextInput'),
        m(TextInput, { placeholder: 'Enter text...' }),
        m(TextInput, { color: 'primary', placeholder: 'Primary input' }),
        m(TextInput, { color: 'error', placeholder: 'Error input' }),
        m('h3', { style: 'font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;' }, 'Sizes'),
        m(TextInput, { size: 'xs', placeholder: 'XS' }),
        m(TextInput, { size: 'sm', placeholder: 'SM' }),
        m(TextInput, { size: 'md', placeholder: 'MD' }),
        m(TextInput, { size: 'lg', placeholder: 'LG' }),
        m(TextInput, { size: 'xl', placeholder: 'XL' }),
      ])
    }
  },
  tabs: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Tabs'),
        m(Tabs, { boxed: true }, [
          m(Tab, { active: true }, 'Tab 1'),
          m(Tab, null, 'Tab 2'),
          m(Tab, null, 'Tab 3'),
        ]),
        m(Tabs, null, [
          m(Tab, { active: true }, 'Border'),
          m(Tab, null, 'Tab 2'),
        ]),
        m(Tabs, { lifted: true }, [
          m(Tab, { active: true }, 'Lifted'),
          m(Tab, null, 'Tab 2'),
        ]),
      ])
    }
  },
  avatar: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Avatar'),
        m('div', { style: 'display: flex; gap: 1rem; flex-wrap: wrap;' }, [
          m(Avatar, { src: 'https://i.pravatar.cc/150?u=1', size: 'xs' }),
          m(Avatar, { src: 'https://i.pravatar.cc/150?u=2', size: 'sm' }),
          m(Avatar, { src: 'https://i.pravatar.cc/150?u=3', size: 'md' }),
          m(Avatar, { src: 'https://i.pravatar.cc/150?u=4', size: 'lg' }),
          m(Avatar, { src: 'https://i.pravatar.cc/150?u=5', size: 'xl' }),
        ]),
        m('h3', { style: 'font-size: 1rem; font-weight: 600; margin-bottom: 0.5rem;' }, 'Group'),
        m(AvatarGroup, null, [
          m(Avatar, { src: 'https://i.pravatar.cc/150?u=1' }),
          m(Avatar, { src: 'https://i.pravatar.cc/150?u=2' }),
          m(Avatar, { src: 'https://i.pravatar.cc/150?u=3' }),
          m(Avatar, { src: 'https://i.pravatar.cc/150?u=4' }),
        ]),
      ])
    }
  },
  loading: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Loading'),
        m('div', { style: 'display: flex; gap: 2rem; align-items: center;' }, [
          m(Loading, { variant: 'spinner' }),
          m(Loading, { variant: 'ring' }),
          m(Loading, { variant: 'ball' }),
          m(Loading, { variant: 'bars' }),
          m(Loading, { variant: 'infinity' }),
        ]),
      ])
    }
  },
  progress: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Progress'),
        m(Progress, { value: 0, max: 100 }),
        m(Progress, { value: 25, max: 100, color: 'primary' }),
        m(Progress, { value: 50, max: 100, color: 'secondary' }),
        m(Progress, { value: 75, max: 100, color: 'accent' }),
        m(Progress, { value: 100, max: 100, color: 'success' }),
      ])
    }
  },
  kbd: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Kbd'),
        m('div', { style: 'display: flex; gap: 0.5rem; align-items: center;' }, [
          m(Kbd, { size: 'xs' }, 'K'),
          m(Kbd, { size: 'sm' }, 'Shift'),
          m(Kbd, { size: 'md' }, 'Enter'),
          m(Kbd, { size: 'lg' }, 'Ctrl'),
          m(Kbd, { size: 'xl' }, 'Space'),
        ]),
      ])
    }
  },
  link: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Link'),
        m('div', { style: 'display: flex; gap: 1rem;' }, [
          m(Link, { href: '#' }, 'Default'),
          m(Link, { href: '#', color: 'primary' }, 'Primary'),
          m(Link, { href: '#', color: 'secondary' }, 'Secondary'),
          m(Link, { href: '#', color: 'accent' }, 'Accent'),
        ]),
      ])
    }
  },
  divider: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Divider'),
        m(Divider, null, 'OR'),
        m(Divider, { color: 'primary' }, 'Primary'),
        m(Divider, { color: 'success' }, 'Success'),
      ])
    }
  },
  skeleton: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Skeleton'),
        m('div', { style: 'width: 200px;' }, [
          m(Skeleton, { className: 'h-32 w-full' }),
          m(Skeleton, { className: 'h-4 w-full mt-4' }),
          m(Skeleton, { className: 'h-4 w-3/4 mt-2' }),
        ]),
      ])
    }
  },
  table: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Table'),
        m(TableContainer, null, [
          m(Table, { zebra: true }, [
            m(TableThead, null,
              m(TableRow, null, [
                m(TableHead, null, 'Name'),
                m(TableHead, null, 'Job'),
                m(TableHead, null, 'Favorite Color'),
              ])
            ),
            m(TableTbody, null, [
              m(TableRow, null, [
                m(TableCell, null, 'Cy Ganderton'),
                m(TableCell, null, 'Lead Developer'),
                m(TableCell, null, 'Blue'),
              ]),
              m(TableRow, null, [
                m(TableCell, null, 'Hart Hagerty'),
                m(TableCell, null, 'Designer'),
                m(TableCell, null, 'Purple'),
              ]),
            ]),
          ]),
        ]),
      ])
    }
  },
  steps: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Steps'),
        m(Steps, null, [
          m(Step, { primary: true }, 'Register'),
          m(Step, { primary: true }, 'Choose Plan'),
          m(Step, null, 'Purchase'),
          m(Step, null, 'Receive'),
        ]),
      ])
    }
  },
  toast: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Toast'),
        m(Toast, { position: 'bottom end' }, [
          m(Alert, { color: 'info' }, 'Toast notification!'),
        ]),
      ])
    }
  },
  indicator: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Indicator'),
        m(Indicator, { position: 'end top' }, [
          m(BadgeComp, { color: 'secondary', className: 'indicator-item' }, 'New'),
          m(Button, null, 'Main content'),
        ]),
      ])
    }
  },
  stat: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Stat'),
        m(Stats, null, [
          m(Stat, null, [
            m(StatTitle, null, 'Total Downloads'),
            m(StatValue, null, '31K'),
            m(StatDesc, null, 'From January 1 - February 1'),
          ]),
          m(Stat, null, [
            m(StatTitle, null, 'New Users'),
            m(StatValue, { color: 'secondary' }, '4,200'),
            m(StatDesc, null, '42% more than last month'),
          ]),
        ]),
      ])
    }
  },
  menu: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Menu'),
        m(Menu, null, [
          m(MenuItem, { active: true }, 'Dashboard'),
          m(MenuItem, null, 'Settings'),
          m(MenuTitle, null, 'Actions'),
          m(MenuItem, null, 'Profile'),
          m(MenuItem, null, 'Logout'),
        ]),
      ])
    }
  },
  list: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'List'),
        m(List, null, [
          m(ListRow, null, [
            m('div', null, 'Title 1'),
            m('div', null, 'Description 1'),
          ]),
          m(ListRow, null, [
            m('div', null, 'Title 2'),
            m('div', null, 'Description 2'),
          ]),
        ]),
      ])
    }
  },
  timeline: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Timeline'),
        m(Timeline, null, [
          m(TimelineItem, null, [
            m(TimelineStart, null, 'January 2024'),
            m(TimelineMiddle, null, m('div', { className: 'w-4 h-4 rounded-full bg-primary' })),
            m(TimelineEnd, null, 'First milestone'),
          ]),
          m(TimelineItem, null, [
            m(TimelineStart, null, 'March 2024'),
            m(TimelineMiddle, null, m('div', { className: 'w-4 h-4 rounded-full bg-secondary' })),
            m(TimelineEnd, null, 'Second milestone'),
          ]),
        ]),
      ])
    }
  },
  tooltip: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Tooltip'),
        m('div', { style: 'display: flex; gap: 1rem;' }, [
          m(Tooltip, { tip: 'Top tooltip', position: 'top' }, m(Button, null, 'Top')),
          m(Tooltip, { tip: 'Bottom tooltip', position: 'bottom' }, m(Button, null, 'Bottom')),
          m(Tooltip, { tip: 'Left tooltip', position: 'left' }, m(Button, null, 'Left')),
          m(Tooltip, { tip: 'Right tooltip', position: 'right' }, m(Button, null, 'Right')),
        ]),
      ])
    }
  },
  hero: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Hero'),
        m(Hero, { className: 'bg-base-200 min-h-[200px] rounded-box' }, [
          m(HeroContent, { className: 'text-center' }, [
            m('h1', { className: 'text-5xl font-bold' }, 'Hello there'),
            m('p', { className: 'py-6' }, 'Provident cupiditate voluptatem esse. Quam aut harum voluptatum.'),
            m(Button, { color: 'primary' }, 'Get Started'),
          ]),
        ]),
      ])
    }
  },
  footer: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Footer'),
        m(FooterComp, { center: true, className: 'bg-base-200 p-4' }, [
          m(FooterTitle, null, 'panda-ui-mithril'),
          m('div', { className: 'grid grid-flow-col gap-4' }, [
            m(Link, { href: '#' }, 'GitHub'),
            m(Link, { href: '#' }, 'npm'),
            m(Link, { href: '#' }, 'Docs'),
          ]),
        ]),
      ])
    }
  },
  navbar: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Navbar'),
        m(Navbar, { className: 'bg-base-200' }, [
          m(NavbarStart, null, m(Button, { variant: 'ghost', size: 'sm' }, 'panda-ui')),
          m(NavbarCenter, null, m(Button, { variant: 'ghost', size: 'sm' }, 'Home')),
          m(NavbarEnd, null, m(Button, { color: 'primary', size: 'sm' }, 'Get Started')),
        ]),
      ])
    }
  },
  accordion: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Accordion'),
        m(Accordion, { arrow: true }, [
          m(AccordionTitle, null, 'First item'),
          m(AccordionContent, null, 'Content for the first accordion item.'),
        ]),
        m(Accordion, { plus: true }, [
          m(AccordionTitle, null, 'Second item'),
          m(AccordionContent, null, 'Content for the second accordion item.'),
        ]),
      ])
    }
  },
  status: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Status'),
        m('div', { style: 'display: flex; gap: 1rem; align-items: center;' }, [
          m(Status, { color: 'primary' }),
          m(Status, { color: 'secondary' }),
          m(Status, { color: 'accent' }),
          m(Status, { color: 'info' }),
          m(Status, { color: 'success' }),
          m(Status, { color: 'warning' }),
          m(Status, { color: 'error' }),
        ]),
      ])
    }
  },
  range: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Range'),
        m(Range, { value: 40, max: 100 }),
        m(Range, { value: 60, max: 100, color: 'primary' }),
        m(Range, { value: 80, max: 100, color: 'secondary' }),
      ])
    }
  },
  fileinput: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'FileInput'),
        m(FileInput, null),
        m(FileInput, { color: 'primary' }),
        m(FileInput, { color: 'secondary' }),
      ])
    }
  },
  otp: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'OTP'),
        m(OTP, { length: 4 }),
        m(OTP, { length: 6, color: 'primary' }),
      ])
    }
  },
  join: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Join'),
        m(Join, null, [
          m(JoinItem, null, 'Button 1'),
          m(JoinItem, null, 'Button 2'),
          m(JoinItem, null, 'Button 3'),
        ]),
      ])
    }
  },
  pagination: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Pagination'),
        m(Pagination, null, [
          m(PaginationButton, null, '1'),
          m(PaginationButton, { active: true }, '2'),
          m(PaginationButton, null, '3'),
        ]),
      ])
    }
  },
  swap: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Swap'),
        m(Swap, { on: '🌞', off: '🌜', style: 'rotate' }),
      ])
    }
  },
  rating: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Rating'),
        m(Rating, { value: 3, max: 5 }),
        m(Rating, { value: 4, max: 5, size: 'lg' }),
      ])
    }
  },
  mask: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Mask'),
        m('div', { style: 'display: flex; gap: 1rem;' }, [
          m(Mask, { src: 'https://picsum.photos/100/100', shape: 'circle', className: 'w-20 h-20' }),
          m(Mask, { src: 'https://picsum.photos/100/100', shape: 'hexagon', className: 'w-20 h-20' }),
          m(Mask, { src: 'https://picsum.photos/100/100', shape: 'diamond', className: 'w-20 h-20' }),
          m(Mask, { src: 'https://picsum.photos/100/100', shape: 'triangle', className: 'w-20 h-20' }),
          m(Mask, { src: 'https://picsum.photos/100/100', shape: 'star', className: 'w-20 h-20' }),
        ]),
      ])
    }
  },
  countdown: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Countdown'),
        m(Countdown, { value: 7 }),
      ])
    }
  },
  radialprogress: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'RadialProgress'),
        m('div', { style: 'display: flex; gap: 2rem;' }, [
          m(RadialProgress, { value: 0 }, '0%'),
          m(RadialProgress, { value: 25 }, '25%'),
          m(RadialProgress, { value: 50 }, '50%'),
          m(RadialProgress, { value: 75 }, '75%'),
          m(RadialProgress, { value: 100 }, '100%'),
        ]),
      ])
    }
  },
  chat: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Chat'),
        m(Chat, { placement: 'start' }, [
          m(ChatImage, null, m(Avatar, { src: 'https://i.pravatar.cc/150?u=1' })),
          m(ChatHeader, null, 'John'),
          m(ChatBubble, null, 'Hey! How are you?'),
          m(ChatFooter, null, 'Just now'),
        ]),
        m(Chat, { placement: 'end' }, [
          m(ChatBubble, { color: 'primary' }, 'I am good, thanks!'),
          m(ChatFooter, null, '2 minutes ago'),
        ]),
      ])
    }
  },
  fieldset: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Fieldset'),
        m(Fieldset, { legend: 'Personal Information' }, [
          m(TextInput, { placeholder: 'Name' }),
          m(TextInput, { placeholder: 'Email' }),
        ]),
      ])
    }
  },
  label: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Label'),
        m(Label, null, 'Regular Label'),
        m(Label, { floating: true }, [
          m(TextInput, { placeholder: 'Type here...' }),
          m('span', null, 'Floating Label'),
        ]),
      ])
    }
  },
  diff: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Diff'),
        m(Diff, { className: 'aspect-16/9 h-64' }, [
          m(DiffItem1, null, m('img', { src: 'https://picsum.photos/400/300?random=1', alt: 'Before' })),
          m(DiffItem2, null, m('img', { src: 'https://picsum.photos/400/300?random=2', alt: 'After' })),
          m(DiffResizer, null),
        ]),
      ])
    }
  },
  filter: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Filter'),
        m(Filter, null, [
          m(FilterReset, { value: 'x' }),
          m('input', { type: 'radio', className: 'btn', name: 'filter', 'aria-label': 'All' }),
          m('input', { type: 'radio', className: 'btn', name: 'filter', 'aria-label': 'Active' }),
          m('input', { type: 'radio', className: 'btn', name: 'filter', 'aria-label': 'Inactive' }),
        ]),
      ])
    }
  },
  swap: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Swap'),
        m('div', { style: 'display: flex; gap: 2rem;' }, [
          m(Swap, { on: '🌞', off: '🌜', style: 'rotate', active: true }),
          m(Swap, { on: '☀️', off: '🌙', style: 'flip' }),
        ]),
      ])
    }
  },
  themecontroller: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'ThemeController'),
        m(ThemeController, { value: 'dark', className: 'toggle' }),
      ])
    }
  },
  carousel: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Carousel'),
        m(Carousel, { className: 'w-full' }, [
          m(CarouselItem, null, m('img', { src: 'https://picsum.photos/300/200?random=1', className: 'rounded-box w-full' })),
          m(CarouselItem, null, m('img', { src: 'https://picsum.photos/300/200?random=2', className: 'rounded-box w-full' })),
          m(CarouselItem, null, m('img', { src: 'https://picsum.photos/300/200?random=3', className: 'rounded-box w-full' })),
        ]),
      ])
    }
  },
  aura: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Aura'),
        m('div', { style: 'display: flex; gap: 2rem; align-items: center;' }, [
          m(Aura, { size: 'sm', color: 'primary' }),
          m(Aura, { size: 'md', color: 'secondary', pulse: true }),
          m(Aura, { size: 'lg', color: 'accent' }),
          m(Aura, { size: 'md', color: 'success', pulse: true }),
          m(Aura, { size: 'md', color: 'error' }),
        ]),
      ])
    }
  },
  megamenu: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Megamenu'),
        m(Megamenu, null, [
          m(MegamenuActive, null),
          m('div', { className: 'grid grid-cols-3 gap-4' }, [
            m('div', null, m('h3', { className: 'font-bold' }, 'Category 1')),
            m('div', null, m('h3', { className: 'font-bold' }, 'Category 2')),
            m('div', null, m('h3', { className: 'font-bold' }, 'Category 3')),
          ]),
        ]),
      ])
    }
  },
  fab: {
    view() {
      return m('div', { style: 'display: flex; flex-direction: column; gap: 2rem;' }, [
        m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'FAB'),
        m(FAB, null, [
          m(FABMain, null, m(Button, { color: 'primary', circle: true, size: 'lg' }, '+')),
          m(FABAction, { label: 'Add' }, m(Button, { circle: true, size: 'lg' }, 'A')),
          m(FABAction, { label: 'Edit' }, m(Button, { circle: true, size: 'lg' }, 'B')),
        ]),
      ])
    }
  },
}

// Default fallback for missing demos
const defaultDemo = {
  view() {
    return m('div', { style: 'padding: 2rem;' }, [
      m('h1', { style: 'font-size: 1.5rem; font-weight: bold;' }, 'Component Demo'),
      m('p', null, 'Demo coming soon...'),
    ])
  }
}

const App = {
  view() {
    const route = m.route.get()
    const componentKey = route.replace('/', '')
    const Demo = demos[componentKey] || defaultDemo

    return m('div', { style: 'display: flex; min-height: 100vh;' }, [
      m(sidebar),
      m('main', { style: 'flex: 1; margin-left: 240px; padding: 2rem;' }, [
        m(Demo),
      ]),
    ])
  }
}

m.route.prefix = '#'
m.route(document.getElementById('app'), '/button', {
  '/:component...': {
    render() {
      return m(App)
    }
  }
})
