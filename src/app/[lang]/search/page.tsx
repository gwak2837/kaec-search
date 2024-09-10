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
import NotFound from './not-found'
import FacetFilterLink from './FacetFilterLink'

type Params = {
  facetFilters?: string
  page: number
  query: string
}

async function fetchSearchResults({ query, page, facetFilters }: Params) {
  const base = {
    indexName: 'lecturedataIndex',
    query,
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
    return <NotFound />
  }

  const facetFilters = Array.isArray(searchParams.facetFilters)
    ? searchParams.facetFilters[0]
    : (searchParams.facetFilters ?? '')
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
      <div className="relative grid md:mb-6 md:grid-cols-[auto_1fr] md:gap-4 md:px-6">
        {/* 768px 미만 */}
        <aside className="mx-4 rounded-lg border-2 border-gray-200 bg-gray-100 p-4 md:hidden dark:border-gray-800 dark:bg-gray-900">
          <FilterResetButton lang={lang} searchParams={searchParams} />
          <div className="my-4 flex flex-wrap justify-center gap-x-4 gap-y-2">
            {facetKeys.map((facetKey, i) => (
              <Link
                key={facetKey}
                aria-selected={facetIndex === i}
                className="min-w-24 rounded-full bg-white px-4 py-2 text-center transition duration-300 ease-in-out aria-selected:bg-blue-600 aria-selected:font-semibold aria-selected:text-white dark:bg-opacity-20 dark:hover:bg-opacity-30 dark:aria-selected:bg-blue-800"
                href={`?${new URLSearchParams({
                  query,
                  ...(facetFilters && { facetFilters }),
                })}&facetIndex=${i}`}
              >
                {dict.facetKeys[facetKey as 'subject' | 'lecturer'][lang]}
              </Link>
            ))}
          </div>
          <div className="grid max-h-[50svh] gap-4 overflow-y-auto pt-0">
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
                <FacetFilterLink
                  key={value}
                  value={value}
                  className="flex items-center justify-between gap-2 rounded-lg border bg-white p-3 transition duration-300 ease-in-out aria-selected:bg-blue-600 aria-selected:font-semibold aria-selected:text-white md:p-4 dark:border-none dark:bg-opacity-10 dark:hover:bg-opacity-20 dark:aria-selected:bg-blue-800"
                  href={`?${newSearchParams}`}
                  count={count}
                  facetKey={selectedFacetKey}
                  facetFilters={facetFilters}
                  lang={lang}
                />
              )
            })}
          </div>
        </aside>
        {/* 768px 이상 */}
        <div className="md:w-80 lg:w-96" />
        <aside className="absolute bottom-0 left-6 top-0 hidden min-h-0 overflow-y-auto rounded-lg border-2 border-gray-200 bg-gray-100 p-4 pt-0 md:block md:w-80 lg:w-96 dark:border-gray-800 dark:bg-gray-900">
          <div className="sticky top-0 z-10 bg-gray-100 pt-4 dark:bg-gray-900">
            <FilterResetButton lang={lang} searchParams={searchParams} />
          </div>
          {facetsEntries.map(([facetKey, values]) => (
            <div key={facetKey}>
              <div className="peer sticky top-[76px] bg-gray-100 p-4 dark:bg-gray-900">
                <label className="mx-auto flex w-fit min-w-24 cursor-pointer gap-2 rounded-full bg-white px-4 py-2 text-center font-semibold dark:bg-opacity-20">
                  {dict.facetKeys[facetKey as 'subject' | 'lecturer'][lang]}
                  <input type="checkbox" className="peer hidden" />
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
              <ul className="grid gap-4 peer-has-[:checked]:hidden">
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
                    <FacetFilterLink
                      key={value}
                      value={value}
                      className="flex items-center justify-between gap-4 rounded-lg border bg-white p-4 text-lg transition duration-300 ease-in-out aria-selected:bg-blue-600 aria-selected:font-bold aria-selected:text-white dark:border-none dark:bg-opacity-10 dark:hover:bg-opacity-20 dark:aria-selected:bg-blue-800"
                      href={`?${newSearchParams}`}
                      count={count}
                      facetKey={facetKey}
                      facetFilters={facetFilters}
                      lang={lang}
                    />
                  )
                })}
              </ul>
            </div>
          ))}
        </aside>
        <main className="h-fit min-h-svh">
          <div className="flex items-center justify-end gap-4 px-4 md:px-0">
            <div className="p-4 text-right md:p-0">총 {totalHits}개</div>
            <ResultLayoutButtons layout={layout} lang={lang} searchParams={searchParams} />
          </div>
          {hits.length > 0 ? (
            <ul
              className="grid grid-cols-[repeat(auto-fit,minmax(250px,1fr))] gap-4 px-4 pb-8 md:grid-cols-[repeat(auto-fill,minmax(250px,1fr))] md:p-0 md:pt-4"
              style={{ gridTemplateColumns: isListLayout ? '1fr' : undefined }}
            >
              {hits.map((hit) => (
                <HitCard key={hit.id} hit={hit} layout={layout} />
              ))}
            </ul>
          ) : (
            <NotFound />
          )}
        </main>
      </div>
      {pageCount > 1 && (
        <>
          <div className="h-20 md:hidden" />
          <nav className="fixed bottom-0 w-full overflow-x-auto border-t-2 border-gray-200 p-3 backdrop-blur md:static md:border-none md:backdrop-blur-none dark:border-gray-800">
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
