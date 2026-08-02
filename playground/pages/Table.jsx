import m from 'mithril'
import { css } from '../../styled-system/css'
import { Table, TableContainer, TableRow, TableCell, TableHead, TableThead, TableTbody, TableTfoot } from '../../src/index.js'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const section = css({ marginBottom: '2rem' })

const rows = [
  ['Cy Ganderton', 'Lead Developer', 'Blue'],
  ['Hart Hagerty', 'Desktop Support Technician', 'Purple'],
  ['Brice Swyre', 'Tax Accountant', 'Red'],
]

const usageCode = `<TableContainer>
  <Table zebra>
    <TableThead>
      <TableRow>
        <TableHead>Name</TableHead>
        <TableHead>Job</TableHead>
      </TableRow>
    </TableThead>
    <TableTbody>
      <TableRow>
        <TableCell>Cy Ganderton</TableCell>
        <TableCell>Lead Developer</TableCell>
      </TableRow>
    </TableTbody>
  </Table>
</TableContainer>`

const classRows = [
  { className: 'table', prop: '<Table>', type: 'Component', description: 'Table element' },
  { className: '(wrapper)', prop: '<TableContainer>', type: 'Part', description: 'Optional wrapper with horizontal scroll, useful for small screens' },
  { className: 'table-zebra', prop: 'zebra', type: 'Modifier', description: 'Adds zebra-stripe to even rows' },
  { className: 'table-pin-rows', prop: 'pinRows', type: 'Modifier', description: 'Makes thead and tfoot rows sticky' },
  { className: 'table-pin-cols', prop: 'pinCols', type: 'Modifier', description: 'Makes the first column of each row sticky' },
  { className: 'row-hover', prop: '<TableRow hover>', type: 'Modifier', description: 'Highlights a row on hover' },
  { className: 'table-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'table-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'table-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'table-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'table-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
]

export default {
  name: 'Table',
  category: 'Data Display',
  description: 'Table component for displaying data in a structured format.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Table</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Table component for displaying data in a structured format.
        </p>

        <section className={section}>
          <h3 className={heading}>Zebra + hoverable rows</h3>
          <TableContainer>
            <Table zebra>
              <TableThead>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Job</TableHead>
                  <TableHead>Favorite Color</TableHead>
                </TableRow>
              </TableThead>
              <TableTbody>
                {rows.map((r) => (
                  <TableRow key={r[0]} hover>
                    <TableCell>{r[0]}</TableCell>
                    <TableCell>{r[1]}</TableCell>
                    <TableCell>{r[2]}</TableCell>
                  </TableRow>
                ))}
              </TableTbody>
              <TableTfoot>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Job</TableHead>
                  <TableHead>Favorite Color</TableHead>
                </TableRow>
              </TableTfoot>
            </Table>
          </TableContainer>
        </section>

        <section className={section}>
          <h3 className={heading}>Sizes</h3>
          <TableContainer>
            <Table size="xs" zebra>
              <TableThead>
                <TableRow><TableHead>Name</TableHead><TableHead>Job</TableHead></TableRow>
              </TableThead>
              <TableTbody>
                <TableRow><TableCell>Cy Ganderton</TableCell><TableCell>Lead Developer</TableCell></TableRow>
              </TableTbody>
            </Table>
          </TableContainer>
        </section>

        <section>
          <h2 className={sectionTitle}>Usage</h2>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <h2 className={sectionTitle}>Class Reference</h2>
          <ClassTable rows={classRows} />
        </section>
      </div>
    )
  }
}
