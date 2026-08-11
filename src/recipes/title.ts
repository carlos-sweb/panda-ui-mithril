import { cva } from '../../styled-system/css'

export const titleStyles = cva({
  base: {
    fontFamily: 'inherit',
    lineHeight: 'token(lineHeights.tight)',
    color: 'var(--title-color, inherit)',
  },
  variants: {
    size: {
      '1': { fontSize: 'token(fontSizes.5xl)', fontWeight: 'token(fontWeights.extrabold)', lineHeight: '1.15' },
      '2': { fontSize: 'token(fontSizes.4xl)', fontWeight: 'token(fontWeights.bold)', lineHeight: '1.2' },
      '3': { fontSize: 'token(fontSizes.3xl)', fontWeight: 'token(fontWeights.semibold)', lineHeight: 'token(lineHeights.tight)' },
      '4': { fontSize: 'token(fontSizes.2xl)', fontWeight: 'token(fontWeights.medium)', lineHeight: '1.3' },
      '5': { fontSize: 'token(fontSizes.xl)', fontWeight: 'token(fontWeights.normal)' },
      '6': { fontSize: 'token(fontSizes.md)', fontWeight: 'token(fontWeights.normal)' },
      '7': { fontSize: 'token(fontSizes.xs)', fontWeight: 'token(fontWeights.normal)' },
    },
    color: {
      neutral: { '--title-color': 'token(colors.neutral)' },
      primary: { '--title-color': 'token(colors.primary)' },
      secondary: { '--title-color': 'token(colors.secondary)' },
      accent: { '--title-color': 'token(colors.accent)' },
      info: { '--title-color': 'token(colors.info)' },
      success: { '--title-color': 'token(colors.success)' },
      warning: { '--title-color': 'token(colors.warning)' },
      error: { '--title-color': 'token(colors.error)' },
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
    size: '1' as const,
    align: 'left' as const,
    transform: 'none' as const,
    weight: 'normal' as const,
  },
})
