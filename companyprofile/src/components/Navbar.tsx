import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import { useAuth } from '../lib/auth'

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/services', label: 'Services' },
  { to: '/teams', label: 'Teams' },
  { to: '/blog', label: 'Blog' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const { user, logout } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? 'bg-navy-900/95 shadow-lg shadow-navy-950/30 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Main navigation">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `relative text-[13px] font-medium uppercase tracking-[0.14em] transition-colors after:absolute after:-bottom-2 after:left-0 after:h-px after:w-full after:origin-left after:bg-amber-brand after:transition-transform after:duration-300 ${
                  isActive
                    ? 'text-amber-brand after:scale-x-100'
                    : 'text-white/80 after:scale-x-0 hover:text-amber-brand hover:after:scale-x-100'
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden items-center gap-4 lg:flex">
          {user ? (
            <>
              <span className="text-[13px] font-medium text-white/70">{user.name}</span>
              <button
                onClick={logout}
                className="rounded-full border border-white/30 px-5 py-2.5 text-[13px] font-medium uppercase tracking-[0.12em] text-white transition-colors hover:border-amber-brand hover:text-amber-brand"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="rounded-full bg-amber-brand px-5 py-2.5 text-[13px] font-semibold uppercase tracking-[0.12em] text-navy-900 transition-colors hover:bg-amber-deep"
            >
              Get in Touch
            </Link>
          )}
        </div>
        <button
          className="grid h-11 w-11 place-items-center text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label="Toggle menu"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
            {open ? (
              <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
            )}
          </svg>
        </button>
      </div>
      {open && (
        <div className="border-t border-white/10 bg-navy-900 px-5 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col" aria-label="Mobile navigation">
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `border-b border-white/5 py-3.5 text-sm font-medium uppercase tracking-[0.14em] ${
                    isActive ? 'text-amber-brand' : 'text-white/80'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
          <div className="pt-5">
            {user ? (
              <button
                onClick={logout}
                className="w-full rounded-full border border-white/30 py-3 text-[13px] font-semibold uppercase tracking-[0.12em] text-white"
              >
                Logout ({user.name})
              </button>
            ) : (
              <Link
                to="/login"
                className="block w-full rounded-full bg-amber-brand py-3 text-center text-[13px] font-semibold uppercase tracking-[0.12em] text-navy-900"
              >
                Get in Touch
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
