import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Table, TableContainer, TableRow, TableCell, TableHead, TableThead, TableTbody, TableTfoot, Text, Block, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

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
          <ClassTable rows={tableToRows(table)} />
        </Block>
      </Stack>
    )
  }
}
