import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, Calendar, Text, Block, Tabs, Tab, TabContent, Button, Card, CardBody } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const surface = css({
  display: 'inline-block',
  background: 'token(colors.base-100)',
  border: '1px solid',
  borderColor: 'token(colors.base-300)',
  boxShadow: '0 4px 12px color-mix(in oklab, black 15%, transparent)',
})

const sectionDesc = css({ marginBottom: '1rem', maxWidth: '600px' })

// <Card side border shadow> + <CardBody rail> ya hacen todo el trabajo
// visual (fila con Calendar a la izquierda, riel de presets a la derecha
// con borde divisor y contenido centrado, fondo/borde/radio/sombra
// consistentes con el resto de la librería). Solo queda alignSelf, que es
// a propósito NO parte de esas props — Card vive dentro de un <Stack> con
// align="stretch" en esta página, pero eso es una decisión de ESTE layout,
// no algo que Card deba asumir (un Card en un grid sí puede querer
// estirarse). overflow:hidden recorta el fondo redondeado del riel.
const cardFloat = css({ alignSelf: 'flex-start', overflow: 'hidden' })

// ── Helpers para los demos de presets (fechas de ejemplo, sin dependencias) ──
function addDays(date, n) {
  const d = new Date(date)
  d.setDate(d.getDate() + n)
  return d
}
function startOfMonth(date) { return new Date(date.getFullYear(), date.getMonth(), 1) }
function endOfMonth(date) { return new Date(date.getFullYear(), date.getMonth() + 1, 0) }
function fmtDate(d) { return d instanceof Date ? d.toDateString() : '—' }
function fmtRange(r) {
  if (!r || !r.start) return t('status.noRangeSelected')
  return `${fmtDate(r.start)}  →  ${r.end ? fmtDate(r.end) : '…'}`
}
function isWeekend(date) { const day = date.getDay(); return day === 0 || day === 6 }

const DATE_PRESETS = [
  { label: 'Today', get: () => new Date() },
  { label: 'Tomorrow', get: () => addDays(new Date(), 1) },
  { label: 'In a week', get: () => addDays(new Date(), 7) },
  { label: 'In a month', get: () => { const d = new Date(); d.setMonth(d.getMonth() + 1); return d } },
]
const RANGE_PRESETS = [
  { label: 'Today', get: () => { const d = new Date(); return { start: d, end: d } } },
  { label: 'Last 7 days', get: () => ({ start: addDays(new Date(), -6), end: new Date() }) },
  { label: 'This month', get: () => { const d = new Date(); return { start: startOfMonth(d), end: endOfMonth(d) } } },
  { label: 'Last month', get: () => { const d = new Date(); const lm = new Date(d.getFullYear(), d.getMonth() - 1, 1); return { start: startOfMonth(lm), end: endOfMonth(lm) } } },
]
const TIME_PRESETS = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00']

// Ejemplo de `locale` custom — independiente del setLocale('en'|'es') de la
// librería, así un consumidor con su app en francés (o cualquier otro
// idioma) le pasa sus propios nombres sin esperar a que la librería lo
// soporte de forma nativa.
const FRENCH_LOCALE = {
  months: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  weekdaysShort: ['di', 'lu', 'ma', 'me', 'je', 've', 'sa'],
}

// ── Snippets de código (Jsx / Js) — uno por sección ─────────────────────────
const basicJsx = `import m from 'mithril'
import { Calendar } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <Calendar
        value={selectedDate}
        onchange={(date) => { selectedDate = date }}
      />
    )
  }
}`
const basicJs = `import m from 'mithril'
import { Calendar } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Calendar, {
      value: selectedDate,
      onchange: (date) => { selectedDate = date }
    })
  }
}`

const rangeJsx = `import m from 'mithril'
import { Calendar } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <Calendar
        mode="range"
        value={range}
        onchange={(next) => { range = next }}
      />
    )
  }
}`
const rangeJs = `import m from 'mithril'
import { Calendar } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Calendar, {
      mode: 'range',
      value: range,
      onchange: (next) => { range = next }
    })
  }
}`

const disabledJsx = `import m from 'mithril'
import { Calendar } from 'panda-ui-mithril'

const isWeekend = (date) => date.getDay() === 0 || date.getDay() === 6

export const MyPage = {
  view() {
    return (
      <Calendar
        value={selectedDate}
        onchange={(date) => { selectedDate = date }}
        isDateDisabled={isWeekend}
      />
    )
  }
}`
const disabledJs = `import m from 'mithril'
import { Calendar } from 'panda-ui-mithril'

const isWeekend = (date) => date.getDay() === 0 || date.getDay() === 6

export const MyPage = {
  view() {
    return m(Calendar, {
      value: selectedDate,
      onchange: (date) => { selectedDate = date },
      isDateDisabled: isWeekend
    })
  }
}`

const multipleJsx = `import m from 'mithril'
import { Calendar } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <Calendar
        mode="multiple"
        value={selectedDates}
        onchange={(next) => { selectedDates = next }}
      />
    )
  }
}`
const multipleJs = `import m from 'mithril'
import { Calendar } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Calendar, {
      mode: 'multiple',
      value: selectedDates,
      onchange: (next) => { selectedDates = next }
    })
  }
}`

const monthYearJsx = `import m from 'mithril'
import { Calendar } from 'panda-ui-mithril'

// Click the "September 2026" title in the header: it drills down into a
// month grid, then a year grid, so picking a far-off month/year never
// needs clicking the prev/next arrows one step at a time.
export const MyPage = {
  view() {
    return (
      <Calendar
        value={selectedDate}
        onchange={(date) => { selectedDate = date }}
      />
    )
  }
}`
const monthYearJs = `import m from 'mithril'
import { Calendar } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Calendar, {
      value: selectedDate,
      onchange: (date) => { selectedDate = date }
    })
  }
}`

const yearNavJsx = `import m from 'mithril'
import { Calendar } from 'panda-ui-mithril'

// initialView jumps straight into the year grid on mount — handy for a
// date-of-birth style picker where the day view is the wrong starting point.
export const MyPage = {
  view() {
    return (
      <Calendar
        initialView="year"
        value={selectedDate}
        onchange={(date) => { selectedDate = date }}
      />
    )
  }
}`
const yearNavJs = `import m from 'mithril'
import { Calendar } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Calendar, {
      initialView: 'year',
      value: selectedDate,
      onchange: (date) => { selectedDate = date }
    })
  }
}`

const weekNumbersJsx = `import m from 'mithril'
import { Calendar } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <Calendar
        showWeekNumbers
        value={selectedDate}
        onchange={(date) => { selectedDate = date }}
      />
    )
  }
}`
const weekNumbersJs = `import m from 'mithril'
import { Calendar } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Calendar, {
      showWeekNumbers: true,
      value: selectedDate,
      onchange: (date) => { selectedDate = date }
    })
  }
}`

const customNavJsx = `import m from 'mithril'
import { Calendar } from 'panda-ui-mithril'

// Same mechanism as "Month and year selection" — shown here to make the
// full day -> month -> year -> month -> day round trip explicit.
export const MyPage = {
  view() {
    return (
      <Calendar
        value={selectedDate}
        onchange={(date) => { selectedDate = date }}
      />
    )
  }
}`
const customNavJs = `import m from 'mithril'
import { Calendar } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Calendar, {
      value: selectedDate,
      onchange: (date) => { selectedDate = date }
    })
  }
}`

const presetTimeJsx = `import m from 'mithril'
import { Calendar, Button, Card, CardBody } from 'panda-ui-mithril'
import { css } from 'panda-ui-mithril/styled-system/css'

const TIMES = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00']

// side/border/shadow lay out and elevate the card; CardBody's rail adds the
// divider and centers its content — no hand-rolled wrapper needed. alignSelf
// stays a small className: it depends on THIS page's own layout (a
// <Stack align="stretch">), not something Card should assume for everyone.
const floaty = css({ alignSelf: 'flex-start' })

export const MyPage = {
  view() {
    return (
      <Card side border shadow className={floaty}>
        <Calendar value={date} onchange={(d) => { date = d }} />
        <CardBody rail>
          {TIMES.map((time) => (
            <Button
              key={time}
              size="sm"
              variant={selectedTime === time ? undefined : 'outline'}
              onclick={() => { selectedTime = time }}
            >
              {time}
            </Button>
          ))}
        </CardBody>
      </Card>
    )
  }
}`
const presetTimeJs = `import m from 'mithril'
import { Calendar, Button, Card, CardBody } from 'panda-ui-mithril'
import { css } from 'panda-ui-mithril/styled-system/css'

const TIMES = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00']

const floaty = css({ alignSelf: 'flex-start' })

export const MyPage = {
  view() {
    return m(Card, { side: true, border: true, shadow: true, className: floaty }, [
      m(Calendar, { value: date, onchange: (d) => { date = d } }),
      m(CardBody, { rail: true }, TIMES.map((time) => m(Button, {
        key: time,
        size: 'sm',
        variant: selectedTime === time ? undefined : 'outline',
        onclick: () => { selectedTime = time },
      }, time))),
    ])
  }
}`

const presetsJsx = `import m from 'mithril'
import { Calendar, Button, Card, CardBody } from 'panda-ui-mithril'
import { css } from 'panda-ui-mithril/styled-system/css'

const PRESETS = [
  { label: 'Today', get: () => new Date() },
  { label: 'Tomorrow', get: () => addDays(new Date(), 1) },
]

const floaty = css({ alignSelf: 'flex-start' })

export const MyPage = {
  view() {
    return (
      <Card side border shadow className={floaty}>
        <Calendar value={date} onchange={(d) => { date = d }} />
        <CardBody rail>
          {PRESETS.map((p) => (
            <Button key={p.label} size="sm" variant="outline" onclick={() => { date = p.get() }}>
              {p.label}
            </Button>
          ))}
        </CardBody>
      </Card>
    )
  }
}`
const presetsJs = `import m from 'mithril'
import { Calendar, Button, Card, CardBody } from 'panda-ui-mithril'
import { css } from 'panda-ui-mithril/styled-system/css'

const PRESETS = [
  { label: 'Today', get: () => new Date() },
  { label: 'Tomorrow', get: () => addDays(new Date(), 1) },
]

const floaty = css({ alignSelf: 'flex-start' })

export const MyPage = {
  view() {
    return m(Card, { side: true, border: true, shadow: true, className: floaty }, [
      m(Calendar, { value: date, onchange: (d) => { date = d } }),
      m(CardBody, { rail: true }, PRESETS.map((p) => m(Button, {
        key: p.label, size: 'sm', variant: 'outline', onclick: () => { date = p.get() },
      }, p.label))),
    ])
  }
}`

const rangePresetsJsx = `import m from 'mithril'
import { Calendar, Button, Card, CardBody } from 'panda-ui-mithril'
import { css } from 'panda-ui-mithril/styled-system/css'

const PRESETS = [
  { label: 'Last 7 days', get: () => ({ start: addDays(new Date(), -6), end: new Date() }) },
  { label: 'This month', get: () => ({ start: startOfMonth(new Date()), end: endOfMonth(new Date()) }) },
]

const floaty = css({ alignSelf: 'flex-start' })

export const MyPage = {
  view() {
    return (
      <Card side border shadow className={floaty}>
        <Calendar mode="range" value={range} onchange={(next) => { range = next }} />
        <CardBody rail>
          {PRESETS.map((p) => (
            <Button key={p.label} size="sm" variant="outline" onclick={() => { range = p.get() }}>
              {p.label}
            </Button>
          ))}
        </CardBody>
      </Card>
    )
  }
}`
const rangePresetsJs = `import m from 'mithril'
import { Calendar, Button, Card, CardBody } from 'panda-ui-mithril'
import { css } from 'panda-ui-mithril/styled-system/css'

const PRESETS = [
  { label: 'Last 7 days', get: () => ({ start: addDays(new Date(), -6), end: new Date() }) },
  { label: 'This month', get: () => ({ start: startOfMonth(new Date()), end: endOfMonth(new Date()) }) },
]

const floaty = css({ alignSelf: 'flex-start' })

export const MyPage = {
  view() {
    return m(Card, { side: true, border: true, shadow: true, className: floaty }, [
      m(Calendar, { mode: 'range', value: range, onchange: (next) => { range = next } }),
      m(CardBody, { rail: true }, PRESETS.map((p) => m(Button, {
        key: p.label, size: 'sm', variant: 'outline', onclick: () => { range = p.get() },
      }, p.label))),
    ])
  }
}`

const customLocaleJsx = `import m from 'mithril'
import { Calendar } from 'panda-ui-mithril'

// Independent of the library's own setLocale('en'|'es') — any language
// works, the calendar just renders whatever strings you give it.
const fr = {
  months: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  weekdaysShort: ['di', 'lu', 'ma', 'me', 'je', 've', 'sa'],
}

export const MyPage = {
  view() {
    return (
      <Calendar
        locale={fr}
        value={selectedDate}
        onchange={(date) => { selectedDate = date }}
      />
    )
  }
}`
const customLocaleJs = `import m from 'mithril'
import { Calendar } from 'panda-ui-mithril'

const fr = {
  months: ['janvier', 'février', 'mars', 'avril', 'mai', 'juin', 'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'],
  weekdaysShort: ['di', 'lu', 'ma', 'me', 'je', 've', 'sa'],
}

export const MyPage = {
  view() {
    return m(Calendar, {
      locale: fr,
      value: selectedDate,
      onchange: (date) => { selectedDate = date }
    })
  }
}`

const weekStartJsx = `import m from 'mithril'
import { Calendar } from 'panda-ui-mithril'

// 0=Sunday (US default), 1=Monday (most countries outside the US), ... 6=Saturday.
// Only the display order of the columns changes — each cell's real date is
// the same either way.
export const MyPage = {
  view() {
    return (
      <Calendar
        weekStartsOn={1}
        value={selectedDate}
        onchange={(date) => { selectedDate = date }}
      />
    )
  }
}`
const weekStartJs = `import m from 'mithril'
import { Calendar } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return m(Calendar, {
      weekStartsOn: 1,
      value: selectedDate,
      onchange: (date) => { selectedDate = date }
    })
  }
}`

// Un bloque "demo + código" reutilizado por las secciones.
function section(titleKey, descKey, demo, jsxCode, jsCode) {
  return (
    <Block spacing="lg">
      <Title as="h2" size="3">{t(titleKey)}</Title>
      <Text color="neutral" className={sectionDesc}>{t(descKey)}</Text>
      {demo}
      <Tabs defaultActive="jsx" lifted size="lg">
        <Tab ref="jsx">Jsx</Tab>
        <Tab ref="js">Js</Tab>
        <TabContent ref="jsx"><CodeExample type="jsx" code={jsxCode} /></TabContent>
        <TabContent ref="js"><CodeExample type="javascript" code={jsCode} /></TabContent>
      </Tabs>
    </Block>
  )
}

export default {
  oninit(vnode) {
    loadPageI18n('calendar')
    const s = vnode.state
    s.basic = new Date()
    s.range = { start: null, end: null }
    s.disabled = new Date()
    s.multiple = []
    s.monthYear = new Date()
    s.yearNav = new Date()
    s.weekNum = new Date()
    s.customNav = new Date()
    s.presetDate = new Date()
    s.presetTime = '09:00'
    s.presetsValue = new Date()
    s.rangePresetsValue = { start: null, end: null }
    s.customLocaleValue = new Date()
    s.weekStartValue = new Date()
  },

  name: 'Calendar',
  category: 'Data Input',
  description: 'Calendar component for selecting dates.',

  view(vnode) {
    const s = vnode.state

    return (
      <Stack gap="lg">
        <Title as="h1" size="2">Calendar</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        {/* 1. Basic Calendar */}
        <Block spacing="lg">
          <Title as="h2" size="3">{t('basic.title')}</Title>
          <Text color="neutral" className={sectionDesc}>{t('basic.desc')}</Text>
          <Stack gap="xs">
            <Calendar className={surface} value={s.basic} onchange={(date) => { s.basic = date }} />
            <Text size="sm" color="neutral">{t('status.selected')} {fmtDate(s.basic)}</Text>
          </Stack>
          <Tabs defaultActive="jsx" lifted size="lg">
            <Tab ref="jsx">Jsx</Tab>
            <Tab ref="js">Js</Tab>
            <TabContent ref="jsx"><CodeExample type="jsx" code={basicJsx} /></TabContent>
            <TabContent ref="js"><CodeExample type="javascript" code={basicJs} /></TabContent>
          </Tabs>
        </Block>

        {/* 2. Range Calendar */}
        {section('range.title', 'range.desc', (
          <Stack gap="xs">
            <Calendar className={surface} mode="range" value={s.range} onchange={(next) => { s.range = next }} />
            <Text size="sm" color="neutral">{fmtRange(s.range)}</Text>
          </Stack>
        ), rangeJsx, rangeJs)}

        {/* 3. Disabled Dates */}
        {section('disabled.title', 'disabled.desc', (
          <Stack gap="xs">
            <Calendar className={surface} value={s.disabled} onchange={(date) => { s.disabled = date }} isDateDisabled={isWeekend} />
            <Text size="sm" color="neutral">{t('status.selected')} {fmtDate(s.disabled)}</Text>
          </Stack>
        ), disabledJsx, disabledJs)}

        {/* 4. Multiple day selection */}
        {section('multiple.title', 'multiple.desc', (
          <Stack gap="xs">
            <Calendar className={surface} mode="multiple" value={s.multiple} onchange={(next) => { s.multiple = next }} />
            <Text size="sm" color="neutral">{s.multiple.length ? s.multiple.map(fmtDate).join(', ') : t('status.noDatesSelected')}</Text>
          </Stack>
        ), multipleJsx, multipleJs)}

        {/* 5. Month and year selection */}
        {section('monthYear.title', 'monthYear.desc', (
          <Stack gap="xs">
            <Calendar className={surface} value={s.monthYear} onchange={(date) => { s.monthYear = date }} />
            <Text size="sm" color="neutral">{t('status.selected')} {fmtDate(s.monthYear)}</Text>
          </Stack>
        ), monthYearJsx, monthYearJs)}

        {/* 6. Year select with navigation */}
        {section('yearNav.title', 'yearNav.desc', (
          <Stack gap="xs">
            <Calendar className={surface} initialView="year" value={s.yearNav} onchange={(date) => { s.yearNav = date }} />
            <Text size="sm" color="neutral">{t('status.selected')} {fmtDate(s.yearNav)}</Text>
          </Stack>
        ), yearNavJsx, yearNavJs)}

        {/* 7. Display week numbers */}
        {section('weekNumbers.title', 'weekNumbers.desc', (
          <Stack gap="xs">
            <Calendar className={surface} showWeekNumbers value={s.weekNum} onchange={(date) => { s.weekNum = date }} />
            <Text size="sm" color="neutral">{t('status.selected')} {fmtDate(s.weekNum)}</Text>
          </Stack>
        ), weekNumbersJsx, weekNumbersJs)}

        {/* 8. Custom navigation with year view */}
        {section('customNav.title', 'customNav.desc', (
          <Stack gap="xs">
            <Calendar className={surface} value={s.customNav} onchange={(date) => { s.customNav = date }} />
            <Text size="sm" color="neutral">{t('status.selected')} {fmtDate(s.customNav)}</Text>
          </Stack>
        ), customNavJsx, customNavJs)}

        {/* 9. Preset time selection */}
        {section('presetTime.title', 'presetTime.desc', (
          <Stack gap="xs">
            <Card side border shadow className={cardFloat}>
              <Calendar value={s.presetDate} onchange={(date) => { s.presetDate = date }} />
              <CardBody rail>
                {TIME_PRESETS.map((time) => (
                  <Button key={time} size="sm" variant={s.presetTime === time ? undefined : 'outline'} onclick={() => { s.presetTime = time }}>
                    {time}
                  </Button>
                ))}
              </CardBody>
            </Card>
            <Text size="sm" color="neutral">{fmtDate(s.presetDate)} {t('status.at')} {s.presetTime}</Text>
          </Stack>
        ), presetTimeJsx, presetTimeJs)}

        {/* 10. Calendar with presets */}
        {section('presets.title', 'presets.desc', (
          <Stack gap="xs">
            <Card side border shadow className={cardFloat}>
              <Calendar value={s.presetsValue} onchange={(date) => { s.presetsValue = date }} />
              <CardBody rail>
                {DATE_PRESETS.map((p) => (
                  <Button key={p.label} size="sm" variant="outline" onclick={() => { s.presetsValue = p.get() }}>
                    {p.label}
                  </Button>
                ))}
              </CardBody>
            </Card>
            <Text size="sm" color="neutral">{t('status.selected')} {fmtDate(s.presetsValue)}</Text>
          </Stack>
        ), presetsJsx, presetsJs)}

        {/* 11. Range calendar with presets */}
        {section('rangePresets.title', 'rangePresets.desc', (
          <Stack gap="xs">
            <Card side border shadow className={cardFloat}>
              <Calendar mode="range" value={s.rangePresetsValue} onchange={(next) => { s.rangePresetsValue = next }} />
              <CardBody rail>
                {RANGE_PRESETS.map((p) => (
                  <Button key={p.label} size="sm" variant="outline" onclick={() => { s.rangePresetsValue = p.get() }}>
                    {p.label}
                  </Button>
                ))}
              </CardBody>
            </Card>
            <Text size="sm" color="neutral">{fmtRange(s.rangePresetsValue)}</Text>
          </Stack>
        ), rangePresetsJsx, rangePresetsJs)}

        {/* 12. Custom locale */}
        {section('customLocale.title', 'customLocale.desc', (
          <Stack gap="xs">
            <Calendar className={surface} locale={FRENCH_LOCALE} value={s.customLocaleValue} onchange={(date) => { s.customLocaleValue = date }} />
            <Text size="sm" color="neutral">{t('status.selected')} {fmtDate(s.customLocaleValue)}</Text>
          </Stack>
        ), customLocaleJsx, customLocaleJs)}

        {/* 13. Week starts on Monday */}
        {section('weekStart.title', 'weekStart.desc', (
          <Stack gap="xs">
            <Calendar className={surface} weekStartsOn={1} value={s.weekStartValue} onchange={(date) => { s.weekStartValue = date }} />
            <Text size="sm" color="neutral">{t('status.selected')} {fmtDate(s.weekStartValue)}</Text>
          </Stack>
        ), weekStartJsx, weekStartJs)}

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={tableToRows(table)} />
        </Block>
      </Stack>
    )
  }
}
