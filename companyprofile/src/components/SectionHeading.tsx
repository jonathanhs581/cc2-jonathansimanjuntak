type Props = {
  eyebrow: string
  title: string
  light?: boolean
  align?: 'left' | 'center'
}

export default function SectionHeading({ eyebrow, title, light, align = 'left' }: Props) {
  const centered = align === 'center'
  return (
    <div className={centered ? 'mx-auto max-w-2xl text-center' : 'max-w-2xl'}>
      <p
        className={`flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.28em] text-amber-deep before:block before:h-px before:w-8 before:bg-amber-deep ${
          centered ? 'justify-center' : ''
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl ${
          light ? 'text-white' : 'text-navy-800'
        }`}
      >
        {title}
      </h2>
    </div>
  )
}
