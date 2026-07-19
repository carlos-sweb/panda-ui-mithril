import { cva } from '../../styled-system/css'

export const listStyles = cva({
  base: {
    display: 'flex',
    flexDirection: 'column',
    // @ts-ignore - listStyle not in Panda types
    list: 'none',
    p: '0',
    m: '0',
  },
})
