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

  return (
    <div className="absolute top-4 right-4 flex gap-2 md:gap-3 text-sm md:text-base">
      <Link
        href={`/ko${pathname.slice(3)}${querystring}`}
        aria-disabled={isKorean}
        aria-selected={isKorean}
        className="px-2 py-1 md:px-4 md:py-2 rounded-lg bg-gray-600 aria-selected:bg-blue-900 hover:bg-blue-800 transition duration-300 ease-in-out"
      >
        KOR
      </Link>
      <Link
        href={`/en${pathname.slice(3)}${querystring}`}
        aria-disabled={isEnglish}
        aria-selected={isEnglish}
        className="px-2 py-1 md:px-4 md:py-2 rounded-lg bg-gray-600 aria-selected:bg-blue-900 hover:bg-blue-800 transition duration-300 ease-in-out"
      >
        ENG
      </Link>
    </div>
  )
}
