import m from 'mithril'
import { css } from '../../styled-system/css'
import { t } from '../i18n/index.js'
import { Card, CardBody, CardTitle, CardActions, CardFigure, Button } from '../../src/index.js'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const section = css({ marginBottom: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })
const row = css({ display: 'flex', gap: '1rem', flexWrap: 'wrap', alignItems: 'flex-start' })
const surface = css({ background: 'token(colors.base-100)', boxShadow: '0 1px 3px color-mix(in oklab, black 15%, transparent)', width: '20rem' })
const surfaceSide = css({ background: 'token(colors.base-100)', boxShadow: '0 1px 3px color-mix(in oklab, black 15%, transparent)' })
const img200 = css({ width: '100%', height: '10rem', objectFit: 'cover' })
const imgSide = css({ width: '12rem', height: '100%', objectFit: 'cover' })

const usageCode = `<Card className="bg-base-100 shadow-sm w-96">
  <CardFigure><img src="..." alt="..." /></CardFigure>
  <CardBody>
    <CardTitle>Card Title</CardTitle>
    <p>A card has a figure, a body, and inside body a title and actions.</p>
    <CardActions justify="end">
      <Button color="primary">Buy Now</Button>
    </CardActions>
  </CardBody>
</Card>`

const classRows = [
  { className: 'card', prop: '<Card>', type: 'Component', description: 'Card' },
  { className: 'card-title', prop: '<CardTitle>', type: 'Part', description: 'Title part' },
  { className: 'card-body', prop: '<CardBody>', type: 'Part', description: 'Body part (content)' },
  { className: 'card-actions', prop: '<CardActions justify="...">', type: 'Part', description: 'Actions part (buttons, etc.)' },
  { className: '(figure)', prop: '<CardFigure>', type: 'Part', description: 'Image/figure container' },
  { className: 'card-border', prop: 'border', type: 'Style', description: 'Adds border to card' },
  { className: 'card-dash', prop: 'dash', type: 'Style', description: 'Dash style border' },
  { className: 'card-side', prop: 'side', type: 'Modifier', description: 'The image in the figure will be on the side' },
  { className: 'image-full', prop: 'imageFull', type: 'Modifier', description: 'The image in the figure will be the background' },
  { className: 'card-xs', prop: 'size="xs"', type: 'Size', description: 'Extra small size' },
  { className: 'card-sm', prop: 'size="sm"', type: 'Size', description: 'Small size' },
  { className: 'card-md', prop: 'size="md" (default)', type: 'Size', description: 'Medium size', isDefault: true },
  { className: 'card-lg', prop: 'size="lg"', type: 'Size', description: 'Large size' },
  { className: 'card-xl', prop: 'size="xl"', type: 'Size', description: 'Extra large size' },
]

export default {
  name: 'Card',
  category: 'Data Display',
  description: 'Cards are used to group and display content in a contained layout.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Card</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          {t('paragraphs.card')}
        </p>

        <section className={section}>
          <h3 className={heading}>With figure + actions</h3>
          <div className={row}>
            <Card className={surface}>
              <CardFigure><img className={img200} src="https://picsum.photos/seed/panda-card/400/300" alt="Random" /></CardFigure>
              <CardBody>
                <CardTitle>Card Title</CardTitle>
                <p>A card has a figure, a body, and inside body a title and actions.</p>
                <CardActions justify="end">
                  <Button color="primary" size="sm">Buy Now</Button>
                </CardActions>
              </CardBody>
            </Card>

            <Card border className={css({ width: '20rem', background: 'token(colors.base-100)' })}>
              <CardBody>
                <CardTitle>Bordered</CardTitle>
                <p>This card has a border and no shadow.</p>
                <CardActions justify="end">
                  <Button size="sm">Action</Button>
                </CardActions>
              </CardBody>
            </Card>

            <Card dash className={css({ width: '20rem', background: 'token(colors.base-100)' })}>
              <CardBody>
                <CardTitle>Dashed</CardTitle>
                <p>This card uses a dashed border style.</p>
              </CardBody>
            </Card>
          </div>
        </section>

        <section className={section}>
          <h3 className={heading}>Side layout</h3>
          <Card side className={surfaceSide}>
            <CardFigure><img className={imgSide} src="https://picsum.photos/seed/panda-side/300/300" alt="Random" /></CardFigure>
            <CardBody>
              <CardTitle>Side Card</CardTitle>
              <p>The figure sits to the side instead of on top.</p>
              <CardActions justify="end">
                <Button color="primary" size="sm">Buy Now</Button>
              </CardActions>
            </CardBody>
          </Card>
        </section>

        <section className={section}>
          <h3 className={heading}>Image full (background)</h3>
          <Card imageFull className={css({ width: '20rem', height: '16rem' })}>
            <CardFigure><img className={css({ width: '100%', height: '100%', objectFit: 'cover' })} src="https://picsum.photos/seed/panda-full/400/300" alt="Random" /></CardFigure>
            <CardBody>
              <CardTitle>Full image</CardTitle>
              <p>The image becomes the card's background, text sits on top.</p>
              <CardActions justify="end">
                <Button color="primary" size="sm">Buy Now</Button>
              </CardActions>
            </CardBody>
          </Card>
        </section>

        <section className={section}>
          <h3 className={heading}>Sizes</h3>
          <div className={row}>
            <Card size="xs" border className={css({ width: '12rem', background: 'token(colors.base-100)' })}>
              <CardBody><CardTitle>XS</CardTitle><p>Extra small</p></CardBody>
            </Card>
            <Card size="lg" border className={css({ width: '16rem', background: 'token(colors.base-100)' })}>
              <CardBody><CardTitle>LG</CardTitle><p>Large size</p></CardBody>
            </Card>
          </div>
        </section>

        <section>
          <h2 className={sectionTitle}>{t('common.usage')}</h2>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <h2 className={sectionTitle}>{t('common.classReference')}</h2>
          <ClassTable rows={classRows} />
        </section>
      </div>
    )
  }
}
