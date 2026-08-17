import m from 'mithril'
import { css } from '../../../styled-system/css'
import { t, loadPageI18n } from '../../i18n/index.js'
import { Stack, Title, RatingGroup, Rating, Text, Block } from '../../../src/index.js'
import { CodeExample } from '../../components/CodeExample.jsx'
import { ClassTable } from '../../components/ClassTable.jsx'

const usageCode = `<RatingGroup label="Score" defaultValue={3} onchange={(v) => console.log(v)} />
<RatingGroup label="Rating" value={4} onchange={setValue} color="primary" />`

const classRows = [
  { className: 'rating-group', prop: '<RatingGroup>', type: 'Component', description: 'Rating wrapper with label and value display' },
  { className: 'rating-group-label', prop: 'label', type: 'string', description: 'Label text displayed above/beside the stars' },
]

export default {
  oninit() { loadPageI18n('ratinggroup') },

  view() {
    return (
      <Stack gap="lg">
        <Title as="h1" size="2">RatingGroup</Title>
        <Text color="neutral" className={css({ marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraph')}
        </Text>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.usage')}</Title>
          <CodeExample code={usageCode} language="jsx" />
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">Basic</Title>
          <Text size="sm" color="neutral">Wrap Rating with a label that shows the value</Text>
          <Stack direction="row" gap="md" wrap="wrap">
            <RatingGroup label="Score" defaultValue={3} />
            <RatingGroup label="Quality" defaultValue={4} color="secondary" size="lg" />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">Readonly</Title>
          <Text size="sm" color="neutral">Display-only: no interaction, label with score</Text>
          <Stack direction="row" gap="md" wrap="wrap">
            <RatingGroup label="Rating" value={4} readonly />
            <RatingGroup label="Performance" value={2} readonly color="info" />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">Colors</Title>
          <Stack direction="row" gap="md" wrap="wrap">
            <RatingGroup label="Default" defaultValue={3} />
            <RatingGroup label="Primary" defaultValue={3} color="primary" />
            <RatingGroup label="Secondary" defaultValue={3} color="secondary" />
            <RatingGroup label="Accent" defaultValue={3} color="accent" />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">Sizes</Title>
          <Stack direction="row" gap="md" wrap="wrap">
            <RatingGroup label="xs" defaultValue={3} size="xs" />
            <RatingGroup label="sm" defaultValue={3} size="sm" />
            <RatingGroup label="md" defaultValue={3} />
            <RatingGroup label="lg" defaultValue={3} size="lg" />
            <RatingGroup label="xl" defaultValue={3} size="xl" />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">Hide value</Title>
          <Text size="sm" color="neutral">showValue={'{false}'} — label only, no numeric display</Text>
          <Stack direction="row" gap="md" wrap="wrap">
            <RatingGroup label="Overall" defaultValue={4} showValue={false} />
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">With standalone Rating</Title>
          <Text size="sm" color="neutral">Compare: Rating (no label) vs RatingGroup (with label)</Text>
          <Stack direction="row" gap="md" wrap="wrap">
            <Stack gap="xs">
              <Text size="sm" color="neutral">Rating</Text>
              <Rating defaultValue={3} />
            </Stack>
            <Stack gap="xs">
              <Text size="sm" color="neutral">RatingGroup</Text>
              <RatingGroup label="Score" defaultValue={3} />
            </Stack>
          </Stack>
        </Block>

        <Block spacing="lg">
          <Title as="h2" size="3">{t('common.classReference')}</Title>
          <ClassTable rows={classRows} />
        </Block>
      </Stack>
    )
  }
}
