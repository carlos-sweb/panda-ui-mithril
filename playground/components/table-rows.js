export function tableToRows(table) {
  const base = table.class
  return table.rows.map((row) => {
    const out = {
      className: row.class ?? base ?? '—',
      type: row.type,
      description: row.description,
    }
    if (row.prop !== undefined) out.prop = row.prop
    if (row.default) out.isDefault = true
    return out
  })
}