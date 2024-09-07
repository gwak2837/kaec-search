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
    <div className="md:sticky md:z-10 top-0 md:p-4 md:pb-0 dark:bg-gray-900 bg-gray-100">
      <Link
        className="md:text-lg inline-block w-full font-semibold text-center text-white dark:text-red-500 p-3 md:p-4 bg-opacity-80 hover:bg-opacity-90 bg-red-700 dark:bg-red-500 dark:bg-opacity-20 rounded-lg dark:hover:bg-opacity-40 transition duration-300 ease-in-out"
        href={`?${newSearchParams}`}
      >
        {dict.초기화[lang]}
      </Link>
    </div>
  )
}

const dict = {
  초기화: {
    ko: '필터 초기화',
    en: 'Reset filter',
  },
} as const
