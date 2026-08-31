/**
 * Keyframes de panda-ui-mithril (animaciones de los componentes).
 */

export const themeKeyframes = {
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
  'tab-fade-in': {
    from: { opacity: '0' },
    to: { opacity: '1' },
  },
  'tab-indicator': {
    from: { transform: 'scaleX(0)' },
    to: { transform: 'scaleX(1)' },
  },
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
