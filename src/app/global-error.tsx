'use client'

interface Props {
  error: Error & { digest?: string }
  reset: () => void
}

export default function GlobalError({ error, reset }: Props) {
  return (
    <html>
      <body className="min-h-[100svh] p-4 text-center sm:p-8 md:p-16 lg:p-24">
        <h2 className="my-8 flex items-center justify-center gap-2 text-2xl">문제가 발생했어요</h2>
        <span className="text-sm">{error.digest}</span>
        <p className="my-2 text-red-600">{error.message}</p>
        <p className="my-2 break-keep text-sm text-gray-500">문제가 계속되면 문의주세요</p>
        <button
          className="transition-color mx-auto my-6 flex w-full max-w-md items-center justify-center gap-2 whitespace-nowrap rounded-lg bg-red-200 px-4 py-2 text-sm text-red-800 duration-300 hover:bg-red-300"
          onClick={() => reset()}
        >
          다시 시도하기
        </button>
      </body>
    </html>
  )
}
