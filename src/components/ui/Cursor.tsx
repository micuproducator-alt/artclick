import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)
  const pos  = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const dot = dotRef.current; const ringEl = ringRef.current
    if (!dot || !ringEl) return

    window.addEventListener('mousemove', e => {
      pos.current = { x: e.clientX, y: e.clientY }
      dot.style.left = e.clientX + 'px'
      dot.style.top  = e.clientY + 'px'
    })

    let animId: number
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.1
      ring.current.y += (pos.current.y - ring.current.y) * 0.1
      ringEl.style.left = ring.current.x + 'px'
      ringEl.style.top  = ring.current.y + 'px'
      animId = requestAnimationFrame(animate)
    }
    animate()

    const SIZE: Record<string,[string,string]> = {
      default: ['5px','30px'], hover: ['7px','50px'],
      xl: ['9px','170px'],     lg:  ['7px','100px'],
    }
    const apply = (k: string) => {
      const [d,r] = SIZE[k]
      dot.style.width = d; dot.style.height = d
      ringEl.style.width = r; ringEl.style.height = r
    }

    const attach = () => {
      document.querySelectorAll('a,button,[data-hover]').forEach(el => {
        el.addEventListener('mouseenter', () => apply('hover'))
        el.addEventListener('mouseleave', () => apply('default'))
      })
      document.querySelector('.hero-h1')?.addEventListener('mouseenter', () => apply('xl'))
      document.querySelector('.hero-h1')?.addEventListener('mouseleave', () => apply('default'))
      document.querySelectorAll('section h2').forEach(h => {
        h.addEventListener('mouseenter', () => apply('lg'))
        h.addEventListener('mouseleave', () => apply('default'))
      })
    }
    attach()
    const obs = new MutationObserver(attach)
    obs.observe(document.body, { childList: true, subtree: true })
    return () => { cancelAnimationFrame(animId); obs.disconnect() }
  }, [])

  return (
    <>
      <div ref={dotRef} style={{
        position:'fixed', top:0, left:0, zIndex:9999,
        width:5, height:5, borderRadius:'50%',
        background:'#0DD9C5',
        transform:'translate(-50%,-50%)', pointerEvents:'none',
        transition:'width 0.15s, height 0.15s',
      }} />
      <div ref={ringRef} style={{
        position:'fixed', top:0, left:0, zIndex:9998,
        width:30, height:30, borderRadius:'50%',
        border:'1.5px solid rgba(13,217,197,0.5)',
        transform:'translate(-50%,-50%)', pointerEvents:'none',
        transition:'width 0.4s cubic-bezier(0.16,1,0.3,1), height 0.4s cubic-bezier(0.16,1,0.3,1)',
      }} />
    </>
  )
}
