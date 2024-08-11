import { Locale } from '@/middleware'
import Link from 'next/link'

type Props = {
  facetIndex?: number
  lang: Locale
  query: string
}

export default function FilterResetButton({ lang, query, facetIndex }: Props) {
  return (
    <Link
      className="md:text-lg font-semibold text-center text-red-500 p-3 md:p-4 bg-red-500 bg-opacity-20 rounded-lg shadow-md hover:bg-opacity-40 transition duration-300 ease-in-out"
      href={`?${new URLSearchParams({
        query,
        ...(facetIndex && { facetIndex: String(facetIndex) }),
      })}`}
    >
      {dict.초기화[lang]}
    </Link>
  )
}

const dict = {
  초기화: {
    ko: '필터 초기화',
    en: 'Reset filter',
  },
} as const
