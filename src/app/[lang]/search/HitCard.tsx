'use client'

import Image from 'next/image'
import Modal from '@/components/Modal'
import { useState } from 'react'
import { Hit } from '@/types/algolia'
import RelatedCoursesButton from './RelatedCoursesButton'
import { useParams } from 'next/navigation'
import { PageProps } from '../page'

type Props = {
  hit: Hit
  layout: 'grid' | 'list'
}

export default function HitCard({ hit, layout }: Props) {
  const { lang } = useParams<PageProps['params']>()

  const [isOpened, setIsOpened] = useState(false)

  const isListLayout = !layout || layout === 'list'
  const tag =
    lang === 'en'
      ? Array.isArray(hit.tag_eng)
        ? hit.tag_eng.join(', ')
        : hit.tag_eng
      : Array.isArray(hit.tag)
        ? hit.tag.join(', ')
        : hit.tag
  const outlinkIcon =
    hit.Coursera === 1 ? (
      <Image
        src="/images/coursera.svg"
        alt="coursera"
        width={1155}
        height={164}
        className="w-full max-w-28"
      />
    ) : (
      <Image
        src="/images/kmoocLogo.png"
        alt="kmooc"
        width={269}
        height={49}
        className="w-full max-w-28"
      />
    )

  return (
    <>
      <li
        className={
          'border transition-colors duration-300 rounded-2xl border-gray-300 dark:border-gray-500 overflow-hidden cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-900 ' +
          (isListLayout ? 'grid grid-cols-[1fr_3fr]' : '')
        }
        onClick={() => setIsOpened(true)}
      >
        <Image
          src={
            hit.kmoocThumnailURL ??
            'https://lms.kmooc.kr/pluginfile.php/2718931/course/overviewfiles_thumbnail/courseoverviews_thumbnail.png'
          }
          alt="courseoverviews-thumbnail"
          width="600"
          height="600"
          className={'object-cover ' + (isListLayout ? 'h-full' : 'aspect-video')}
        />
        {isListLayout ? (
          <div className="p-2 grid min-w-0 gap-2 xl:gap-4">
            <div className="whitespace-nowrap min-w-0 grid gap-1 xl:gap-2">
              <h2 className="text-ellipsis overflow-hidden font-semibold text-2xl">
                {lang === 'en' ? hit.title_eng : hit.title}
              </h2>
              <h4 className="text-ellipsis overflow-hidden">
                {lang === 'en' ? hit.week_eng : hit.week}
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={hit.kmooc}
                target="_blank"
                className="border flex justify-center items-center rounded-xl border-gray-300 dark:border-gray-500 p-2 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {outlinkIcon}
              </a>
              <RelatedCoursesButton course={hit} />
            </div>
          </div>
        ) : (
          <div className="p-3 md:p-4 grid gap-2 md:gap-3 whitespace-nowrap">
            <h3 className="text-ellipsis overflow-hidden text-lg md:text-xl">
              {lang === 'en' ? hit.subject_eng : hit.subject}
            </h3>
            <h2 className="text-ellipsis overflow-hidden font-semibold text-2xl md:text-3xl">
              {lang === 'en' ? hit.title_eng : hit.title}
            </h2>
            <h4 className="text-ellipsis overflow-hidden">
              {lang === 'en' ? hit.week_eng : hit.week}
            </h4>
            <p className="text-ellipsis overflow-hidden ">
              {lang === 'en' ? hit.content_eng : hit.content}
            </p>
            <div className="text-ellipsis overflow-hidden text-xs md:text-sm text-gray-600 dark:text-gray-400">
              {dict.태그[lang]}: {tag}
            </div>
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              <a
                href={hit.kmooc}
                target="_blank"
                className="border flex justify-center items-center rounded-lg border-gray-300 dark:border-gray-500 px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                onClick={(e) => e.stopPropagation()}
              >
                {outlinkIcon}
              </a>
              <RelatedCoursesButton course={hit} />
            </div>
          </div>
        )}
      </li>
      <Modal showCloseButton showDragButton open={isOpened} onClose={() => setIsOpened(false)}>
        <div className="grid gap-2 max-h-svh overflow-auto rounded-2xl bg-gray-100 dark:border-2 dark:border-gray-600 dark:bg-gray-900 pt-5 shadow-xl">
          <Image
            src="https://lms.kmooc.kr/pluginfile.php/2718931/course/overviewfiles_thumbnail/courseoverviews_thumbnail.png"
            alt="courseoverviews_thumbnail"
            width="700"
            height="700"
            className="aspect-video w-full object-cover"
          />
          <div className="m-3 max-w-prose md:m-4 grid gap-2 md:gap-4">
            <h3 className="text-lg md:text-xl">
              {dict.대주제[lang]}: {lang === 'en' ? hit.subject_eng : hit.subject}
            </h3>
            <h2 className="font-bold text-2xl md:text-3xl">
              {dict.강좌제목[lang]}: {lang === 'en' ? hit.title_eng : hit.title}
            </h2>
            <h4 className="">{lang === 'en' ? hit.week_eng : hit.week}</h4>
            <p className="whitespace-pre-wrap">{lang === 'en' ? hit.content_eng : hit.content}</p>
            <div className="text-ellipsis overflow-hidden text-xs md:text-sm text-gray-600 dark:text-gray-400">
              {dict.태그[lang]}: {tag}
            </div>
            <a
              href={hit.kmooc}
              target="_blank"
              className="border justify-center flex items-center rounded-lg border-gray-300 dark:border-gray-500 px-4 py-3 hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {outlinkIcon}
            </a>
          </div>
        </div>
      </Modal>
    </>
  )
}

const dict = {
  태그: {
    ko: '태그',
    en: 'Tags',
  },
  대주제: {
    ko: '대주제',
    en: 'Subject',
  },
  강좌제목: {
    ko: '강좌제목',
    en: 'Title',
  },
} as const
