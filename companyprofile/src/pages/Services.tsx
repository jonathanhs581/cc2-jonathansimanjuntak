import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { ArrowIcon, CheckIcon, QuoteIcon, serviceIcons } from '../components/icons'
import { services, testimonials } from '../data/content'

const process = [
  {
    step: '01',
    title: 'Scope & Survey',
    text: 'We walk the well data before we quote a number. Every proposal starts with a desk study of your offset wells.',
  },
  {
    step: '02',
    title: 'Engineer & Plan',
    text: 'Casing design, pore pressure, rig selection, and HSE case built in-house by our engineering group in Jakarta.',
  },
  {
    step: '03',
    title: 'Drill & Deliver',
    text: 'Crews mobilize with a stop-work mandate. The remote operations center watches every parameter around the clock.',
  },
  {
    step: '04',
    title: 'Report & Return',
    text: 'Final well report within fourteen days, lessons briefed to your team, and a cost breakdown with no surprises.',
  },
]

const faqs = [
  {
    q: 'Do you contract rigs directly or through operators?',
    a: 'Both. We run our own twelve-rig fleet and manage third-party rig contracting when a campaign calls for specifications outside our fleet.',
  },
  {
    q: 'How are commercial models structured?',
    a: 'Dayrate for rig services, metered contracts for drilling programs, and study-based engagements for engineering work. Most clients end up on a hybrid package.',
  },
  {
    q: 'What geographic areas do you cover?',
    a: 'Our core operations span the Java Sea, Natuna, Madura Strait, and East Kalimantan, with mobilization capability across the Indonesian archipelago.',
  },
  {
    q: 'Can you take over a stalled or problem well?',
    a: 'Yes. Well recovery and campaign rescue are a specialty of our drilling supervision group. We will assess the well, quote a fixed recovery plan, and take it from there.',
  },
]

export default function Services() {
  const [open, setOpen] = useState(0)
  const [active, setActive] = useState<number | null>(null)

  return (
    <>
      <PageHero title="Our Services" crumb="Services" />

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[280px_1fr] xl:grid-cols-[320px_1fr]">
            <aside className="lg:sticky lg:top-28 lg:self-start">
              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-deep before:block before:h-px before:w-8 before:bg-amber-deep">
                Capabilities
              </p>
              <h1 className="mt-4 font-display text-3xl font-bold leading-tight text-navy-800 sm:text-4xl">
                Six service lines, one accountable contractor
              </h1>
              <p className="mt-5 text-sm leading-relaxed text-body">
                Pick a single scope or hand us the whole campaign. Either way, one superintendent answers the phone.
              </p>
              <Link
                to="/login"
                className="group mt-8 inline-flex items-center gap-2 rounded-full bg-navy-800 px-6 py-3 text-xs font-semibold uppercase tracking-[0.12em] text-white transition-colors hover:bg-navy-600"
              >
                Request a Quote
                <ArrowIcon className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1.5" />
              </Link>
              <div className="mt-10 hidden border-l-2 border-line pl-5 lg:block">
                <p className="text-xs font-medium uppercase tracking-[0.18em] text-body">Quick jump</p>
                <ul className="mt-3 space-y-2">
                  {services.map((service, index) => (
                    <li key={service.slug}>
                      <a
                        href={`#${service.slug}`}
                        className="text-sm text-navy-700 transition-colors hover:text-amber-deep"
                      >
                        {String(index + 1).padStart(2, '0')} · {service.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <div className="divide-y divide-line border-t border-line">
              {services.map((service, index) => {
                const Icon = serviceIcons[service.icon]
                const isActive = active === index
                return (
                  <Reveal key={service.slug} delay={Math.min(index * 60, 240)}>
                    <article
                      id={service.slug}
                      onMouseEnter={() => setActive(index)}
                      onMouseLeave={() => setActive(null)}
                      className={`group relative scroll-mt-28 px-1 py-10 transition-all duration-500 sm:px-6 lg:px-8 ${
                        isActive ? 'bg-mist/70' : ''
                      }`}
                    >
                      <span
                        className={`pointer-events-none absolute right-4 top-6 select-none font-display text-[5rem] font-bold leading-none transition-all duration-500 sm:text-[7rem] lg:right-8 ${
                          isActive ? 'text-amber-brand/25' : 'text-navy-800/[0.06]'
                        }`}
                      >
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="relative">
                        <div className="flex flex-wrap items-center gap-4">
                          <span
                            className={`grid h-13 w-13 shrink-0 place-items-center rounded-xl transition-all duration-500 ${
                              isActive ? 'bg-amber-brand text-navy-900' : 'bg-navy-800 text-amber-brand'
                            }`}
                          >
                            <Icon className="h-6 w-6" />
                          </span>
                          <h2 className="font-display text-2xl font-bold text-navy-800 sm:text-3xl">
                            {service.title}
                          </h2>
                        </div>
                        <p className="mt-4 max-w-2xl leading-relaxed text-body">{service.description}</p>
                        <div
                          className={`grid transition-all duration-500 ease-out max-lg:mt-6 max-lg:grid-rows-[1fr] max-lg:opacity-100 ${
                            isActive ? 'mt-6 grid-rows-[1fr] opacity-100' : 'mt-0 grid-rows-[0fr] opacity-0'
                          }`}
                        >
                          <div className="overflow-hidden">
                            <ul className="flex flex-wrap gap-2.5">
                              {service.deliverables.map((item) => (
                                <li
                                  key={item}
                                  className="flex items-center gap-2 rounded-full border border-line bg-white px-4 py-2 text-xs font-medium text-navy-800"
                                >
                                  <CheckIcon className="h-3.5 w-3.5 text-amber-deep" />
                                  {item}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <p className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
                          <span className="rounded-full bg-amber-brand/15 px-3.5 py-1.5 text-amber-deep">
                            {service.tier}
                          </span>
                        </p>
                      </div>
                    </article>
                  </Reveal>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy-800 py-20 lg:py-28">
        <img
          src="/images/cta-bg.webp"
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover opacity-15"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-800/70 to-navy-800" />
        <div className="relative mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading light eyebrow="How We Deliver" title="From survey to final report" />
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((item, index) => (
              <Reveal key={item.step} delay={index * 120} className="relative">
                <div className="flex items-center gap-3">
                  <span className="font-display text-4xl font-bold text-amber-brand">{item.step}</span>
                  {index < process.length - 1 && (
                    <span className="hidden h-px flex-1 bg-gradient-to-r from-amber-brand/60 to-transparent lg:block" />
                  )}
                </div>
                <h3 className="mt-4 font-display text-lg font-bold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/60">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-mist py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading align="center" eyebrow="What Clients Say" title="Endorsed campaign after campaign" />
          <div className="mx-auto mt-16 grid max-w-5xl gap-12 lg:grid-cols-3 lg:gap-10">
            {testimonials.map((item, index) => (
              <Reveal key={item.name} delay={index * 120}>
                <figure className="border-l-2 border-line pl-6 transition-colors duration-500 hover:border-amber-brand">
                  <QuoteIcon className="h-6 w-6 text-amber-brand" />
                  <blockquote className="mt-4 text-sm leading-relaxed text-navy-700">{item.quote}</blockquote>
                  <figcaption className="mt-5 flex items-center gap-3">
                    <img src={item.avatar} alt="" loading="lazy" className="h-11 w-11 rounded-full object-cover" />
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
      </section>

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-[1fr_1.2fr] lg:px-8">
          <SectionHeading eyebrow="FAQ" title="Questions operators ask us first" />
          <div className="divide-y divide-line rounded-xl border border-line">
            {faqs.map((faq, index) => {
              const isOpen = open === index
              return (
                <div key={faq.q}>
                  <button
                    className="flex w-full items-center gap-4 px-6 py-5 text-left"
                    onClick={() => setOpen(isOpen ? -1 : index)}
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-sm font-bold text-amber-deep">
                      {String(index + 1).padStart(2, '0')}.
                    </span>
                    <span className="flex-1 font-display text-sm font-bold text-navy-800">{faq.q}</span>
                    <span
                      className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                        isOpen ? 'rotate-180 bg-amber-brand text-navy-900' : 'bg-mist text-navy-800'
                      }`}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4" aria-hidden="true">
                        <path d="m6 9 6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                  </button>
                  <div
                    className={`grid transition-all duration-500 ease-out ${
                      isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="px-6 pb-6 pl-14 text-sm leading-relaxed text-body">{faq.a}</p>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>
    </>
  )
}
