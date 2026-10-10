import { icons, type IconName } from '../../lib/icons'

interface IconProps {
  name: IconName
  className?: string
  size?: number
}

export function Icon({ name, className, size = 18 }: IconProps) {
  const Component = icons[name]
  return <Component aria-hidden="true" className={className} size={size} strokeWidth={2} />
}
