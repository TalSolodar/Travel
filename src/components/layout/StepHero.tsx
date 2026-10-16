import { useStrings } from '../../i18n/context'
import type { Step } from '../../types/guide'
import { SmartImage } from '../ui/SmartImage'

interface StepHeroProps {
  step: Step
  index: number
}

export function StepHero({ step, index }: StepHeroProps) {
  const strings = useStrings()
  return (
    <header className="relative mb-8 h-56 overflow-hidden rounded-3xl shadow-sm md:h-72">
      <SmartImage key={step.image} src={step.image} alt={step.title} className="size-full" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
      <div className="absolute inset-x-5 bottom-5 text-white md:inset-x-8 md:bottom-7">
        <span className="mb-2 inline-block rounded-full bg-brand-600 px-3 py-1 text-xs font-bold">
          {strings.stepLabel(index + 1)}
        </span>
        <h1 className="text-3xl font-extrabold drop-shadow md:text-4xl">{step.heading ?? step.title}</h1>
        <p className="mt-1 text-sm text-white/85 md:text-base">{step.subtitle}</p>
      </div>
    </header>
  )
}
