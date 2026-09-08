import { Link } from 'react-router-dom'
import SectionHeading from '../components/SectionHeading'
import BlogCard from '../components/BlogCard'
import Reveal from '../components/Reveal'
import CountUp from '../components/CountUp'
import { ArrowIcon, CheckIcon, QuoteIcon } from '../components/icons'
import { services, stats, testimonials } from '../data/content'
import { usePosts } from '../lib/posts'

export default function Home() {
  const { posts } = usePosts()
  const featured = posts.slice(0, 3)

  return (
    <>
      <section className="relative flex min-h-svh items-center overflow-hidden">
        <img
          src="/images/hero-rig.webp"
          srcSet="/images/hero-rig-mobile.webp 800w, /images/hero-rig.webp 1920w"
          sizes="100vw"
          alt="Semi-submersible drilling rig docked in a harbor at low light"
          className="absolute inset-0 h-full w-full object-cover animate-kenburns"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/70 to-navy-900/30" />
        <div className="relative mx-auto w-full max-w-7xl px-5 pb-24 pt-36 lg:px-8">
          <p
            className="flex origin-left animate-rise-in items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-amber-brand before:block before:h-px before:w-10 before:bg-amber-brand"
            style={{ animationDelay: '150ms' }}
          >
            Integrated Oil & Gas Contractor
          </p>
          <h1
            className="mt-6 max-w-3xl animate-rise-in font-display text-[2.75rem] font-bold leading-[1.08] text-white sm:text-6xl lg:text-7xl"
            style={{ animationDelay: '300ms' }}
          >
            Drilling Deeper,<br />
            <span className="text-amber-brand">Delivering Further.</span>
          </h1>
          <p
            className="mt-6 max-w-xl animate-rise-in text-base leading-relaxed text-white/70 sm:text-lg"
            style={{ animationDelay: '450ms' }}
          >
            From shallow Java Sea jackets to deepwater frontier wells, NusaDrill Energy delivers drilling,
            engineering, and decommissioning services with zero-harm discipline.
          </p>
          <div className="mt-10 flex animate-rise-in flex-wrap gap-4" style={{ animationDelay: '600ms' }}>
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 rounded-full bg-amber-brand px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-navy-900 transition-all duration-300 hover:bg-amber-deep hover:shadow-[0_8px_30px_rgba(245,166,35,0.4)]"
            >
              Our Services
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center rounded-full border border-white/40 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-all duration-300 hover:border-amber-brand hover:text-amber-brand hover:shadow-[0_8px_30px_rgba(245,166,35,0.15)]"
            >
              Discover More
            </Link>
          </div>
        </div>
        <div className="absolute bottom-0 left-1/2 h-16 w-px -translate-x-1/2 overflow-hidden bg-white/10">
          <span className="absolute left-0 top-0 h-8 w-px animate-[scroll-hint_2s_ease-in-out_infinite] bg-amber-brand" />
        </div>
      </section>

      <section className="bg-navy-900 py-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-12 gap-y-6 px-5 lg:px-8">
          {stats.map((stat, index) => (
            <Reveal key={stat.label} delay={index * 120} className="translate-y-0! flex items-center gap-2">
              <span className="font-display text-4xl font-bold text-amber-brand">
                <CountUp value={Number(stat.value)} />
              </span>
              <span className="font-display text-xl font-bold text-amber-brand">{stat.suffix}</span>
              <span className="max-w-[7rem] text-xs uppercase leading-tight tracking-[0.14em] text-white/60">{stat.label}</span>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
          <Reveal className="relative">
            <img
              src="/images/about-1.webp"
              alt="NusaDrill crew working on an offshore platform staircase"
              loading="lazy"
              className="aspect-[4/3] w-full rounded-xl object-cover"
            />
            <img
              src="/images/about-2.webp"
              alt="Drilling supervisor in protective equipment"
              loading="lazy"
              className="absolute -bottom-10 -right-4 hidden w-48 rounded-xl border-8 border-white object-cover shadow-2xl sm:block lg:w-56"
            />
            <div className="absolute -left-4 -top-6 rounded-xl bg-amber-brand px-6 py-5 text-navy-900 shadow-xl lg:-left-8">
              <span className="block font-display text-4xl font-bold">28+</span>
              <span className="text-xs font-semibold uppercase tracking-[0.14em]">Years in the Field</span>
            </div>
          </Reveal>
          <div className="lg:pl-6">
            <SectionHeading
              eyebrow="Who We Are"
              title="The drilling partner operators call back"
            />
            <p className="mt-6 leading-relaxed text-body">
              PT NusaDrill Energi Nusantara began in 1998 as a six-man workover crew in Balikpapan. Today we run
              offshore and onshore campaigns for national and international operators, with twelve rigs, a remote
              operations center, and crews that average eleven years on our decks.
            </p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2">
              {[
                'Zero lost-time incidents since 2024',
                'In-house petroleum engineering team',
                '95% Indonesian field workforce',
                '24/7 remote drilling support',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-medium text-navy-800">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-deep" />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              to="/about"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-navy-800 px-7 py-3.5 text-sm font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-navy-600"
            >
              More About Us
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-800 py-20 lg:py-28">
        <img
          src="/images/services-bg.webp"
          srcSet="/images/services-bg-mobile.webp 800w, /images/services-bg.webp 1920w"
          sizes="100vw"
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-800/80 to-navy-800" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading light eyebrow="What We Deliver" title="Services engineered end to end" />
            <Link
              to="/services"
              className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-amber-brand"
            >
              View All Services
              <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Link>
          </div>
          <div className="mt-14">
            {services.map((service, index) => (
              <Link
                key={service.slug}
                to="/services"
                className="group grid items-start gap-x-10 gap-y-3 border-t border-white/10 px-2 py-8 transition-colors duration-300 last:border-b hover:bg-white/[0.04] lg:grid-cols-[3.5rem_1fr_14rem_2.5rem] lg:items-baseline lg:px-4"
              >
                <span className="font-display text-sm font-bold tracking-widest text-amber-brand/70 transition-colors duration-300 group-hover:text-amber-brand">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className="transition-transform duration-500 ease-out lg:group-hover:translate-x-2">
                  <h3 className="font-display text-2xl font-bold text-white transition-colors duration-300 group-hover:text-amber-brand lg:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/50">
                    {service.description}
                  </p>
                </div>
                <div className="text-xs uppercase tracking-[0.14em] text-white/40 lg:text-right">
                  <p className="text-amber-brand/60">{service.tier}</p>
                  <p className="mt-1.5 normal-case tracking-normal text-white/35">
                    {service.deliverables.length} deliverables
                  </p>
                </div>
                <span className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/60 transition-all duration-300 group-hover:border-amber-brand group-hover:bg-amber-brand group-hover:text-navy-900 lg:flex">
                  <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading align="center" eyebrow="Client Voices" title="Trusted on the decks that matter" />
          <div className="mt-16 grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
            <Reveal>
              <figure className="border-l-[3px] border-amber-brand pl-7 sm:pl-10">
                <QuoteIcon className="h-10 w-10 text-amber-brand" />
                <blockquote className="mt-5 font-display text-2xl font-bold leading-snug text-navy-800 sm:text-[1.7rem]">
                  {testimonials[0].quote}
                </blockquote>
                <figcaption className="mt-7 flex items-center gap-4">
                  <img
                    src={testimonials[0].avatar}
                    alt=""
                    loading="lazy"
                    className="h-14 w-14 rounded-full object-cover ring-2 ring-amber-brand/40"
                  />
                  <div>
                    <p className="font-display text-base font-bold text-navy-800">{testimonials[0].name}</p>
                    <p className="text-sm text-body">{testimonials[0].role}</p>
                  </div>
                </figcaption>
              </figure>
            </Reveal>
            <div className="flex flex-col justify-center divide-y divide-line border-y border-line lg:border-y-0">
              {testimonials.slice(1).map((item, index) => (
                <Reveal key={item.name} delay={150 + index * 120}>
                  <figure className="group py-7 lg:py-8">
                    <blockquote className="text-sm leading-relaxed text-navy-700">“{item.quote}”</blockquote>
                    <figcaption className="mt-4 flex items-center gap-3">
                      <img src={item.avatar} alt="" loading="lazy" className="h-10 w-10 rounded-full object-cover" />
                      <div>
                        <p className="font-display text-sm font-bold text-navy-800">{item.name}</p>
                        <p className="text-xs text-body">{item.role}</p>
                      </div>
                    </figcaption>
                  </figure>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading eyebrow="Insights" title="From the drilling desk" />
            <Link
              to="/blog"
              className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-amber-deep"
            >
              All Articles
              <ArrowIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((post, index) => (
              <Reveal key={post.id} delay={index * 120}>
                <BlogCard post={post} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        <img
          src="/images/cta-bg.webp"
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-navy-950/80" />
        <div className="relative mx-auto max-w-3xl px-5 text-center lg:px-8">
          <h2 className="font-display text-3xl font-bold text-white sm:text-4xl">
            Planning a campaign? <span className="text-amber-brand">Bring it to us early.</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-white/70">
            The best wells are engineered before a rig is contracted. Talk to our team during planning and let us
            show you where the time and cost are hiding.
          </p>
          <Link
            to="/login"
            className="mt-9 inline-flex items-center gap-2 rounded-full bg-amber-brand px-8 py-4 text-sm font-semibold uppercase tracking-[0.12em] text-navy-900 transition-colors hover:bg-amber-deep"
          >
            Client Login
            <ArrowIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
