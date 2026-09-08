import { Link } from 'react-router-dom'
import Logo from './Logo'

export default function Footer() {
  return (
    <footer className="bg-navy-950 text-white">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:grid-cols-2 lg:grid-cols-4 lg:px-8">
        <div>
          <Logo />
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-white/60">
            Drilling Deeper, Delivering Further. Integrated drilling and energy solutions from Balikpapan to the
            deepwater frontier.
          </p>
        </div>
        <nav aria-label="Company">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-amber-brand">Company</h2>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li><Link className="transition-colors hover:text-amber-brand" to="/about">About Us</Link></li>
            <li><Link className="transition-colors hover:text-amber-brand" to="/teams">Our Teams</Link></li>
            <li><Link className="transition-colors hover:text-amber-brand" to="/blog">Blog & Insights</Link></li>
            <li><Link className="transition-colors hover:text-amber-brand" to="/login">Client Login</Link></li>
          </ul>
        </nav>
        <nav aria-label="Services">
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-amber-brand">Services</h2>
          <ul className="mt-5 space-y-3 text-sm text-white/70">
            <li><Link className="transition-colors hover:text-amber-brand" to="/services">Offshore Drilling</Link></li>
            <li><Link className="transition-colors hover:text-amber-brand" to="/services">Onshore Rig Operations</Link></li>
            <li><Link className="transition-colors hover:text-amber-brand" to="/services">Field Engineering</Link></li>
            <li><Link className="transition-colors hover:text-amber-brand" to="/services">Decommissioning & P&A</Link></li>
          </ul>
        </nav>
        <div>
          <h2 className="font-display text-sm font-bold uppercase tracking-[0.18em] text-amber-brand">Head Office</h2>
          <address className="mt-5 space-y-3 text-sm not-italic text-white/70">
            <p>Jl. Jenderal Sudirman No. 88<br />Balikpapan 76114, East Kalimantan</p>
            <p><a className="transition-colors hover:text-amber-brand" href="mailto:info@nusadrill.co.id">info@nusadrill.co.id</a></p>
            <p><a className="transition-colors hover:text-amber-brand" href="tel:+62542345678">+62 542 345 678</a></p>
          </address>
        </div>
      </div>
      <div className="border-t border-white/10">
        <p className="mx-auto max-w-7xl px-5 py-5 text-center text-xs text-white/40 lg:px-8">
          © 2026 PT NusaDrill Energi Nusantara. All rights reserved.
        </p>
      </div>
    </footer>
  )
}
