type Props = {
  id: string
  label: string
  title: string
}

function SectionHeading({ id, label, title }: Props) {
  return (
    <div className="mb-12">
      <p
        id={`${id}-label`}
        className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-muted"
      >
        <span aria-hidden="true" className="h-px w-10 shrink-0 bg-accent" />
        {label}
      </p>
      <h2
        id={`${id}-heading`}
        className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl"
      >
        {title}
      </h2>
    </div>
  )
}

export default SectionHeading
