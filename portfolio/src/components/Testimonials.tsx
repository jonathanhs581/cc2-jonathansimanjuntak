import { useEffect, useState } from 'react'
import type { Testimonial } from '../types'
import { getTestimonials } from '../services/contentful'
import SectionHeading from './SectionHeading'

function initialsOf(name: string): string {
  return name
    .split(' ')
    .map((word) => word[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function TestimonialCard({ item }: { item: Testimonial }) {
  return (
    <figure className="flex h-full flex-col rounded-lg border border-line bg-white p-6 transition-colors hover:border-ink/30 sm:p-7">
      <span
        aria-hidden="true"
        className="font-display text-5xl leading-[0.6] text-accent"
      >
        &ldquo;
      </span>
      <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-body">
        {item.quote}
      </blockquote>
      <figcaption className="mt-6 flex items-center gap-3 border-t border-line pt-5">
        {item.avatar ? (
          <img
            src={item.avatar}
            alt={`Foto ${item.name}`}
            width={40}
            height={40}
            loading="lazy"
            className="h-10 w-10 rounded-full border border-line object-cover"
          />
        ) : (
          <span
            aria-hidden="true"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/25 text-sm font-semibold text-accent-dark"
          >
            {initialsOf(item.name)}
          </span>
        )}
        <div>
          <p className="text-sm font-semibold text-ink">{item.name}</p>
          <p className="mt-0.5 text-xs text-muted">{item.role}</p>
        </div>
      </figcaption>
    </figure>
  )
}

function Testimonials() {
  const [items, setItems] = useState<Testimonial[]>([])
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    let cancelled = false
    getTestimonials()
      .then((data) => {
        if (!cancelled) setItems(data)
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="scroll-mt-20 bg-surface py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="testimonials" label="Testimonials" title="Kata Mereka" />

        {failed && (
          <p className="py-8 text-center text-sm text-muted">
            Gagal memuat testimonial, silakan refresh halaman.
          </p>
        )}

        {!failed && items.length === 0 && (
          <div className="grid gap-6 md:grid-cols-3">
            {Array.from({ length: 3 }, (_, i) => (
              <div
                key={i}
                className="animate-pulse space-y-3 rounded-lg border border-line bg-white p-6"
              >
                <div className="h-3 w-full rounded bg-surface" />
                <div className="h-3 w-5/6 rounded bg-surface" />
                <div className="h-3 w-2/3 rounded bg-surface" />
                <div className="mt-6 h-10 w-10 rounded-full bg-surface" />
              </div>
            ))}
          </div>
        )}

        {items.length > 0 && (
          <div className="grid gap-6 md:grid-cols-3">
            {items.map((item) => (
              <TestimonialCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Testimonials
