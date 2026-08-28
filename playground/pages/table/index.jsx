import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Table, TableContainer, TableRow, TableCell, TableHead, TableThead, TableTbody, TableTfoot, Text, Block, Tabs, Tab, TabContent, Button, setLocale, getLocale } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const rows = [
  ['Cy Ganderton', 'Lead Developer', 'Blue'],
  ['Hart Hagerty', 'Desktop Support Technician', 'Purple'],
  ['Brice Swyre', 'Tax Accountant', 'Red'],
]

// 40 filas para el demo de paginación automática (pageSize 5 → 8 páginas).
const firstNames = ['Ada', 'Grace', 'Alan', 'Edsger', 'Margaret', 'Barbara', 'Donald', 'Linus', 'Ken', 'Guido', 'Brendan', 'James', 'Dennis', 'Bjarne', 'Anders', 'Yukihiro', 'Rich', 'John', 'Robert', 'Tim']
const lastNames = ['Lovelace', 'Hopper', 'Turing', 'Dijkstra', 'Hamilton', 'Liskov', 'Knuth', 'Torvalds', 'Thompson', 'van Rossum', 'Eich', 'Gosling', 'Ritchie', 'Stroustrup', 'Hejlsberg', 'Matsumoto', 'Hickey', 'Backus', 'Martin', 'Berners-Lee']
const roles = ['Engineer', 'Architect', 'Researcher', 'Manager', 'Designer']

const people = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name: `${firstNames[i % firstNames.length]} ${lastNames[i % lastNames.length]}`,
  role: roles[i % roles.length],
  salary: 32000 + ((i * 173) % 68000),
}))

// Columnas del demo principal: texto (A-Z) y numérica (mayor a menor).
const peopleColumns = [
  { key: 'name', title: 'Name', sortable: true },
  { key: 'role', title: 'Role', sortable: true },
  {
    key: 'salary',
    title: 'Salary',
    sortable: true,
    align: 'right',
    render: (p) => `$${p.salary.toLocaleString()}`,
  },
]

const usageCodeJsx = `import m from 'mithril'
import { Table } from 'panda-ui-mithril'

// 40 filas → pageSize 5 → 8 páginas; la Pagination aparece automáticamente.
export const MyPage = {
  view() {
    return (
      <div>
        <Table
          data={people}
          columns={[
            { key: 'name', title: 'Name', sortable: true },
            { key: 'salary', title: 'Salary', sortable: true, align: 'right' },
          ]}
          pageSize={5}
          rowKey={(p) => p.id}
          zebra
        />
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { Table } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Table, {
      data: people,
      columns: [
        { key: 'name', title: 'Name', sortable: true },
        { key: 'salary', title: 'Salary', sortable: true, align: 'right' },
      ],
      pageSize: 5,
      rowKey: (p) => p.id,
      zebra: true,
    })
  }
}`

export default {
  name: 'Table',
  category: 'Data Display',
  description: 'Table component for displaying data in a structured format.',

  oninit(vnode) {
    loadPageI18n('table')
    vnode.state.ctrlPage = 2
    vnode.state.ctrlSort = null
    vnode.state.locale = getLocale()
  },

  view(vnode) {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Table</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        {/* ── Compositivo (retrocompatibilidad) ── */}
        <Block spacing="lg">
          <Title as="h2" size="3">Zebra + hoverable rows</Title>
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

        {/* ── Bordered ── */}
        <Block spacing="lg">
          <Title as="h2" size="3">Bordered</Title>
          <Text color="neutral">
            <code>bordered</code> agrega la rejilla completa: borde exterior + divisores
            verticales entre columnas. Funciona en ambos modos (compositivo y data-driven).
          </Text>
          <TableContainer>
            <Table bordered zebra>
              <TableThead>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Job</TableHead>
                  <TableHead>Favorite Color</TableHead>
                </TableRow>
              </TableThead>
              <TableTbody>
                {rows.map((r) => (
                  <TableRow key={r[0]}>
                    <TableCell>{r[0]}</TableCell>
                    <TableCell>{r[1]}</TableCell>
                    <TableCell>{r[2]}</TableCell>
                  </TableRow>
                ))}
              </TableTbody>
            </Table>
          </TableContainer>
        </Block>

        {/* ── Data-driven + paginación automática ── */}
        <Block spacing="lg">
          <Title as="h2" size="3">Data-driven — paginación automática</Title>
          <Text color="neutral">
            40 filas con <code>pageSize={5}</code> → se muestran 5 por página y la
            <code> Pagination</code> aparece sola (con 3 filas no aparecería). Click en los
            encabezados para ordenar: texto A-Z/Z-A, sueldo mayor a menor / menor a mayor.
          </Text>
          <Table
            data={people}
            columns={peopleColumns}
            pageSize={5}
            rowKey={(p) => p.id}
            zebra
          />
        </Block>

        {/* ── Ordenamiento dedicado ── */}
        <Block spacing="lg">
          <Title as="h2" size="3">Sorting</Title>
          <Text color="neutral">
            Ciclo por click: <code>asc → desc → sin orden</code>. La detección de tipo es
            automática (numérico vs texto); <code>sortType</code> la fuerza y <code>sort</code>
            permite un comparador custom.
          </Text>
          <Table
            data={people.slice(0, 8)}
            columns={[
              { key: 'id', title: '#', width: '4rem' },
              { key: 'name', title: 'Name (A-Z)', sortable: true },
              { key: 'role', title: 'Role', sortable: true, sortType: 'string' },
              { key: 'salary', title: 'Salary (mayor a menor)', sortable: true, align: 'right' },
            ]}
            rowKey={(p) => p.id}
          />
        </Block>

        {/* ── Controlado ── */}
        <Block spacing="lg">
          <Title as="h2" size="3">Controlado — page + sort</Title>
          <Text color="neutral">
            <code>page</code>/<code>onchange</code> y <code>sort</code>/<code>onSortChange</code>
            siguen el contrato controlado de la librería: el estado vive fuera.
          </Text>
          <Table
            data={people}
            columns={peopleColumns}
            pageSize={5}
            page={vnode.state.ctrlPage}
            onchange={(p) => { vnode.state.ctrlPage = p }}
            sort={vnode.state.ctrlSort}
            onSortChange={(s) => { vnode.state.ctrlSort = s }}
            rowKey={(p) => p.id}
            zebra
          />
          <Text size="sm" color="neutral">
            Página: <code>{vnode.state.ctrlPage}</code> — orden:{' '}
            <code>{vnode.state.ctrlSort ? `${vnode.state.ctrlSort.key} (${vnode.state.ctrlSort.direction})` : 'ninguno'}</code>
          </Text>
        </Block>

        {/* ── Columnas: align / width / render ── */}
        <Block spacing="lg">
          <Title as="h2" size="3">Columnas — align, width, render</Title>
          <Text color="neutral">
            <code>align</code> y <code>width</code> por columna; <code>render</code> para celdas
            custom (acciones, formato).
          </Text>
          <Table
            data={people.slice(0, 5)}
            columns={[
              { key: 'id', title: '#', width: '3.5rem' },
              { key: 'name', title: 'Name' },
              { key: 'role', title: 'Role', width: '12rem' },
              { key: 'salary', title: 'Salary', align: 'right', render: (p) => `$${p.salary.toLocaleString()}` },
              { key: 'actions', title: '', align: 'right', render: () => m(Button, { variant: 'ghost', square: true, size: 'sm' }, '⋯') },
            ]}
            rowKey={(p) => p.id}
            zebra
            bordered
          />
        </Block>

        {/* ── Estados: empty + loading ── */}
        <Block spacing="lg">
          <Title as="h2" size="3">Estados — empty y loading</Title>
          <Text color="neutral">
            <code>empty</code> (fila con colSpan) y <code>loading</code> (filas Skeleton keyed).
          </Text>
          <Table data={[]} columns={peopleColumns} empty="No people found" />
          <Table data={people} columns={peopleColumns} loading loadingRows={4} />
        </Block>

        {/* ── i18n: español / inglés ── */}
        <Block spacing="lg">
          <Title as="h2" size="3">i18n — español / inglés</Title>
          <Text color="neutral">
            <code>setLocale('es' | 'en')</code> cambia los strings internos de la librería
            (estado vacío por defecto, aria-label de la paginación) y la elección se persiste en
            <code> localStorage</code> (<code>pum-lang</code>). Este demo muestra el estado
            vacío <em>por defecto</em> (sin prop <code>empty</code>).
          </Text>
          <Stack direction="row" gap="sm">
            <Button
              size="sm"
              variant={vnode.state.locale === 'en' ? 'soft' : 'ghost'}
              onclick={() => { setLocale('en'); vnode.state.locale = 'en' }}
            >
              English
            </Button>
            <Button
              size="sm"
              variant={vnode.state.locale === 'es' ? 'soft' : 'ghost'}
              onclick={() => { setLocale('es'); vnode.state.locale = 'es' }}
            >
              Español
            </Button>
          </Stack>
          <Table data={[]} columns={peopleColumns} />
        </Block>

        {/* ── Props del Pagination interno ── */}
        <Block spacing="lg">
          <Title as="h2" size="3">Props del Pagination interno</Title>
          <Text color="neutral">
            <code>{'pagination={{ ... }}'}</code> pasa props al <code>Pagination</code> interno
            (variant, shape, size, siblings, boundaries, ...); <code>pagination={false}</code>
            desactiva la paginación (muestra todas las filas).
          </Text>
          <Table
            data={people}
            columns={peopleColumns}
            pageSize={5}
            pagination={{ variant: 'separated', shape: 'circle', size: 'sm', siblings: 2 }}
            rowKey={(p) => p.id}
          />
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
