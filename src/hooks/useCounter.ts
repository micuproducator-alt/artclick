import { useState, useRef, useEffect } from 'react'

export function useCounter(target: string, duration = 1400) {
  const [display, setDisplay] = useState('0')
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const num = parseInt(target.replace(/\D/g, ''))
    if (isNaN(num) || num === 0) { setDisplay(target); return }

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      obs.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1)
        const eased = 1 - Math.pow(1 - p, 4)
        const current = Math.round(num * eased)
        setDisplay(target.includes('+') ? `${current}+` : String(current))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }, { threshold: 0.5 })

    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [target, duration])

  return { display, ref }
}
