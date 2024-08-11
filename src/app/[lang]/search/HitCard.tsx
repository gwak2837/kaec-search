'use client'

import Image from 'next/image'
import Modal from '@/components/Modal'
import { useState } from 'react'
import { Course } from '@/common/card'
import { Hit } from '@/types/algolia'
import toast from 'react-hot-toast'

type Props = {
  hit: Hit
  lang: 'ko' | 'en'
}

export default function HitCard({ hit, lang }: Props) {
  const [isOpened, setIsOpened] = useState(false)

  return (
    <>
      <li
        key={hit.id}
        className="border transition-colors duration-300 rounded-2xl border-gray-500 overflow-hidden cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900"
        onClick={() => setIsOpened(true)}
      >
        <Image
          src={
            hit.kmoocThumnailURL ??
            'https://lms.kmooc.kr/pluginfile.php/2718931/course/overviewfiles_thumbnail/courseoverviews_thumbnail.png'
          }
          alt="courseoverviews_thumbnail"
          width="600"
          height="600"
          className="aspect-video object-cover"
        />
        <div className="p-3 md:p-4 grid gap-2 md:gap-3 whitespace-nowrap">
          <h3 className="text-ellipsis overflow-hidden text-lg md:text-xl">
            {lang === 'en' ? hit.subject_eng : hit.subject}
          </h3>
          <h2 className="text-ellipsis overflow-hidden font-semibold text-xl md:text-2xl">
            {lang === 'en' ? hit.title_eng : hit.title}
          </h2>
          <h4 className="text-ellipsis overflow-hidden">
            {lang === 'en' ? hit.week_eng : hit.week}
          </h4>
          <p className="text-ellipsis overflow-hidden ">
            {lang === 'en' ? hit.content_eng : hit.content}
          </p>
          <div className="text-ellipsis overflow-hidden text-xs md:text-sm text-gray-600 dark:text-gray-400">
            {dict.태그[lang]}: {lang === 'en' ? hit.tag_eng.join(', ') : hit.tag.join(', ')}
          </div>
          <div className="grid grid-cols-2 gap-2 md:gap-3">
            <a
              href={hit.kmooc}
              target="_blank"
              className="border flex items-center rounded-lg border-gray-500 px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              <Image src="/images/kmoocLogo.png" alt="kmooc" width={269} height={49} />
            </a>
            <button
              className="border rounded-lg border-gray-500 px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              onClick={(e) => {
                e.stopPropagation()
                toast.error('아직 준비 중입니다. 조금만 기다려주세요.')
              }}
            >
              {dict.연관강의[lang]}
            </button>
          </div>
        </div>
      </li>
      <Modal showCloseButton showDragButton open={isOpened} onClose={() => setIsOpened(false)}>
        <div className="grid gap-2 rounded-2xl bg-gray-100 dark:border-2 dark:border-gray-600 dark:bg-gray-900 pt-5 shadow-xl overflow-hidden">
          <Image
            src="https://lms.kmooc.kr/pluginfile.php/2718931/course/overviewfiles_thumbnail/courseoverviews_thumbnail.png"
            alt="courseoverviews_thumbnail"
            width="700"
            height="700"
            className="aspect-video w-full object-cover"
          />
          <div className="m-3 max-w-prose md:m-4 grid gap-2 md:gap-4">
            <h3 className="text-lg md:text-xl">{lang === 'en' ? hit.subject_eng : hit.subject}</h3>
            <h2 className="font-semibold text-xl md:text-2xl">
              {lang === 'en' ? hit.title_eng : hit.title}
            </h2>
            <h4 className="">{lang === 'en' ? hit.week_eng : hit.week}</h4>
            <p className="">{lang === 'en' ? hit.content_eng : hit.content}</p>
          </div>
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
  태그: {
    ko: '태그',
    en: 'Tags',
  },
} as const
