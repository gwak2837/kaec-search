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
        <h1 className="text-shadow-white-lg dark:text-shadow-black-lg absolute bottom-4 w-full p-4 text-center text-2xl font-semibold tracking-wide sm:text-4xl md:text-5xl">
          {dict['K-학술확산센터 강좌 검색창'][lang]}
        </h1>
        <Image
          src="/images/searchpage_testbg.webp"
          width="1792"
          height="1024"
          alt="background"
          className="h-[25svh] w-full object-cover"
          priority
        />
      </div>
      <div className="sticky top-0 z-20 mb-4 grid grid-cols-[auto_1fr] items-center gap-4 border-b-2 border-gray-200 p-4 backdrop-blur md:relative md:m-0 md:border-0 md:p-6 md:backdrop-blur-none dark:border-gray-800">
        <Link className="text-shadow-white-lg dark:text-shadow-black-lg" href={`/${lang}`}>
          {dict.처음으로[lang]}
        </Link>
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
    ko: 'K-학술확산연구센터 강좌 검색창',
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
