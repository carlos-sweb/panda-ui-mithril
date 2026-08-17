import { defineSlotRecipe } from '@pandacss/dev'

const maskChat = `url("data:image/svg+xml,%3csvg width='13' height='13' xmlns='http://www.w3.org/2000/svg'%3e%3cpath fill='black' d='M0 11.5004C0 13.0004 2 13.0004 2 13.0004H12H13V0.00036329L12.5 0C12.5 0 11.977 2.09572 11.8581 2.50033C11.6075 3.35237 10.9149 4.22374 9 5.50036C6 7.50036 0 10.0004 0 11.5004Z'/%3e%3c/svg%3e")`

export const chatBubbleRecipe = defineSlotRecipe({
  className : 'chat',
  slots: [
    'chat',
    'bubble',
    'window',
    'header',
    'messages',
    'footer',
    'message',
    'reply',
    'reactions',
    'status',
    'audio',
    'video',
    'image',
    'file',
    'link',
    'system',
    'input',
    'typing'
  ],
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
    window: {
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      overflow: 'hidden',
      borderRadius: 'var(--radius-box)',
      border: '1px solid',
      borderColor: 'base-200',
      backgroundColor: 'base-100',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: 'token(spacing.3)',
      padding: 'token(spacing.3) token(spacing.4)',
      borderBottom: '1px solid',
      borderColor: 'base-200',
      backgroundColor: 'base-100',
      flexShrink: 0,
    },
    messages: {
      flex: 1,
      overflowY: 'auto',
      padding: 'token(spacing.4)',
      display: 'flex',
      flexDirection: 'column',
      gap: 'token(spacing.2)',
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
      gap: 'token(spacing.2)',
      padding: 'token(spacing.3) token(spacing.4)',
      borderTop: '1px solid',
      borderColor: 'base-200',
      backgroundColor: 'base-100',
      flexShrink: 0,
    },
    message: {
      display: 'flex',
      flexDirection: 'column',
      maxWidth: '75%',
      gap: 'token(spacing.1)',

      '&[data-placement="start"]': {
        alignSelf: 'flex-start',
      },
      '&[data-placement="end"]': {
        alignSelf: 'flex-end',
      },
    },
    reply: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'token(spacing.1)',
      padding: 'token(spacing.2) token(spacing.3)',
      borderLeft: '3px solid',
      borderColor: 'primary',
      backgroundColor: 'base-200',
      borderRadius: 'token(radii.md)',
      fontSize: 'token(fontSizes.sm)',
      marginBottom: 'token(spacing.1)',
      cursor: 'pointer',

      _hover: {
        backgroundColor: 'base-300',
      },
    },
    reactions: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'token(spacing.1)',
      marginTop: 'token(spacing.1)',
    },
    status: {
      display: 'flex',
      alignItems: 'center',
      gap: 'token(spacing.1)',
      fontSize: 'token(fontSizes.xs)',
      color: 'base-content',
      opacity: 0.6,
    },
    audio: {
      display: 'flex',
      alignItems: 'center',
      gap: 'token(spacing.2)',
      padding: 'token(spacing.2) token(spacing.3)',
      backgroundColor: 'base-200',
      borderRadius: 'token(radii.full)',
      minWidth: '200px',

      '& audio': {
        width: '100%',
        height: '32px',
      },
    },
    video: {
      position: 'relative',
      borderRadius: 'token(radii.md)',
      overflow: 'hidden',
      maxWidth: '300px',

      '& video': {
        width: '100%',
        display: 'block',
      },
    },
    image: {
      position: 'relative',
      borderRadius: 'token(radii.md)',
      overflow: 'hidden',
      maxWidth: '300px',

      '& img': {
        width: '100%',
        display: 'block',
      },

      '& figcaption': {
        padding: 'token(spacing.2) token(spacing.3)',
        fontSize: 'token(fontSizes.sm)',
        backgroundColor: 'base-200',
      },
    },
    file: {
      display: 'flex',
      alignItems: 'center',
      gap: 'token(spacing.3)',
      padding: 'token(spacing.3) token(spacing.4)',
      backgroundColor: 'base-200',
      borderRadius: 'token(radii.md)',
      textDecoration: 'none',
      color: 'inherit',
      transition: 'background-color 0.2s',

      _hover: {
        backgroundColor: 'base-300',
      },
    },
    link: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'token(spacing.1)',
      padding: 'token(spacing.3) token(spacing.4)',
      backgroundColor: 'base-200',
      borderRadius: 'token(radii.md)',
      textDecoration: 'none',
      color: 'inherit',
      border: '1px solid',
      borderColor: 'base-300',
      transition: 'border-color 0.2s',

      _hover: {
        borderColor: 'primary',
      },

      '& img': {
        width: '100%',
        height: '120px',
        objectFit: 'cover',
        borderRadius: 'token(radii.md)',
      },
    },
    system: {
      display: 'flex',
      justifyContent: 'center',
      padding: 'token(spacing.2) token(spacing.4)',
      fontSize: 'token(fontSizes.xs)',
      color: 'base-content',
      opacity: 0.6,
    },
    input: {
      display: 'flex',
      alignItems: 'center',
      gap: 'token(spacing.2)',
      flex: 1,

      '& input': {
        flex: 1,
        padding: 'token(spacing.2) token(spacing.3)',
        borderRadius: 'token(radii.full)',
        border: '1px solid',
        borderColor: 'base-300',
        backgroundColor: 'base-100',
        outline: 'none',

        _focus: {
          borderColor: 'primary',
        },
      },
    },
    typing: {
      display: 'flex',
      alignItems: 'center',
      gap: 'token(spacing.2)',
      padding: 'token(spacing.2) token(spacing.3)',
      fontSize: 'token(fontSizes.sm)',
      color: 'base-content',
      opacity: 0.6,
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
    size: {
      sm: {
        bubble: {
          paddingInline: 'token(spacing.3)',
          paddingBlock: 'token(spacing.1)',
          fontSize: 'token(fontSizes.sm)',
        },
      },
      md: {
        bubble: {
          paddingInline: 'token(spacing.4)',
          paddingBlock: 'token(spacing.2)',
          fontSize: 'token(fontSizes.md)',
        },
      },
      lg: {
        bubble: {
          paddingInline: 'token(spacing.5)',
          paddingBlock: 'token(spacing.3)',
          fontSize: 'token(fontSizes.lg)',
        },
      },
    },
    status: {
      sent: {
        status: {
          color: 'base-content',
        },
      },
      delivered: {
        status: {
          color: 'base-content',
        },
      },
      read: {
        status: {
          color: 'primary',
        },
      },
    },
    grouped: {
      true: {
        chat: {
          paddingTop: 0,
        },
        bubble: {
          borderTopStartRadius: '0',
          borderTopEndRadius: '0',
        },
      },
      false: {
        chat: {
          paddingTop: 'token(spacing.1)',
        },
      },
    },
  },
  defaultVariants: {
    placement: 'start',
    size: 'md',
  },
})
