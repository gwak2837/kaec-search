import Image from 'next/image'
import Link from 'next/link'

export default function Loading() {
  return (
    <div className="grid animate-pulse md:grid-cols-[max-content_1fr] md:gap-6 md:px-6">
      {/*  Sidebar (Mobile)  */}
      <aside className="mx-4 h-fit md:hidden dark:bg-gray-900 bg-gray-100 border-2 border-gray-200 p-4 rounded-lg dark:border-gray-800">
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-2">
          <a className="min-w-24 text-center dark:aria-selected:bg-blue-800 aria-selected:font-semibold aria-selected:bg-blue-600 aria-selected:text-white px-4 py-2 rounded-full bg-white dark:bg-opacity-20 dark:hover:bg-opacity-30 transition  duration-300 ease-in-out">
            ...
          </a>
        </div>
        <div className="mt-6 grid gap-4">
          <a className="md:text-lg font-semibold text-center text-white dark:text-red-500 p-3 md:p-4 bg-opacity-80 hover:bg-opacity-90 bg-red-700 dark:bg-red-500 dark:bg-opacity-20 rounded-lg dark:hover:bg-opacity-40 transition duration-300 ease-in-out">
            필터 초기화
          </a>
          <a className="items-center border dark:border-none p-3 md:p-4 dark:bg-opacity-10 rounded-lg dark:hover:bg-opacity-20 bg-white transition duration-300 ease-in-out flex gap-2 justify-between dark:aria-selected:bg-blue-800  aria-selected:font-semibold aria-selected:bg-blue-600 aria-selected:text-white hover:bg-opacity-50">
            <span>...</span>
            <span className="whitespace-nowrap">... 개</span>
          </a>
          <a className="items-center border dark:border-none p-3 md:p-4 dark:bg-opacity-10 rounded-lg dark:hover:bg-opacity-20 bg-white transition duration-300 ease-in-out flex gap-2 justify-between dark:aria-selected:bg-blue-800  aria-selected:font-semibold aria-selected:bg-blue-600 aria-selected:text-white hover:bg-opacity-50">
            <span>...</span>
            <span className="whitespace-nowrap">... 개</span>
          </a>
        </div>
      </aside>

      {/*  Sidebar (Desktop)  */}
      <aside className="h-fit md:w-80 lg:w-96 hidden md:grid gap-4 dark:bg-gray-900 bg-gray-100 p-4 rounded-lg border-2 border-gray-200 dark:border-gray-800">
        <a className="md:text-lg font-semibold text-center text-white dark:text-red-500 p-3 md:p-4 bg-opacity-80 hover:bg-opacity-90 bg-red-700 dark:bg-red-500 dark:bg-opacity-20 rounded-lg dark:hover:bg-opacity-40 transition duration-300 ease-in-out">
          필터 초기화
        </a>
        <div className="grid w-full gap-4">
          <span className="min-w-24 mx-auto text-center font-semibold px-4 py-2 rounded-full bg-white dark:bg-opacity-20">
            ...
          </span>
          {Array(2)
            .fill(0)
            .map((_, index) => (
              <a
                key={index}
                className="text-lg flex justify-between gap-4 aria-selected:text-white content-card p-4 bg-white dark:bg-opacity-10 rounded-lg  dark:hover:bg-opacity-20 border dark:border-none transition duration-300 ease-in-out dark:aria-selected:bg-blue-800 aria-selected:font-bold  aria-selected:bg-blue-600"
              >
                <span>...</span>
                <span className="whitespace-nowrap">... 개</span>
              </a>
            ))}
        </div>
      </aside>

      {/*  Main Content  */}
      <main className="min-h-svh">
        <div className="flex justify-end items-center gap-4 px-4 md:px-0">
          <div className="text-right p-4 md:p-0">총 ... 개</div>
          <div className="grid grid-cols-2 bg-gray-200 dark:bg-gray-800 p-1 rounded-xl">
            <a className="relative rounded px-3 py-1 font-bold text-white transition-colors">
              <div className="rounded-lg absolute z-0 inset-0 transition-transform bg-blue-800"></div>
              <span className="relative">리스트</span>
            </a>
            <a className="relative rounded px-3 py-1 aria-selected:font-bold text-gray-400 aria-selected:text-white transition-colors">
              <span className="relative">그리드</span>
            </a>
          </div>
        </div>
        <ul className="grid gap-4 md:gap-6 px-4 pb-8 md:p-0 md:py-4">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <li
                key={index}
                className="p-3 md:p-4 h-32 bg-white dark:bg-gray-900 rounded-lg shadow-lg"
              />
            ))}
        </ul>
      </main>
    </div>
  )
}
