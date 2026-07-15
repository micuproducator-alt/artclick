import { useRef } from 'react'

export function useTilt<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  const onMouseMove = (e: React.MouseEvent<T>) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 7}deg) scale(1.02)`
    // spotlight
    const spot = el.querySelector<HTMLElement>('.wcard-spotlight')
    if (spot) {
      spot.style.setProperty('--mx', `${e.clientX - r.left}px`)
      spot.style.setProperty('--my', `${e.clientY - r.top}px`)
    }
  }

  const onMouseLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)'
  }

  return { ref, onMouseMove, onMouseLeave }
}
