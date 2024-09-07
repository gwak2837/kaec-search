import { algoliaClient } from '@/common/algoria'
import { Locale } from '@/middleware'
import { Hit } from '@/types/algolia'
import { useQuery } from '@tanstack/react-query'

type Props = {
  lang: Locale
  course: Hit
  enabled: boolean
}

export default function useRelatedCourses({ lang, course, enabled }: Props) {
  const tags =
    lang === 'ko'
      ? Array.isArray(course.tag)
        ? course.tag
        : [course.tag]
      : Array.isArray(course.tag_eng)
        ? course.tag_eng
        : [course.tag_eng]

  return useQuery({
    queryKey: [course.id, 'related-courses', lang],
    queryFn: () =>
      algoliaClient.search<Hit>({
        requests: tags.map((tag) => ({
          indexName: 'lecturedata',
          query: tag,
          attributesToRetrieve: lang === 'ko' ? ['tag', 'week'] : ['tag_eng', 'week_eng'],
        })),
      }),
    enabled: tags.length > 0 && enabled,
    staleTime: Infinity,
  })
}
