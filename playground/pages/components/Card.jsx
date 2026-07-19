import m from 'mithril'
import { css } from '../../../styled-system/css'
import { Card, CardBody, CardTitle, CardActions, Button } from '../../../src/index.js'

const section = css({ marginBottom: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })

export default {
  name: 'Card',
  category: 'Data Display',
  description: 'Cards are used to group and display content in a contained layout.',

  view() {
    return (
      <div className={stack}>
        <h1 style={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Card</h1>
        <p style={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Cards are used to group and display content in a contained layout.
        </p>

        <section className={section}>
          <h3 className={heading}>With Border</h3>
          <Card border>
            <CardBody>
              <CardTitle>Card Title</CardTitle>
              <p>This is a card with a border and some content inside.</p>
              <CardActions justify="end">
                <Button color="primary" size="sm">Action</Button>
              </CardActions>
            </CardBody>
          </Card>
        </section>

        <section className={section}>
          <h3 className={heading}>Side Card</h3>
          <Card side className="bg-base-100 shadow-xl">
            <figure>
              <img src="https://picsum.photos/200/200" alt="Card" style="width: 200px; height: 200px; object-fit: cover;" />
            </figure>
            <CardBody>
              <CardTitle>Side Card</CardTitle>
              <p>Card with side layout.</p>
            </CardBody>
          </Card>
        </section>
      </div>
    )
  }
}
