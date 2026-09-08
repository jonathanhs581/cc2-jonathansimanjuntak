type DoodleProps = { className?: string }

// hiasan coretan tangan; warna ngikut text-*, aria-hidden karena dekoratif
export function SquiggleDoodle({ className }: DoodleProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 28"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M4 16 C9 4, 17 4, 22 16 C27 28, 35 28, 40 16 C43 9, 49 7, 54 10 L60 18"
        stroke="currentColor"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}
