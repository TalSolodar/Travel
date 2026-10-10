import { ratingStyles } from '../../lib/tones'
import type { TableBlock as TableBlockData, TableCell } from '../../types/guide'
import { Card } from '../ui/Card'
import { Icon } from '../ui/Icon'

/**
 * A real table on wider screens. On phones each row becomes a card (first cell as its
 * title, the other cells labeled by their column), so nothing needs sideways scrolling.
 */
export function TableBlock({ block }: { block: TableBlockData }) {
  return (
    <div>
      {block.title && <h3 className="mb-3 text-xl font-bold text-slate-900">{block.title}</h3>}

      <Card className="hidden overflow-x-auto sm:block">
        <table className="w-full border-collapse text-start text-sm">
          <thead className="bg-brand-50 text-brand-900">
            <tr>
              {block.columns.map((col) => (
                <th key={col} scope="col" className="p-3 text-start font-semibold">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700">
            {block.rows.map((row, r) => (
              <tr key={r} className="hover:bg-slate-50/60">
                {row.map((cell, c) =>
                  c === 0 ? (
                    <th key={c} scope="row" className="p-3 text-start align-top font-semibold whitespace-nowrap text-slate-900">
                      <CellContent cell={cell} />
                    </th>
                  ) : (
                    <td key={c} className="p-3 align-top">
                      <CellContent cell={cell} />
                    </td>
                  ),
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </Card>

      <div className="space-y-3 sm:hidden">
        {block.rows.map((row, r) => {
          const [header, ...cells] = row
          return (
            <Card key={r} className="overflow-hidden">
              <h4 className="bg-brand-50 px-4 py-2.5 font-bold text-brand-900">{cellText(header)}</h4>
              <dl className="divide-y divide-slate-100 px-4 text-sm text-slate-700">
                {cells.map((cell, c) => (
                  <div key={c} className="flex items-start gap-3 py-2.5">
                    <dt className="w-24 shrink-0 pt-0.5 text-xs font-medium text-slate-500">{block.columns[c + 1]}</dt>
                    <dd className="min-w-0 flex-1">
                      <CellContent cell={cell} />
                    </dd>
                  </div>
                ))}
              </dl>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

function cellText(cell: TableCell) {
  return typeof cell === 'string' ? cell : cell.text
}

function CellContent({ cell }: { cell: TableCell }) {
  const data = typeof cell === 'string' ? { text: cell } : cell
  const rating = data.rating ? ratingStyles[data.rating] : undefined
  const icon = data.icon ?? rating?.icon

  return (
    <span className="flex items-start gap-2">
      {icon && (
        <span
          className={`mt-px flex size-5 shrink-0 items-center justify-center rounded-full ${rating ? `ring-1 ring-inset ${rating.badge}` : 'text-slate-500'}`}
        >
          <Icon name={icon} size={12} />
        </span>
      )}
      <span>
        <span className={rating ? `font-semibold ${rating.text}` : ''}>{data.text}</span>
        {data.note && <span className="mt-0.5 block text-xs leading-snug text-slate-500">{data.note}</span>}
      </span>
    </span>
  )
}
