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

type Params = {
  facetFilters?: string
  page: number
  query: string
}

async function fetchSearchResults({ query, page, facetFilters }: Params) {
  const base = {
    indexName: 'lecturedata',
    query: query,
    facets: ALGOLIA_FACETS,
    maxValuesPerFacet: 10,
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
      <div className="grid md:grid-cols-[max-content_1fr] md:gap-6 md:px-6">
        {/* 768px 미만 */}
        <aside className="mx-4 h-fit md:hidden dark:bg-gray-900 bg-gray-100 border-2 border-gray-200 p-4 rounded-lg dark:border-gray-800">
          <div className="flex justify-center flex-wrap gap-x-4 gap-y-2">
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
                {facetKey}
              </Link>
            ))}
          </div>
          <div className="mt-6 grid gap-4">
            <FilterResetButton lang={lang} searchParams={searchParams} />
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
        <aside className="h-fit hidden md:grid gap-4 dark:bg-gray-900 bg-gray-100 p-6 rounded-lg border-2 border-gray-200 dark:border-gray-800">
          <FilterResetButton lang={lang} searchParams={searchParams} />
          {facetsEntries.map(([facetKey, values]) => (
            <div key={facetKey} className="grid w-full gap-4">
              <span className="min-w-24 mx-auto text-center font-semibold px-4 py-2 rounded-full bg-white dark:bg-opacity-20">
                {facetKey}
              </span>
              {Object.entries<number>(values).map(([value, count]) => {
                const toggledFacetFilters = toggleFacetFilters(
                  parseFacetFilters(facetFilters),
                  facetKey,
                  value,
                )
                const newSearchParams = new URLSearchParams({
                  ...searchParams,
                  facetFilters: toggledFacetFilters,
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
                    <span className="max-w-60 min-w-60 lg:max-w-80 lg:min-w-60 xl:max-w-96 xl:min-w-96">
                      {value}
                    </span>
                    <span className="whitespace-nowrap">
                      {count}
                      {dict.개[lang]}
                    </span>
                  </Link>
                )
              })}
            </div>
          ))}
        </aside>
        <main>
          <div className="flex justify-end items-center gap-4 px-4 md:px-0">
            <div className="text-right p-4 md:p-0">총 {totalHits}개</div>
            <ResultLayoutButtons layout={layout} lang={lang} searchParams={searchParams} />
          </div>
          <ul
            className="grid gap-4 md:gap-6 px-4 pb-8 md:p-0 md:py-4 grid-cols-[repeat(auto-fit,minmax(250px,1fr))] 
              md:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(300px,1fr))]"
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
    </>
  )
}

const dict = {
  개: {
    ko: '개',
    en: ' items',
  },
} as const
