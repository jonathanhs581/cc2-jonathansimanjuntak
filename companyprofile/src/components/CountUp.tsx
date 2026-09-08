import { useEffect, useState } from 'react'
import { useInView } from '../hooks/useInView'

type Props = {
  value: number
  duration?: number
}

export default function CountUp({ value, duration = 1800 }: Props) {
  const { ref, inView } = useInView<HTMLSpanElement>(0.4)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let frame: number
    const start = performance.now()
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(Math.round(eased * value))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value, duration])

  return <span ref={ref}>{display.toLocaleString('en-US')}</span>
}
