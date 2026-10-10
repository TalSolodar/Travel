interface ProgressBarProps {
  current: number
  total: number
  className?: string
}

export function ProgressBar({ current, total, className = '' }: ProgressBarProps) {
  const percent = Math.round((current / total) * 100)
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={total}
      aria-valuenow={current}
      className={`h-1.5 overflow-hidden rounded-full bg-slate-200 ${className}`}
    >
      <div
        className="h-full rounded-full bg-brand-500 transition-[width] duration-500"
        style={{ width: `${percent}%` }}
      />
    </div>
  )
}
