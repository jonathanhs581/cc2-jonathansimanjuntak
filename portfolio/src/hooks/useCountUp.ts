import { useEffect, useState } from 'react'

export function useCountUp(target: number, active: boolean, duration = 1400): number {
  const [value, setValue] = useState(0)

  useEffect(() => {
    if (!active) return

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const dur = reduced ? 0 : duration

    let raf = 0
    const start = performance.now()

    const tick = (now: number) => {
      const progress = dur === 0 ? 1 : Math.min((now - start) / dur, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setValue(Math.round(target * eased))
      if (progress < 1) raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [active, target, duration])

  return value
}
