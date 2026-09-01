/**
 * convert — motor de conversión de espacios de color del ColorPicker.
 *
 * Funciones puras, sin dependencias. La fuente de verdad del componente es el
 * hex; los canales de cada modo se derivan desde él y el drag de un canal
 * recalcula hex vía el modo activo.
 *
 * Convenciones:
 * - RGB/HSB/HSL: canales 0-255 / 0-360 / 0-100 según el espacio.
 * - CMYK: 0-100 por canal (porcentajes).
 * - LAB: L 0-100, a/b -128..127 (rango estándar sRGB, referencia blanca D65).
 * - Hex siempre normalizado a `#rrggbb` minúsculas (salida de rgbToHex).
 */

/** Clampa un número a [min, max]. */
export function clamp(n, min, max) {
  return Math.min(max, Math.max(min, n))
}

/** Convierte un componente 0-255 a su dígito hex (2 chars). */
function toHex2(n) {
  return clamp(Math.round(n), 0, 255).toString(16).padStart(2, '0')
}

/**
 * Convierte un hex a RGB. Acepta `#rgb`, `rgb`, `#rrggbb`, `rrggbb`.
 * Devuelve `{ r, g, b }` con canales 0-255, o `null` si no es válido.
 */
export function hexToRgb(hex) {
  if (typeof hex !== 'string') return null
  let h = hex.trim().replace(/^#/, '')
  if (h.length === 3) h = h.split('').map((c) => c + c).join('')
  if (!/^[0-9a-fA-F]{6}$/.test(h)) return null
  const n = parseInt(h, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

/** Convierte RGB (0-255) a hex normalizado `#rrggbb`. */
export function rgbToHex({ r, g, b }) {
  return `#${toHex2(r)}${toHex2(g)}${toHex2(b)}`
}

// ── RGB ↔ HSB/HSV ──────────────────────────────────────────────────────────

/** RGB (0-255) → HSB `{ h: 0-360, s: 0-100, b: 0-100 }`. */
export function rgbToHsb({ r, g, b }) {
  const rn = r / 255, gn = g / 255, bn = b / 255
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn)
  const d = max - min
  let h = 0
  if (d !== 0) {
    if (max === rn) h = ((gn - bn) / d) % 6
    else if (max === gn) h = (bn - rn) / d + 2
    else h = (rn - gn) / d + 4
    h *= 60
    if (h < 0) h += 360
  }
  const s = max === 0 ? 0 : (d / max) * 100
  return { h: h, s: s, b: max * 100 }
}

/** HSB `{ h: 0-360, s: 0-100, b: 0-100 }` → RGB (0-255). */
export function hsbToRgb({ h, s, b }) {
  const hh = ((h % 360) + 360) % 360
  const s2 = clamp(s, 0, 100) / 100
  const v = clamp(b, 0, 100) / 100
  const c = v * s2
  const x = c * (1 - Math.abs(((hh / 60) % 2) - 1))
  const m = v - c
  let r = 0, g = 0, bl = 0
  if (hh < 60) { r = c; g = x }
  else if (hh < 120) { r = x; g = c }
  else if (hh < 180) { g = c; bl = x }
  else if (hh < 240) { g = x; bl = c }
  else if (hh < 300) { r = x; bl = c }
  else { r = c; bl = x }
  return { r: Math.round((r + m) * 255), g: Math.round((g + m) * 255), b: Math.round((bl + m) * 255) }
}

// ── RGB ↔ HSL ──────────────────────────────────────────────────────────────

/** RGB (0-255) → HSL `{ h: 0-360, s: 0-100, l: 0-100 }`. */
export function rgbToHsl({ r, g, b }) {
  const rn = r / 255, gn = g / 255, bn = b / 255
  const max = Math.max(rn, gn, bn), min = Math.min(rn, gn, bn)
  const l = (max + min) / 2
  let h = 0, s = 0
  const d = max - min
  if (d !== 0) {
    s = d / (1 - Math.abs(2 * l - 1))
    if (max === rn) h = ((gn - bn) / d) % 6
    else if (max === gn) h = (bn - rn) / d + 2
    else h = (rn - gn) / d + 4
    h *= 60
    if (h < 0) h += 360
  }
  return { h, s: s * 100, l: l * 100 }
}

/** HSL `{ h: 0-360, s: 0-100, l: 0-100 }` → RGB (0-255). */
export function hslToRgb({ h, s, l }) {
  const hh = ((h % 360) + 360) % 360 / 360
  const s2 = clamp(s, 0, 100) / 100
  const l2 = clamp(l, 0, 100) / 100
  const fn = (p, q, t) => {
    if (t < 0) t += 1
    if (t > 1) t -= 1
    if (t < 1 / 6) return p + (q - p) * 6 * t
    if (t < 1 / 2) return q
    if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6
    return p
  }
  const q = l2 < 0.5 ? l2 * (1 + s2) : l2 + s2 - l2 * s2
  const p = 2 * l2 - q
  return {
    r: Math.round(fn(p, q, hh + 1 / 3) * 255),
    g: Math.round(fn(p, q, hh) * 255),
    b: Math.round(fn(p, q, hh - 1 / 3) * 255),
  }
}

// ── RGB ↔ CMYK ─────────────────────────────────────────────────────────────

/** RGB (0-255) → CMYK `{ c, m, y, k }` en 0-100. */
export function rgbToCmyk({ r, g, b }) {
  const rn = r / 255, gn = g / 255, bn = b / 255
  const k = 1 - Math.max(rn, gn, bn)
  if (k === 1) return { c: 0, m: 0, y: 0, k: 100 }
  return {
    c: ((1 - rn - k) / (1 - k)) * 100,
    m: ((1 - gn - k) / (1 - k)) * 100,
    y: ((1 - bn - k) / (1 - k)) * 100,
    k: k * 100,
  }
}

/** CMYK (0-100) → RGB (0-255). */
export function cmykToRgb({ c, m, y, k }) {
  const c2 = clamp(c, 0, 100) / 100
  const m2 = clamp(m, 0, 100) / 100
  const y2 = clamp(y, 0, 100) / 100
  const k2 = clamp(k, 0, 100) / 100
  return {
    r: Math.round(255 * (1 - c2) * (1 - k2)),
    g: Math.round(255 * (1 - m2) * (1 - k2)),
    b: Math.round(255 * (1 - y2) * (1 - k2)),
  }
}

// ── RGB ↔ LAB (vía XYZ, referencia blanca D65) ─────────────────────────────

/** RGB (0-255) → XYZ (normalizado a 0-1, D65). */
function rgbToXyz({ r, g, b }) {
  const fn = (v) => {
    const c = v / 255
    return c > 0.04045 ? Math.pow((c + 0.055) / 1.055, 2.4) : c / 12.92
  }
  const rl = fn(r), gl = fn(g), bl = fn(b)
  return {
    x: (rl * 0.4124564 + gl * 0.3575761 + bl * 0.1804375) / 0.95047,
    y: rl * 0.2126729 + gl * 0.7151522 + bl * 0.072175,
    z: (rl * 0.0193339 + gl * 0.119192 + bl * 0.9503041) / 1.08883,
  }
}

/** XYZ (D65) → RGB (0-255). */
function xyzToRgb({ x, y, z }) {
  const x2 = x * 0.95047, z2 = z * 1.08883
  const fn = (v) => {
    const c = v > 0.0031308 ? 1.055 * Math.pow(v, 1 / 2.4) - 0.055 : v * 12.92
    return c * 255
  }
  const r = fn(x2 * 3.2404542 + y * -1.5371385 + z2 * -0.4985314)
  const g = fn(x2 * -0.969266 + y * 1.8760108 + z2 * 0.041556)
  const b = fn(x2 * 0.0556434 + y * -0.2040259 + z2 * 1.0572252)
  return { r: Math.round(clamp(r, 0, 255)), g: Math.round(clamp(g, 0, 255)), b: Math.round(clamp(b, 0, 255)) }
}

/** RGB (0-255) → LAB `{ l: 0-100, a: -128..127, b: -128..127 }`. */
export function rgbToLab(rgb) {
  const { x, y, z } = rgbToXyz(rgb)
  const fn = (t) => (t > 0.008856 ? Math.cbrt(t) : 7.787 * t + 16 / 116)
  const fx = fn(x), fy = fn(y), fz = fn(z)
  return {
    l: 116 * fy - 16,
    a: 500 * (fx - fy),
    b: 200 * (fy - fz),
  }
}

/** LAB (D65) → RGB (0-255). */
export function labToRgb({ l, a, b }) {
  const fy = (l + 16) / 116
  const fx = fy + a / 500
  const fz = fy - b / 200
  const fn = (t) => {
    const t3 = t * t * t
    return t3 > 0.008856 ? t3 : (t - 16 / 116) / 7.787
  }
  return xyzToRgb({ x: fn(fx), y: fn(fy), z: fn(fz) })
}
