interface BrowserFrameProps {
  src: string
  alt: string
  url?: string
  className?: string
  eager?: boolean
}

// A clean browser window used to present real project screenshots.
export default function BrowserFrame({ src, alt, url, className = '', eager = false }: BrowserFrameProps) {
  const small = src.replace(/\.webp$/, '-720.webp')
  return (
    <div className={`rounded-xl overflow-hidden border border-white/10 bg-[#0F1A2E] shadow-[0_24px_60px_-20px_rgba(0,0,0,0.7)] ${className}`}>
      <div className="flex items-center gap-1.5 px-3 h-7 border-b border-white/[0.06] bg-white/[0.03]">
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="w-2 h-2 rounded-full bg-white/15" />
        <span className="w-2 h-2 rounded-full bg-white/15" />
        {url && (
          <span className="ml-3 truncate font-mono text-[10px] text-ink-faint">{url}</span>
        )}
      </div>
      <img
        src={src}
        srcSet={`${small} 720w, ${src} 1440w`}
        sizes="(min-width: 992px) 560px, 100vw"
        alt={alt}
        width={1440}
        height={900}
        loading={eager ? 'eager' : 'lazy'}
        decoding="async"
        className="block w-full h-auto aspect-[16/10] object-cover object-top"
      />
    </div>
  )
}
