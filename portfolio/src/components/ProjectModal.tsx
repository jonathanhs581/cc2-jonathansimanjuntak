import { useEffect, useRef } from 'react'
import type { Project } from '../types'
import { CloseIcon, ExternalLinkIcon, GitHubIcon } from './icons'

type Props = {
  project: Project
  onClose: () => void
}

function starEntries(project: Project): Array<[string, string]> {
  return [
    ['Situation', project.star.situation],
    ['Task', project.star.task],
    ['Action', project.star.action],
    ['Result', project.star.result],
  ]
}

function ProjectModal({ project, onClose }: Props) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)
  const lastFocused = useRef<Element | null>(null)

  useEffect(() => {
    lastFocused.current = document.activeElement

    const scrollbarGap = window.innerWidth - document.documentElement.clientWidth
    document.body.style.overflow = 'hidden'
    document.body.style.paddingRight = `${scrollbarGap}px`

    closeRef.current?.focus()

    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
      if (lastFocused.current instanceof HTMLElement) lastFocused.current.focus()
    }
  }, [])

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key !== 'Tab') return

      const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled])',
      )
      if (!focusables || focusables.length === 0) return
      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end justify-center p-4 sm:items-center"
      onClick={onClose}
    >
      <div aria-hidden="true" className="absolute inset-0 bg-ink/60" />

      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="project-modal-title"
        className="relative max-h-[88vh] w-full max-w-2xl overflow-y-auto rounded-lg border border-line bg-white p-6 sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-muted">
              {project.category}
            </p>
            <h3
              id="project-modal-title"
              className="mt-1.5 font-display text-xl font-bold tracking-tight text-ink sm:text-2xl"
            >
              {project.title}
            </h3>
          </div>
          <button
            ref={closeRef}
            type="button"
            onClick={onClose}
            aria-label="Tutup detail project"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line text-muted transition-colors hover:border-ink hover:text-ink"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        <img
          src={project.image}
          alt={`Tangkapan layar project ${project.title}`}
          width={800}
          height={450}
          loading="lazy"
          decoding="async"
          className="mt-5 aspect-video w-full rounded-md border border-line object-cover"
        />

        <p className="mt-3 text-xs text-muted">{project.technologies.join(' · ')}</p>

        <p className="mt-4 border-t border-line pt-4 text-sm leading-relaxed text-body">
          {project.description}
        </p>

        <dl className="mt-6 space-y-5">
          {starEntries(project).map(([label, text]) => (
            <div key={label}>
              <dt className="text-xs font-bold uppercase tracking-[0.15em] text-accent-dark">
                {label}
              </dt>
              <dd className="mt-1.5 text-sm leading-relaxed text-body">{text}</dd>
            </div>
          ))}
        </dl>

        {(project.liveUrl || project.repoUrl) && (
          <div className="mt-8 flex flex-col gap-3 border-t border-line pt-6 sm:flex-row">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <ExternalLinkIcon className="h-4 w-4" />
                Live Demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-md border border-ink/25 bg-white px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
              >
                <GitHubIcon className="h-4 w-4" />
                Source Code
              </a>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectModal
