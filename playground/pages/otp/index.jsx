import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, OTP, Text, Block } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'


const usageCode = '<OTP length={6} color="primary" />'

const classRows = [
  { className: 'otp', prop: '<OTP length={...}>', type: 'Component', description: 'For the container label' },
  { className: 'otp-joined', prop: 'joined', type: 'Modifier', description: 'Connects the character boxes together' },
  { className: 'otp-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'otp-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'otp-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'otp-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'otp-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
  { className: 'otp-neutral', prop: 'color="neutral"', type: 'Color', description: 'neutral color' },
  { className: 'otp-primary', prop: 'color="primary"', type: 'Color', description: 'primary color' },
  { className: 'otp-secondary', prop: 'color="secondary"', type: 'Color', description: 'secondary color' },
  { className: 'otp-accent', prop: 'color="accent"', type: 'Color', description: 'accent color' },
  { className: 'otp-success', prop: 'color="success"', type: 'Color', description: 'success color' },
  { className: 'otp-info', prop: 'color="info"', type: 'Color', description: 'info color' },
  { className: 'otp-warning', prop: 'color="warning"', type: 'Color', description: 'warning color' },
  { className: 'otp-error', prop: 'color="error"', type: 'Color', description: 'error color' },
]

export default {
  name: 'OTP',
  category: 'Data Input',
  description: 'One-time password input component for verification codes.',

  oninit() { loadPageI18n('otp') },
  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">OTP</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <OTP length={4} />
        <OTP length={6} color="primary" />

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <CodeExample code={usageCode} />
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </Block>
      </Stack>
    )
  }
}
