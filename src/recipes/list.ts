import { defineSlotRecipe } from '@pandacss/dev'

export const listRecipe = defineSlotRecipe({
  className : 'list',
  slots: ['list', 'row', 'col'],
  base: {
    list: {
      display: 'flex',
      flexDirection: 'column',
      fontSize: 'token(fontSizes.md)',

      '& > li:not(:last-child)': {
        position: 'relative',
        '&:after': {
          content: '""',
          position: 'absolute',
          // Separador a lo ancho completo de la lista. Antes usaba
          // insetInline: var(--radius-box), que dejaba 8px sin borde a cada
          // lado y hacía que cada fila se viera como una pastilla separada.
          insetInline: '0',
          bottom: '0',
          borderBottom: 'var(--border, 1px) solid color-mix(in oklab, token(colors.base-content) 5%, transparent)',
        },
      },

      // Modo sortable (envuelve SortableJS, ver src/components/List/sortable.js):
      // SortableJS aplica ghost/chosen/drag a la fila durante el arrastre y el
      // bridge marca el <ul> con list-sort-whole (fila entera) o
      // list-sort-handle (solo desde el asa ListDragHandle).
      '& .list-sort-ghost': {
        opacity: '0.35',
      },
      '& .list-sort-chosen': {
        backgroundColor: 'base-200',
      },
      '&.list-sort-whole > li': {
        cursor: 'grab',
      },
      // Durante el arrastre el cursor debe seguir diciendo "arrastrando" aunque
      // el puntero salga del asa o de la fila: SortableJS pone estas clases
      // (chosen = fila origen, ghost = hueco, drag = clon en fallback).
      '& .list-sort-chosen, & .list-sort-ghost, & .list-sort-drag': {
        cursor: 'grabbing',
        userSelect: 'none',
      },
      // El asa solo promete arrastre cuando el modo sortable está activo: el
      // bridge marca el <ul> con list-sort-whole (fila entera) o
      // list-sort-handle (solo asa). Sin `sortable` es un grip estático y
      // mostrar la mano sería mentir.
      '&.list-sort-whole .list-drag-handle, &.list-sort-handle .list-drag-handle': {
        cursor: 'grab',
        '&:active': { cursor: 'grabbing' },
      },
      '& .list-drag-handle': {
        display: 'inline-flex',
        alignItems: 'center',
        color: 'color-mix(in oklab, token(colors.base-content) 45%, transparent)',
        // Crucial para touch: el gesto de arrastre no debe hacer scroll.
        touchAction: 'none',
        // Sin esto, arrastrar desde el asa selecciona el texto de la fila.
        userSelect: 'none',
      },
    },
    row: {
      '--list-grid-cols': 'minmax(0, auto) 1fr',
      position: 'relative',
      display: 'grid',
      gridAutoFlow: 'column',
      gridTemplateColumns: 'var(--list-grid-cols)',
      gap: 'token(spacing.4)',
      padding: 'token(spacing.4)',
      wordBreak: 'break-word',
      '& > *': { gridRowStart: '1' },

      // Fix del TODO: el radius va solo en los bordes visuales de la lista
      // (primera y última fila), no en todas las filas — antes el hover de
      // filas intermedias mostraba esquinas redondeadas flotando entre
      // separadores rectos. `:only-child` recibe ambos (todas las esquinas).
      '&:first-child': {
        borderStartStartRadius: 'var(--radius-box)',
        borderStartEndRadius: 'var(--radius-box)',
      },
      '&:last-child': {
        borderEndStartRadius: 'var(--radius-box)',
        borderEndEndRadius: 'var(--radius-box)',
      },

      '&:has(.list-col-grow:nth-child(1))': { '--list-grid-cols': '1fr' },
      '&:has(.list-col-grow:nth-child(2))': { '--list-grid-cols': 'minmax(0, auto) 1fr' },
      '&:has(.list-col-grow:nth-child(3))': { '--list-grid-cols': 'minmax(0, auto) minmax(0, auto) 1fr' },
      '&:has(.list-col-grow:nth-child(4))': { '--list-grid-cols': 'minmax(0, auto) minmax(0, auto) minmax(0, auto) 1fr' },
      '&:has(.list-col-grow:nth-child(5))': { '--list-grid-cols': 'minmax(0, auto) minmax(0, auto) minmax(0, auto) minmax(0, auto) 1fr' },
      '&:has(.list-col-grow:nth-child(6))': { '--list-grid-cols': 'minmax(0, auto) minmax(0, auto) minmax(0, auto) minmax(0, auto) minmax(0, auto) 1fr' },

      // Filas skeleton (loading): el Skeleton base es un bloque sin dimensión;
      // la fila de carga lo dimensiona como línea de texto (1em de alto,
      // redondeo sutil) para que el placeholder sea visible. El grid se fija
      // aquí (1fr + 4.5rem) y cada skeleton llena su columna; las filas de
      // carga no usan `grow` para no disparar las reglas `:has(...)` de
      // mayor especificidad que redefinirían --list-grid-cols.
      '&.list-row-loading': {
        '--list-grid-cols': 'minmax(0, 1fr) minmax(0, 4.5rem)',
        '& .skeleton': {
          height: '1em',
          width: '100%',
          borderRadius: '0.25em',
        },
      },
    },
    col: {},
  },
  variants: {
    hover: {
      true: {
        row: {
          '&:hover': { backgroundColor: 'base-200' },
        },
      },
    },
    wrap: {
      true: {
        col: { gridRowStart: '2' },
      },
    },
  },
})
