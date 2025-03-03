'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { usePathname } from 'next/navigation'
import { PageProps } from './page'
import Link from 'next/link'

export default function LanguagueSelector() {
  const params = useParams<PageProps['params']>()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const lang = params.lang
  const isKorean = lang === 'ko'
  const isEnglish = lang === 'en'
  const querystring = searchParams ? `?${searchParams}` : ''

  const homeUrl = isKorean
    ? 'https://swb.skku.edu/kphilo/index.do'
    : isEnglish
      ? 'https://swb.skku.edu/kphilo_eng/index.do'
      : 'https://swb.skku.edu/kphilo/index.do'

  return (
    <div className="absolute right-4 top-4 flex gap-2 text-sm md:gap-3 md:text-base">
      <Link
        href={homeUrl}
        className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-600 text-white transition duration-300 ease-in-out hover:bg-blue-800 aria-selected:bg-blue-900 md:h-12 md:w-12"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="h-5 w-5 flex-shrink-0 md:h-6 md:w-6"
        >
          <path d="M10.395 1.82a2.25 2.25 0 013.21 0l8.25 8.25a2.25 2.25 0 01-1.59 3.84H20.25v6.75A2.25 2.25 0 0118 23.25H6a2.25 2.25 0 01-2.25-2.25V14.25H3.735a2.25 2.25 0 01-1.59-3.84l8.25-8.25z" />
        </svg>
      </Link>
      <Link
        href={`/ko${pathname.slice(3)}${querystring}`}
        aria-disabled={isKorean}
        aria-selected={isKorean}
        className="rounded-lg bg-gray-600 px-2 py-1 text-white transition duration-300 ease-in-out hover:bg-blue-800 aria-selected:bg-blue-900 md:px-4 md:py-2"
      >
        <span className="flex h-full w-full items-center justify-center">KOR</span>
      </Link>
      <Link
        href={`/en${pathname.slice(3)}${querystring}`}
        aria-disabled={isEnglish}
        aria-selected={isEnglish}
        className="rounded-lg bg-gray-600 px-2 py-1 text-white transition duration-300 ease-in-out hover:bg-blue-800 aria-selected:bg-blue-900 md:px-4 md:py-2"
      >
        <span className="flex h-full w-full items-center justify-center">ENG</span>
      </Link>
    </div>
  )
}
