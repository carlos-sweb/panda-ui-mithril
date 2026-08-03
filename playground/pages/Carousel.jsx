import m from 'mithril'
import { css } from '../../styled-system/css'
import { Carousel, CarouselItem } from '../../src/index.js'
import { CodeExample } from '../components/CodeExample.jsx'
import { ClassTable } from '../components/ClassTable.jsx'

const stack = css({ display: 'flex', flexDirection: 'column', gap: '1.5rem' })
const sectionTitle = css({ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.5rem', marginTop: '2rem' })
const heading = css({ fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.05em', opacity: 0.5 })
const section = css({ marginBottom: '2rem' })
const gap = css({ gap: '1rem' })
const img = css({ borderRadius: 'var(--radius-box)', height: '12rem', objectFit: 'cover' })
const imgFull = css({ borderRadius: 'var(--radius-box)', height: '14rem', width: '100%', objectFit: 'cover' })
const slideWrap = css({ position: 'relative', width: '100%' })
const navBtns = css({
  position: 'absolute',
  top: '50%',
  left: 0,
  right: 0,
  transform: 'translateY(-50%)',
  display: 'flex',
  justifyContent: 'space-between',
  padding: '0 0.75rem',
})
const navBtn = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '2.5rem',
  height: '2.5rem',
  borderRadius: '9999px',
  border: 'none',
  cursor: 'pointer',
  background: 'color-mix(in oklab, black 40%, transparent)',
  color: 'token(colors.white)',
  textDecoration: 'none',
  fontSize: '1.25rem',
})

const usageCode = `<Carousel>
  <CarouselItem><img src="1.jpg" /></CarouselItem>
  <CarouselItem><img src="2.jpg" /></CarouselItem>
  <CarouselItem><img src="3.jpg" /></CarouselItem>
</Carousel>

// real daisyUI navigates with <a href="#slideId">, but that collides with
// any app using hash-based routing (like this playground) — scrollIntoView
// sidesteps it
document.getElementById('slide-2').scrollIntoView({ behavior: 'smooth', inline: 'start' })`

const classRows = [
  { className: 'carousel', prop: '<Carousel align="..." vertical>', type: 'Component', description: 'Carousel container' },
  { className: 'carousel-item', prop: '<CarouselItem>', type: 'Part', description: 'A single slide' },
  { className: 'carousel-start', prop: 'align="start" (default)', type: 'Modifier', description: 'Snap elements to start', isDefault: true },
  { className: 'carousel-center', prop: 'align="center"', type: 'Modifier', description: 'Snap elements to center' },
  { className: 'carousel-end', prop: 'align="end"', type: 'Modifier', description: 'Snap elements to end' },
  { className: 'carousel-horizontal', prop: '(default)', type: 'Placement', description: 'Horizontal layout', isDefault: true },
  { className: 'carousel-vertical', prop: 'vertical', type: 'Placement', description: 'Vertical layout' },
]

export default {
  name: 'Carousel',
  category: 'Layout',
  description: 'Carousel component for displaying content in a slideshow.',

  view() {
    return (
      <div className={stack}>
        <h1 className={css({ fontSize: '2rem', fontWeight: '700', marginBottom: '0.5rem' })}>Carousel</h1>
        <p className={css({ opacity: 0.6, marginBottom: '2rem', maxWidth: '600px' })}>
          Carousel component for displaying content in a slideshow. Scroll horizontally, or drag
          on touch devices — it's native scroll-snap, no JS required.
        </p>

        <section className={section}>
          <h3 className={heading}>Basic (drag/scroll to snap)</h3>
          <Carousel className={gap}>
            {[1, 2, 3, 4].map((n) => (
              <CarouselItem key={n}>
                <img className={img} src={`https://picsum.photos/seed/panda-carousel-${n}/300/200`} alt={`Slide ${n}`} />
              </CarouselItem>
            ))}
          </Carousel>
        </section>

        <section className={section}>
          <h3 className={heading}>Full width with next/prev navigation</h3>
          <p className={css({ opacity: 0.6, marginBottom: '0.5rem', fontSize: '0.875rem' })}>
            Real daisyUI navigates with <code>&lt;a href="#slideId"&gt;</code>, but that collides
            with apps using hash-based routing (like this playground's own <code>#!/route</code>{' '}
            router) — using <code>scrollIntoView()</code> on click sidesteps it.
          </p>
          <Carousel className={css({ width: '100%' })}>
            {[1, 2, 3].map((n, i, arr) => {
              const prev = arr[(i - 1 + arr.length) % arr.length]
              const next = arr[(i + 1) % arr.length]
              const goTo = (target) => (e) => {
                e.preventDefault()
                document.getElementById(`carousel-slide-${target}`)?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' })
              }
              return (
                <CarouselItem key={n} id={`carousel-slide-${n}`} className={css({ width: '100%' })}>
                  <div className={slideWrap}>
                    <img className={imgFull} src={`https://picsum.photos/seed/panda-carousel-full-${n}/800/400`} alt={`Slide ${n}`} />
                    <div className={navBtns}>
                      <button className={navBtn} onclick={goTo(prev)}>❮</button>
                      <button className={navBtn} onclick={goTo(next)}>❯</button>
                    </div>
                  </div>
                </CarouselItem>
              )
            })}
          </Carousel>
        </section>

        <section>
          <h2 className={sectionTitle}>Usage</h2>
          <CodeExample code={usageCode} />
        </section>

        <section>
          <h2 className={sectionTitle}>Class Reference</h2>
          <ClassTable rows={classRows} />
        </section>
      </div>
    )
  }
}
