import { ALGOLIA_FACETS } from '@/common/constants'
import { AlgoriaResult } from '@/types/algolia'
import { PageProps } from '../page'
import { toggleFacetFilters, parseFacetFilters } from '@/utils/algolia'
import Link from 'next/link'
import FilterResetButton from './FilterResetButton'
import HitCard from './HitCard'
import ResultLayoutButtons from './ResultLayoutButtons'
import PaginationButtons from './PaginationButtons'
import { notFound } from 'next/navigation'
import { algoliaClient } from '@/common/algoria'
import { Fragment } from 'react'

type Params = {
  facetFilters?: string
  page: number
  query: string
}

async function fetchSearchResults({ query, page, facetFilters }: Params) {
  const base = {
    indexName: 'lecturedataIndex',
    query: query,
    facets: ALGOLIA_FACETS,
  }

  return (await algoliaClient.search({
    requests: [
      // 첫번째 요청: 전체 facet 리스트 가져오기
      { ...base },
      // 두번째 요청: 필터가 젹용된 검색 결과 가져오기
      {
        ...base,
        ...(facetFilters && { facetFilters }),
        ...(page !== 1 && { page: page - 1 }),
      },
    ],
  })) as unknown as AlgoriaResult
}

export default async function SearchResult({ params, searchParams }: PageProps) {
  const query = searchParams.query as string

  if (!query) {
    return notFound()
  }

  const facetFilters = searchParams.facetFilters as string
  const page = +((searchParams.page as string) ?? 1)

  const searchResults = await fetchSearchResults({ query, facetFilters, page })

  const searchResult = searchResults.results[searchResults.results.length - 1]
  const hits = searchResult.hits

  const originalSearchResult = searchResults.results[0]
  const facets = originalSearchResult.facets
  const facetKeys = Object.keys(facets)
  const facetIndex = +((searchParams.facetIndex as string) ?? 0)
  const selectedFacetKey = facetKeys[facetIndex]
  const selectedFacetEntries = Object.entries<number>(Object.values(facets)[facetIndex] ?? {})
  const facetsEntries = Object.entries(facets)

  const pageCount = searchResult.nbPages
  const totalHits = searchResult.nbHits

  const lang = params.lang
  const layout = searchParams.layout as 'grid' | 'list'
  const isListLayout = !layout || layout === 'list'

  return (
    <>
      <div className="grid relative md:grid-cols-[auto_1fr] md:gap-4 md:px-6">
        {/* 768px 미만 */}
        <aside className="mx-4 md:hidden dark:bg-gray-900 bg-gray-100 border-2 p-4 border-gray-200 rounded-lg dark:border-gray-800">
          <FilterResetButton lang={lang} searchParams={searchParams} />
          <div className="flex justify-center my-4 flex-wrap gap-x-4 gap-y-2">
            {facetKeys.map((facetKey, i) => (
              <Link
                key={facetKey}
                aria-selected={facetIndex === i}
                className="min-w-24 text-center dark:aria-selected:bg-blue-800 aria-selected:font-semibold aria-selected:bg-blue-600
              aria-selected:text-white px-4 py-2 rounded-full bg-white dark:bg-opacity-20 dark:hover:bg-opacity-30 transition 
              duration-300 ease-in-out"
                href={`?${new URLSearchParams({
                  query,
                  ...(facetFilters && { facetFilters }),
                })}&facetIndex=${i}`}
              >
                {dict.facetKeys[facetKey as 'subject' | 'lecturer'][lang]}
              </Link>
            ))}
          </div>
          <div className="grid gap-4 pt-0 overflow-y-auto max-h-[50svh]">
            {selectedFacetEntries.map(([value, count]) => {
              const toggledFacetFilters = toggleFacetFilters(
                parseFacetFilters(facetFilters),
                selectedFacetKey,
                value,
              )
              const newSearchParams = new URLSearchParams({
                query,
                ...(facetIndex && { facetIndex: String(facetIndex) }),
                ...(toggledFacetFilters && { facetFilters: toggledFacetFilters }),
                ...(layout === 'grid' && { layout }),
              })
              return (
                <Link
                  key={value}
                  aria-selected={facetFilters?.includes(`${selectedFacetKey}:${value}`)}
                  className="items-center border dark:border-none p-3 md:p-4 dark:bg-opacity-10 rounded-lg dark:hover:bg-opacity-20 bg-white
              transition duration-300 ease-in-out flex gap-2 justify-between dark:aria-selected:bg-blue-800 
              aria-selected:font-semibold aria-selected:bg-blue-600 aria-selected:text-white hover:bg-opacity-50"
                  href={`?${newSearchParams}`}
                >
                  <span>{value}</span>
                  <span className="whitespace-nowrap">
                    {count}
                    {dict.개[lang]}
                  </span>
                </Link>
              )
            })}
          </div>
        </aside>
        {/* 768px 이상 */}
        <div className="md:w-80 lg:w-96" />
        <aside className="min-h-0 md:w-80 lg:w-96 p-4 pt-0 top-0 left-6 absolute overflow-y-auto bottom-0 hidden md:block dark:bg-gray-900 bg-gray-100 rounded-lg border-2 border-gray-200 dark:border-gray-800">
          <div className="sticky top-0 pt-4 z-10 dark:bg-gray-900 bg-gray-100">
            <FilterResetButton lang={lang} searchParams={searchParams} />
          </div>
          {facetsEntries.map(([facetKey, values]) => (
            <div key={facetKey}>
              <div className="sticky peer top-[76px] p-4 dark:bg-gray-900 bg-gray-100">
                <label className="min-w-24 flex gap-2 w-fit mx-auto text-center font-semibold px-4 py-2 rounded-full bg-white dark:bg-opacity-20">
                  {dict.facetKeys[facetKey as 'subject' | 'lecturer'][lang]}
                  <input type="checkbox" className="hidden peer" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="peer-checked:rotate-180"
                  >
                    <polyline points="18 15 12 9 6 15" />
                  </svg>
                </label>
              </div>
              <ul className="grid peer-has-[:checked]:hidden gap-4">
                {Object.entries<number>(values).map(([value, count]) => {
                  const toggledFacetFilters = toggleFacetFilters(
                    parseFacetFilters(facetFilters),
                    facetKey,
                    value,
                  )
                  const newSearchParams = new URLSearchParams({
                    query,
                    ...(toggledFacetFilters && { facetFilters: toggledFacetFilters }),
                    ...(layout === 'grid' && { layout }),
                  })
                  return (
                    <Link
                      key={value}
                      aria-selected={facetFilters?.includes(`${facetKey}:${value}`)}
                      className="text-lg flex justify-between gap-4 aria-selected:text-white content-card p-4 bg-white dark:bg-opacity-10 rounded-lg 
                      dark:hover:bg-opacity-20 border dark:border-none transition duration-300 ease-in-out dark:aria-selected:bg-blue-800 aria-selected:font-bold 
                    aria-selected:bg-blue-600"
                      href={`?${newSearchParams}`}
                    >
                      <span>{value}</span>
                      <span className="whitespace-nowrap">
                        {count}
                        {dict.개[lang]}
                      </span>
                    </Link>
                  )
                })}
              </ul>
            </div>
          ))}
        </aside>
        <main className="h-fit">
          <div className="flex justify-end items-center gap-4 px-4 md:px-0">
            <div className="text-right p-4 md:p-0">총 {totalHits}개</div>
            <ResultLayoutButtons layout={layout} lang={lang} searchParams={searchParams} />
          </div>
          <ul
            className="grid gap-4 px-4 pb-8 md:p-0 md:pt-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] 
              md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]"
            style={{ gridTemplateColumns: isListLayout ? '1fr' : undefined }}
          >
            {hits.map((hit) => (
              <HitCard key={hit.id} hit={hit} layout={layout} />
            ))}
          </ul>
        </main>
      </div>
      {pageCount > 1 && (
        <>
          <div className="h-20 md:hidden" />
          <nav className="fixed w-full bottom-0 overflow-x-auto md:static backdrop-blur p-3	md:backdrop-blur-none border-t-2 md:border-none border-gray-200 dark:border-gray-800">
            <PaginationButtons pageCount={pageCount} />
          </nav>
        </>
      )}
    </>
  )
}

const dict = {
  개: {
    ko: '개',
    en: ' items',
  },
  facetKeys: {
    subject: {
      ko: '대주제',
      en: 'subject',
    },
    lecturer: {
      ko: '교수자',
      en: 'lecturer',
    },
  },
} as const
