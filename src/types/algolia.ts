export interface AlgoriaResult {
  results: Result[]
}

export interface Result {
  hits: Hit[]
  hitsPerPage: number
  nbHits: number
  nbPages: number
  facets: Facets
}

export interface Hit {
  title_eng: string
  week: string
  subject: string
  tag_eng: string[] | null // FIXME: 2024-08-25 추후 깨끗한 데이터 받으면 `null` 없애기
  content_eng: string
  title: string
  content: string
  related: string
  kmooc: string
  kmoocThumnailURL: string
  related_eng: string
  week_eng: string
  id: string
  subject_eng: string
  tag: string[]
  path: string
  lastmodified: Lastmodified
  objectID: string
  _highlightResult: HighlightResult
}

export interface Lastmodified {
  _operation: string
  value: number
}

export interface HighlightResult {
  title_eng: TitleEng
  week: Week
  tag_eng: TagEng[]
  content_eng: ContentEng
  title: Title
  content: Content
  week_eng: WeekEng
  tag: Tag[]
}

export interface TitleEng {
  value: string
  matchLevel: string
  matchedWords: any[]
}

export interface Week {
  value: string
  matchLevel: string
  fullyHighlighted: boolean
  matchedWords: string[]
}

export interface TagEng {
  value: string
  matchLevel: string
  matchedWords: any[]
}

export interface ContentEng {
  value: string
  matchLevel: string
  matchedWords: any[]
}

export interface Title {
  value: string
  matchLevel: string
  matchedWords: any[]
}

export interface Content {
  value: string
  matchLevel: string
  fullyHighlighted: boolean
  matchedWords: string[]
}

export interface WeekEng {
  value: string
  matchLevel: string
  matchedWords: any[]
}

export interface Tag {
  value: string
  matchLevel: string
  fullyHighlighted?: boolean
  matchedWords: string[]
}

export interface Facets {
  week: Record<string, number>
  subject: Record<string, number>
}
