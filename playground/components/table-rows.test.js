import { describe, test, expect } from 'bun:test'
import { tableToRows } from './table-rows'

describe('tableToRows', () => {
  test('hereda la clase base en todas las filas', () => {
    const rows = tableToRows({
      class: 'countdown',
      rows: [
        { type: 'Component', description: 'a' },
        { type: 'Prop', description: 'b' },
      ],
    })
    expect(rows[0].className).toBe('countdown')
    expect(rows[1].className).toBe('countdown')
  })

  test('el override de fila reemplaza la base (no concatena)', () => {
    const rows = tableToRows({
      class: 'btn',
      rows: [{ class: 'btn-primary', type: 'Color', description: 'c' }],
    })
    expect(rows[0].className).toBe('btn-primary')
  })

  test('sin clase en ningún nivel → em-dash', () => {
    const rows = tableToRows({ rows: [{ type: 'Prop', description: 'd' }] })
    expect(rows[0].className).toBe('—')
  })

  test('default: true → isDefault: true; ausente → clave inexistente', () => {
    const withDefault = tableToRows({ rows: [{ type: 'Prop', description: 'e', default: true }] })
    expect(withDefault[0].isDefault).toBe(true)

    const withoutDefault = tableToRows({ rows: [{ type: 'Prop', description: 'f' }] })
    expect('isDefault' in withoutDefault[0]).toBe(false)
  })

  test('prop ausente → clave inexistente; presente → verbatim', () => {
    const noProp = tableToRows({ rows: [{ type: 'Prop', description: 'g' }] })
    expect('prop' in noProp[0]).toBe(false)

    const withProp = tableToRows({ rows: [{ prop: 'value', type: 'Prop', description: 'h' }] })
    expect(withProp[0].prop).toBe('value')
  })

  test('type y description pasan verbatim', () => {
    const rows = tableToRows({ rows: [{ prop: '<Countdown>', type: 'Component', description: 'wrapper' }] })
    expect(rows[0].type).toBe('Component')
    expect(rows[0].description).toBe('wrapper')
  })
})