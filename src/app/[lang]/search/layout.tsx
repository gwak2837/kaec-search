import Image from 'next/image'
import SearchForm from '../SearchForm'
import Link from 'next/link'
import { Suspense } from 'react'
import { LayoutProps } from '../layout'
import Loading from './loading'

export default async function SearchLayout({ params, children }: LayoutProps) {
  const lang = params.lang

  return (
    <div>
      <div className="relative">
        <h1
          className="absolute w-full text-center text-shadow-white-lg dark:text-shadow-black-lg tracking-wide bottom-4 font-semibold p-4 
            text-2xl sm:text-5xl md:text-6xl"
        >
          {dict['K-학술확산센터 강좌 검색창'][lang]}
        </h1>
        <Image
          src="/images/searchpage_testbg.webp"
          width="1792"
          height="1024"
          alt="background"
          className="object-cover h-[25dvh] w-full"
          priority
        />
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-4 p-4 md:p-6 items-center sticky top-0 border-b-2 md:border-0 mb-4 md:m-0 border-gray-200 dark:border-gray-800 backdrop-blur md:backdrop-blur-none z-10 md:relative">
        <Link href={`/${lang}`}>{dict.처음으로[lang]}</Link>
        <Suspense>
          <SearchForm />
        </Suspense>
      </div>
      {children}
    </div>
  )
}

const dict = {
  'K-학술확산센터 강좌 검색창': {
    ko: 'K-학술확산센터 강좌 검색창',
    en: 'KAEP Lecture Search Bar',
  },
  처음으로: {
    ko: '처음으로',
    en: 'Home',
  },
  개: {
    ko: '개',
    en: ' items',
  },
} as const
