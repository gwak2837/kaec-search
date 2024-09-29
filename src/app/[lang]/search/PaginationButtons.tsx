'use client'

import { Locale } from '@/middleware'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { PageProps } from '../page'

type Props = {
  pageCount: number
}

export default function PaginationButtons({ pageCount }: Props) {
  const { lang } = useParams<PageProps['params']>()

  const searchParams = useSearchParams()
  const facetIndex = searchParams.get('facetIndex')
  const facetFilters = searchParams.get('facetFilters')
  const page = +(searchParams.get('page') ?? 1)
  const query = searchParams.get('query') ?? ''
  const layout = searchParams.get('layout')

  const prevPage = Math.max(1, page - 1)
  const nextPage = Math.min(page + 1, pageCount)

  // TODO: 버튼 개수 제한하기
  const maxButtonCount = Math.min(pageCount, 999)

  return (
    <div className="flex items-center justify-center gap-2 whitespace-nowrap px-4">
      <Link
        href={`?${new URLSearchParams({
          query,
          ...(facetIndex && { facetIndex: String(facetIndex) }),
          ...(facetFilters && { facetFilters }),
          ...(layout && { layout }),
          ...(prevPage !== 1 && { page: String(prevPage) }),
        })}`}
        aria-disabled={page <= 1}
        className="rounded-full bg-gray-200 px-4 py-2 transition duration-300 ease-in-out hover:bg-gray-300 aria-disabled:cursor-not-allowed aria-disabled:bg-gray-300 aria-disabled:text-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700 dark:aria-disabled:bg-gray-700"
        scroll={false}
      >
        {dict.이전[lang]}
      </Link>
      {Array(maxButtonCount)
        .fill(0)
        .map((_, i) => (
          <Link
            key={i}
            aria-selected={i + 1 === page}
            className="rounded-full bg-gray-200 px-4 py-2 transition duration-300 ease-in-out hover:bg-gray-300 aria-disabled:cursor-not-allowed aria-selected:bg-blue-300 dark:bg-gray-800 dark:hover:bg-gray-700 dark:aria-selected:bg-blue-700"
            href={`?${new URLSearchParams({
              query,
              ...(facetIndex && { facetIndex: String(facetIndex) }),
              ...(facetFilters && { facetFilters }),
              ...(layout && { layout }),
              ...(i && { page: String(i + 1) }),
            })}`}
            scroll={false}
          >
            {i + 1}
          </Link>
        ))}
      <Link
        href={`?${new URLSearchParams({
          query,
          ...(facetIndex && { facetIndex: String(facetIndex) }),
          ...(facetFilters && { facetFilters }),
          ...(layout && { layout }),
          ...(nextPage !== 1 && { page: String(nextPage) }),
        })}`}
        aria-disabled={page >= pageCount}
        className="rounded-full bg-gray-200 px-4 py-2 transition duration-300 ease-in-out hover:bg-gray-300 aria-disabled:cursor-not-allowed aria-disabled:bg-gray-300 aria-disabled:text-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700 dark:aria-disabled:bg-gray-700"
        scroll={false}
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
