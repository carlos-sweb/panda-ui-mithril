import { cva } from '../../styled-system/css'

export const cardStyles = cva({
  base: {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    borderRadius: 'var(--radius-box)',

    '& figure': {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '& figure:first-child': {
      overflow: 'hidden',
      borderStartStartRadius: 'inherit',
      borderStartEndRadius: 'inherit',
      borderEndStartRadius: '0',
      borderEndEndRadius: '0',
    },
    '& figure:last-child': {
      overflow: 'hidden',
      borderStartStartRadius: '0',
      borderStartEndRadius: '0',
      borderEndStartRadius: 'inherit',
      borderEndEndRadius: 'inherit',
    },
  },
  variants: {
    size: {
      xs: {
        '& .card-body': { '--card-p': '0.5rem', '--card-fs': '0.6875rem' },
        '& .card-title': { '--cardtitle-fs': '0.875rem' },
      },
      sm: {
        '& .card-body': { '--card-p': '1rem', '--card-fs': '0.75rem' },
        '& .card-title': { '--cardtitle-fs': '1rem' },
      },
      md: {
        '& .card-body': { '--card-p': '1.5rem', '--card-fs': '0.875rem' },
        '& .card-title': { '--cardtitle-fs': '1.125rem' },
      },
      lg: {
        '& .card-body': { '--card-p': '2rem', '--card-fs': '1rem' },
        '& .card-title': { '--cardtitle-fs': '1.25rem' },
      },
      xl: {
        '& .card-body': { '--card-p': '2.5rem', '--card-fs': '1.125rem' },
        '& .card-title': { '--cardtitle-fs': '1.375rem' },
      },
    },
    border: {
      true: { border: 'var(--border, 1px) solid var(--colors-base-200)' },
    },
    dash: {
      true: { border: 'var(--border, 1px) dashed var(--colors-base-200)' },
    },
    side: {
      true: {
        alignItems: 'stretch',
        flexDirection: 'row',
        '& figure:first-child': {
          overflow: 'hidden',
          borderStartStartRadius: 'inherit',
          borderStartEndRadius: '0',
          borderEndStartRadius: 'inherit',
          borderEndEndRadius: '0',
        },
        '& figure:last-child': {
          overflow: 'hidden',
          borderStartStartRadius: '0',
          borderStartEndRadius: 'inherit',
          borderEndStartRadius: '0',
          borderEndEndRadius: 'inherit',
        },
        '& figure > *': {
          maxWidth: 'unset',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        },
      },
    },
    imageFull: {
      true: {
        display: 'grid',
        '& > *': { gridColumnStart: '1', gridRowStart: '1' },
        '& > .card-body': { position: 'relative', color: 'var(--colors-neutral-content)' },
        '& figure': { overflow: 'hidden', borderRadius: 'inherit' },
        '& figure img': { height: '100%', objectFit: 'cover', filter: 'brightness(28%)' },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})

export const cardBodyStyles = cva({
  base: {
    display: 'flex',
    flex: '1 1 auto',
    flexDirection: 'column',
    gap: '0.5rem',
    padding: 'var(--card-p, 1.5rem)',
    fontSize: 'var(--card-fs, 0.875rem)',

    '& p': { flexGrow: '1' },
  },
})

export const cardTitleStyles = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontSize: 'var(--cardtitle-fs, 1.125rem)',
    fontWeight: '600',
  },
})

export const cardActionsStyles = cva({
  base: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'flex-start',
    gap: '0.5rem',
  },
  variants: {
    justify: {
      start: { justifyContent: 'flex-start' },
      center: { justifyContent: 'center' },
      end: { justifyContent: 'flex-end' },
      between: { justifyContent: 'space-between' },
    },
  },
})
