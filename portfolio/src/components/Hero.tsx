import { profile } from '../data/profile'
import { GitHubIcon, LinkedInIcon, MailIcon } from './icons'
import { SquiggleDoodle } from './doodles'

function Hero() {
  const nameParts = profile.name.split(' ')
  const firstName = nameParts[0]
  const lastName = nameParts.slice(1).join(' ')

  const socialLinks = (
    <>
      <li>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub profile"
          className="group inline-flex h-11 w-11 items-center justify-center text-muted transition-all duration-300 hover:text-accent hover:-translate-x-1 md:text-white/70 md:hover:text-accent"
        >
          <GitHubIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
        </a>
      </li>
      {profile.linkedin && (
        <li>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            className="group inline-flex h-11 w-11 items-center justify-center text-muted transition-all duration-300 hover:text-accent hover:-translate-x-1 md:text-white/70 md:hover:text-accent"
          >
            <LinkedInIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
          </a>
        </li>
      )}
      <li>
        <a
          href={`mailto:${profile.email}`}
          aria-label="Kirim email"
          className="group inline-flex h-11 w-11 items-center justify-center text-muted transition-all duration-300 hover:text-accent hover:-translate-x-1 md:text-white/70 md:hover:text-accent"
        >
          <MailIcon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
        </a>
      </li>
    </>
  )

  return (
    <section id="hero" aria-labelledby="hero-heading" className="relative scroll-mt-20">
      <div className="grid min-h-svh grid-cols-1 md:grid-cols-2 md:h-svh md:overflow-hidden">
        <div className="relative flex flex-col justify-center hero-gradient order-2 md:order-1 px-6 pb-16 pt-10 sm:px-10 md:py-0 lg:px-20 xl:px-28">
          <div className="relative mx-auto w-full max-w-xl md:mx-0">
            <p className="inline-flex items-center gap-3 text-sm font-semibold uppercase tracking-[0.2em] text-muted">
              <span aria-hidden="true" className="h-px w-10 bg-accent" />
              Hello, saya
            </p>

            <h1
              id="hero-heading"
              className="relative mt-8 font-display font-bold leading-[1.05] tracking-tight text-ink"
            >
              <SquiggleDoodle className="absolute -top-10 right-10 w-16 text-accent animate-float opacity-80" />
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[80px]">{firstName}</span>
              <span className="block text-5xl sm:text-6xl lg:text-7xl xl:text-[80px]">{lastName}</span>
            </h1>

            <p className="mt-8 max-w-md text-lg font-medium leading-relaxed text-body sm:text-xl">
              {profile.tagline}
            </p>

            <div className="mt-10 flex flex-col items-start gap-3 sm:flex-row">
              <a
                href="#contact"
                className="btn-primary w-full px-10 py-4 text-base sm:w-auto"
              >
                Say Hello
              </a>
            </div>

            <ul className="mt-12 flex items-center gap-2 md:hidden">
              {socialLinks}
            </ul>
          </div>
        </div>

        <div className="relative order-1 md:order-2 h-[50vh] md:h-full md:max-h-svh overflow-hidden">
          <img
            src={profile.photo}
            alt={`Foto profil ${profile.name}`}
            width={720}
            height={960}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover object-top"
          />
          <ul className="absolute right-4 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-4 md:flex lg:right-8 z-10">
            {socialLinks}
          </ul>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-8 left-1/4 hidden h-14 -translate-x-1/2 md:block z-10"
      >
        <div className="relative h-full w-px overflow-hidden bg-ink/15">
          <span className="absolute left-0 top-0 h-5 w-px bg-accent-dark animate-scroll-dot" />
        </div>
      </div>
    </section>
  )
}

export default Hero
