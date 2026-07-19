import m from 'mithril'
import { css } from '../../../styled-system/css'
import { Table, TableContainer, TableRow, TableCell, TableHead, TableThead, TableTbody } from '../../../src/index.js'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Table',
  category: 'Data Display',
  description: 'Table component for displaying data in a structured format.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Table</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Table component for displaying data in a structured format.
        </p>

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
              <TableRow>
                <TableCell>Cy Ganderton</TableCell>
                <TableCell>Lead Developer</TableCell>
                <TableCell>Blue</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Hart Hagerty</TableCell>
                <TableCell>Designer</TableCell>
                <TableCell>Purple</TableCell>
              </TableRow>
            </TableTbody>
          </Table>
        </TableContainer>
      </div>
    )
  }
}
