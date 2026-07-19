import m from 'mithril'
import { cva } from '../../styled-system/css'
import { cx } from '../../utils/cx'

const calendarStyles = cva({
  base: {
    display: 'block',
  },
})

export const Calendar = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs

    return m('div', {
      className: cx('calendar', calendarStyles(), className),
      ...rest
    }, children)
  }
}

export const CalendarDate = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('calendar-date', className), ...rest }, children)
  }
}

export const CalendarMonth = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('calendar-month', className), ...rest }, children)
  }
}

export const CalendarHeader = {
  view(vnode) {
    const { className, children, ...rest } = vnode.attrs
    return m('div', { className: cx('calendar-header', className), ...rest }, children)
  }
}
