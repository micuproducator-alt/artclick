interface TagProps { children: string }

export default function Tag({ children }: TagProps) {
  return (
    <div className="flex items-center gap-2 font-mono text-[12.5px] uppercase tracking-[0.08em] text-mint mb-4">
      <span className="w-[18px] h-px bg-mint inline-block" />
      {children}
    </div>
  )
}
