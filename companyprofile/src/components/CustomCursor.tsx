import { useEffect, useRef, useState } from 'react'

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reducedMotion) return
    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')
    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
    }
  }, [])

  useEffect(() => {
    if (!enabled) return
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    let mouseX = 0
    let mouseY = 0
    let ringX = 0
    let ringY = 0
    let frame: number

    const onMove = (event: MouseEvent) => {
      mouseX = event.clientX
      mouseY = event.clientY
      dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`
    }

    const onOver = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      const interactive = target.closest('a, button, [role="button"], input, textarea, select, label')
      dot.classList.toggle('cursor-hover', Boolean(interactive))
      ring.classList.toggle('cursor-hover', Boolean(interactive))
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.16
      ringY += (mouseY - ringY) * 0.16
      ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`
      frame = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mouseover', onOver, { passive: true })
    frame = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(frame)
    }
  }, [enabled])

  if (!enabled) return null

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999] mix-blend-difference">
      <div
        ref={dotRef}
        className="absolute left-0 top-0 h-5 w-5 rounded-full bg-white transition-[width,height] duration-200 [&.cursor-hover]:h-7 [&.cursor-hover]:w-7"
      />
      <div
        ref={ringRef}
        className="absolute left-0 top-0 h-10 w-10 rounded-full border-2 border-white opacity-70 transition-[width,height] duration-200 [&.cursor-hover]:h-14 [&.cursor-hover]:w-14"
      />
    </div>
  )
}
