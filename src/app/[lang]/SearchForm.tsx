'use client'

import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { FormEvent } from 'react'
import { PageProps } from './page'

export default function SearchForm() {
  const router = useRouter()
  const params = useParams<PageProps['params']>()
  const searchParams = useSearchParams()

  const lang = params.lang
  const initialQuery = searchParams.get('query') ?? ''

  function handleSubmit(event: FormEvent) {
    event.preventDefault()
    const formElement = event.target as HTMLFormElement
    const inputElement = formElement[0] as HTMLInputElement
    const query = inputElement.value

    const searchParams = new URLSearchParams({ query })
    router.push(`/${lang}/search?${searchParams}`)
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="relative">
        <svg
          className="absolute z-10 top-1/2 -translate-y-1/2 left-4 w-6 h-6 text-gray-500 hover:text-purple-500 transition duration-300 ease-in-out"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
        <input
          className="w-full p-3 md:p-4 px-12 md:px-12 sm:text-lg md:text-xl placeholder-gray-500 dark:bg-gray-900 bg-gray-100 border-2 border-gray-500 rounded-lg 
            focus:outline-none focus:ring-4 focus:ring-gray-300 shadow-lg transition duration-300 ease-in-out transform hover:shadow-2xl 
            focus:shadow-2xl focus:ring-opacity-50 placeholder-opacity-80"
          defaultValue={initialQuery}
          placeholder={dict['K-학술확산센터 강좌를'][lang]}
          required
          type="text"
        />
        {/* TODO: defaultValue가 있어도 빈문자열로 초기화하기, X 디자인 */}
        <input
          className="absolute z-10 top-1/2 -translate-y-1/2 right-5 cursor-pointer sm:text-lg md:text-xl text-gray-900 dark:text-gray-100"
          type="reset"
          value="X"
          alt="Clear the search form"
        />
      </div>
    </form>
  )
}

const dict = {
  'K-학술확산센터 강좌를': {
    ko: 'K-학술확산센터 강좌를 검색하세요',
    en: 'Search KAEP Lecture',
  },
} as const
