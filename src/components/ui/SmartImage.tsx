import { useState } from 'react'

interface SmartImageProps {
  src?: string
  alt: string
  className?: string
}

/** Image that falls back to a brand gradient when missing or broken. */
export function SmartImage({ src, alt, className = '' }: SmartImageProps) {
  const [failed, setFailed] = useState(false)

  if (!src || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`bg-gradient-to-br from-brand-500 via-brand-600 to-sky-600 ${className}`}
      />
    )
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      onError={() => setFailed(true)}
      className={`object-cover ${className}`}
    />
  )
}
