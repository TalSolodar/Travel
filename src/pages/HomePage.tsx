import { Link } from 'react-router-dom'
import { SiteFooter } from '../components/layout/SiteFooter'
import { SiteHeader } from '../components/layout/SiteHeader'
import { StepCard } from '../components/layout/StepCard'
import { Icon } from '../components/ui/Icon'
import { getGuides } from '../data/guides'
import { useLocale } from '../i18n/context'
import { themeStyle } from '../lib/themes'
import type { Guide } from '../types/guide'

export function HomePage() {
  const { locale, strings, siteName } = useLocale()
  const guides = getGuides(locale)

  return (
    <div className="min-h-dvh bg-slate-50">
      <SiteHeader />
      <section className="bg-gradient-to-br from-brand-700 via-brand-600 to-sky-700 px-4 pt-14 pb-16 text-white">
        <div className="mx-auto max-w-5xl">
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-medium">
            <Icon name="compass" size={16} />
            {siteName}
          </p>
          <h1 className="max-w-2xl text-4xl leading-tight font-extrabold md:text-5xl">{strings.homeHeading(guides.map((g) => g.country))}</h1>
          <p className="mt-3 max-w-xl text-lg text-white/85">{strings.siteTagline}</p>
        </div>
      </section>

      <main className="mx-auto max-w-5xl px-4 py-12 md:py-16">
        {/* One section per country; registering a new guide in data/guides adds its section here. */}
        <div className="space-y-14">
          {guides.map((guide) => (
            <CountrySection key={guide.slug} guide={guide} />
          ))}
        </div>
        <SiteFooter className="mt-16" />
      </main>
    </div>
  )
}

function CountrySection({ guide }: { guide: Guide }) {
  const { strings, href } = useLocale()
  const headingId = `country-${guide.slug}`
  return (
    <section aria-labelledby={headingId} style={themeStyle(guide.theme)}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div className="max-w-2xl">
          <h2 id={headingId} className="flex items-center gap-2.5 text-2xl font-extrabold text-slate-900 md:text-3xl">
            <span className="flex size-9 items-center justify-center rounded-xl bg-brand-600 text-white">
              <Icon name={guide.icon} size={18} />
            </span>
            {guide.country}
          </h2>
          <p className="mt-2 text-slate-600">{guide.description}</p>
        </div>
        <Link
          to={href(`/${guide.slug}`)}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-brand-700 hover:text-brand-900"
        >
          {strings.countryHubLink(guide.country)}
          <Icon name="arrowRight" size={15} className="transition group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {guide.steps.map((step, i) => (
          <StepCard key={step.id} guide={guide} step={step} index={i} headingLevel="h3" />
        ))}
      </div>
    </section>
  )
}
