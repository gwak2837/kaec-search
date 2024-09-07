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
      className="md:text-lg inline-block w-full font-semibold text-center text-white dark:text-red-500 p-3 md:p-4 bg-opacity-80 hover:bg-opacity-90 bg-red-700 dark:bg-red-500 dark:bg-opacity-20 rounded-lg dark:hover:bg-opacity-40 transition duration-300 ease-in-out"
      href={`?${newSearchParams}`}
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
