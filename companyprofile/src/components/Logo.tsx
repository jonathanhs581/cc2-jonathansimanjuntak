import { Link } from 'react-router-dom'

export default function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="NusaDrill Energy home">
      <span className="grid h-10 w-10 place-items-center rounded-full bg-amber-brand text-navy-900">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-5 w-5" aria-hidden="true">
          <path d="M12 3v18M8 21h8M9 7h6M9 11h6M9 15h6M12 7l5-3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className={`font-display text-lg font-bold leading-tight ${dark ? 'text-navy-800' : 'text-white'}`}>
        NusaDrill
        <span className="block text-[10px] font-sans font-medium uppercase tracking-[0.28em] text-amber-brand">
          Energy
        </span>
      </span>
    </Link>
  )
}
