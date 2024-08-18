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
      <div className="relative min-h-screen flex justify-center items-center">
        <div className="grid relative z-10 p-4 justify-center">
          <h1 className="font-semibold p-4 text-xl sm:text-4xl lg:text-6xl text-shadow-white-lg dark:text-shadow-black-lg">
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
          className="absolute inset-0 object-cover h-full w-full z-0"
        />
      </div>
      <h2 className="font-bold text-4xl mx-4 my-8 md:text-5xl">{dict.강좌소개[lang]}</h2>
      <div className="m-4 text-lg md:text-xl">
        <p>{dict['1. 살아있는 전통으로서'][lang]}</p>
        <p>{dict['2. K-MOOC을 위한'][lang]}</p>
      </div>
      <h3 className="font-bold text-2xl mx-4 my-8 md:text-4xl">{dict['Coursera를 위한'][lang]}</h3>
      <ul className="grid gap-2 grid-cols-[repeat(auto-fit,minmax(200px,1fr))] px-2">
        {courses.map((course) => (
          <CourseCard key={course.roman} course={course} lang={lang} />
        ))}
      </ul>
    </main>
  )
}

const dict = {
  'K-학술확산센터 강좌 검색창': {
    ko: 'K-학술확산센터 강좌 검색창',
    en: 'KAEP Lecture Search Page',
  },
  강좌소개: {
    ko: '강좌소개',
    en: 'Course Introduction',
  },
  '1. 살아있는 전통으로서': {
    ko: '1. 살아있는 전통으로서 한국철학의 세계적 확산을 위한 온라인 강좌들',
    en: '1. Online courses for the global spread of Korean philosophy as a living tradition',
  },
  '2. K-MOOC을 위한': {
    ko: '2. K-MOOC을 위한 10대 주제, 50개 강좌',
    en: '2. 10 major themes, 50 courses for K-MOOC',
  },
  'Coursera를 위한': {
    ko: 'Coursera를 위한 2개 과정, 9개 강좌',
    en: '2 courses, 9 courses for Coursera',
  },
} as const
