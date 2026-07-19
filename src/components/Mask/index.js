import m from 'mithril'
import { cva } from '../../styled-system/css'
import { cx } from '../../utils/cx'

const maskStyles = cva({
  base: {
    display: 'block',
    objectFit: 'cover',
  },
  variants: {
    shape: {
      squircle: { maskImage: 'url("data:image/svg+xml,%3csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 512 512\'%3e%3cpath d=\'M0 48C0 21.5 21.5 0 48 0h416c26.5 0 48 21.5 48 48v416c0 26.5-21.5 48-48 48H48c-26.5 0-48-21.5-48-48V48z\'/%3e%3c/svg%3e")', maskSize: '100% 100%', maskRepeat: 'no-repeat' },
      heart: { clipPath: 'path("M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z")' },
      hexagon: { clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' },
      circle: { rounded: 'full' },
      diamond: { clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' },
      triangle: { clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' },
      star: { clipPath: 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' },
      decagon: { clipPath: 'polygon(50% 0%, 81% 10%, 100% 35%, 100% 70%, 81% 90%, 50% 100%, 19% 90%, 0% 70%, 0% 35%, 19% 10%)' },
      pentagon: { clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' },
    },
  },
})

export const Mask = {
  view(vnode) {
    const { shape, className, ...rest } = vnode.attrs

    return m('img', {
      className: cx('mask', maskStyles({ shape }), className),
      ...rest
    })
  }
}
