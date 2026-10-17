import type { ReactNode } from 'react'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'

interface StaticPageLayoutProps {
  title: string
  /** e.g. "Last updated: October 2026" */
  intro?: string
  children: ReactNode
}

/** Simple text page (e.g. Privacy & Affiliate Disclosure): site header, one H1, readable body, footer. */
export function StaticPageLayout({ title, intro, children }: StaticPageLayoutProps) {
  return (
    <div className="min-h-dvh bg-slate-50">
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <h1 className="text-3xl font-extrabold text-slate-900 md:text-4xl">{title}</h1>
        {intro && <p className="mt-2 text-sm text-slate-500">{intro}</p>}
        <div className="mt-8 space-y-4 leading-relaxed text-slate-700 [&_a]:font-semibold [&_a]:text-brand-700 [&_a:hover]:underline [&_h2]:pt-4 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-slate-900 [&_h3]:pt-2 [&_h3]:text-lg [&_h3]:font-bold [&_h3]:text-slate-900 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:ps-6">
          {children}
        </div>
        <SiteFooter className="mt-14" />
      </main>
    </div>
  )
}
