import { defineTokens, defineSemanticTokens } from '@pandacss/dev'

/**
 * pumTheme — identidad visual de panda-ui-mithril.
 *
 * La capa de VALORES del diseño: tokens crudos (escalas, radios, fuentes) y
 * semanticTokens (colores con significado, light/dark). Es la fuente única de
 * la que beben las recipes (que consumen `token(colors.primary)` por nombre)
 * y el consumidor la hereda vía el preset o la importa directamente
 * (`panda-ui-mithril/theme`) para extender/copiar su propia identidad.
 *
 * Nota: los colores de marca se definen aquí con valor raw directo (base/dark),
 * sin custom properties `--pum-*` — la personalización del consumidor pasa por
 * `theme.extend.semanticTokens` o por editar/copiar este archivo.
 */

const tokens = defineTokens({
  colors: {
    'white': { value: '#ffffff' },
    'black': { value: '#000000' },
  },
  radii: {
    btn: { value: '4px' },
  },
  fonts: {
    sans: { value: '"Ubuntu", system-ui, sans-serif' },
    mono: { value: '"Ubuntu Mono", monospace' },
  },
  // Only the spacing keys beyond Panda's native scale are declared here.
  // The native scale (0.5–96, same rem values) comes from Panda's own
  // tokens and is preserved because theme.tokens is not overridden at
  // the top level — extending it would replace the whole category.
  spacing: {
    '128': { value: '32rem' },
    '160': { value: '40rem' },
    '192': { value: '48rem' },
    '320': { value: '80rem' },
  },
  // fontSizes: removed — native Panda scale (2xs–9xl) applies now
  // All recipes already reference tokens via 'token(fontSizes.md)' etc.
})

const semanticTokens = defineSemanticTokens({
  colors: {
    'base-100': {
      value: { base: '#ffffff', _dark: '#1d232a' },
    },
    'base-200': {
      value: { base: '#f2f2f2', _dark: '#191e24' },
    },
    'base-300': {
      value: { base: '#e5e5e5', _dark: '#15191e' },
    },
    'base-content': {
      value: { base: 'oklch(21% 0.006 285.885)', _dark: 'oklch(80% 0.008 285.885)' },
    },
    // Brand colors — raw values (base/dark), no --pum-* hooks.
    // Consumers override them via theme.extend.semanticTokens or by copying
    // this theme file (see README "Personalizar los colores de marca").
    primary: {
      value: { base: 'oklch(45% 0.24 277.023)', _dark: '#a78bfa' },
    },
    'primary-content': {
      value: { base: '#ffffff', _dark: '#1e1b4b' },
    },
    secondary: {
      value: { base: 'oklch(65% 0.241 354.308)', _dark: '#f472b6' },
    },
    'secondary-content': {
      value: { base: '#ffffff', _dark: '#1a0a14' },
    },
    accent: {
      value: { base: '#37cdbe', _dark: '#2dd4bf' },
    },
    'accent-content': {
      value: { base: '#163849', _dark: '#042f2e' },
    },
    neutral: {
      value: { base: 'oklch(14% 0.005 285.823)', _dark: '#a3a6ad' },
    },
    'neutral-content': {
      value: { base: '#ffffff', _dark: '#1f2937' },
    },
    info: {
      value: { base: '#3abff8', _dark: '#7dd3fc' },
    },
    'info-content': {
      value: { base: '#083344', _dark: '#0c4a6e' },
    },
    success: {
      value: { base: '#36d399', _dark: '#4ade80' },
    },
    'success-content': {
      value: { base: '#083144', _dark: '#052e16' },
    },
    warning: {
      value: { base: '#fbbd23', _dark: '#facc15' },
    },
    'warning-content': {
      value: { base: '#422006', _dark: '#422006' },
    },
    error: {
      value: { base: '#f87272', _dark: '#f87171' },
    },
    'error-content': {
      value: { base: '#450a0a', _dark: '#450a0a' },
    },
  },
})

const keyframes = {
  pulse: {
    '0%, 100%': { opacity: '1' },
    '50%': { opacity: '.5' },
  },
  spin: {
    to: { transform: 'rotate(360deg)' },
  },
  ping: {
    '75%, 100%': { transform: 'scale(2)', opacity: '0' },
  },
  bounce: {
    '0%, 100%': { transform: 'translateY(-25%)', animationTimingFunction: 'cubic-bezier(0.8,0,1,1)' },
    '50%': { transform: 'none', animationTimingFunction: 'cubic-bezier(0,0,0.2,1)' },
  },
  'progress-bar': {
    '0%': { backgroundSize: '200%' },
    '100%': { backgroundSize: '0%' },
  },
  'fade-in': {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  'fade-out': {
    from: { opacity: '1' },
    to: { opacity: '0' },
  },
  'slide-in': {
    from: { transform: 'translateY(-100%)' },
    to: { transform: 'translateY(0)' },
  },
  skeleton: {
    '0%': { backgroundPosition: '150%' },
    '100%': { backgroundPosition: '-50%' },
  },
  radio: {
    '0%': { padding: '5px' },
    '50%': { padding: '3px' },
  },
  toast: {
    '0%': { scale: '0.9', opacity: '0' },
    '100%': { scale: '1', opacity: '1' },
  },
  aura: {
    to: { '--aura-angle': '360deg', transform: 'translateZ(1px)' },
  },
  'aura-glow': {
    '20%, 80%': { opacity: '0.7', filter: 'blur(0.25rem)' },
    '50%': { opacity: '1', filter: 'blur(0.75rem)' },
  },
  'aura-glow-after': {
    '20%, 80%': { opacity: '0.3', filter: 'blur(1rem)' },
    '50%': { opacity: '0.6', filter: 'blur(1.5rem)' },
  },
  'modal-exit': {
    '0%': { opacity: '1', transform: 'scale(1)' },
    '100%': { opacity: '0', transform: 'scale(0.95)' },
  },
  // Salida por posición: el modal se desliza de vuelta hacia el borde del
  // que entró (reverso de la entrada slide-in por posición).
  'modal-exit-top': {
    '0%': { opacity: '1', transform: 'translateY(0)' },
    '100%': { opacity: '0', transform: 'translateY(-100%)' },
  },
  'modal-exit-bottom': {
    '0%': { opacity: '1', transform: 'translateY(0)' },
    '100%': { opacity: '0', transform: 'translateY(100%)' },
  },
  'modal-exit-start': {
    '0%': { opacity: '1', transform: 'translateX(0)' },
    '100%': { opacity: '0', transform: 'translateX(-100%)' },
  },
  'modal-exit-end': {
    '0%': { opacity: '1', transform: 'translateX(0)' },
    '100%': { opacity: '0', transform: 'translateX(100%)' },
  },
  // Salida por posición del Drawer: el panel se desliza de vuelta hacia el
  // borde del que entró (mismos valores que modal-exit-*, independientes
  // para no acoplar componentes).
  'drawer-exit-top': {
    '0%': { opacity: '1', transform: 'translateY(0)' },
    '100%': { opacity: '0', transform: 'translateY(-100%)' },
  },
  'drawer-exit-bottom': {
    '0%': { opacity: '1', transform: 'translateY(0)' },
    '100%': { opacity: '0', transform: 'translateY(100%)' },
  },
  'drawer-exit-start': {
    '0%': { opacity: '1', transform: 'translateX(0)' },
    '100%': { opacity: '0', transform: 'translateX(-100%)' },
  },
  'drawer-exit-end': {
    '0%': { opacity: '1', transform: 'translateX(0)' },
    '100%': { opacity: '0', transform: 'translateX(100%)' },
  },
  'modal-backdrop-exit': {
    '0%': { opacity: '1' },
    '100%': { opacity: '0' },
  },
  // Pure fade for tab content panels — no vertical slide
  'tab-fade-in': {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  'tab-indicator': {
    from: { transform: 'scaleX(0)' },
    to: { transform: 'scaleX(1)' },
  },
  // ButtonCopy icon-transition keyframes
  'btn-copy-fade': {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  'btn-copy-scale': {
    from: { opacity: '0', transform: 'scale(0.4)' },
    to: { opacity: '1', transform: 'scale(1)' },
  },
  'btn-copy-rotate': {
    from: { opacity: '0', transform: 'rotate(-90deg) scale(0.6)' },
    to: { opacity: '1', transform: 'rotate(0deg) scale(1)' },
  },
  'btn-copy-bounce': {
    '0%':   { opacity: '0', transform: 'scale(0.3)' },
    '60%':  { opacity: '1', transform: 'scale(1.2)' },
    '80%':  { transform: 'scale(0.9)' },
    '100%': { transform: 'scale(1)' },
  },
}

export const pumTheme = {
  tokens,
  semanticTokens,
  keyframes,
}
