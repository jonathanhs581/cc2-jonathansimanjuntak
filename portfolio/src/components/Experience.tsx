import { education } from '../data/education'
import { experiences } from '../data/experience'
import SectionHeading from './SectionHeading'

function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="scroll-mt-20 bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="experience" label="Experience" title="Perjalanan Saya" />

        <ol className="relative ml-2 max-w-3xl space-y-12 border-l-2 border-line">
          {experiences.map((exp) => (
            <li key={`${exp.company}-${exp.period}`} className="relative pl-8">
              <span
                aria-hidden="true"
                className="absolute -left-[7px] top-1.5 h-2.5 w-2.5 rotate-45 bg-accent"
              />

              <p className="text-xs font-semibold uppercase tracking-[0.15em] text-accent-dark">
                {exp.period}
              </p>
              <h3 className="mt-1.5 font-display text-lg font-bold text-ink">{exp.role}</h3>
              <p className="mt-0.5 text-sm font-medium text-muted">{exp.company}</p>

              <ul className="mt-3.5 space-y-2">
                {exp.responsibilities.map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-2.5 text-sm leading-relaxed text-body"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[7px] h-1.5 w-1.5 shrink-0 bg-accent"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className="mt-16 max-w-3xl">
          <h3 className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            <span aria-hidden="true" className="h-px w-10 shrink-0 bg-accent" />
            Pendidikan &amp; Pelatihan
          </h3>
          <ul className="mt-6">
            {education.map((edu) => (
              <li
                key={`${edu.school}-${edu.period}`}
                className="grid gap-1.5 border-t border-line py-5 last:border-b sm:grid-cols-[150px_1fr] sm:gap-8"
              >
                <p className="text-xs font-semibold uppercase tracking-wide text-accent-dark sm:pt-1">
                  {edu.period}
                </p>
                <div>
                  <p className="font-display text-base font-bold text-ink">{edu.school}</p>
                  <p className="mt-0.5 text-sm font-medium text-muted">{edu.degree}</p>
                  {edu.note && (
                    <p className="mt-1.5 text-sm leading-relaxed text-body">{edu.note}</p>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Experience
