'use client'

import Modal from '@/components/Modal'
import useRelatedCourses from '@/query/useRelatedCourses'
import { Hit, Result } from '@/types/algolia'
import Link from 'next/link'
import { useParams, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { PageProps } from '../page'
import { filterDuplicatedObject } from '@/utils/math'

type Props = {
  course: Hit
}

export default function RelatedCoursesButton({ course }: Props) {
  const { lang } = useParams<PageProps['params']>()
  const searchParams = useSearchParams()
  const layout = searchParams.get('layout')

  const [isRelationModalOpened, setIsRelationModalOpen] = useState(false)
  const isKorean = lang === 'ko'
  const tags = isKorean ? course.tag : (course.tag_eng ?? [])

  const { data, isLoading } = useRelatedCourses({
    lang,
    course,
    enabled: isRelationModalOpened,
  })

  const relatedCourses = filterDuplicatedObject(
    data?.results
      .flatMap((result) => (result as unknown as Result).hits)
      .filter((relatedCourse) => relatedCourse.objectID !== course.objectID),
    ['objectID'],
  )
    ?.sort()
    .slice(0, 10)

  return (
    <>
      <button
        className="border rounded-xl disabled:text-gray-500 disabled:hover:bg-inherit border-gray-300 dark:border-gray-500 p-2 hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors"
        disabled={tags.length === 0}
        onClick={(e) => {
          e.stopPropagation()
          setIsRelationModalOpen(true)
        }}
      >
        {dict.연관강의[lang]}
      </button>
      <Modal
        showCloseButton
        showDragButton
        open={isRelationModalOpened}
        onClose={() => setIsRelationModalOpen(false)}
      >
        <div className="grid gap-2 md:gap-6 p-4 md:p-8 rounded-2xl bg-gray-100 dark:border-2 dark:border-gray-600 dark:bg-gray-900 pt-8 shadow-xl max-h-svh overflow-auto">
          <h2 className="font-bold text-2xl md:text-3xl">
            {dict.강좌제목[lang]}: {isKorean ? course.title : course.title_eng}
          </h2>
          <ul className="list-disc min-w-0 ml-4 grid gap-2 md:text-lg max-w-prose">
            {isLoading && (
              <div className="animate-pulse rounded-full h-7 bg-gray-300 dark:bg-gray-700" />
            )}
            {relatedCourses?.map((relatedCourse) => {
              const courseWeek = isKorean ? relatedCourse.week : relatedCourse.week_eng
              const newSearchParams = new URLSearchParams({
                query: courseWeek,
                ...(layout && { layout }),
              })

              return (
                <li key={relatedCourse.objectID} className="whitespace-nowrap min-w-0">
                  <Link
                    href={`/${lang}/search?${newSearchParams}`}
                    className="hover:underline text-ellipsis block overflow-hidden"
                  >
                    {courseWeek}
                  </Link>
                </li>
              )
            })}
            {!isLoading && relatedCourses?.length === 0 && (
              <div className="text-center text-gray-500">{dict.연관강의가[lang]}</div>
            )}
          </ul>
        </div>
      </Modal>
    </>
  )
}

const dict = {
  연관강의: {
    ko: '연관 강의',
    en: 'Related Courses',
  },
  강좌제목: {
    ko: '강좌제목',
    en: 'Title',
  },
  연관강의가: {
    ko: '연관 강의가 없습니다.',
    en: 'No related courses.',
  },
} as const
