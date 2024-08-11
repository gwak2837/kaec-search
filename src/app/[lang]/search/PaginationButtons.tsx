'use client'

import { Locale } from '@/middleware'
import Link from 'next/link'

type Props = {
  pageCount: number
  lang: Locale
  page: number
  query: string
  facetIndex?: number
  facetFilters?: string
}

export default function PaginationButtons({
  pageCount,
  lang,
  page,
  query,
  facetFilters,
  facetIndex,
}: Props) {
  const prevPage = Math.max(1, page - 1)
  const nextPage = Math.min(page + 1, pageCount)

  // TODO: 버튼 개수 제한하기
  const maxButtonCount = Math.min(pageCount, 999)

  return (
    <div className="flex justify-center items-center gap-2">
      <Link
        href={`?${new URLSearchParams({
          query,
          ...(facetIndex && { facetIndex: String(facetIndex) }),
          ...(facetFilters && { facetFilters }),
          ...(prevPage !== 1 && { page: String(prevPage) }),
        })}`}
        aria-disabled={page <= 1}
        className="px-4 py-2 aria-disabled:cursor-not-allowed rounded-full transition duration-300 ease-in-out
          bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 
          aria-disabled:bg-gray-300 dark:aria-disabled:bg-gray-700 aria-disabled:text-gray-500"
      >
        {dict.이전[lang]}
      </Link>
      {Array(maxButtonCount)
        .fill(0)
        .map((_, i) => (
          <Link
            key={i}
            aria-selected={i + 1 === page}
            className="px-4 py-2 aria-disabled:cursor-not-allowed rounded-full transition duration-300 ease-in-out
            bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 
            aria-selected:bg-blue-300 dark:aria-selected:bg-blue-700"
            href={`?${new URLSearchParams({
              query,
              ...(facetIndex && { facetIndex: String(facetIndex) }),
              ...(facetFilters && { facetFilters }),
              ...(i && { page: String(i + 1) }),
            })}`}
          >
            {i + 1}
          </Link>
        ))}
      <Link
        href={`?${new URLSearchParams({
          query,
          ...(facetIndex && { facetIndex: String(facetIndex) }),
          ...(facetFilters && { facetFilters }),
          ...(nextPage !== 1 && { page: String(nextPage) }),
        })}`}
        aria-disabled={page >= pageCount}
        className="px-4 py-2 aria-disabled:cursor-not-allowed rounded-full transition duration-300 ease-in-out
          bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 
          aria-disabled:bg-gray-300 dark:aria-disabled:bg-gray-700 aria-disabled:text-gray-500"
      >
        {dict.다음[lang]}
      </Link>
    </div>
  )
}

const dict = {
  처음: {
    ko: '처음',
    en: 'First',
  },
  이전: {
    ko: '이전',
    en: 'Previous',
  },
  다음: {
    ko: '다음',
    en: 'Next',
  },
  마지막: {
    ko: '마지막',
    en: 'Last',
  },
} as const
