import { defineSlotRecipe } from '@pandacss/dev'

/**
 * ColorPicker — professional multi-space color selector (2D Picker, HSB,
 * HSL, RGB, CMYK, LAB). Floating card with a draggable 2D gradient area,
 * per-channel sliders, hex input + swatch, mode menu and copy button.
 *
 * Dynamic gradients (2D area, slider tracks) are applied as inline custom
 * properties from the component (`--colorpicker-*`), not in the recipe —
 * they are values that depend on the current color on every render.
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
    // 2D Saturation/Brightness area for the current hue. The gradient is composed
    // in the component (two layers: white→hue horizontal, transparent→black
    // vertical) via --colorpicker-hue.
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
    // left/top: dynamic position of the 2D cursor, via --colorpicker-cursor-*
    // (depends on the current saturation/brightness, set inline from the component).
    cursor: {
      position: 'absolute',
      left: 'var(--colorpicker-cursor-left)',
      top: 'var(--colorpicker-cursor-top)',
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
    // Row header: label on the left, value on the right, and the
    // slider below.
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
    // Slider track. The gradient is painted by the component inline
    // (--colorpicker-track) because it depends on the current channels.
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
    // Hue slider in Picker mode: only the track (no label or value),
    // separated from the 2D area.
    hueTrack: {
      marginTop: 'token(spacing.3)',
    },
    // left: dynamic position of the thumb on the track, via --colorpicker-thumb-left
    // (depends on the channel's current value, set inline from the component).
    thumb: {
      position: 'absolute',
      left: 'var(--colorpicker-thumb-left)',
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
      fontFamily: 'token(fonts.mono)',
      // The root has userSelect none; the input must allow selecting and
      // pasting values from the web.
      userSelect: 'text',
      WebkitUserSelect: 'text',
      outline: 'none',
      '&:focus': {
        borderColor: 'primary',
      },
    },
    // backgroundColor: current hex, via --colorpicker-swatch-color (shared
    // with triggerSwatch, set inline from the component on every render).
    swatch: {
      width: '2.25rem',
      height: '2.25rem',
      borderRadius: '0.375rem',
      border: '1px solid',
      borderColor: 'base-300',
      backgroundColor: 'var(--colorpicker-swatch-color)',
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
      '&[aria-expanded="true"] svg': {
        transform: 'rotate(180deg)',
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
    // Dropdown mode (`trigger` prop): trigger with a swatch of the current color.
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
      backgroundColor: 'var(--colorpicker-swatch-color)',
      flexShrink: '0',
    },
    // Panel container inside DropdownContent: anchors the ButtonClose
    // (position absolute) and keeps the picker's padding.
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
    // With ButtonClose visible, space is reserved at the top so the button does
    // not cover the 2D area or the sliders: the button (top 8px + ~32px tall)
    // reaches 40px, so the content starts at 2.5rem.
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
