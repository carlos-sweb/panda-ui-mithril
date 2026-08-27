import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, OTP, Text, Button, Block, Box, Tabs, Tab, TabContent } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'
import table from './table.yaml'
import { tableToRows } from '../../components/table-rows'

const usageCodeJsx = `import m from 'mithril'
import { OTP } from 'panda-ui-mithril'

export const MyPage = {
  view() {
    return (
      <div>
        <OTP length={6} color="primary" oncomplete={(code) => verify(code)} />
      </div>
    )
  }
}`

const usageCodeJavascript = `import m from 'mithril'
import { OTP } from 'panda-ui-mithril'

export const OTPPage = {
  view() {
    return m(OTP, { length: 6, color: 'primary', oncomplete: (code) => verify(code) })
  }
}`

export default {
  name: 'OTP',
  category: 'Data Input',
  description: 'One-time password input component for verification codes.',

  oninit(vnode) {
    loadPageI18n('otp')
    vnode.state.code = ''
    vnode.state.log = []
    vnode.state.error = false
  },

  view(vnode) {
    const log = (ev) => {
      const time = new Date().toLocaleTimeString('en-US', { hour12: false })
      vnode.state.log.push(`[${time}] ${ev}`)
      if (vnode.state.log.length > 6) vnode.state.log.shift()
      m.redraw()
    }

    const validate = () => {
      vnode.state.error = vnode.state.code.length !== 6
      log(vnode.state.error ? 'invalid — code incomplete' : 'valid — code accepted')
      m.redraw()
    }

    const sizes = ['xs', 'sm', 'md', 'lg', 'xl']

    return (
      <Stack gap="lg">
        <Title as="h1" size="2">OTP</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Title as="h2" size="3">Basic</Title>
        <Stack direction="row" gap="lg" align="center">
          <OTP />
          <OTP length={6} />
        </Stack>

        <Title as="h2" size="3">Controlled + events</Title>
        <Text color="neutral">
          <code>onchange</code> fires on every change with the full code; <code>oncomplete</code>
          fires when all cells are filled.
        </Text>
        <Stack direction="row" gap="sm" align="center">
          <OTP
            length={6}
            value={vnode.state.code}
            onchange={(code) => {
              vnode.state.code = code
              log('onchange: ' + (code || '(empty)'))
            }}
            oncomplete={(code) => log('oncomplete: ' + code)}
          />
          <Button variant="outline" onclick={() => { vnode.state.code = '' }}>Clear</Button>
        </Stack>
        <Box
          className={css({
            marginTop: '1rem',
            padding: '1rem',
            background: 'token(colors.base-200)',
            borderRadius: 'var(--radius-box)',
            fontFamily: 'mono',
            fontSize: '0.875rem',
          })}
        >
          <Stack gap="xs">
            {vnode.state.log.length === 0
              ? <Text color="neutral">(no events yet — type a 6-digit code)</Text>
              : vnode.state.log.map((entry, i) => <Text key={i}>{entry}</Text>)}
          </Stack>
        </Box>

        <Title as="h2" size="3">Types</Title>
        <Text color="neutral">
          <code>type="numeric"</code> (default), <code>type="alphanumeric"</code>, or a custom
          <code> pattern</code> — characters that don't match are discarded.
        </Text>
        <Stack direction="row" gap="lg" align="center">
          <OTP placeholder="0-9" />
          <OTP length={4} type="alphanumeric" placeholder="A-Z" />
          <OTP length={4} pattern={/^[0-3]$/} placeholder="0-3" />
        </Stack>

        <Title as="h2" size="3">Mask</Title>
        <Stack direction="row" gap="lg" align="center">
          <OTP length={6} mask />
          <OTP length={6} mask="_" />
        </Stack>

        <Title as="h2" size="3">Validation</Title>
        <Text color="neutral">
          The <code>error</code> prop applies error styles and <code>aria-invalid</code> — here it's
          driven by a validate button.
        </Text>
        <Stack direction="row" gap="sm" align="center">
          <OTP length={6} error={vnode.state.error} value={vnode.state.code} onchange={(c) => { vnode.state.code = c }} />
          <Button onclick={validate}>Validate</Button>
        </Stack>

        <Title as="h2" size="3">States</Title>
        <Stack direction="row" gap="lg" align="center">
          <OTP disabled />
          <OTP readonly value="1234" />
        </Stack>

        <Title as="h2" size="3">Joined + separator</Title>
        <Stack direction="row" gap="lg" align="center">
          <OTP joined />
          <OTP length={6} separator="-" />
        </Stack>

        <Title as="h2" size="3">Sizes</Title>
        <Stack direction="row" gap="md" align="center">
          {sizes.map((s) => <OTP key={s} size={s} />)}
        </Stack>

        <Block spacing="lg">
          <Title as="h2" size="3">One time code</Title>
          <Text color="neutral">
            With <code>oneTimeCode</code>, the first cell gets <code>autocomplete="one-time-code"</code> so
            iOS/macOS keyboards suggest the SMS code.
          </Text>
          <OTP length={6} oneTimeCode />
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
