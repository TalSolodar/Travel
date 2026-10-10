import { Link } from 'react-router-dom'
import { strings } from '../lib/strings'

export function NotFoundPage() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-slate-50 p-6 text-center">
      <h1 className="text-3xl font-bold text-slate-900">{strings.notFound}</h1>
      <Link to="/" className="font-semibold text-brand-700 hover:underline">
        {strings.backHome}
      </Link>
    </div>
  )
}
