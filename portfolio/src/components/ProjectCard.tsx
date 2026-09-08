import type { Project } from '../types'

type Props = {
  project: Project
  onOpen: () => void
}

function ProjectCard({ project, onOpen }: Props) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-lg border border-line bg-white transition-colors hover:border-ink/30">
      <div className="overflow-hidden">
        <img
          src={project.image}
          alt={`Tangkapan layar project ${project.title}`}
          width={800}
          height={450}
          loading="lazy"
          decoding="async"
          onError={(e) => {
            const img = e.currentTarget
            if (!img.src.includes('project-fallback')) img.src = '/images/project-fallback.svg'
          }}
          className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
          {project.category}
        </p>

        <h3 className="mt-2 font-display text-lg font-bold leading-snug text-ink">
          {project.title}
        </h3>

        <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-body">
          {project.description}
        </p>

        <p className="mt-3 text-xs leading-relaxed text-muted">
          {project.technologies.join(' · ')}
        </p>

        <button
          type="button"
          onClick={onOpen}
          className="mt-5 inline-flex self-start items-center gap-2 text-sm font-semibold text-accent-dark transition-colors hover:text-ink"
          aria-haspopup="dialog"
        >
          View Detail
          <span aria-hidden="true" className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </button>
      </div>
    </article>
  )
}

export default ProjectCard
