import Image from 'next/image'
import SearchForm from './SearchForm'
import courses from '@/common/card'
import CourseCard from './CourseCard'
import { Suspense } from 'react'
import { Locale } from '@/middleware'

export type PageProps = {
  params: {
    lang: Locale
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

export default function HomePage({ params: { lang } }: PageProps) {
  return (
    <main className="min-h-screen">
      <div className="relative flex min-h-svh items-center justify-center">
        <div className="relative z-10 grid justify-center p-4">
          <h1 className="text-shadow-white-lg dark:text-shadow-black-lg p-4 text-center text-xl font-semibold sm:text-4xl lg:text-6xl">
            {dict['K-학술확산센터 강좌 검색창'][lang]}
          </h1>
          <Suspense>
            <SearchForm />
          </Suspense>
        </div>
        <Image
          src="/images/background03.jpg"
          width="1792"
          height="1024"
          alt="background"
          priority
          className="absolute inset-0 z-0 h-full w-full object-cover"
        />
      </div>
      <div className="mx-auto max-w-screen-xl">
        <h2 className="mx-4 my-8 text-4xl font-bold md:text-5xl">{dict.강좌소개[lang]}</h2>
        <h3 className="mx-4 my-8 text-2xl font-bold md:text-4xl">
          {dict['살아있는 전통으로서'][lang]}
        </h3>
        <div className="m-4 text-lg md:text-xl">
          <p>{dict['1. K-MOOC을 위한'][lang]}</p>
          <p>{dict['2. Coursera를 위한'][lang]}</p>
        </div>
        <ul className="grid grid-cols-[repeat(auto-fit,minmax(202px,1fr))] gap-2 px-4">
          {courses.map((course, i) => (
            <CourseCard key={course.roman} course={course} lang={lang} isReversed={i > 4} />
          ))}
        </ul>
      </div>
    </main>
  )
}

const dict = {
  'K-학술확산센터 강좌 검색창': {
    ko: 'K-학술확산연구센터 강좌 검색창',
    en: 'KAEP Lecture Search Page',
  },
  강좌소개: {
    ko: '강좌소개',
    en: 'Course Introduction',
  },
  '살아있는 전통으로서': {
    ko: '살아있는 전통으로서 한국철학의 세계적 확산을 위한 온라인 강좌들',
    en: 'Online courses for the global spread of Korean philosophy as a living tradition',
  },
  '1. K-MOOC을 위한': {
    ko: '1. K-MOOC을 위한 10대 주제, 50개 강좌',
    en: '1. 10 major themes, 50 courses for K-MOOC',
  },
  '2. Coursera를 위한': {
    ko: '2. Coursera를 위한 2개 과정, 9개 강좌',
    en: '2. 2 courses, 9 courses for Coursera',
  },
} as const
