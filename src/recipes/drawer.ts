import { defineSlotRecipe, defineRecipe } from '@pandacss/dev'

/**
 * Drawer — panel anclado a un borde de la pantalla que se desliza al abrir/cerrar.
 * Mismo mecanismo que Modal (dialog nativo + bridge JS de salida + @starting-style
 * de entrada por posición), pero sin posición "middle": siempre está anclado a
 * start/end (ancho = --drawer-size) o top/bottom (alto = --drawer-size).
 *
 * El tamaño se comunica con la custom property --drawer-size: la variante `size`
 * la define en el slot `drawer` (los presets) y el consumidor puede sobrescribirla
 * con un valor CSS arbitrario (p. ej. size="55%") — el slot `box` solo la consume
 * (width para start/end, height para top/bottom según la variante de posición).
 */
export const drawerRecipe = defineSlotRecipe({
  className: 'drawer',
  slots: ['drawer', 'box', 'action', 'backdrop', 'header', 'body', 'footer'],
  base: {
    drawer: {
      position: 'fixed',
      inset: '0',
      margin: '0',
      padding: '0',
      width: '100%',
      height: '100%',
      maxWidth: 'none',
      maxHeight: 'none',
      border: 'none',
      color: 'inherit',
      backgroundColor: 'transparent',
      overflow: 'clip',
      zIndex: '999',

      '&::backdrop': {
        backgroundColor: 'color-mix(in oklab, black 40%, transparent)',
        backdropFilter: 'blur(2px)',
      },
      // Entrada: @starting-style suministra el estado previo al render y la
      // transición hacia los valores [open] corre en el primer render abierto.
      '&[open]': {
        display: 'grid',
        placeItems: 'center',
        '& > .drawer-box': { opacity: '1' },
        '&::backdrop': { opacity: '1', transition: 'opacity 0.2s ease-out' },
      },
      '@starting-style': {
        '&[open] > .drawer-box': { opacity: '0' },
        '&[open]::backdrop': { opacity: '0' },
      },
      // Estado cerrado sin bridge JS (cierre nativo por ESC) — instantáneo.
      '&:not([open])': {
        '& > .drawer-box': { opacity: '0' },
        '&::backdrop': { opacity: '0' },
      },
      // Salida del panel: la posición sobrescribe el nombre del keyframe.
      // Fallback por defecto (start) — las variantes lo reemplazan.
      '&.drawer-closing > .drawer-box': {
        '@media (prefers-reduced-motion: no-preference)': {
          animation: 'drawer-exit-start 0.2s ease-in forwards',
        },
      },
      '&.drawer-closing::backdrop': {
        '@media (prefers-reduced-motion: no-preference)': {
          animation: 'modal-backdrop-exit 0.2s ease-in forwards',
        },
      },
      '@media (prefers-reduced-motion: reduce)': {
        '& > .drawer-box': { transition: 'none' },
        '&::backdrop': { transition: 'none' },
      },
    },
    box: {
      position: 'relative',
      gridColumnStart: '1',
      gridRowStart: '1',
      display: 'flex',
      flexDirection: 'column',
      backgroundColor: 'base-100',
      boxShadow: '0 25px 50px -12px color-mix(in oklab, black 25%, transparent)',
      transition: 'opacity 0.2s ease-out, transform 0.2s ease-out',
    },
    action: {
      marginTop: 'token(spacing.6)',
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 'token(spacing.2)',
    },
    backdrop: {
      position: 'absolute',
      inset: '0',
      gridColumnStart: '1',
      gridRowStart: '1',
      zIndex: '-1',
      color: 'transparent',
      cursor: 'pointer',
      border: 'none',
      background: 'none',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      gap: 'token(spacing.2)',
      paddingBlock: 'token(spacing.4)',
      paddingInline: 'token(spacing.6)',
      borderBottom: '1px solid token(colors.base-300)',
      fontSize: 'token(fontSizes.lg)',
      fontWeight: 'token(fontWeights.semibold)',
    },
    body: {
      flex: '1',
      minHeight: '0',
      paddingBlock: 'token(spacing.4)',
      paddingInline: 'token(spacing.6)',
      overflowY: 'auto',
    },
    footer: {
      display: 'flex',
      justifyContent: 'flex-end',
      gap: 'token(spacing.2)',
      paddingBlock: 'token(spacing.4)',
      paddingInline: 'token(spacing.6)',
      borderTop: '1px solid token(colors.base-300)',
    },
  },
  variants: {
    position: {
      top: {
        drawer: {
          '&[open]': { alignItems: 'start', justifyItems: 'stretch' },
          '& > .drawer-box': {
            width: '100%',
            height: 'var(--drawer-size, token(spacing.96))',
            borderRadius: '0 0 var(--radius-box) var(--radius-box)',
          },
          // El transform de [open] DEBE ser la identidad: si solo cambiáramos el
          // @starting-style, la transición interpolaría translateY(-100%) → scale(1).
          '&[open] > .drawer-box': { transform: 'translateY(0)' },
          '@starting-style': {
            '&[open] > .drawer-box': { opacity: '0', transform: 'translateY(-100%)' },
          },
          '&.drawer-closing > .drawer-box': {
            '@media (prefers-reduced-motion: no-preference)': {
              animation: 'drawer-exit-top 0.2s ease-in forwards',
            },
          },
        },
      },
      bottom: {
        drawer: {
          '&[open]': { alignItems: 'end', justifyItems: 'stretch' },
          '& > .drawer-box': {
            width: '100%',
            height: 'var(--drawer-size, token(spacing.96))',
            borderRadius: 'var(--radius-box) var(--radius-box) 0 0',
          },
          '&[open] > .drawer-box': { transform: 'translateY(0)' },
          '@starting-style': {
            '&[open] > .drawer-box': { opacity: '0', transform: 'translateY(100%)' },
          },
          '&.drawer-closing > .drawer-box': {
            '@media (prefers-reduced-motion: no-preference)': {
              animation: 'drawer-exit-bottom 0.2s ease-in forwards',
            },
          },
        },
      },
      start: {
        drawer: {
          '&[open]': { justifyItems: 'start', alignItems: 'stretch' },
          '& > .drawer-box': {
            height: '100%',
            width: 'var(--drawer-size, token(spacing.96))',
            borderRadius: '0 var(--radius-box) var(--radius-box) 0',
          },
          '&[open] > .drawer-box': { transform: 'translateX(0)' },
          '@starting-style': {
            '&[open] > .drawer-box': { opacity: '0', transform: 'translateX(-100%)' },
          },
          '&.drawer-closing > .drawer-box': {
            '@media (prefers-reduced-motion: no-preference)': {
              animation: 'drawer-exit-start 0.2s ease-in forwards',
            },
          },
        },
      },
      end: {
        drawer: {
          '&[open]': { justifyItems: 'end', alignItems: 'stretch' },
          '& > .drawer-box': {
            height: '100%',
            width: 'var(--drawer-size, token(spacing.96))',
            borderRadius: 'var(--radius-box) 0 0 var(--radius-box)',
          },
          '&[open] > .drawer-box': { transform: 'translateX(0)' },
          '@starting-style': {
            '&[open] > .drawer-box': { opacity: '0', transform: 'translateX(100%)' },
          },
          '&.drawer-closing > .drawer-box': {
            '@media (prefers-reduced-motion: no-preference)': {
              animation: 'drawer-exit-end 0.2s ease-in forwards',
            },
          },
        },
      },
    },
    // La variante size vive en el slot `drawer` (no `box`): DrawerBox renderiza
    // `drawer({}).box` sin variantes, así que los estilos de variante del slot box
    // serían código muerto — igual que en modal.
    size: {
      xs: { drawer: { '--drawer-size': 'token(spacing.64)' } },   // 16rem
      sm: { drawer: { '--drawer-size': 'token(spacing.80)' } },   // 20rem
      md: { drawer: { '--drawer-size': 'token(spacing.96)' } },   // 24rem
      lg: { drawer: { '--drawer-size': 'token(spacing.128)' } },  // 32rem
      xl: { drawer: { '--drawer-size': 'token(spacing.160)' } },  // 40rem
      full: { drawer: { '--drawer-size': '100%' } },
    },
  },
})

export const drawerCloseButtonRecipe = defineRecipe({
  className: 'btn-close-drawer',
  base: {
    position: 'absolute',
    top: '0.75rem',
    insetInlineEnd: '0.75rem',
    zIndex: '1',
  },
})
