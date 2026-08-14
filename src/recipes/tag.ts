import { defineRecipe } from '@pandacss/dev'

export const tagRecipe = defineRecipe({
  className:'tag',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'token(spacing.1)',
    borderRadius: 'var(--radius-selector)',
    fontWeight: 'token(fontWeights.medium)',
    lineHeight: 'token(lineHeights.none)',
    whiteSpace: 'nowrap',
    '--tag-bg': 'token(colors.base-200)',
    '--tag-fg': 'token(colors.base-content)',
    '--tag-bd': 'transparent',
    backgroundColor: 'var(--tag-bg)',
    color: 'var(--tag-fg)',
    border: '1px solid token(colors.base-300)',
  },
  variants: {
    variant: {
      default: {},
      outline: {
        backgroundColor: 'transparent',
        color: 'var(--tag-fg, token(colors.base-content))',
        borderColor: 'currentColor',
      },
      dash: {
        backgroundColor: 'transparent',
        color: 'var(--tag-fg, token(colors.base-content))',
        borderColor: 'currentColor',
        borderStyle: 'dashed',
      },
      soft: {
        backgroundColor: 'color-mix(in oklab, var(--tag-bg, token(colors.base-200)) 8%, token(colors.base-100))',
        borderColor: 'transparent',
      },
      ghost: {
        backgroundColor: 'base-200',
        borderColor: 'transparent',
      },
      info: {
        '--tag-bg': 'color-mix(in oklab, token(colors.info) 15%, transparent)',
        '--tag-fg': 'token(colors.info)',
        borderColor: 'color-mix(in oklab, token(colors.info) 30%, transparent)',
      },
      success: {
        '--tag-bg': 'color-mix(in oklab, token(colors.success) 15%, transparent)',
        '--tag-fg': 'token(colors.success)',
        borderColor: 'color-mix(in oklab, token(colors.success) 30%, transparent)',
      },
      warning: {
        '--tag-bg': 'color-mix(in oklab, token(colors.warning) 15%, transparent)',
        '--tag-fg': 'token(colors.warning)',
        borderColor: 'color-mix(in oklab, token(colors.warning) 30%, transparent)',
      },
      error: {
        '--tag-bg': 'color-mix(in oklab, token(colors.error) 15%, transparent)',
        '--tag-fg': 'token(colors.error)',
        borderColor: 'color-mix(in oklab, token(colors.error) 30%, transparent)',
      },
    },
    size: {
      md: {
        fontSize: 'token(fontSizes.sm)',
        paddingInline: 'token(spacing.2)',
        height: 'token(spacing.6)',
        '--tag-h': 'token(spacing.6)',
      },
      lg: {
        fontSize: 'token(fontSizes.md)',
        paddingInline: 'token(spacing.3)',
        height: 'token(spacing.8)',
        '--tag-h': 'token(spacing.8)',
      },
    },
    clickable: {
      true: {
        cursor: 'pointer',
      },
    },
    disabled: {
      true: {
        opacity: '0.5',
        pointerEvents: 'none',
      },
    },
    square: {
      true: {
        aspectRatio: '1',
        paddingInline: '0',
        justifyContent: 'center',
        minWidth: 'var(--tag-h, auto)',
        width: 'calc(var(--tag-h, auto))',
      },
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})
