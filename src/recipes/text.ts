import { defineRecipe } from '@pandacss/dev'

export const textRecipe = defineRecipe({
  className:'text',
  base: {
    fontFamily: 'inherit',
    lineHeight: 'token(lineHeights.normal)',
    color: 'var(--text-color, inherit)',
  },
  variants: {
    size: {
      xs: { fontSize: 'token(fontSizes.xs)' },
      sm: { fontSize: 'token(fontSizes.sm)' },
      md: { fontSize: 'token(fontSizes.md)' },
      lg: { fontSize: 'token(fontSizes.lg)' },
      xl: { fontSize: 'token(fontSizes.xl)' },
    },
    color: {
      neutral: { '--text-color': 'token(colors.neutral)' },
      primary: { '--text-color': 'token(colors.primary)' },
      secondary: { '--text-color': 'token(colors.secondary)' },
      accent: { '--text-color': 'token(colors.accent)' },
      info: { '--text-color': 'token(colors.info)' },
      success: { '--text-color': 'token(colors.success)' },
      warning: { '--text-color': 'token(colors.warning)' },
      error: { '--text-color': 'token(colors.error)' },
    },
    align: {
      left: { textAlign: 'left' },
      center: { textAlign: 'center' },
      right: { textAlign: 'right' },
      justify: { textAlign: 'justify' },
    },
    transform: {
      none: {},
      capitalize: { textTransform: 'capitalize' },
      uppercase: { textTransform: 'uppercase' },
      lowercase: { textTransform: 'lowercase' },
    },
    weight: {
      light: { fontWeight: 'token(fontWeights.light)' },
      normal: {},
      medium: { fontWeight: 'token(fontWeights.medium)' },
      semibold: { fontWeight: 'token(fontWeights.semibold)' },
      bold: { fontWeight: 'token(fontWeights.bold)' },
      extrabold: { fontWeight: 'token(fontWeights.extrabold)' },
    },
    truncate: {
      true: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
      },
    },
    italic: {
      true: { fontStyle: 'italic' },
    },
  },
  defaultVariants: {
    size: 'md' as const,
    align: 'left' as const,
    transform: 'none' as const,
    weight: 'normal' as const,
  },
})
