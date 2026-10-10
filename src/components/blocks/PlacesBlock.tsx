import type { Place, PlacesBlock as PlacesBlockData } from '../../types/guide'
import { ActionLink } from '../ui/ActionLink'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { Icon } from '../ui/Icon'
import { RichText } from '../ui/RichText'
import { SmartImage } from '../ui/SmartImage'

export function PlacesBlock({ block }: { block: PlacesBlockData }) {
  return (
    <div className="space-y-5">
      {block.items.map((place) => (
        <PlaceCard key={place.name} place={place} />
      ))}
    </div>
  )
}

function PlaceCard({ place }: { place: Place }) {
  return (
    <Card className="flex flex-col gap-5 overflow-hidden p-4 transition-shadow hover:shadow-md md:flex-row md:p-5">
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-xl md:w-56">
        <SmartImage src={place.image} alt={place.name} className="size-full" />
        {place.badge && (
          <Badge variant="solid" className="absolute start-3 top-3">
            {place.badge}
          </Badge>
        )}
      </div>

      <div className="flex flex-1 flex-col">
        <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
          <h3 className="text-xl font-bold text-slate-900" dir="auto">
            {place.name}
          </h3>
          {place.stars && <Stars count={place.stars} />}
        </div>

        <p className="mb-4 text-sm leading-relaxed text-slate-600">
          <RichText text={place.description} />
        </p>

        {place.tags && (
          <div className="mb-4 flex flex-wrap gap-2">
            {place.tags.map((tag) => (
              <Badge key={tag.label} icon={tag.icon}>
                {tag.label}
              </Badge>
            ))}
          </div>
        )}

        {place.links && (
          <div className="mt-auto flex flex-col gap-2 border-t border-slate-100 pt-4 sm:flex-row">
            {place.links.map((link) => (
              <ActionLink key={link.href + link.label} link={link} />
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}

function Stars({ count }: { count: number }) {
  return (
    <span className="flex text-amber-400" aria-label={`${count} כוכבים`}>
      {Array.from({ length: count }, (_, i) => (
        <Icon key={i} name="star" size={15} className="fill-current" />
      ))}
    </span>
  )
}
