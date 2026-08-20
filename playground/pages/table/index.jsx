import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Table, TableContainer, TableRow, TableCell, TableHead, TableThead, TableTbody, TableTfoot, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const rows = [
  ['Cy Ganderton', 'Lead Developer', 'Blue'],
  ['Hart Hagerty', 'Desktop Support Technician', 'Purple'],
  ['Brice Swyre', 'Tax Accountant', 'Red'],
]

const usageCodeJsx = `import m from 'mithril'
import { TableContainer, Table, TableThead, TableRow, TableHead, TableTbody, TableCell } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <TableContainer>
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
        </TableContainer>
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { TableContainer, Table, TableThead, TableRow, TableHead, TableTbody, TableCell } from 'panda-ui-mithril'

export const TablePage = {
  view() {
    return m(TableContainer, null, [
      m(Table, { zebra: true }, [
        m(TableThead, null,
          m(TableRow, null, [
            m(TableHead, null, 'Name'),
            m(TableHead, null, 'Job')
          ])
        ),
        m(TableTbody, null,
          m(TableRow, null, [
            m(TableCell, null, 'Cy Ganderton'),
            m(TableCell, null, 'Lead Developer')
          ])
        )
      ])
    ])
  }
}`

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

  oninit() { loadPageI18n('table') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Table</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h3" size="5">Zebra + hoverable rows</Title>
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
        </Block>

        <Block spacing="lg">
          <Title as="h3" size="5">Sizes</Title>
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
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <Tabs defaultActive="jsx" lifted size="lg">
            <Tab ref="jsx">Jsx</Tab>
            <Tab ref="js">Js</Tab>
            <TabContent ref="jsx">
              <CodeExample type="jsx" code={usageCodeJsx} />
            </TabContent>
            <TabContent ref="js">
              <CodeExample type="javascript" code={usageCodeJavascript} />
            </TabContent>
          </Tabs>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </Block>
      </Stack>
    )
  }
}
