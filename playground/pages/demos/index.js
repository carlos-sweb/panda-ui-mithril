import m from 'mithril'
import { css } from '../../../styled-system/css'
import {
  Button, Badge, Alert, Card, CardBody, CardTitle, CardActions,
  TextInput, Textarea, Select, Checkbox, Radio, Toggle, Tabs, Tab,
  Tooltip, Toast, Modal, ModalBox, ModalAction, Navbar, NavbarStart,
  NavbarCenter, NavbarEnd, Hero, HeroContent, Footer, FooterTitle,
  Menu, MenuItem, MenuTitle, Steps, Step, Loading, Skeleton, Divider,
  Progress, Avatar, AvatarGroup, Kbd, Link, List, ListRow,
  Accordion, AccordionTitle, AccordionContent, Table, TableContainer,
  TableRow, TableCell, TableHead, TableThead, TableTbody, Stack,
  Stat, Stats, StatTitle, StatValue, StatDesc, Timeline, TimelineItem,
  TimelineStart, TimelineMiddle, TimelineEnd, Indicator, Status,
  Range, FileInput, OTP, Join, JoinItem, Pagination, PaginationButton,
  Swap, Rating, Mask, Countdown, RadialProgress, Chat, ChatBubble,
  ChatHeader, ChatFooter, ChatImage, Diff, DiffItem1, DiffItem2,
  DiffResizer, Fieldset, Label, Filter, FilterReset, Megamenu,
  MegamenuActive, FAB, FABAction, FABMain, ThemeController,
  Carousel, CarouselItem, Calendar, Aura, Breadcrumbs,
  MenuDropdown, MenuDropdownToggle,
} from '../../../src/index.js'

const section = css({ marginBottom: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const row = css({ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', alignItems: 'center' })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export const demos = {
  button: {
    view() {
      return m('div', { className: stack }, [
        m('section', { className: section }, [
          m('h3', { className: heading }, 'Colors'),
          m('div', { className: row }, [
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
        m('section', { className: section }, [
          m('h3', { className: heading }, 'Variants'),
          m('div', { className: row }, [
            m(Button, { variant: 'outline' }, 'Outline'),
            m(Button, { variant: 'dash' }, 'Dash'),
            m(Button, { variant: 'soft' }, 'Soft'),
            m(Button, { variant: 'ghost' }, 'Ghost'),
            m(Button, { variant: 'link' }, 'Link'),
          ]),
        ]),
        m('section', { className: section }, [
          m('h3', { className: heading }, 'Sizes'),
          m('div', { className: row }, [
            m(Button, { size: 'xs' }, 'XS'),
            m(Button, { size: 'sm' }, 'SM'),
            m(Button, { size: 'md' }, 'MD'),
            m(Button, { size: 'lg' }, 'LG'),
            m(Button, { size: 'xl' }, 'XL'),
          ]),
        ]),
        m('section', { className: section }, [
          m('h3', { className: heading }, 'Shapes'),
          m('div', { className: row }, [
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
      return m('div', { className: stack }, [
        m('section', { className: section }, [
          m('h3', { className: heading }, 'Colors'),
          m('div', { className: row }, [
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
        m('section', { className: section }, [
          m('h3', { className: heading }, 'Variants'),
          m('div', { className: row }, [
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
      return m('div', { className: stack }, [
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
      return m('div', { className: stack }, [
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
      return m('div', { className: stack }, [
        m(TextInput, { placeholder: 'Enter text...' }),
        m(TextInput, { color: 'primary', placeholder: 'Primary input' }),
        m(TextInput, { color: 'error', placeholder: 'Error input' }),
        m('h3', { className: heading }, 'Sizes'),
        m(TextInput, { size: 'xs', placeholder: 'XS' }),
        m(TextInput, { size: 'sm', placeholder: 'SM' }),
        m(TextInput, { size: 'md', placeholder: 'MD' }),
        m(TextInput, { size: 'lg', placeholder: 'LG' }),
        m(TextInput, { size: 'xl', placeholder: 'XL' }),
      ])
    }
  },

  textarea: {
    view() {
      return m('div', { className: stack }, [
        m(Textarea, { placeholder: 'Write something...' }),
        m(Textarea, { color: 'primary', placeholder: 'Primary textarea' }),
      ])
    }
  },

  select: {
    view() {
      return m('div', { className: stack }, [
        m(Select, null, [
          m('option', { value: '' }, 'Pick one'),
          m('option', { value: '1' }, 'Option 1'),
          m('option', { value: '2' }, 'Option 2'),
        ]),
        m(Select, { color: 'primary' }, [
          m('option', { value: '' }, 'Pick one'),
          m('option', { value: '1' }, 'Option 1'),
        ]),
      ])
    }
  },

  checkbox: {
    view() {
      return m('div', { className: stack }, [
        m('div', { className: row }, [
          m(Checkbox, null),
          m(Checkbox, { checked: true }),
          m(Checkbox, { color: 'primary', checked: true }),
          m(Checkbox, { color: 'secondary', checked: true }),
          m(Checkbox, { color: 'accent', checked: true }),
        ]),
        m('h3', { className: heading }, 'Sizes'),
        m('div', { className: row }, [
          m(Checkbox, { size: 'xs', checked: true }),
          m(Checkbox, { size: 'sm', checked: true }),
          m(Checkbox, { size: 'md', checked: true }),
          m(Checkbox, { size: 'lg', checked: true }),
          m(Checkbox, { size: 'xl', checked: true }),
        ]),
      ])
    }
  },

  radio: {
    view() {
      return m('div', { className: stack }, [
        m('div', { className: row }, [
          m(Radio, { name: 'r1', checked: true }),
          m(Radio, { name: 'r1', color: 'primary', checked: true }),
          m(Radio, { name: 'r1', color: 'secondary', checked: true }),
          m(Radio, { name: 'r1', color: 'accent', checked: true }),
        ]),
        m('h3', { className: heading }, 'Sizes'),
        m('div', { className: row }, [
          m(Radio, { name: 'r2', size: 'xs', checked: true }),
          m(Radio, { name: 'r2', size: 'sm', checked: true }),
          m(Radio, { name: 'r2', size: 'md', checked: true }),
          m(Radio, { name: 'r2', size: 'lg', checked: true }),
          m(Radio, { name: 'r2', size: 'xl', checked: true }),
        ]),
      ])
    }
  },

  toggle: {
    view() {
      return m('div', { className: stack }, [
        m('div', { className: row }, [
          m(Toggle, null),
          m(Toggle, { checked: true }),
          m(Toggle, { color: 'primary', checked: true }),
          m(Toggle, { color: 'secondary', checked: true }),
        ]),
      ])
    }
  },

  tabs: {
    view() {
      return m('div', { className: stack }, [
        m('h3', { className: heading }, 'Boxed'),
        m(Tabs, { boxed: true }, [
          m(Tab, { active: true }, 'Tab 1'),
          m(Tab, null, 'Tab 2'),
          m(Tab, null, 'Tab 3'),
        ]),
        m('h3', { className: heading }, 'Border'),
        m(Tabs, null, [
          m(Tab, { active: true }, 'Tab 1'),
          m(Tab, null, 'Tab 2'),
          m(Tab, null, 'Tab 3'),
        ]),
        m('h3', { className: heading }, 'Lifted'),
        m(Tabs, { lifted: true }, [
          m(Tab, { active: true }, 'Tab 1'),
          m(Tab, null, 'Tab 2'),
        ]),
      ])
    }
  },

  tooltip: {
    view() {
      return m('div', { className: row }, [
        m(Tooltip, { tip: 'Top', position: 'top' }, m(Button, null, 'Top')),
        m(Tooltip, { tip: 'Bottom', position: 'bottom' }, m(Button, null, 'Bottom')),
        m(Tooltip, { tip: 'Left', position: 'left' }, m(Button, null, 'Left')),
        m(Tooltip, { tip: 'Right', position: 'right' }, m(Button, null, 'Right')),
      ])
    }
  },

  toast: {
    view() {
      return m('div', { className: stack }, [
        m(Toast, { position: 'bottom end' }, [
          m(Alert, { color: 'info' }, 'Toast notification!'),
        ]),
      ])
    }
  },

  modal: {
    view() {
      return m('div', { className: stack }, [
        m(Button, { onclick: () => document.getElementById('demo_modal').showModal() }, 'Open Modal'),
        m('dialog', { id: 'demo_modal', className: 'modal' }, [
          m('div', { className: 'modal-box' }, [
            m('h3', { className: 'text-lg font-bold' }, 'Hello!'),
            m('p', { className: 'py-4' }, 'This is a modal dialog using the Modal component.'),
            m('div', { className: 'modal-action' }, [
              m('form', { method: 'dialog' }, [
                m(Button, null, 'Close'),
              ]),
            ]),
          ]),
          m('form', { method: 'dialog', className: 'modal-backdrop' }, [
            m('button', null, 'close'),
          ]),
        ]),
      ])
    }
  },

  navbar: {
    view() {
      return m(Navbar, { className: 'bg-base-200 rounded-box' }, [
        m(NavbarStart, null, m(Button, { variant: 'ghost', size: 'sm' }, 'panda-ui')),
        m(NavbarCenter, null, m(Button, { variant: 'ghost', size: 'sm' }, 'Home')),
        m(NavbarEnd, null, m(Button, { color: 'primary', size: 'sm' }, 'Get Started')),
      ])
    }
  },

  hero: {
    view() {
      return m(Hero, { className: 'bg-base-200 min-h-[200px] rounded-box' }, [
        m(HeroContent, { className: 'text-center' }, [
          m('h1', { className: 'text-5xl font-bold' }, 'Hello there'),
          m('p', { className: 'py-6' }, 'Provident cupiditate voluptatem esse. Quam aut harum voluptatum.'),
          m(Button, { color: 'primary' }, 'Get Started'),
        ]),
      ])
    }
  },

  footer: {
    view() {
      return m(Footer, { center: true, className: 'bg-base-200 p-4 rounded-box' }, [
        m(FooterTitle, null, 'panda-ui-mithril'),
        m('div', { className: 'grid grid-flow-col gap-4' }, [
          m(Link, { href: '#' }, 'GitHub'),
          m(Link, { href: '#' }, 'npm'),
          m(Link, { href: '#' }, 'Docs'),
        ]),
      ])
    }
  },

  menu: {
    view() {
      return m(Menu, { className: 'bg-base-200 rounded-box' }, [
        m(MenuItem, { active: true }, 'Dashboard'),
        m(MenuItem, null, 'Settings'),
        m(MenuTitle, null, 'Actions'),
        m(MenuItem, null, 'Profile'),
        m(MenuItem, null, 'Logout'),
      ])
    }
  },

  steps: {
    view() {
      return m(Steps, null, [
        m(Step, { primary: true }, 'Register'),
        m(Step, { primary: true }, 'Choose Plan'),
        m(Step, null, 'Purchase'),
        m(Step, null, 'Receive'),
      ])
    }
  },

  loading: {
    view() {
      return m('div', { className: row }, [
        m(Loading, { variant: 'spinner' }),
        m(Loading, { variant: 'ring' }),
        m(Loading, { variant: 'ball' }),
        m(Loading, { variant: 'bars' }),
        m(Loading, { variant: 'infinity' }),
      ])
    }
  },

  skeleton: {
    view() {
      return m('div', { style: 'width: 250px;' }, [
        m(Skeleton, { className: 'h-32 w-full' }),
        m(Skeleton, { className: 'h-4 w-full mt-4' }),
        m(Skeleton, { className: 'h-4 w-3/4 mt-2' }),
      ])
    }
  },

  divider: {
    view() {
      return m('div', { className: stack }, [
        m(Divider, null, 'OR'),
        m(Divider, { color: 'primary' }, 'Primary'),
        m(Divider, { color: 'success' }, 'Success'),
      ])
    }
  },

  progress: {
    view() {
      return m('div', { className: stack }, [
        m(Progress, { value: 0, max: 100 }),
        m(Progress, { value: 25, max: 100, color: 'primary' }),
        m(Progress, { value: 50, max: 100, color: 'secondary' }),
        m(Progress, { value: 75, max: 100, color: 'accent' }),
        m(Progress, { value: 100, max: 100, color: 'success' }),
      ])
    }
  },

  avatar: {
    view() {
      return m('div', { className: stack }, [
        m('div', { className: row }, [
          m(Avatar, { src: 'https://i.pravatar.cc/150?u=1', size: 'xs' }),
          m(Avatar, { src: 'https://i.pravatar.cc/150?u=2', size: 'sm' }),
          m(Avatar, { src: 'https://i.pravatar.cc/150?u=3', size: 'md' }),
          m(Avatar, { src: 'https://i.pravatar.cc/150?u=4', size: 'lg' }),
          m(Avatar, { src: 'https://i.pravatar.cc/150?u=5', size: 'xl' }),
        ]),
        m('h3', { className: heading }, 'Group'),
        m(AvatarGroup, null, [
          m(Avatar, { src: 'https://i.pravatar.cc/150?u=1' }),
          m(Avatar, { src: 'https://i.pravatar.cc/150?u=2' }),
          m(Avatar, { src: 'https://i.pravatar.cc/150?u=3' }),
          m(Avatar, { src: 'https://i.pravatar.cc/150?u=4' }),
        ]),
      ])
    }
  },

  kbd: {
    view() {
      return m('div', { className: row }, [
        m(Kbd, { size: 'xs' }, 'K'),
        m(Kbd, { size: 'sm' }, 'Shift'),
        m(Kbd, { size: 'md' }, 'Enter'),
        m(Kbd, { size: 'lg' }, 'Ctrl'),
        m(Kbd, { size: 'xl' }, 'Space'),
      ])
    }
  },

  link: {
    view() {
      return m('div', { className: row }, [
        m(Link, { href: '#' }, 'Default'),
        m(Link, { href: '#', color: 'primary' }, 'Primary'),
        m(Link, { href: '#', color: 'secondary' }, 'Secondary'),
        m(Link, { href: '#', color: 'accent' }, 'Accent'),
      ])
    }
  },

  list: {
    view() {
      return m(List, null, [
        m(ListRow, null, [m('div', null, 'Title 1'), m('div', null, 'Description 1')]),
        m(ListRow, null, [m('div', null, 'Title 2'), m('div', null, 'Description 2')]),
        m(ListRow, null, [m('div', null, 'Title 3'), m('div', null, 'Description 3')]),
      ])
    }
  },

  accordion: {
    view() {
      return m('div', { className: stack }, [
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

  table: {
    view() {
      return m(TableContainer, null, [
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
      ])
    }
  },

  stat: {
    view() {
      return m(Stats, null, [
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
      ])
    }
  },

  timeline: {
    view() {
      return m(Timeline, null, [
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
      ])
    }
  },

  indicator: {
    view() {
      return m(Indicator, { position: 'end top' }, [
        m(Badge, { color: 'secondary', className: 'indicator-item' }, 'New'),
        m(Button, null, 'Main content'),
      ])
    }
  },

  status: {
    view() {
      return m('div', { className: row }, [
        m(Status, { color: 'primary' }),
        m(Status, { color: 'secondary' }),
        m(Status, { color: 'accent' }),
        m(Status, { color: 'info' }),
        m(Status, { color: 'success' }),
        m(Status, { color: 'warning' }),
        m(Status, { color: 'error' }),
      ])
    }
  },

  range: {
    view() {
      return m('div', { className: stack }, [
        m(Range, { value: 40, max: 100 }),
        m(Range, { value: 60, max: 100, color: 'primary' }),
        m(Range, { value: 80, max: 100, color: 'secondary' }),
      ])
    }
  },

  fileinput: {
    view() {
      return m('div', { className: stack }, [
        m(FileInput, null),
        m(FileInput, { color: 'primary' }),
        m(FileInput, { color: 'secondary' }),
      ])
    }
  },

  otp: {
    view() {
      return m('div', { className: stack }, [
        m(OTP, { length: 4 }),
        m(OTP, { length: 6, color: 'primary' }),
      ])
    }
  },

  join: {
    view() {
      return m(Join, null, [
        m(JoinItem, null, 'Button 1'),
        m(JoinItem, null, 'Button 2'),
        m(JoinItem, null, 'Button 3'),
      ])
    }
  },

  pagination: {
    view() {
      return m(Pagination, null, [
        m(PaginationButton, null, '1'),
        m(PaginationButton, { active: true }, '2'),
        m(PaginationButton, null, '3'),
      ])
    }
  },

  swap: {
    view() {
      return m('div', { className: row }, [
        m(Swap, { on: 'On', off: 'Off', style: 'rotate', active: true }),
        m(Swap, { on: 'On', off: 'Off', style: 'flip' }),
      ])
    }
  },

  rating: {
    view() {
      return m('div', { className: stack }, [
        m(Rating, { value: 3, max: 5 }),
        m(Rating, { value: 4, max: 5, size: 'lg' }),
      ])
    }
  },

  mask: {
    view() {
      return m('div', { className: row }, [
        m(Mask, { src: 'https://picsum.photos/100/100', shape: 'circle', className: 'w-20 h-20' }),
        m(Mask, { src: 'https://picsum.photos/100/100', shape: 'hexagon', className: 'w-20 h-20' }),
        m(Mask, { src: 'https://picsum.photos/100/100', shape: 'diamond', className: 'w-20 h-20' }),
        m(Mask, { src: 'https://picsum.photos/100/100', shape: 'triangle', className: 'w-20 h-20' }),
        m(Mask, { src: 'https://picsum.photos/100/100', shape: 'star', className: 'w-20 h-20' }),
      ])
    }
  },

  countdown: {
    view() {
      return m(Countdown, { value: 7 })
    }
  },

  radialprogress: {
    view() {
      return m('div', { className: row }, [
        m(RadialProgress, { value: 0 }, '0%'),
        m(RadialProgress, { value: 25 }, '25%'),
        m(RadialProgress, { value: 50 }, '50%'),
        m(RadialProgress, { value: 75 }, '75%'),
        m(RadialProgress, { value: 100 }, '100%'),
      ])
    }
  },

  chat: {
    view() {
      return m('div', { className: stack }, [
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
      return m(Fieldset, { legend: 'Personal Information' }, [
        m(TextInput, { placeholder: 'Name' }),
        m(TextInput, { placeholder: 'Email' }),
      ])
    }
  },

  label: {
    view() {
      return m('div', { className: stack }, [
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
      return m(Diff, { className: 'aspect-16/9 h-64' }, [
        m(DiffItem1, null, m('img', { src: 'https://picsum.photos/400/300?random=1', alt: 'Before' })),
        m(DiffItem2, null, m('img', { src: 'https://picsum.photos/400/300?random=2', alt: 'After' })),
        m(DiffResizer, null),
      ])
    }
  },

  filter: {
    view() {
      return m(Filter, null, [
        m(FilterReset, { value: 'x' }),
        m('input', { type: 'radio', className: 'btn', name: 'filter', 'aria-label': 'All' }),
        m('input', { type: 'radio', className: 'btn', name: 'filter', 'aria-label': 'Active' }),
        m('input', { type: 'radio', className: 'btn', name: 'filter', 'aria-label': 'Inactive' }),
      ])
    }
  },

  themectrl: {
    view() {
      return m(ThemeController, { value: 'dark', className: 'toggle' })
    }
  },

  carousel: {
    view() {
      return m(Carousel, { className: 'w-full' }, [
        m(CarouselItem, null, m('img', { src: 'https://picsum.photos/300/200?random=1', className: 'rounded-box w-full' })),
        m(CarouselItem, null, m('img', { src: 'https://picsum.photos/300/200?random=2', className: 'rounded-box w-full' })),
        m(CarouselItem, null, m('img', { src: 'https://picsum.photos/300/200?random=3', className: 'rounded-box w-full' })),
      ])
    }
  },

  aura: {
    view() {
      return m('div', { className: row }, [
        m(Aura, { size: 'sm', color: 'primary' }),
        m(Aura, { size: 'md', color: 'secondary', pulse: true }),
        m(Aura, { size: 'lg', color: 'accent' }),
        m(Aura, { size: 'md', color: 'success', pulse: true }),
        m(Aura, { size: 'md', color: 'error' }),
      ])
    }
  },

  megamenu: {
    view() {
      return m(Megamenu, null, [
        m(MegamenuActive, null),
        m('div', { className: 'grid grid-cols-3 gap-4' }, [
          m('div', null, m('h3', { className: 'font-bold' }, 'Category 1')),
          m('div', null, m('h3', { className: 'font-bold' }, 'Category 2')),
          m('div', null, m('h3', { className: 'font-bold' }, 'Category 3')),
        ]),
      ])
    }
  },

  fab: {
    view() {
      return m(FAB, null, [
        m(FABMain, null, m(Button, { color: 'primary', circle: true, size: 'lg' }, '+')),
        m(FABAction, { label: 'Add' }, m(Button, { circle: true, size: 'lg' }, 'A')),
        m(FABAction, { label: 'Edit' }, m(Button, { circle: true, size: 'lg' }, 'B')),
      ])
    }
  },

  breadcrumbs: {
    view() {
      return m(Breadcrumbs, {
        items: [
          { label: 'Home', href: '#' },
          { label: 'Docs', href: '#' },
          { label: 'Components' },
        ],
      })
    }
  },

  calendar: {
    view() {
      return m(Calendar, null, [
        m('p', null, 'Calendar component placeholder.'),
      ])
    }
  },
}
