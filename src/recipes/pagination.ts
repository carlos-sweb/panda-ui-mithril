import { defineRecipe } from '@pandacss/dev'

export const paginationRecipe = defineRecipe({
  className: 'pagination',
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    // Tamaño base (escala de Button); los items lo heredan vía --btn-size.
    '--btn-size': 'token(spacing.10)',
    fontSize: 'token(fontSizes.md)',

    // Elipsis: mismo alto que los botones, ancho fijo, texto atenuado.
    '& > .pagination-ellipsis': {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: 'var(--btn-size)',
      height: 'var(--btn-size)',
      color: 'color-mix(in oklab, token(colors.base-content) 40%, transparent)',
      userSelect: 'none',
    },
  },
  variants: {
    // joined: botones pegados. El recipe Button pone borderRadius en las 4
    // esquinas de cada item, así que joined primero RESETEA todo el radio y
    // luego redondea solo las esquinas externas: izquierda del primero y
    // derecha del último. Los medios quedan rectos.
    variant: {
      joined: {
        '& > .pagination-item': {
          borderRadius: '0',
        },
        '& > .pagination-item:not(:first-child)': {
          marginInlineStart: 'calc(var(--border, 1px) * -1)',
        },
        '& > .pagination-item:first-child': {
          borderStartStartRadius: 'var(--radius-field)',
          borderEndStartRadius: 'var(--radius-field)',
        },
        '& > .pagination-item:last-child': {
          borderStartEndRadius: 'var(--radius-field)',
          borderEndEndRadius: 'var(--radius-field)',
        },
      },
      separated: {
        gap: 'token(spacing.1)',
        '& > .pagination-item, & > .pagination-ellipsis': {
          borderRadius: 'var(--radius-field)',
        },
      },
    },
    // square: radius del botón según variant. circle: redondos completos.
    shape: {
      square: {},
      circle: {
        '& > .pagination-item, & > .pagination-ellipsis': { borderRadius: '9999px' },
        // joined + circle: solo las esquinas externas redondean (media luna
        // hacia afuera); las internas y los medios quedan rectos para que la
        // cadena de botones se lea pegada.
        '&.pagination--variant_joined > .pagination-item:first-child': {
          borderStartStartRadius: '9999px',
          borderEndStartRadius: '9999px',
          borderStartEndRadius: '0',
          borderEndEndRadius: '0',
        },
        '&.pagination--variant_joined > .pagination-item:last-child': {
          borderStartEndRadius: '9999px',
          borderEndEndRadius: '9999px',
          borderStartStartRadius: '0',
          borderEndStartRadius: '0',
        },
        '&.pagination--variant_joined > .pagination-item:not(:first-child):not(:last-child)': {
          borderRadius: '0',
        },
      },
    },
    size: {
      xs: { '--btn-size': 'token(spacing.6)', fontSize: 'token(fontSizes.xs)' },
      sm: { '--btn-size': 'token(spacing.8)', fontSize: 'token(fontSizes.sm)' },
      md: { '--btn-size': 'token(spacing.10)', fontSize: 'token(fontSizes.md)' },
      lg: { '--btn-size': 'token(spacing.12)', fontSize: 'token(fontSizes.xl)' },
      xl: { '--btn-size': 'token(spacing.14)', fontSize: 'token(fontSizes.3xl)' },
    },
  },
  defaultVariants: {
    variant: 'joined',
    shape: 'square',
    size: 'md',
  },
})
