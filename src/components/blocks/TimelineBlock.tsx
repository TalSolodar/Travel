import { useEffect, useRef, useState, type CSSProperties } from 'react'
import { useStrings } from '../../i18n/context'
import type { TimelineBlock as TimelineBlockData, TimelineTask } from '../../types/guide'
import { Icon } from '../ui/Icon'
import { RichText } from '../ui/RichText'
import { BlockList } from './BlockRenderer'

/** How long a section stays highlighted after jumping to it. */
const FLASH_MS = 1600

export function TimelineBlock({ block }: { block: TimelineBlockData }) {
  const timelineRef = useRef<HTMLDivElement>(null)
  const [flashId, setFlashId] = useState<string | null>(null)

  useEffect(() => {
    if (!flashId) return
    const timer = setTimeout(() => setFlashId(null), FLASH_MS)
    return () => clearTimeout(timer)
  }, [flashId])

  const jumpTo = (id: string) => {
    const section = document.getElementById(id)
    if (!section) return
    scrollToElement(section)
    section.querySelector<HTMLElement>('h3')?.focus({ preventScroll: true })
    setFlashId(id)
  }

  return (
    <div className="space-y-6">
      <div ref={timelineRef} className="scroll-mt-24 rounded-3xl border border-brand-100 bg-brand-50/70 p-5 md:p-8 lg:scroll-mt-8">
        {(block.title || block.description) && (
          <div className="mb-6 md:mb-8 md:text-center">
            {block.title && <h2 className="text-2xl font-extrabold text-slate-900 md:text-3xl">{block.title}</h2>}
            {block.description && (
              <p className="mt-1 text-sm text-slate-600 md:text-base">
                <RichText text={block.description} />
              </p>
            )}
          </div>
        )}

        <ol
          className="relative grid gap-6 md:grid-cols-[repeat(var(--cols),minmax(0,1fr))] md:gap-3"
          style={{ '--cols': block.items.length } as CSSProperties}
        >
          {/* Connector: vertical on mobile, horizontal through the icon centers on wide screens. */}
          <span className="absolute start-8 top-8 bottom-8 w-0.5 bg-brand-200 md:hidden" aria-hidden="true" />
          <span
            className="absolute top-8 hidden h-0.5 bg-brand-200 md:block"
            style={{ insetInline: `${50 / block.items.length}%` }}
            aria-hidden="true"
          />

          {block.items.map((task, i) => (
            <li key={task.id} className="relative">
              <TimelineStop task={task} index={i} onSelect={() => jumpTo(task.id)} />
            </li>
          ))}
        </ol>
      </div>

      {block.items.map((task, i) => (
        <TaskSection
          key={task.id}
          task={task}
          index={i}
          flash={flashId === task.id}
          onBack={() => timelineRef.current && scrollToElement(timelineRef.current)}
        />
      ))}
    </div>
  )
}

function TimelineStop({ task, index, onSelect }: { task: TimelineTask; index: number; onSelect: () => void }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="group flex w-full gap-4 rounded-2xl text-start focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-600 md:flex-col md:items-center md:gap-3 md:text-center"
    >
      <span className="relative z-10 flex size-16 shrink-0 items-center justify-center rounded-2xl border border-brand-100 bg-white text-brand-600 shadow-sm transition group-hover:-translate-y-0.5 group-hover:border-brand-300 group-hover:shadow-md">
        <Icon name={task.icon} size={28} />
        <span className="absolute -end-2 -top-2 flex size-6 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white ring-2 ring-white">
          {index + 1}
        </span>
      </span>

      <span className="flex min-w-0 flex-col md:items-center">
        <span className="text-xs font-bold tracking-wide text-brand-700 uppercase">{task.when}</span>
        <span className="font-bold text-slate-900 underline-offset-4 group-hover:underline">{task.title}</span>
        <span className="mt-0.5 text-sm leading-snug text-slate-600">
          <RichText text={task.summary} />
        </span>
        {task.note && (
          <span className="mt-2 w-fit rounded-full bg-white px-2.5 py-0.5 text-xs font-medium text-slate-600 ring-1 ring-slate-200">
            {task.note}
          </span>
        )}
      </span>
    </button>
  )
}

interface TaskSectionProps {
  task: TimelineTask
  index: number
  flash: boolean
  onBack: () => void
}

function TaskSection({ task, index, flash, onBack }: TaskSectionProps) {
  const strings = useStrings()
  return (
    <section
      id={task.id}
      className={`scroll-mt-24 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-sm ring-2 transition-[box-shadow] duration-500 lg:scroll-mt-8 ${flash ? 'ring-brand-400' : 'ring-transparent'}`}
    >
      <header className="flex items-center gap-4 border-b border-brand-100 bg-gradient-to-r from-brand-50 via-brand-50/40 to-white px-4 py-4 md:px-7 md:py-5">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-md shadow-brand-600/25 md:size-14">
          <Icon name={task.icon} size={26} />
        </span>
        <div className="min-w-0">
          <div className="mb-1 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-brand-600 px-2 py-0.5 text-[11px] font-bold text-white">
              {strings.stepLabel(index + 1)}
            </span>
            <span className="inline-flex items-center gap-1 text-xs font-semibold text-brand-700">
              <Icon name="calendar" size={13} />
              {task.when}
            </span>
          </div>
          <h3 tabIndex={-1} className="text-xl font-extrabold text-slate-900 outline-none md:text-2xl">
            {task.title}
          </h3>
        </div>
      </header>

      <div className="p-4 md:p-7">
        <BlockList blocks={task.details} />
      </div>

      <footer className="border-t border-slate-100 bg-slate-50/60 px-4 py-3 md:px-7">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition hover:text-brand-700"
        >
          <Icon name="arrowUp" size={16} />
          {strings.backToTimeline}
        </button>
      </footer>
    </section>
  )
}

function scrollToElement(el: HTMLElement) {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' })
}
