import { useEffect, useMemo, useState } from 'react'
import type { Project } from '../types'
import { getProjects } from '../services/contentful'
import ProjectCard from './ProjectCard'
import ProjectModal from './ProjectModal'
import SectionHeading from './SectionHeading'

type FetchState = 'loading' | 'success' | 'error'

const FILTERS = ['All', 'Full-Stack', 'Front-End', 'Automation & Ops', 'QA & Testing'] as const
type Filter = (typeof FILTERS)[number]

function ProjectSkeleton() {
  return (
    <div className="animate-pulse overflow-hidden rounded-lg border border-line bg-white">
      <div className="aspect-video w-full bg-surface" />
      <div className="space-y-3 p-5">
        <div className="h-3 w-24 rounded bg-surface" />
        <div className="h-5 w-3/4 rounded bg-surface" />
        <div className="h-3 w-full rounded bg-surface" />
        <div className="h-3 w-2/3 rounded bg-surface" />
      </div>
    </div>
  )
}

function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([])
  const [state, setState] = useState<FetchState>('loading')
  const [selected, setSelected] = useState<Project | null>(null)
  const [retryCount, setRetryCount] = useState(0)
  const [filter, setFilter] = useState<Filter>('All')

  useEffect(() => {
    let cancelled = false

    getProjects()
      .then((data) => {
        if (cancelled) return
        setProjects(data)
        setState('success')
      })
      .catch(() => {
        if (cancelled) return
        setState('error')
      })

    return () => {
      cancelled = true
    }
  }, [retryCount])

  const visibleProjects = useMemo(
    () => (filter === 'All' ? projects : projects.filter((p) => p.category === filter)),
    [projects, filter],
  )

  return (
    <section
      id="portfolio"
      aria-labelledby="portfolio-heading"
      className="scroll-mt-20 bg-surface py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="portfolio" label="Portfolio" title="Featured Projects" />

        <div
          className="mb-10 flex flex-wrap gap-2"
          role="group"
          aria-label="Filter project berdasarkan kategori"
        >
          {FILTERS.map((cat) => (
            <button
              key={cat}
              type="button"
              aria-pressed={filter === cat}
              onClick={() => setFilter(cat)}
              className={`rounded-md border px-4 py-2 text-sm font-semibold transition-all ${
                filter === cat
                  ? 'border-accent bg-gradient-to-b from-accent-light to-accent text-ink shadow-[inset_0_1px_0_0_rgba(255,255,255,0.45)]'
                  : 'border-line bg-white text-body hover:border-ink/40 hover:text-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {state === 'loading' && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }, (_, i) => (
              <ProjectSkeleton key={i} />
            ))}
          </div>
        )}

        {state === 'error' && (
          <div className="mx-auto max-w-md rounded-lg border border-red-200 bg-white p-8 text-center">
            <p className="text-sm font-medium text-red-700">
              Gagal memuat daftar project.
            </p>
            <button
              type="button"
              onClick={() => {
                setState('loading')
                setRetryCount((c) => c + 1)
              }}
              className="mt-4 rounded-md bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-red-700"
            >
              Coba Lagi
            </button>
          </div>
        )}

        {state === 'success' && projects.length === 0 && (
          <p className="py-12 text-center text-sm text-muted">
            Belum ada project untuk ditampilkan. Coming soon.
          </p>
        )}

        {state === 'success' && projects.length > 0 && visibleProjects.length === 0 && (
          <p className="py-12 text-center text-sm text-muted">
            Belum ada project di kategori &ldquo;{filter}&rdquo;.
          </p>
        )}

        {state === 'success' && visibleProjects.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visibleProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={() => setSelected(project)}
              />
            ))}
          </div>
        )}
      </div>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}

export default Portfolio
