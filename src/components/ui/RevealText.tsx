import { Fragment, useEffect, useRef, useState } from 'react'

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

  const words = text.split(/\s+/).filter(Boolean)

  return (
    // @ts-ignore — dynamic tag
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        // spațiu real între cuvinte (nu doar margin), ca Google să citească textul corect
        <Fragment key={i}>{i > 0 && ' '}<span
          className="inline-block overflow-hidden"
          style={{ verticalAlign: 'bottom' }}
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
        </span></Fragment>
      ))}
    </Tag>
  )
}
