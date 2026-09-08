import { useEffect, useRef, useState } from 'react'
import { stats } from '../data/stats'
import { useCountUp } from '../hooks/useCountUp'

function StatItem({
  target,
  suffix,
  label,
  active,
}: {
  target: number
  suffix: string
  label: string
  active: boolean
}) {
  const value = useCountUp(target, active)

  return (
    <div className="border-l-2 border-accent pl-5">
      <p className="font-display text-4xl font-bold text-ink sm:text-5xl">
        {value}
        <span className="text-accent-dark">{suffix}</span>
      </p>
      <p className="mt-1.5 text-sm font-medium text-muted">{label}</p>
    </div>
  )
}

function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // pakai scroll listener (bukan IntersectionObserver) supaya tetap
    // terpicu saat user lompat langsung ke section bawah via anchor
    let raf = 0
    const check = () => {
      const rect = el.getBoundingClientRect()
      // Trigger saat elemen masuk 85% bawah layar, ATAU sudah terlewat ke atas
      if (rect.top < window.innerHeight * 0.85) {
        setInView(true)
        window.removeEventListener('scroll', onScroll)
      }
    }
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(check)
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    check() // kasus: sudah terlihat saat mount

    return () => {
      window.removeEventListener('scroll', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      className="mt-16 grid grid-cols-1 gap-10 border-t border-line pt-12 sm:grid-cols-3"
    >
      {stats.map((stat) => (
        <StatItem
          key={stat.label}
          target={stat.value}
          suffix={stat.suffix}
          label={stat.label}
          active={inView}
        />
      ))}
    </div>
  )
}

export default Stats
