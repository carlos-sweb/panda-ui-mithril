import { cva } from '../../styled-system/css'

export const alertStyles = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '3',
    p: '4',
    fontSize: 'sm',
  },
  variants: {
    variant: {
      outline: { bg: 'transparent', borderWidth: '1px', borderColor: 'currentcolor' },
      dash: { bg: 'transparent', borderWidth: '1px', borderColor: 'currentcolor', borderStyle: 'dashed' },
      soft: {},
    },
    color: {
      info: { bg: 'info', color: 'info-content' },
      success: { bg: 'success', color: 'success-content' },
      warning: { bg: 'warning', color: 'warning-content' },
      error: { bg: 'error', color: 'error-content' },
    },
    direction: {
      horizontal: { flexDirection: 'row' },
      vertical: { flexDirection: 'column' },
    },
  },
})
