import { defineSlotRecipe } from '@pandacss/dev'

/**
 * ColorPicker — selector de color profesional multi-espacio (Picker 2D, HSB,
 * HSL, RGB, CMYK, LAB). Tarjeta flotante con área de degradado 2D arrastrable,
 * sliders por canal, entrada hex + swatch, menú de modo y botón copiar.
 *
 * Los degradados dinámicos (área 2D, pistas de los sliders) se aplican como
 * custom properties inline desde el componente (`--colorpicker-*`), no en el
 * recipe — son valores que dependen del color actual en cada render.
 */
export const colorPickerRecipe = defineSlotRecipe({
  className: 'colorpicker',
  slots: [
    'root', 'picker', 'gradient', 'cursor', 'sliders', 'sliderRow',
    'sliderHeader', 'sliderLabel', 'sliderValue', 'track', 'hueTrack',
    'thumb', 'hexRow', 'hexInput', 'swatch', 'footer', 'modeButton',
    'copyButton', 'triggerButton', 'triggerSwatch', 'dropdownPanel',
    'dropdownPanelClose', 'closeButton', 'closeStart', 'closeEnd',
  ],
  base: {
    root: {
      display: 'inline-block',
      width: 'max-content',
      maxWidth: '100%',
      background: 'base-100',
      border: '1px solid',
      borderColor: 'base-300',
      borderRadius: '0.75rem',
      boxShadow: '0 10px 30px color-mix(in oklab, black 12%, transparent)',
      padding: 'token(spacing.3)',
      fontFamily: 'inherit',
      fontSize: '0.8125rem',
      color: 'base-content',
      userSelect: 'none',
    },
    picker: {
      display: 'block',
    },
    // Área 2D Saturación/Brillo para el hue actual. El degradado se compone en
    // el componente (dos capas: blanco→hue horizontal, transparente→negro
    // vertical) vía --colorpicker-hue.
    gradient: {
      position: 'relative',
      width: '100%',
      height: '9rem',
      borderRadius: '0.5rem',
      cursor: 'crosshair',
      touchAction: 'none',
      overflow: 'hidden',
      border: '1px solid',
      borderColor: 'base-300',
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: '0',
        background: 'linear-gradient(to right, white, hsl(var(--colorpicker-hue) 100% 50%))',
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        inset: '0',
        background: 'linear-gradient(to top, black, transparent)',
      },
    },
    cursor: {
      position: 'absolute',
      width: '1rem',
      height: '1rem',
      borderRadius: '50%',
      border: '2px solid white',
      boxShadow: '0 0 0 1px rgb(0 0 0 / 30%), 0 2px 6px rgb(0 0 0 / 30%)',
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none',
      zIndex: '1',
    },
    sliders: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'token(spacing.3)',
    },
    sliderRow: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'token(spacing.1)',
    },
    // Cabecera de la fila: label a la izquierda, valor a la derecha, y el
    // slider debajo.
    sliderHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    sliderLabel: {
      fontSize: '0.75rem',
      opacity: '0.7',
    },
    sliderValue: {
      fontSize: '0.75rem',
      textAlign: 'right',
      fontVariantNumeric: 'tabular-nums',
    },
    // Pista del slider. El degradado lo pinta el componente inline
    // (--colorpicker-track) porque depende de los canales actuales.
    track: {
      position: 'relative',
      height: '0.875rem',
      borderRadius: '0.4375rem',
      cursor: 'pointer',
      touchAction: 'none',
      border: '1px solid',
      borderColor: 'base-300',
      '&::before': {
        content: '""',
        position: 'absolute',
        inset: '0',
        borderRadius: 'inherit',
        background: 'var(--colorpicker-track)',
      },
    },
    // Slider de hue en modo Picker: solo la pista (sin label ni valor),
    // separada del área 2D.
    hueTrack: {
      marginTop: 'token(spacing.3)',
    },
    thumb: {
      position: 'absolute',
      top: '50%',
      width: '0.875rem',
      height: '0.875rem',
      borderRadius: '50%',
      background: 'white',
      border: '2px solid white',
      boxShadow: '0 0 0 1px rgb(0 0 0 / 30%), 0 1px 4px rgb(0 0 0 / 30%)',
      transform: 'translate(-50%, -50%)',
      pointerEvents: 'none',
      zIndex: '1',
    },
    hexRow: {
      display: 'flex',
      alignItems: 'center',
      gap: 'token(spacing.2)',
      marginTop: 'token(spacing.3)',
    },
    hexInput: {
      flex: '1',
      minWidth: '0',
      padding: 'token(spacing.1.5) token(spacing.2)',
      border: '1px solid',
      borderColor: 'base-300',
      borderRadius: '0.375rem',
      background: 'base-100',
      color: 'inherit',
      fontSize: '0.8125rem',
      fontFamily: 'monospace',
      // El root tiene userSelect none; el input debe permitir seleccionar y
      // pegar valores desde la web.
      userSelect: 'text',
      WebkitUserSelect: 'text',
      outline: 'none',
      '&:focus': {
        borderColor: 'primary',
      },
    },
    swatch: {
      width: '2.25rem',
      height: '2.25rem',
      borderRadius: '0.375rem',
      border: '1px solid',
      borderColor: 'base-300',
      flexShrink: '0',
    },
    footer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: 'token(spacing.3)',
    },
    modeButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'token(spacing.1)',
      padding: 'token(spacing.1) token(spacing.2)',
      border: '1px solid',
      borderColor: 'base-300',
      borderRadius: '0.375rem',
      background: 'transparent',
      color: 'inherit',
      fontSize: '0.75rem',
      cursor: 'pointer',
      '& svg': {
        transition: 'transform 0.15s ease',
      },
    },
    copyButton: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: '1.75rem',
      height: '1.75rem',
      border: '1px solid',
      borderColor: 'base-300',
      borderRadius: '0.375rem',
      background: 'transparent',
      color: 'inherit',
      cursor: 'pointer',
    },
    // Modo dropdown (prop `trigger`): trigger con swatch del color actual.
    triggerButton: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'token(spacing.2)',
    },
    triggerSwatch: {
      width: '1rem',
      height: '1rem',
      borderRadius: '0.25rem',
      border: '1px solid',
      borderColor: 'base-300',
      flexShrink: '0',
    },
    // Contenedor del panel dentro del DropdownContent: ancla el ButtonClose
    // (position absolute) y conserva el padding del picker.
    dropdownPanel: {
      position: 'relative',
      width: 'max-content',
      maxWidth: '100%',
      padding: 'token(spacing.3)',
      fontFamily: 'inherit',
      fontSize: '0.8125rem',
      color: 'base-content',
      userSelect: 'none',
    },
    // Con ButtonClose visible se reserva espacio arriba para que el botón no
    // tape el área 2D ni los sliders: el botón (top 8px + ~32px de alto) llega
    // a los 40px, así que el contenido empieza a los 2.5rem.
    dropdownPanelClose: {
      paddingTop: 'token(spacing.10)',
    },
    closeButton: {
      position: 'absolute',
      top: 'token(spacing.2)',
      zIndex: '2',
    },
    closeStart: {
      insetInlineStart: 'token(spacing.2)',
    },
    closeEnd: {
      insetInlineEnd: 'token(spacing.2)',
    },
  },
  variants: {
    size: {
      xs: { root: { width: '13rem' } },
      sm: { root: { width: '15rem' } },
      md: { root: { width: '17rem' } },
      lg: { root: { width: '19rem' } },
      xl: { root: { width: '21rem' } },
    },
  },
  defaultVariants: {
    size: 'md',
  },
})
