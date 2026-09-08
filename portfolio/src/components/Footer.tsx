import { profile } from '../data/profile'
import { ArrowUpIcon, GitHubIcon, LinkedInIcon, MailIcon } from './icons'

function Footer() {
  return (
    <footer className="border-t border-line bg-surface py-10 text-muted">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-4 sm:px-6 md:flex-row md:justify-between lg:px-8">
        <div className="text-center md:text-left">
          <p className="font-display text-base font-bold text-ink">
            {profile.name}
          </p>
          <p className="mt-1 text-sm">
            © {new Date().getFullYear()} · Dibangun dengan React + Tailwind CSS
          </p>
        </div>

        <div className="flex items-center gap-5">
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            className="transition-colors hover:text-ink"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              className="transition-colors hover:text-ink"
            >
              <LinkedInIcon className="h-5 w-5" />
            </a>
          )}
          <a
            href={`mailto:${profile.email}`}
            aria-label="Kirim email"
            className="transition-colors hover:text-ink"
          >
            <MailIcon className="h-5 w-5" />
          </a>

          <span aria-hidden="true" className="hidden h-6 w-px bg-line md:block" />

          <a
            href="#hero"
            className="inline-flex items-center gap-2 text-sm font-semibold transition-colors hover:text-ink"
          >
            <ArrowUpIcon className="h-4 w-4" />
            Back to top
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
