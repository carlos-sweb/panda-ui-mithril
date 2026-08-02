import { cva } from '../../styled-system/css'

export const fieldsetStyles = cva({
  base: {
    display: 'grid',
    gap: '0.375rem',
    paddingBlock: '0.25rem',
    fontSize: '0.75rem',
    gridTemplateColumns: '1fr',
    gridAutoRows: 'max-content',
  },
})

export const fieldsetLegendStyles = cva({
  base: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '0.5rem',
    paddingBlock: '0.5rem',
    marginBlockEnd: '-0.25rem',
    marginInlineEnd: 'auto',
    fontWeight: '600',
    color: 'var(--colors-base-content)',
  },
})
