import { defineSlotRecipe } from '@pandacss/dev'

export const dropdownRecipe = defineSlotRecipe({
  className: 'dropdown',
  slots: ['dropdown', 'trigger', 'content'],
  base: {
    dropdown: {
      position: 'relative',
      display: 'inline-block',
    },
    trigger: {},
    content: {
      position: 'absolute',
      zIndex: '20',
      // max-content: el panel siempre toma el ancho natural de su contenido,
      // sin comprimirse por el "available space" del containing block (root
      // inline-block). Con `width` (xs..xl) se fija un ancho explícito que
      // sobreescribe este valor. 90vw es solo un tope de seguridad en móviles.
      width: 'max-content',
      maxWidth: '90vw',
      padding: 'token(spacing.2)',
      borderWidth: 'var(--border, 1px)',
      borderStyle: 'solid',
      borderColor: 'base-300',
      borderRadius: 'var(--radius-box)',
      backgroundColor: 'base-100',
      boxShadow: '0 10px 25px color-mix(in oklab, black 20%, transparent)',
      opacity: '0',
      visibility: 'hidden',
      // Las propiedades individuales translate/scale se suman a `transform`
      // (usada solo para el centrado por placement), sin pisarse.
      translate: '0 -0.5rem',
      scale: '0.98',
      pointerEvents: 'none',
      transitionProperty: 'opacity, translate, scale, visibility',
      transitionDuration: '0.2s',
      transitionTimingFunction: 'ease-out',
    },
  },
  variants: {
    // El panel se posiciona respecto al trigger. El eje (bottom/top/left/right)
    // es la dirección de apertura; la alineación (start/center/end) ajusta el
    // otro eje. Default: abajo alineado al inicio (borde izquierdo del trigger).
    placement: {
      'bottom-start': { content: { top: 'calc(100% + var(--dropdown-offset, 0.5rem))', insetInlineStart: '0' } },
      'bottom-center': { content: { top: 'calc(100% + var(--dropdown-offset, 0.5rem))', insetInlineStart: '50%', transform: 'translateX(-50%)' } },
      'bottom-end': { content: { top: 'calc(100% + var(--dropdown-offset, 0.5rem))', insetInlineEnd: '0' } },
      'top-start': { content: { bottom: 'calc(100% + var(--dropdown-offset, 0.5rem))', insetInlineStart: '0' } },
      'top-center': { content: { bottom: 'calc(100% + var(--dropdown-offset, 0.5rem))', insetInlineStart: '50%', transform: 'translateX(-50%)' } },
      'top-end': { content: { bottom: 'calc(100% + var(--dropdown-offset, 0.5rem))', insetInlineEnd: '0' } },
      'left-start': { content: { insetInlineEnd: 'calc(100% + var(--dropdown-offset, 0.5rem))', top: '0' } },
      'left-center': { content: { insetInlineEnd: 'calc(100% + var(--dropdown-offset, 0.5rem))', top: '50%', transform: 'translateY(-50%)' } },
      'left-end': { content: { insetInlineEnd: 'calc(100% + var(--dropdown-offset, 0.5rem))', bottom: '0' } },
      'right-start': { content: { insetInlineStart: 'calc(100% + var(--dropdown-offset, 0.5rem))', top: '0' } },
      'right-center': { content: { insetInlineStart: 'calc(100% + var(--dropdown-offset, 0.5rem))', top: '50%', transform: 'translateY(-50%)' } },
      'right-end': { content: { insetInlineStart: 'calc(100% + var(--dropdown-offset, 0.5rem))', bottom: '0' } },
    },
    // Abierto: el panel pasa a visible. La clase se aplica al slot `dropdown`
    // (`.dropdown-open`), que activa el content con el selector descendente.
    open: {
      true: {
        dropdown: {
          '& .dropdown-content': {
            opacity: '1',
            visibility: 'visible',
            translate: '0 0',
            scale: '1',
            pointerEvents: 'auto',
          },
        },
      },
    },
    // Separación entre el panel y el trigger (--dropdown-offset).
    offset: {
      xs: { dropdown: { '--dropdown-offset': 'token(spacing.1)' } },
      sm: { dropdown: { '--dropdown-offset': 'token(spacing.2)' } },
      md: { dropdown: { '--dropdown-offset': 'token(spacing.3)' } },
      lg: { dropdown: { '--dropdown-offset': 'token(spacing.4)' } },
      xl: { dropdown: { '--dropdown-offset': 'token(spacing.5)' } },
    },
    // Ancho del panel. Sin `width` el panel se ajusta al contenido y el menú
    // interno conserva su ancho natural (fit-content, sin cortes de texto);
    // con xs..xl se fija un ancho explícito (12rem..20rem) y el menú llena
    // el panel con sus items estirados (alignItems: stretch del recipe Menu).
    width: {
      xs: { content: { width: 'token(spacing.48)', '& > .menu': { width: '100%' } } },
      sm: { content: { width: 'token(spacing.56)', '& > .menu': { width: '100%' } } },
      md: { content: { width: 'token(spacing.64)', '& > .menu': { width: '100%' } } },
      lg: { content: { width: 'token(spacing.72)', '& > .menu': { width: '100%' } } },
      xl: { content: { width: 'token(spacing.80)', '& > .menu': { width: '100%' } } },
    },
  },
  defaultVariants: {
    placement: 'bottom-start',
    offset: 'sm',
  },
})
