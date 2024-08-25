'use client'

import Modal from '@/components/Modal'
import { Locale } from '@/middleware'
import { useState } from 'react'

type Props = {
  lang: Locale
}

export default function RelatedCoursesButton({ lang }: Props) {
  const [isRelationModalOpened, setIsRelationModalOpen] = useState(false)

  return (
    <>
      <button
        className="border rounded-xl border-gray-300 dark:border-gray-500 p-2 hover:bg-gray-300 dark:hover:bg-gray-800 transition-colors"
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
        <div className="grid gap-2 rounded-2xl bg-gray-100 dark:border-2 dark:border-gray-600 dark:bg-gray-900 pt-5 shadow-xl overflow-hidden">
          <div className="p-4">준비중입니다</div>
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
} as const
