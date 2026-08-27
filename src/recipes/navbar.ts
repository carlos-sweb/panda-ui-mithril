import { defineSlotRecipe } from '@pandacss/dev'

/**
 * Navbar — barra de navegación superior de tres zonas (start/center/end) con
 * sub-componentes estratégicos (brand, menu, link, toggle) y variantes
 * profesionales: posición (static/sticky/fixed), color semántico, tamaño,
 * borde, sombra y efecto glass.
 *
 * El color se comunica con custom properties component-scoped: la variante
 * `color` define `--navbar-bg` / `--navbar-fg` en el slot `navbar` y todos los
 * slots heredan `currentColor`, de modo que brand/link/toggle se ven bien
 * sobre cualquier fondo (patrón MUI AppBar).
 *
 * Responsive (patrón Bootstrap/Flowbite, JS-first): el slot `menu` es el
 * grupo de links de escritorio (oculto <768px) y el slot `toggle` es la
 * hamburguesa solo móvil (oculta ≥768px). El patrón móvil de esta librería
 * empareja `NavbarToggle` con el `Drawer` (no con un menú CSS colapsable).
 */
export const navbarRecipe = defineSlotRecipe({
  className: 'navbar',
  slots: ['navbar', 'container', 'start', 'center', 'end', 'brand', 'menu', 'link', 'toggle'],
  base: {
    navbar: {
      position: 'relative',
      display: 'flex',
      width: '100%',
      alignItems: 'center',
      padding: 'token(spacing.2)',
      minHeight: 'token(spacing.16)',
      backgroundColor: 'var(--navbar-bg, token(colors.base-100))',
      color: 'var(--navbar-fg, token(colors.base-content))',
    },
    container: {
      display: 'flex',
      alignItems: 'center',
      width: '100%',
      maxWidth: 'var(--navbar-max-w, token(spacing.320))',
      marginInline: 'auto',
    },
    start: {
      display: 'inline-flex',
      alignItems: 'center',
      width: '50%',
      justifyContent: 'flex-start',
    },
    center: {
      display: 'inline-flex',
      alignItems: 'center',
      flexShrink: '0',
    },
    end: {
      display: 'inline-flex',
      alignItems: 'center',
      width: '50%',
      justifyContent: 'flex-end',
    },
    brand: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 'token(spacing.2)',
      color: 'inherit',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      fontSize: 'token(fontSizes.xl)',
      fontWeight: 'token(fontWeights.bold)',
      '&:hover': { opacity: '0.8' },
    },
    menu: {
      display: 'flex',
      alignItems: 'center',
      gap: 'token(spacing.1)',
      '@media (max-width: 767px)': { display: 'none' },
    },
    link: {
      display: 'inline-flex',
      alignItems: 'center',
      paddingInline: 'token(spacing.3)',
      paddingBlock: 'token(spacing.2)',
      borderRadius: 'var(--radius-field)',
      color: 'inherit',
      fontSize: 'token(fontSizes.sm)',
      textDecoration: 'none',
      whiteSpace: 'nowrap',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'color-mix(in oklab, currentColor 8%, transparent)',
      },
      '&:focus-visible': {
        outline: '2px solid color-mix(in oklab, currentColor 40%, transparent)',
        outlineOffset: '2px',
      },
    },
    toggle: {
      '@media (min-width: 768px)': { display: 'none' },
    },
  },
  variants: {
    position: {
      static: {},
      sticky: {
        navbar: {
          position: 'sticky',
          top: '0',
          zIndex: '50',
        },
      },
      fixed: {
        navbar: {
          position: 'fixed',
          top: '0',
          left: '0',
          right: '0',
          zIndex: '50',
        },
      },
    },
    color: {
      base: {
        navbar: {
          '--navbar-bg': 'token(colors.base-100)',
          '--navbar-fg': 'token(colors.base-content)',
        },
      },
      neutral: {
        navbar: {
          '--navbar-bg': 'token(colors.neutral)',
          '--navbar-fg': 'token(colors.neutral-content)',
        },
      },
      primary: {
        navbar: {
          '--navbar-bg': 'token(colors.primary)',
          '--navbar-fg': 'token(colors.primary-content)',
        },
      },
      secondary: {
        navbar: {
          '--navbar-bg': 'token(colors.secondary)',
          '--navbar-fg': 'token(colors.secondary-content)',
        },
      },
      accent: {
        navbar: {
          '--navbar-bg': 'token(colors.accent)',
          '--navbar-fg': 'token(colors.accent-content)',
        },
      },
      info: {
        navbar: {
          '--navbar-bg': 'token(colors.info)',
          '--navbar-fg': 'token(colors.info-content)',
        },
      },
      success: {
        navbar: {
          '--navbar-bg': 'token(colors.success)',
          '--navbar-fg': 'token(colors.success-content)',
        },
      },
      warning: {
        navbar: {
          '--navbar-bg': 'token(colors.warning)',
          '--navbar-fg': 'token(colors.warning-content)',
        },
      },
      error: {
        navbar: {
          '--navbar-bg': 'token(colors.error)',
          '--navbar-fg': 'token(colors.error-content)',
        },
      },
    },
    size: {
      sm: { navbar: { minHeight: 'token(spacing.12)' } },
      md: { navbar: { minHeight: 'token(spacing.16)' } },
      lg: { navbar: { minHeight: 'token(spacing.20)' } },
    },
    border: {
      true: { navbar: { borderBottom: '1px solid token(colors.base-300)' } },
      false: {},
    },
    shadow: {
      none: {},
      sm: {
        navbar: {
          boxShadow: '0 1px 2px color-mix(in oklab, black 5%, transparent)',
        },
      },
      md: {
        navbar: {
          boxShadow: '0 4px 6px -1px color-mix(in oklab, black 10%, transparent)',
        },
      },
      lg: {
        navbar: {
          boxShadow: '0 10px 15px -3px color-mix(in oklab, black 10%, transparent)',
        },
      },
    },
    glass: {
      true: {
        navbar: {
          backgroundColor: 'color-mix(in oklab, var(--navbar-bg) 75%, transparent)',
          backdropFilter: 'blur(10px)',
        },
      },
      false: {},
    },
    // Variantes del slot `link` — NavbarLink las aplica con navbar({ active, disabled }).
    active: {
      true: {
        link: {
          backgroundColor: 'color-mix(in oklab, currentColor 12%, transparent)',
          fontWeight: 'token(fontWeights.semibold)',
        },
      },
      false: {},
    },
    disabled: {
      true: {
        link: {
          opacity: '0.5',
          pointerEvents: 'none',
        },
      },
      false: {},
    },
  },
  defaultVariants: {
    position: 'static',
    color: 'base',
    size: 'md',
    border: false,
    shadow: 'none',
    glass: false,
    active: false,
    disabled: false,
  },
})
