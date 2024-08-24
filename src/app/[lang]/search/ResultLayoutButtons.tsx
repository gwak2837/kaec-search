import { Locale } from '@/middleware'
import Link from 'next/link'

type Props = {
  layout: 'list' | 'grid'
  lang: Locale
  searchParams: Record<string, unknown>
}

export default function ResultLayoutButtons({ layout, lang, searchParams }: Props) {
  const result = layouts.findIndex(({ key }) => key === layout)
  const selectedLayoutIndex = result === -1 ? 0 : result
  const newSearchParams = new URLSearchParams(searchParams as Record<string, string>)

  return (
    <div className="grid grid-cols-2 bg-gray-200 dark:bg-gray-800 p-1 rounded-xl">
      {layouts.map(({ key, text }, i) => {
        newSearchParams.delete('layout')
        newSearchParams.append('layout', key)

        return (
          <Link
            key={key}
            aria-selected={selectedLayoutIndex === i}
            className="relative rounded px-3 py-1 aria-selected:font-bold text-gray-400 aria-selected:text-white transition-colors"
            href={`?${newSearchParams}`}
          >
            {i === 0 && (
              <div
                className="rounded-lg absolute z-0 inset-0 transition-transform bg-blue-800"
                style={{ transform: `translateX(${100 * selectedLayoutIndex}%)` }}
              />
            )}
            <span className="relative">{text[lang]}</span>
          </Link>
        )
      })}
    </div>
  )
}

export const layouts = [
  {
    key: 'list',
    text: {
      ko: '리스트',
      en: 'List',
    },
  },
  {
    key: 'grid',
    text: {
      ko: '그리드',
      en: 'Grid',
    },
  },
] as const
