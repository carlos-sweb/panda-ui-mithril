import type { PumSize, PumColor } from '../../types'

/** Props del RatingGroup — envuelve Rating con label. Delega todas las props de Rating. */
export interface RatingGroupAttrs {
  /** Texto del label (ej: "Puntuación"). Si no se pasa, no se muestra label. */
  label?: string
  /** Valor actual del rating (modo controlado con onchange). */
  value?: number
  /** Valor inicial (modo no controlado, estado interno). */
  defaultValue?: number
  /** Cantidad máxima de estrellas. Default: 5. */
  max?: number
  /** Color de las estrellas. Default: warning. */
  color?: PumColor
  /** Tamaño de las estrellas. Default: md. */
  size?: PumSize
  /** Si true, el rating es solo visual (no interactivo). */
  readonly?: boolean
  /** Callback al cambiar la puntuación. */
  onchange?: (value: number) => void
  /** Si true, muestra el valor numérico junto al label. Default: true. */
  showValue?: boolean
  /** Clase CSS adicional. */
  className?: string
}
