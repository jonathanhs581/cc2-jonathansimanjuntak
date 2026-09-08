import type { CSSProperties, ReactNode } from 'react'
import { useInView } from '../hooks/useInView'

type Props = {
  children: ReactNode
  delay?: number
  className?: string
  as?: 'div' | 'section' | 'article' | 'figure'
}

export default function Reveal({ children, delay = 0, className = '', as = 'div' }: Props) {
  const { ref, inView } = useInView<HTMLDivElement>()
  const Tag = as
  const style: CSSProperties = { transitionDelay: `${delay}ms` }

  return (
    <Tag
      ref={ref as never}
      style={style}
      className={`translate-y-8 opacity-0 transition-all duration-700 ease-out will-change-transform ${
        inView ? 'translate-y-0 opacity-100' : ''
      } ${className}`}
    >
      {children}
    </Tag>
  )
}
