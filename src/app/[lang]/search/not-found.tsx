import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center p-10">
      <div className="text-center px-6 py-12 bg-gray-100 dark:bg-gray-900 shadow-lg rounded-lg max-w-md">
        <h1 className="text-6xl font-bold text-gray-800 dark:text-gray-200 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
          페이지를 찾을 수 없습니다.
        </h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          KAEP 강의 검색어를 변경하거나 주소창의 `query` 값을 바꿔주세요
        </p>
        <>
          <Link
            href="/"
            className="inline-block bg-blue-900 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition duration-200"
          >
            홈으로 돌아가기
          </Link>
        </>
      </div>
    </div>
  )
}
