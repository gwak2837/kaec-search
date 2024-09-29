import { Locale } from '@/middleware'
import Link from 'next/link'

type Props = {
  lang: Locale
  searchParams: Record<string, unknown>
}

export default function FilterResetButton({ lang, searchParams }: Props) {
  const newSearchParams = new URLSearchParams(searchParams as Record<string, string>)
  newSearchParams.delete('facetFilters')

  return (
    <Link
      className="inline-block w-full rounded-lg bg-red-700 bg-opacity-80 p-3 text-center font-semibold text-white transition duration-300 ease-in-out hover:bg-opacity-90 md:p-4 md:text-lg dark:bg-red-500 dark:bg-opacity-20 dark:text-red-500 dark:hover:bg-opacity-40"
      href={`?${newSearchParams}`}
      scroll={false}
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
