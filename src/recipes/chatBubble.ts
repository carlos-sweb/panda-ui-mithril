import { sva } from '../../styled-system/css'

const maskChat = `url("data:image/svg+xml,%3csvg width='13' height='13' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='M0 11.5004C0 13.0004 2 13.0004 2 13.0004H12H13V0.00036329L12.5 0C12.5 0 11.977 2.09572 11.8581 2.50033C11.6075 3.35237 10.9149 4.22374 9 5.50036C6 7.50036 0 10.0004 0 11.5004Z'/%3e%3c/svg%3e")`

export const chat = sva({
  slots: ['chat', 'bubble'],
  base: {
    chat: {
      display: 'grid',
      gridAutoRows: 'min-content',
      columnGap: 'token(spacing.3)',
      paddingBlock: 'token(spacing.1)',

      '& .chat-header': {
        gridRowStart: '1',
        display: 'flex',
        gap: 'token(spacing.1)',
        fontSize: 'token(fontSizes.xs)',
      },
      '& .chat-footer': {
        gridRowStart: '3',
        display: 'flex',
        gap: 'token(spacing.1)',
        fontSize: 'token(fontSizes.xs)',
      },
      '& .chat-image': {
        gridRow: 'span 2',
        alignSelf: 'end',
      },
    },
    bubble: {
      position: 'relative',
      display: 'block',
      width: 'fit-content',
      paddingInline: 'token(spacing.4)',
      paddingBlock: 'token(spacing.2)',
      borderRadius: 'var(--radius-field)',
      backgroundColor: 'base-300',
      color: 'base-content',
      gridRowEnd: '3',
      minHeight: 'token(spacing.8)',
      minWidth: 'token(spacing.10)',
      maxWidth: '90%',

      '&:before': {
        content: '""',
        position: 'absolute',
        bottom: '0',
        height: 'token(spacing.3)',
        width: 'token(spacing.3)',
        backgroundColor: 'inherit',
        maskImage: maskChat,
        maskRepeat: 'no-repeat',
        maskPosition: '0px -1px',
        maskSize: '0.8125rem',
      },
    },
  },
  variants: {
    placement: {
      start: {
        chat: {
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
      },
      end: {
        chat: {
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
    color: {
      neutral: { bubble: { backgroundColor: 'neutral', color: 'neutral-content' } },
      primary: { bubble: { backgroundColor: 'primary', color: 'primary-content' } },
      secondary: { bubble: { backgroundColor: 'secondary', color: 'secondary-content' } },
      accent: { bubble: { backgroundColor: 'accent', color: 'accent-content' } },
      info: { bubble: { backgroundColor: 'info', color: 'info-content' } },
      success: { bubble: { backgroundColor: 'success', color: 'success-content' } },
      warning: { bubble: { backgroundColor: 'warning', color: 'warning-content' } },
      error: { bubble: { backgroundColor: 'error', color: 'error-content' } },
    },
  },
  defaultVariants: {
    placement: 'start',
  },
})
