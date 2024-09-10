'use client'

import Image from 'next/image'
import Modal from '@/components/Modal'
import { useState } from 'react'
import { Course } from '@/common/card'
import { Locale } from '@/middleware'

type Props = {
  course: Course
  lang: Locale
  isReversed: boolean
}

export default function CourseCard({ course, lang, isReversed }: Props) {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <>
      <li
        className={`grid border ${isReversed ? 'grid-rows-[auto_1fr]' : 'grid-rows-[1fr_auto]'} transition rounded overflow-hidden cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800`}
        onClick={() => setIsOpened(true)}
      >
        <Image
          src={course.img}
          alt={course.title[lang]}
          width="295"
          height="323"
          className="w-full object-cover"
        />
        <h4 className={`font-bold p-4 text-lg md:text-xl ${isReversed ? '' : 'row-start-1'}`}>
          {course.roman}. {course.title[lang]}
        </h4>
      </li>
      <Modal showCloseButton showDragButton open={isOpened} onClose={() => setIsOpened(false)}>
        <div className="grid gap-2 rounded-lg bg-gray-100 dark:border-2 dark:border-gray-600 dark:bg-gray-900 pb-4 pt-5 shadow-xl overflow-hidden ">
          <h4 className="text-xl md:text-2xl p-4 font-semibold">
            {course.roman}. {course.title[lang]}
          </h4>
          <hr className="dark:border-gray-700" />
          <ul className="p-4">
            {course.content[lang].map((content, index) => (
              <li key={index} className="list-disc ml-4 sm:text-lg md:text-xl">
                {content}
              </li>
            ))}
          </ul>
        </div>
      </Modal>
    </>
  )
}
