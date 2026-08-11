import { cva } from '../../styled-system/css'

export const titleStyles = cva({
  base: {
    fontFamily: 'inherit',
    lineHeight: '1.25',
    color: 'var(--title-color, inherit)',
  },
  variants: {
    size: {
      '1': { fontSize: 'token(fontSizes.5xl)', fontWeight: '800', lineHeight: '1.15' },
      '2': { fontSize: 'token(fontSizes.4xl)', fontWeight: '700', lineHeight: '1.2' },
      '3': { fontSize: 'token(fontSizes.3xl)', fontWeight: '600', lineHeight: '1.25' },
      '4': { fontSize: 'token(fontSizes.2xl)', fontWeight: '500', lineHeight: '1.3' },
      '5': { fontSize: 'token(fontSizes.xl)', fontWeight: '400' },
      '6': { fontSize: 'token(fontSizes.md)', fontWeight: '400' },
      '7': { fontSize: 'token(fontSizes.xs)', fontWeight: '400' },
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
      light: { fontWeight: '300' },
      normal: {},
      medium: { fontWeight: '500' },
      semibold: { fontWeight: '600' },
      bold: { fontWeight: '700' },
      extrabold: { fontWeight: '800' },
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
