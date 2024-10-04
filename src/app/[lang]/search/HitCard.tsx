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

  const thumbnail = hit.kmooc ?? '/images/default-thumnail.jpeg'
  const isListLayout = !layout || layout === 'list'
  const tag =
    lang === 'en'
      ? Array.isArray(hit.tag_eng)
        ? hit.tag_eng.join(', ')
        : hit.tag_eng
      : Array.isArray(hit.tag)
        ? hit.tag.join(', ')
        : hit.tag
  const outlinkIcon = thumbnail.includes('https://www.coursera.org') ? (
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
          'cursor-pointer overflow-hidden rounded-2xl border border-gray-300 transition-colors duration-300 hover:bg-gray-100 dark:border-gray-500 dark:hover:bg-gray-900 ' +
          (isListLayout ? 'grid grid-cols-[1fr_3fr]' : '')
        }
        onClick={() => setIsOpened(true)}
      >
        <Image
          src={
            hit.thumbnail && hit.thumbnail !== 'null'
              ? hit.thumbnail
              : 'https://lms.kmooc.kr/pluginfile.php/2718931/course/overviewfiles_thumbnail/courseoverviews_thumbnail.png'
          }
          alt="courseoverviews-thumbnail"
          width="600"
          height="600"
          className={`object-cover ${isListLayout ? 'h-full' : 'aspect-video'}`}
        />
        {isListLayout ? (
          <div className="grid min-w-0 gap-2 p-2 xl:gap-4">
            <div className="grid min-w-0 gap-1 whitespace-nowrap xl:gap-2">
              <h2 className="overflow-hidden text-ellipsis text-2xl font-semibold">
                {lang === 'en' ? hit.title_eng : hit.title}
              </h2>
              <h4 className="overflow-hidden text-ellipsis">
                {lang === 'en' ? hit.week_eng : hit.week}
              </h4>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <a
                href={thumbnail}
                target="_blank"
                className="flex items-center justify-center rounded-xl border border-gray-300 p-2 transition-colors hover:bg-gray-200 dark:border-gray-500 dark:hover:bg-gray-800"
                onClick={(e) => e.stopPropagation()}
              >
                {outlinkIcon}
              </a>
              <RelatedCoursesButton course={hit} />
            </div>
          </div>
        ) : (
          <div className="grid gap-2 whitespace-nowrap p-3 md:gap-3 md:p-4">
            <h3 className="overflow-hidden text-ellipsis text-lg md:text-xl">
              {lang === 'en' ? hit.subject_eng : hit.subject}
            </h3>
            <h2 className="overflow-hidden text-ellipsis text-2xl font-semibold md:text-3xl">
              {lang === 'en' ? hit.title_eng : hit.title}
            </h2>
            <h4 className="overflow-hidden text-ellipsis">
              {lang === 'en' ? hit.week_eng : hit.week}
            </h4>
            <p className="overflow-hidden text-ellipsis">
              {lang === 'en' ? hit.content_eng : hit.content}
            </p>
            <div className="overflow-hidden text-ellipsis text-xs text-gray-600 md:text-sm dark:text-gray-400">
              {dict.태그[lang]}: {tag}
            </div>
            <div className="grid grid-cols-2 gap-2 md:gap-3">
              <a
                href={thumbnail}
                target="_blank"
                className="flex items-center justify-center rounded-lg border border-gray-300 px-4 py-3 transition-colors hover:bg-gray-200 dark:border-gray-500 dark:hover:bg-gray-800"
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
        <div className="grid max-h-svh gap-2 overflow-auto rounded-2xl bg-gray-100 pt-5 shadow-xl dark:border-2 dark:border-gray-600 dark:bg-gray-900">
          <Image
            src="https://lms.kmooc.kr/pluginfile.php/2718931/course/overviewfiles_thumbnail/courseoverviews_thumbnail.png"
            alt="courseoverviews_thumbnail"
            width="700"
            height="700"
            className="aspect-video w-full object-cover"
          />
          <div className="m-3 grid max-w-prose gap-2 md:m-4 md:gap-4">
            <h3 className="text-lg md:text-xl">
              {dict.대주제[lang]}: {lang === 'en' ? hit.subject_eng : hit.subject}
            </h3>
            <h2 className="text-2xl font-bold md:text-3xl">
              {dict.강좌제목[lang]}: {lang === 'en' ? hit.title_eng : hit.title}
            </h2>
            <h4 className="">{lang === 'en' ? hit.week_eng : hit.week}</h4>
            <p className="whitespace-pre-wrap">{lang === 'en' ? hit.content_eng : hit.content}</p>
            <div className="overflow-hidden text-ellipsis text-xs text-gray-600 md:text-sm dark:text-gray-400">
              {dict.태그[lang]}: {tag}
            </div>
            <a
              href={thumbnail}
              target="_blank"
              className="flex items-center justify-center rounded-lg border border-gray-300 px-4 py-3 transition-colors hover:bg-gray-200 dark:border-gray-500 dark:hover:bg-gray-800"
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
