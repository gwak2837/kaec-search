import { Locale } from '@/middleware'
import Link from 'next/link'

type Props = {
  className?: string
  value: string
  count: number
  facetKey: string
  facetFilters: string
  lang: Locale
  href: string
}

export default function FacetFilterLink({
  className,
  value,
  count,
  facetKey,
  facetFilters,
  lang,
  href,
}: Props) {
  return (
    <Link
      aria-selected={facetFilters.includes(`"${facetKey}:${value}"`)}
      className={className}
      href={href}
    >
      <span>{value}</span>
      <span className="whitespace-nowrap">
        {count}
        {dict[count > 1 ? '개_복수' : '개'][lang]}
      </span>
    </Link>
  )
}

const dict = {
  개_복수: {
    ko: '개',
    en: ' items',
  },
  개: {
    ko: '개',
    en: ' item',
  },
} as const
