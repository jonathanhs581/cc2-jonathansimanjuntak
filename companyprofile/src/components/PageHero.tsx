import { Link } from 'react-router-dom'

type Props = {
  title: string
  crumb: string
}

export default function PageHero({ title, crumb }: Props) {
  return (
    <section className="relative flex min-h-[46vh] items-end overflow-hidden bg-navy-900 pb-14 pt-32">
      <img
        src="/images/page-banner.webp"
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        loading="eager"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/70 to-navy-900/40" />
      <div className="relative mx-auto w-full max-w-7xl px-5 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="animate-rise-in text-xs font-medium uppercase tracking-[0.2em] text-white/60"
          style={{ animationDelay: '100ms' }}
        >
          <Link to="/" className="transition-colors hover:text-amber-brand">Home</Link>
          <span className="mx-2 text-white/30">/</span>
          <span className="text-amber-brand">{crumb}</span>
        </nav>
        <h1
          className="mt-4 animate-rise-in font-display text-4xl font-bold text-white sm:text-5xl"
          style={{ animationDelay: '250ms' }}
        >
          {title}
        </h1>
      </div>
    </section>
  )
}
