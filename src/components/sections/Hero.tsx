import { Fragment, useEffect, useRef, useState } from 'react'
import { useLang } from '../../context/LangContext'
import { useModal } from '../../context/ModalContext'
import { useCounter } from '../../hooks/useCounter'
import MagneticBtn from '../ui/MagneticBtn'

function HeroOrbs() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    let animId: number, t = 0
    const mouse = { x: 0.5, y: 0.5 }, target = { x: 0.5, y: 0.5 }
    const ORBS = [
      { bx: 0.2,  by: 0.4, r: 0.5,  color: '#0AA896', spd: 0.22 },
      { bx: 0.75, by: 0.3, r: 0.42, color: '#38BDF8', spd: 0.17 },
      { bx: 0.5,  by: 0.8, r: 0.35, color: '#0891B2', spd: 0.29 },
    ]
    const onMove = (e: MouseEvent) => {
      target.x = e.clientX / window.innerWidth
      target.y = e.clientY / window.innerHeight
    }
    window.addEventListener('mousemove', onMove)
    const resize = () => { canvas.width = canvas.offsetWidth * devicePixelRatio; canvas.height = canvas.offsetHeight * devicePixelRatio }
    resize(); window.addEventListener('resize', resize)
    const draw = () => {
      t += 0.004
      mouse.x += (target.x - mouse.x) * 0.04; mouse.y += (target.y - mouse.y) * 0.04
      const W = canvas.width, H = canvas.height
      ctx.clearRect(0, 0, W, H)
      ORBS.forEach((orb, i) => {
        const x = (orb.bx + Math.sin(t * orb.spd + i * 1.8) * 0.09 + (mouse.x - 0.5) * 0.07) * W
        const y = (orb.by + Math.cos(t * orb.spd * 1.2 + i) * 0.07 + (mouse.y - 0.5) * 0.05) * H
        const r = orb.r * Math.min(W, H) * 0.9
        const g = ctx.createRadialGradient(x, y, 0, x, y, r)
        g.addColorStop(0,   orb.color + '22')
        g.addColorStop(0.5, orb.color + '0E')
        g.addColorStop(1,   orb.color + '00')
        ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = g; ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('mousemove', onMove); window.removeEventListener('resize', resize) }
  }, [])
  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />
}

function ProofItem({ num, unit, label }: { num: string; unit: string; label: string }) {
  const { display, ref } = useCounter(num)
  return (
    <div className="flex flex-col gap-1 px-4 md:px-6 py-4 md:py-5">
      <span ref={ref} className="font-bricolage font-bold text-[22px] md:text-[26px] text-mint leading-none">
        {display}{unit && <small className="text-[12px] md:text-[13px] ml-0.5 font-bricolage">{unit}</small>}
      </span>
      <span className="text-[11px] md:text-[12px] text-ink-faint leading-tight">{label}</span>
    </div>
  )
}

function LiveChart({ label, delta }: { label: string; delta: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current; if (!canvas) return
    const ctx = canvas.getContext('2d'); if (!ctx) return
    let animId: number, progress = 0
    const pts: number[] = []
    let seed = 40
    for (let i = 0; i < 60; i++) { seed += (Math.random() - 0.42) * 8; seed = Math.max(20, Math.min(80, seed)); pts.push(seed) }
    const resize = () => { canvas.width = canvas.offsetWidth * devicePixelRatio; canvas.height = canvas.offsetHeight * devicePixelRatio }
    resize(); window.addEventListener('resize', resize)
    const draw = () => {
      const W = canvas.width, H = canvas.height, N = pts.length, vis = Math.floor(progress * N)
      ctx.clearRect(0, 0, W, H)
      if (vis < 2) { progress += 0.025; animId = requestAnimationFrame(draw); return }
      const step = W / (N - 1), mx = Math.max(...pts), mn = Math.min(...pts)
      const norm = (v: number) => H - ((v - mn) / (mx - mn)) * H * 0.75 - H * 0.1
      const g = ctx.createLinearGradient(0, 0, 0, H)
      g.addColorStop(0, 'rgba(13,217,197,0.2)'); g.addColorStop(1, 'rgba(13,217,197,0)')
      ctx.beginPath(); ctx.moveTo(0, norm(pts[0]))
      for (let i = 1; i < vis; i++) ctx.lineTo(i * step, norm(pts[i]))
      ctx.lineTo((vis-1)*step, H); ctx.lineTo(0, H); ctx.closePath()
      ctx.fillStyle = g; ctx.fill()
      ctx.beginPath(); ctx.moveTo(0, norm(pts[0]))
      for (let i = 1; i < vis; i++) ctx.lineTo(i * step, norm(pts[i]))
      ctx.strokeStyle = '#0DD9C5'; ctx.lineWidth = 2.5 * devicePixelRatio; ctx.lineJoin = 'round'; ctx.stroke()
      if (vis < N) { ctx.beginPath(); ctx.arc((vis-1)*step, norm(pts[vis-1]), 4*devicePixelRatio, 0, 7); ctx.fillStyle = '#0DD9C5'; ctx.fill() }
      if (progress < 1.05) { progress += 0.01; animId = requestAnimationFrame(draw) }
    }
    draw()
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])
  return (
    <div className="border border-[var(--glass-border)] rounded-xl md:rounded-2xl bg-[var(--glass)] overflow-hidden backdrop-blur-sm">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center px-3 xs:px-4 sm:px-5 py-3 border-b border-[var(--line)] gap-1">
        <div>
          <div className="text-[10.5px] md:text-[12px] text-ink-faint">{label}</div>
          <div className="font-bricolage font-bold text-[18px] md:text-[22px] text-ink">
            48<span className="font-mono text-[12px] md:text-[13px] text-ink-dim ml-1">h</span>
          </div>
        </div>
        <div className="font-mono text-[10px] md:text-[11.5px] text-mint">{delta}</div>
      </div>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: 110 }} />
    </div>
  )
}

function RevealH1({ html }: { html: string }) {
  const [vis, setVis] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVis(true), 200); return () => clearTimeout(t) }, [])
  const parts = html.split(/(<span[^>]*>.*?<\/span>)/g)
  return (
    <h1 className="hero-h1 font-bricolage font-bold leading-[1.05] tracking-[-0.03em] mb-5 md:mb-7 text-ink"
      style={{ fontSize: 'clamp(30px, 6vw, 74px)', maxWidth: 880 }}
      aria-label={html.replace(/<[^>]+>/g, '')}>
      {parts.map((part, pi) => {
        const inner = part.startsWith('<span') ? part.replace(/<span[^>]*>(.*?)<\/span>/, '$1') : null
        const words = (inner ?? part.replace(/<br\/>/g, ' ')).split(' ').filter(Boolean)
        return words.map((word, wi) => (
          <Fragment key={`${pi}-${wi}`}>{(pi > 0 || wi > 0) && ' '}<span className="inline-block overflow-hidden" style={{ verticalAlign: 'bottom' }}>
            <span className={inner ? 'grad-text inline-block' : 'inline-block'} style={{
              transform: vis ? 'translateY(0)' : 'translateY(110%)',
              opacity: vis ? 1 : 0,
              transition: `transform 0.8s cubic-bezier(0.16,1,0.3,1), opacity 0.5s ease`,
              transitionDelay: `${200 + (pi * 3 + wi) * 55}ms`,
            }}>{word}</span>
          </span></Fragment>
        ))
      })}
    </h1>
  )
}

export default function Hero() {
  const { i18n } = useLang()
  const { openModal } = useModal()
  const [vis, setVis] = useState(false)
  useEffect(() => { const t = setTimeout(() => setVis(true), 100); return () => clearTimeout(t) }, [])

  return (
    <section className="relative z-10 overflow-hidden min-h-[100svh] flex flex-col justify-center pt-[80px] pb-12 md:pt-[100px] md:pb-20">
      <HeroOrbs />
      <div className="wrap w-full relative z-10 flex-1 flex flex-col justify-center">

        {/* Status pill */}
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(12px)', transition: 'all 0.6s cubic-bezier(0.16,1,0.3,1)' }}
          className="inline-flex items-center gap-2 px-3 py-1.5 border border-[var(--glass-border)]
            rounded-full bg-[var(--glass)] text-[11px] md:text-[12px] text-ink-dim mb-6 w-fit backdrop-blur-sm">
          <span className="w-[6px] h-[6px] rounded-full bg-mint flex-shrink-0 animate-pulse" />
          {i18n.status}
        </div>

        <RevealH1 html={i18n.h1} />

        {/* For-who pills */}
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(16px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.1s' }}
          className="flex gap-2 flex-wrap mb-5 md:mb-7">
          {i18n.for_who.map((pill, i) => (
            <span key={i} className={`font-mono text-[10px] md:text-[11px] px-2.5 py-1 rounded-full border
              ${i < 3
                ? 'border-mint/40 text-mint bg-mint/8 font-medium'
                : 'border-[var(--line)] text-ink-faint bg-[var(--glass)]'}`}>
              {pill}
            </span>
          ))}
        </div>

        {/* Subtitle */}
        <p style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(16px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.2s' }}
          className="text-[14px] md:text-[17px] text-ink-dim max-w-[520px] mb-8 md:mb-10 leading-[1.75]">
          {i18n.hero_p}
        </p>

        {/* CTAs */}
        <div style={{ opacity: vis ? 1 : 0, transform: vis ? 'none' : 'translateY(16px)', transition: 'all 0.7s cubic-bezier(0.16,1,0.3,1) 0.35s' }}
          className="flex flex-col xs:flex-row gap-3 mb-12 md:mb-16">
          <MagneticBtn onClick={() => openModal('quote')} className="w-full sm:w-auto justify-center">{i18n.cta_start}</MagneticBtn>
          <MagneticBtn variant="ghost" onClick={() => openModal('projects')} className="w-full sm:w-auto justify-center">{i18n.cta_projects}</MagneticBtn>
        </div>

        {/* Chart + Proof */}
        <div style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.8s ease 0.5s' }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <LiveChart label={i18n.stat_label} delta={i18n.stat_delta} />
          <div className="grid grid-cols-2 border border-[var(--glass-border)] rounded-xl md:rounded-2xl bg-[var(--glass)] overflow-hidden backdrop-blur-sm">
            {i18n.proof_items.map((item, i) => (
              <div key={i} className={`${i%2===0?'border-r':''} ${i<2?'border-b md:border-b-0':''} border-[var(--line)]`}>
                <ProofItem num={item.num} unit={item.unit} label={item.label} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
