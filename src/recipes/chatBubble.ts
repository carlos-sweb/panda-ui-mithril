import { cva } from '../../styled-system/css'

const maskChat = `url("data:image/svg+xml,%3csvg width='13' height='13' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='M0 11.5004C0 13.0004 2 13.0004 2 13.0004H12H13V0.00036329L12.5 0C12.5 0 11.977 2.09572 11.8581 2.50033C11.6075 3.35237 10.9149 4.22374 9 5.50036C6 7.50036 0 10.0004 0 11.5004Z'/%3e%3c/svg%3e")`

export const chatStyles = cva({
  base: {
    display: 'grid',
    gridAutoRows: 'min-content',
    columnGap: '0.75rem',
    paddingBlock: '0.25rem',

    '& .chat-header': {
      gridRowStart: '1',
      display: 'flex',
      gap: '0.25rem',
      fontSize: '0.6875rem',
    },
    '& .chat-footer': {
      gridRowStart: '3',
      display: 'flex',
      gap: '0.25rem',
      fontSize: '0.6875rem',
    },
    '& .chat-image': {
      gridRow: 'span 2',
      alignSelf: 'end',
    },
  },
  variants: {
    placement: {
      start: {
        placeItems: 'start',
        gridTemplateColumns: 'auto 1fr',
        '& .chat-header': { gridColumnStart: '2' },
        '& .chat-footer': { gridColumnStart: '2' },
        '& .chat-image': { gridColumnStart: '1' },
        '& .chat-bubble': {
          gridColumnStart: '2',
          borderEndStartRadius: '0',
        },
        '& .chat-bubble:before': {
          transform: 'rotateY(0deg)',
          insetInlineStart: '-0.75rem',
        },
      },
      end: {
        placeItems: 'end',
        gridTemplateColumns: '1fr auto',
        '& .chat-header': { gridColumnStart: '1' },
        '& .chat-footer': { gridColumnStart: '1' },
        '& .chat-image': { gridColumnStart: '2' },
        '& .chat-bubble': {
          gridColumnStart: '1',
          borderEndEndRadius: '0',
        },
        '& .chat-bubble:before': {
          transform: 'rotateY(180deg)',
          insetInlineStart: '100%',
        },
      },
    },
  },
  defaultVariants: {
    placement: 'start',
  },
})

export const chatBubbleStyles = cva({
  base: {
    position: 'relative',
    display: 'block',
    width: 'fit-content',
    paddingInline: '1rem',
    paddingBlock: '0.5rem',
    borderRadius: 'var(--radius-field)',
    backgroundColor: 'var(--colors-base-300)',
    color: 'var(--colors-base-content)',
    gridRowEnd: '3',
    minHeight: '2rem',
    minWidth: '2.5rem',
    maxWidth: '90%',

    '&:before': {
      content: '""',
      position: 'absolute',
      bottom: '0',
      height: '0.75rem',
      width: '0.75rem',
      backgroundColor: 'inherit',
      maskImage: maskChat,
      maskRepeat: 'no-repeat',
      maskPosition: '0px -1px',
      maskSize: '0.8125rem',
    },
  },
  variants: {
    color: {
      neutral: { backgroundColor: 'var(--colors-neutral)', color: 'var(--colors-neutral-content)' },
      primary: { backgroundColor: 'var(--colors-primary)', color: 'var(--colors-primary-content)' },
      secondary: { backgroundColor: 'var(--colors-secondary)', color: 'var(--colors-secondary-content)' },
      accent: { backgroundColor: 'var(--colors-accent)', color: 'var(--colors-accent-content)' },
      info: { backgroundColor: 'var(--colors-info)', color: 'var(--colors-info-content)' },
      success: { backgroundColor: 'var(--colors-success)', color: 'var(--colors-success-content)' },
      warning: { backgroundColor: 'var(--colors-warning)', color: 'var(--colors-warning-content)' },
      error: { backgroundColor: 'var(--colors-error)', color: 'var(--colors-error-content)' },
    },
  },
})
