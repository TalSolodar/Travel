import { Link } from 'react-router-dom'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import { Icon } from '../components/ui/Icon'
import { RichText } from '../components/ui/RichText'
import { SmartImage } from '../components/ui/SmartImage'
import { useLocale } from '../i18n/context'
import { themeStyle } from '../lib/themes'
import type { Guide, Step } from '../types/guide'

/** A country's hub page (/<lang>/<slug>): intro plus a card for every published guide step. */
export function GuideHubPage({ guide }: { guide: Guide }) {
  return (
    <div style={themeStyle(guide.theme)} className="min-h-dvh bg-slate-50">
      <SiteHeader />

      <section className="relative isolate overflow-hidden">
        <SmartImage src={guide.coverImage} alt={guide.hub.heading} className="absolute inset-0 -z-10 size-full" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/80 via-black/50 to-black/30" />
        <div className="mx-auto max-w-5xl px-4 pt-16 pb-24 text-white md:pt-24">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium backdrop-blur">
            <Icon name={guide.icon} size={16} />
            {guide.title}
          </p>
          <h1 className="max-w-3xl text-4xl leading-tight font-extrabold md:text-5xl">{guide.hub.heading}</h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/90 md:text-lg">
            <RichText text={guide.hub.intro} />
          </p>
        </div>
      </section>

      <main className="mx-auto -mt-12 max-w-5xl px-4 pb-16">
        <div className="grid gap-6 sm:grid-cols-2">
          {guide.steps.map((step, i) => (
            <StepCard key={step.id} guide={guide} step={step} index={i} />
          ))}
        </div>
        <SiteFooter className="mt-16" />
      </main>
    </div>
  )
}

function StepCard({ guide, step, index }: { guide: Guide; step: Step; index: number }) {
  const { strings, href } = useLocale()
  return (
    <Link
      to={href(`/${guide.slug}/${step.id}`)}
      className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-44 overflow-hidden">
        <SmartImage
          src={step.image}
          alt={step.heading ?? step.title}
          className="size-full transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute start-4 top-4 rounded-full bg-brand-600 px-3 py-1 text-xs font-bold text-white">
          {strings.stepLabel(index + 1)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h2 className="mb-1 flex items-center gap-2 text-xl font-bold text-slate-900">
          <Icon name={step.icon} size={20} className="shrink-0 text-brand-600" />
          {step.heading ?? step.title}
        </h2>
        <p className="mb-5 text-sm leading-relaxed text-slate-600">{step.subtitle}</p>
        <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
          {strings.readGuide}
          <Icon name="arrowRight" size={16} className="transition group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
