import { useEffect, useState } from 'react'
import { useActiveSection } from '../context/ActiveSectionContext'
import { NAV_LINKS } from '../data/navigation'
import { profile } from '../data/profile'
import { CloseIcon, MenuIcon } from './icons'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const activeSection = useActiveSection()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setIsOpen(false)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen])

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 768px)')
    const onChange = (e: MediaQueryListEvent) => {
      if (e.matches) setIsOpen(false)
    }
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  const desktopLinkClass = (id: string) => {
    const isActive = activeSection === id
    const baseClass = 'inline-block text-sm font-semibold transition-all duration-300'
    
    if (isScrolled) {
      return `${baseClass} ${isActive ? 'text-ink underline decoration-accent decoration-2 underline-offset-[6px]' : 'text-body hover:text-accent hover:scale-110 hover:-translate-y-0.5'}`
    } else {
      return `${baseClass} ${isActive ? 'text-white underline decoration-accent decoration-2 underline-offset-[6px]' : 'text-white/80 hover:text-accent hover:scale-110 hover:-translate-y-0.5'}`
    }
  }

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${isScrolled ? 'border-b border-line bg-white/95 backdrop-blur' : 'bg-transparent'}`}>
      <nav
        className="mx-auto flex h-24 max-w-[1400px] items-center justify-between px-6 sm:px-10 lg:px-20"
        aria-label="Navigasi utama"
      >
        <a href="#hero" className={`font-display text-2xl font-bold tracking-tight ${isScrolled ? 'text-ink' : 'text-ink'}`}>
          {profile.name.split(' ')[0]} {profile.name.split(' ')[1] ?? ''}
        </a>

        <ul className="hidden items-center gap-10 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <a
                href={`#${link.id}`}
                className={desktopLinkClass(link.id)}
                aria-current={activeSection === link.id ? 'true' : undefined}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          type="button"
          className={`inline-flex h-11 w-11 items-center justify-center rounded-md transition-colors md:hidden ${isScrolled ? 'text-ink hover:bg-surface' : 'text-ink'}`}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Tutup menu navigasi' : 'Buka menu navigasi'}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </nav>

      {isOpen && (
        <nav
          className="border-t border-line bg-white md:hidden"
          aria-label="Navigasi mobile"
        >
          <ul id="mobile-menu" className="space-y-1 px-4 py-4">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className={`block border-l-2 px-3 py-3 text-base font-semibold transition-colors ${
                    activeSection === link.id
                      ? 'border-accent bg-surface text-ink'
                      : 'border-transparent text-body hover:bg-surface hover:text-ink'
                  }`}
                  aria-current={activeSection === link.id ? 'true' : undefined}
                  onClick={() => setIsOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}

export default Navbar
