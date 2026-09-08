import type { NavLink } from '../types'

export const NAV_LINKS: NavLink[] = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export const SECTION_IDS: string[] = ['hero', ...NAV_LINKS.map((l) => l.id)]
