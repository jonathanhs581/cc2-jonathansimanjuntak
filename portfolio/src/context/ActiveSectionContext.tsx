import { createContext, useContext } from 'react'

export const ActiveSectionContext = createContext<string>('hero')

export const useActiveSection = (): string => useContext(ActiveSectionContext)
