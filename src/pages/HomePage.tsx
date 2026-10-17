import { Link } from 'react-router-dom'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import { Icon } from '../components/ui/Icon'
import { SmartImage } from '../components/ui/SmartImage'
import { getGuides } from '../data/guides'
import { useLocale } from '../i18n/context'
import { themeStyle } from '../lib/themes'
import type { Guide } from '../types/guide'

export function HomePage() {
  const { locale, strings, siteName } = useLocale()

  return (
    <div className="min-h-dvh bg-slate-50">
      <SiteHeader />
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-sky-700 px-4 pt-14 pb-24 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
            <Icon name="compass" size={16} />
            {siteName}
          </p>
          <h1 className="max-w-2xl text-4xl leading-tight font-extrabold md:text-5xl">{strings.homeHeading}</h1>
          <p className="mt-3 max-w-xl text-lg text-white/85">{strings.siteTagline}</p>
        </div>
      </section>

      <main className="mx-auto -mt-14 max-w-5xl px-4 pb-16">
        <h2 className="sr-only">{strings.chooseGuide}</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {getGuides(locale).map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
        <SiteFooter className="mt-16" />
      </main>
    </div>
  )
}

function GuideCard({ guide }: { guide: Guide }) {
  const { strings, href } = useLocale()
  return (
    <Link
      to={href(`/${guide.slug}`)}
      style={themeStyle(guide.theme)}
      className="group flex flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative h-48 overflow-hidden">
        <SmartImage
          src={guide.coverImage}
          alt={guide.hub.heading}
          className="size-full transition-transform duration-700 group-hover:scale-105"
        />
        <span className="absolute start-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-slate-800 backdrop-blur">
          {strings.stepsCount(guide.steps.length)}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mb-1 flex items-center gap-2 text-xl font-bold text-slate-900">
          <Icon name={guide.icon} size={20} className="text-brand-600" />
          {guide.title}
        </h3>
        <p className="mb-5 text-sm leading-relaxed text-slate-600">{guide.description}</p>
        <span className="mt-auto inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
          {strings.startGuide}
          <Icon name="arrowRight" size={16} className="transition group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
        </span>
      </div>
    </Link>
  )
}
