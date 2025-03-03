'use client'

import Image from 'next/image'
import Modal from '@/components/Modal'
import { useState } from 'react'
import { Course } from '@/common/card'
import { Locale } from '@/middleware'
import subjectTitle from '@/common/subjectTitle'

type Props = {
  course: Course
  lang: Locale
  isReversed: boolean
}

const dict = {
  연차표시: {
    ko: '차년도 강의',
    en: ' Lectures',
  },
  연도표시: {
    ko: {
      '1': '1',
      '2': '2',
      '3': '3',
    },
    en: {
      '1': 'Year 1',
      '2': 'Year 2',
      '3': 'Year 3',
    },
  },
} as const

export default function CourseCard({ course, lang, isReversed }: Props) {
  const [isOpened, setIsOpened] = useState(false)

  // course.roman 예: "K01" → subjectNumber: "01"
  const subjectNumber = course.roman.slice(1)

  const yearData = [
    { year: 1, yearStr: '01' },
    { year: 2, yearStr: '02' },
    { year: 3, yearStr: '03' },
  ]

  return (
    <>
      <li
        className={`grid grid-rows-[1fr_auto] border ${
          isReversed ? 'lg:grid-rows-[auto_1fr]' : 'lg:grid-rows-[1fr_auto]'
        } cursor-pointer overflow-hidden rounded transition hover:bg-gray-100 dark:hover:bg-gray-800`}
        onClick={() => setIsOpened(true)}
      >
        <Image
          src={course.img}
          alt={course.title[lang]}
          width="295"
          height="323"
          className="w-full object-cover"
        />
        <h4 className={`p-4 text-lg font-bold md:text-xl ${isReversed ? '' : 'lg:row-start-1'}`}>
          {course.roman}. {course.title[lang]}
        </h4>
      </li>

      <Modal showCloseButton showDragButton open={isOpened} onClose={() => setIsOpened(false)}>
        <div className="grid max-h-[95vh] min-w-[600px] max-w-[1200px] gap-4 overflow-auto rounded-lg bg-gray-100 pb-4 pt-5 shadow-xl dark:border-2 dark:border-gray-600 dark:bg-gray-900">
          <h4 className="p-4 text-xl font-semibold md:text-2xl">
            {course.roman}. {course.title[lang]}
          </h4>
          <hr className="dark:border-gray-700" />
          <ul className="p-4">
            {course.content[lang].map((content, index) => (
              <li key={index} className="ml-4 list-disc sm:text-lg md:text-xl">
                {content}
              </li>
            ))}
          </ul>

          <div className="mt-4 grid gap-4">
            {yearData.map(({ year, yearStr }) => {
              const groupKey = `${yearStr}-${subjectNumber}`
              const subjectItems = subjectTitle.filter(
                (item) => item.id === groupKey || item.id.startsWith(`${groupKey}-`),
              )
              return (
                <div
                  key={year}
                  className="cursor-pointer rounded bg-white p-3 dark:border dark:border-gray-700 dark:bg-gray-800"
                >
                  <h5 className="mb-2 mt-0 text-xl font-bold">
                    {dict['연도표시'][lang][String(year) as '1' | '2' | '3']}
                    {dict['연차표시'][lang]}
                  </h5>
                  {subjectItems.length > 0 ? (
                    subjectItems.map((subjectItem, idx) => (
                      <div
                        key={idx}
                        onClick={() => subjectItem.url && window.open(subjectItem.url, '_blank')}
                        className="mb-2 flex items-start last:mb-0"
                      >
                        <Image
                          src={`/images/lecture_thumbnail/${subjectItem.id}.png`}
                          alt={`${year}년차 강의 주제`}
                          width={100}
                          height={100}
                          className="object-cover"
                        />
                        <div className="ml-4">
                          {subjectItem.content[lang]?.length > 0 ? (
                            subjectItem.content[lang].map((text, idx2) => (
                              <p
                                key={idx2}
                                className="text-lg font-bold text-gray-700 dark:text-gray-200"
                              >
                                {text}
                              </p>
                            ))
                          ) : (
                            <p className="text-gray-500 dark:text-gray-400">준비중</p>
                          )}
                          {subjectItem.intro[lang]?.length > 0 && (
                            <p className="mb-2 text-base text-gray-600 dark:text-gray-300">
                              {subjectItem.intro[lang].join(' ')}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">준비중</p>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </Modal>
    </>
  )
}
