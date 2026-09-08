import { skillGroups } from '../data/skills'
import SectionHeading from './SectionHeading'

function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="scroll-mt-20 bg-white py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="skills" label="Skills" title="Tech Stack yang Saya Kuasai" />

        <div className="grid gap-6 md:grid-cols-3">
          {skillGroups.map((group) => (
            <article
              key={group.category}
              className="h-full rounded-lg border border-line bg-white p-6 transition-colors hover:border-ink/30 sm:p-7"
            >
              <h3 className="font-display text-lg font-bold text-ink">
                {group.category}
              </h3>
              <ul className="mt-4 space-y-2.5 border-t border-line pt-4">
                {group.items.map((item) => (
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
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Skills
