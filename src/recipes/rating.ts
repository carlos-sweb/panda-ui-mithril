import { defineSlotRecipe } from '@pandacss/dev'

export const ratingRecipe = defineSlotRecipe({
  className : 'rating',
  slots: ['root', 'star'],
  base: {
    root: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'token(spacing.0.5)',
    },
    star: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 'var(--rating-size)',
      height: 'var(--rating-size)',
      padding: '0',
      border: '0',
      background: 'transparent',
      // fallback keeps the star colored even if the root custom property is absent
      color: 'var(--rating-color, token(colors.warning))',
      cursor: 'pointer',
      '& svg': {
        width: '100%',
        height: '100%',
        strokeWidth: '2',
      },
    },
  },
  variants: {
    size: {
      xs: { root: { '--rating-size': 'token(spacing.4)' } },
      sm: { root: { '--rating-size': 'token(spacing.5)' } },
      md: { root: { '--rating-size': 'token(spacing.6)' } },
      lg: { root: { '--rating-size': 'token(spacing.7)' } },
      xl: { root: { '--rating-size': 'token(spacing.8)' } },
    },
    color: {
      neutral: { root: { '--rating-color': 'token(colors.neutral)' } },
      primary: { root: { '--rating-color': 'token(colors.primary)' } },
      secondary: { root: { '--rating-color': 'token(colors.secondary)' } },
      accent: { root: { '--rating-color': 'token(colors.accent)' } },
      info: { root: { '--rating-color': 'token(colors.info)' } },
      success: { root: { '--rating-color': 'token(colors.success)' } },
      warning: { root: { '--rating-color': 'token(colors.warning)' } },
      error: { root: { '--rating-color': 'token(colors.error)' } },
    },
    state: {
      // La estrella vacía NO reduce opacidad: se dibuja como contorno (stroke 2,
      // fill none) con el MISMO color del fill (currentColor = --rating-color),
      // para que se distinga claramente que está disponible para click/evaluar.
      empty: {},
      full: {},
    },
    readonly: {
      true: { star: { cursor: 'default' } },
      false: { star: { cursor: 'pointer' } },
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'warning',
    readonly: false,
  },
})
