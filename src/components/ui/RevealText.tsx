import { useEffect, useRef, useState } from 'react'

interface RevealTextProps {
  text: string
  className?: string
  delay?: number
  as?: 'h1' | 'h2' | 'h3' | 'p'
}

export default function RevealText({ text, className = '', delay = 0, as: Tag = 'h2' }: RevealTextProps) {
  const ref = useRef<HTMLElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect() } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const words = text.split(' ')

  return (
    // @ts-ignore — dynamic tag
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden"
          style={{ marginRight: '0.28em', verticalAlign: 'bottom' }}
        >
          <span
            style={{
              display: 'inline-block',
              transform: visible ? 'translateY(0) rotate(0)' : 'translateY(105%) rotate(2deg)',
              opacity: visible ? 1 : 0,
              transition: `transform 0.75s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.5s ease`,
              transitionDelay: `${delay + i * 55}ms`,
            }}
          >
            {word}
          </span>
        </span>
      ))}
    </Tag>
  )
}
