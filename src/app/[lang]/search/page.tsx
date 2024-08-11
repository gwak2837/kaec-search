import Image from 'next/image'
import { PageProps } from '../page'
import SearchForm from '../SearchForm'
import Link from 'next/link'
import { Suspense } from 'react'
import { AlgoriaResult } from '@/types/algolia'
import { notFound } from 'next/navigation'
import { parseFacetFilters, toggleFacetFilters } from '@/utils/algolia'
import { ALGOLIA_FACETS } from '@/common/constants'
import FilterResetButton from './FilterResetButton'
import PaginationButtons from './PaginationButtons'
import HitCard from './HitCard'

type Params = {
  facetFilters?: string
  page: number
  query: string
}

async function fetchSearchResults({ query, page, facetFilters }: Params) {
  const searchParams = new URLSearchParams({
    'x-algolia-api-key': 'a17cd62340ac1e08ec65c4b162e78036',
    'x-algolia-application-id': 'P30FBL1198',
  })

  const baseParams = {
    facets: JSON.stringify(ALGOLIA_FACETS),
    highlightPostTag: '__%2Fais-highlight__',
    highlightPreTag: '__ais-highlight__',
    maxValuesPerFacet: '10',
    query,
  }

  // 첫번째 요청: 전체 facet 리스트 가져오기
  const requests = [
    {
      indexName: 'lecturedata',
      params: new URLSearchParams(baseParams).toString(),
    },
  ]

  // 두번째 요청: 필터가 젹용된 검색 결과 가져오기
  if (facetFilters || page !== 1) {
    requests.push({
      indexName: 'lecturedata',
      params: new URLSearchParams({
        ...baseParams,
        ...(facetFilters && { facetFilters }),
        ...(page !== 1 && { page: String(page - 1) }),
      })
        .toString()
        .replace(/\+/g, '%20'),
    })
  }

  const response = await fetch(
    `https://p30fbl1198-dsn.algolia.net/1/indexes/*/queries?${searchParams}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: JSON.stringify({ requests }),
    },
  )

  if (!response.ok) {
    throw new Error('Failed to fetch search results')
  }

  return (await response.json()) as AlgoriaResult
}

export default async function SearchPage({ params, searchParams }: PageProps) {
  const query = searchParams.query as string

  if (!query) {
    return notFound()
  }

  const lang = params.lang
  const page = +((searchParams.page as string) ?? 1)
  const facetFilters = searchParams.facetFilters as string
  const facetIndex = +((searchParams.facetIndex as string) ?? 0)
  const searchResults = await fetchSearchResults({ query, facetFilters, page })

  const originalSearchResult = searchResults.results[0]
  const facets = originalSearchResult.facets

  const searchResult = searchResults.results[searchResults.results.length - 1]
  const hits = searchResult.hits
  const facetKeys = Object.keys(facets)
  const selectedFacetKey = facetKeys[facetIndex]
  const selectedFacetEntries = Object.entries<number>(Object.values(facets)[facetIndex] ?? {})
  const facetsEntries = Object.entries(facets)

  const pageCount = searchResult.nbPages
  const totalHits = searchResult.nbHits

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
        />
      </div>
      <div className="grid grid-cols-[auto_1fr] gap-4 p-4 md:p-6 items-center sticky top-0 border-b-2 md:border-0 mb-4 md:m-0 border-gray-200 dark:border-gray-800 backdrop-blur md:backdrop-blur-none md:relative">
        <Link href={`/${lang}`}>{dict.처음으로[lang]}</Link>
        <Suspense>
          <SearchForm />
        </Suspense>
      </div>
      <div className="grid md:grid-cols-[max-content_1fr] md:gap-6 md:px-6">
        {/* 768px 미만 */}
        <aside className="mx-4 h-fit md:hidden dark:bg-gray-900 bg-gray-100 p-4 rounded-lg shadow-lg">
          <div className="flex justify-center flex-wrap gap-x-4 gap-y-2">
            {facetKeys.map((facetKey, i) => (
              <Link
                key={facetKey}
                aria-selected={facetIndex === i}
                className="min-w-24 text-center dark:aria-selected:bg-blue-800 aria-selected:font-semibold aria-selected:bg-blue-200
                 text-white px-4 py-2 rounded-full bg-white bg-opacity-20 hover:bg-opacity-30 transition duration-300 ease-in-out"
                href={`?${new URLSearchParams({
                  query,
                  ...(facetFilters && { facetFilters }),
                })}&facetIndex=${i}`}
              >
                {facetKey}
              </Link>
            ))}
          </div>
          <div className="mt-6 grid gap-4">
            <FilterResetButton lang={lang} query={query} facetIndex={facetIndex} />
            {/* TODO: 5개 이상이면 아코디언 만들기 */}
            {selectedFacetEntries.map(([value, count]) => {
              const toggledFacetFilters = toggleFacetFilters(
                parseFacetFilters(facetFilters),
                selectedFacetKey,
                value,
              )
              const newSearchParams = new URLSearchParams({
                query,
                ...(facetIndex && { facetIndex: String(facetIndex) }),
                ...(toggledFacetFilters && {
                  facetFilters: toggledFacetFilters,
                }),
              })
              return (
                <Link
                  key={value}
                  aria-selected={facetFilters?.includes(`${selectedFacetKey}:${value}`)}
                  className="items-center text-white p-3 md:p-4 bg-white bg-opacity-10 rounded-lg shadow-md hover:bg-opacity-20 
                    transition duration-300 ease-in-out flex gap-2 justify-between dark:aria-selected:bg-blue-800 
                    aria-selected:font-semibold aria-selected:bg-blue-200"
                  href={`?${newSearchParams}`}
                >
                  <span>{value}</span>
                  <span>{count}개</span>
                </Link>
              )
            })}
          </div>
        </aside>
        {/* 768px 이상 */}
        <aside className="h-fit hidden md:grid gap-4 dark:bg-gray-900 bg-gray-100 p-6 rounded-lg shadow-lg">
          <FilterResetButton lang={lang} query={query} facetIndex={facetIndex} />
          {facetsEntries.map(([facetKey, values]) => (
            <div key={facetKey} className="grid gap-4">
              <span className="min-w-24 mx-auto text-center font-semibold text-white px-4 py-2 rounded-full bg-white bg-opacity-20">
                {facetKey}
              </span>
              {Object.entries<number>(values).map(([value, count]) => {
                const toggledFacetFilters = toggleFacetFilters(
                  parseFacetFilters(facetFilters),
                  facetKey,
                  value,
                )
                const newSearchParams = new URLSearchParams({
                  query,
                  ...(toggledFacetFilters && { facetFilters: toggledFacetFilters }),
                })
                return (
                  <Link
                    key={value}
                    aria-selected={facetFilters?.includes(`${facetKey}:${value}`)}
                    className="text-lg flex justify-between gap-4 text-white content-card p-4 bg-white bg-opacity-10 rounded-lg 
                      shadow-md hover:bg-opacity-20 transition duration-300 ease-in-out dark:aria-selected:bg-blue-800 aria-selected:font-bold 
                      aria-selected:bg-blue-200"
                    href={`?${newSearchParams}`}
                  >
                    <span>{value}</span>
                    <span>{count}개</span>
                  </Link>
                )
              })}
            </div>
          ))}
        </aside>
        <main>
          <div className="text-right p-4 md:p-0">총 {totalHits}개</div>
          <ul
            className="grid gap-6 px-4 md:p-0 md:py-4
              grid-cols-[repeat(auto-fit,minmax(250px,1fr))] md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"
          >
            {hits.map((hit) => (
              <HitCard key={hit.id} hit={hit} lang={lang} />
            ))}
          </ul>
        </main>
      </div>
      {pageCount > 1 && (
        <>
          <div className="h-40 md:hidden" />
          <nav className="fixed w-full bottom-0 md:relative backdrop-blur p-3	md:backdrop-blur-none border-t-2 md:border-none border-gray-200 dark:border-gray-800">
            <PaginationButtons
              pageCount={pageCount}
              page={page}
              lang={lang}
              query={query}
              facetFilters={facetFilters}
              facetIndex={facetIndex}
            />
          </nav>
        </>
      )}
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
} as const
