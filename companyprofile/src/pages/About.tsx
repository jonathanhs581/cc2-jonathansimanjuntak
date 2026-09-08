import PageHero from '../components/PageHero'
import SectionHeading from '../components/SectionHeading'
import Reveal from '../components/Reveal'
import { CheckIcon } from '../components/icons'
import { milestones, values } from '../data/content'

export default function About() {
  return (
    <>
      <PageHero title="About NusaDrill" crumb="About" />

      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto grid max-w-7xl items-center gap-14 px-5 lg:grid-cols-2 lg:px-8">
          <div className="relative order-2 lg:order-1">
            <img
              src="/images/about-2.webp"
              alt="NusaDrill crew member in protective equipment"
              loading="lazy"
              className="aspect-[3/4] w-full rounded-xl object-cover"
            />
            <div className="absolute -bottom-6 -right-4 rounded-xl bg-navy-800 px-7 py-6 text-white shadow-2xl lg:-right-8">
              <span className="block font-display text-3xl font-bold text-amber-brand">1,200+</span>
              <span className="text-xs font-medium uppercase tracking-[0.14em]">Field Specialists</span>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <SectionHeading eyebrow="Our Story" title="Built one workover at a time" />
            <div className="mt-6 space-y-5 leading-relaxed text-body">
              <p>
                In 1998, six men and one borrowed workover unit started NusaDrill in a Balikpapan warehouse yard,
                servicing mature fields other contractors had written off. The company grew the only way a drilling
                company honestly can: by finishing what it started.
              </p>
              <p>
                Today PT NusaDrill Energi Nusantara operates twelve rigs, a remote operations center, and an
                engineering office in Jakarta, serving operators across the Indonesian archipelago. We remain
                privately held, proudly East Kalimantan rooted, and stubborn about the same principle we started
                with: the well comes first.
              </p>
            </div>
            <ul className="mt-8 space-y-3">
              {[
                'Twelve-rig fleet, onshore and offshore',
                'Remote operations center supporting 4 rigs live',
                'Zero lost-time incidents since 2024',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm font-medium text-navy-800">
                  <CheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-amber-deep" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-mist py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading align="center" eyebrow="Milestones" title="Twenty-eight years, four turning points" />
          <div className="mt-16 grid gap-10 md:grid-cols-2 lg:grid-cols-4">
            {milestones.map((item, index) => (
              <Reveal key={item.year} delay={index * 120} className="relative">
                <span className="font-display text-5xl font-bold text-amber-brand/30">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-amber-deep">{item.year}</p>
                <h3 className="mt-2 font-display text-lg font-bold text-navy-800">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-body">{item.text}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-navy-800 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <SectionHeading light align="center" eyebrow="Culture" title="How we work, and why it holds" />
          <div className="mt-16 grid gap-px overflow-hidden rounded-xl bg-white/10 md:grid-cols-2">
            {values.map((value, index) => (
              <Reveal key={value.title} delay={(index % 2) * 120} className="bg-navy-800">
                <div className="group h-full p-9 transition-colors duration-500 hover:bg-navy-900">
                  <span className="font-display text-sm font-bold text-amber-brand">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3 className="mt-3 font-display text-lg font-bold text-white transition-colors duration-300 group-hover:text-amber-brand">
                    {value.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-white/60">{value.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
