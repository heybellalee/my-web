import type { NewsData } from './news'
import type { SanityArray } from './common'

export type HomeData = {
  header: string
  titles: string[]
  titleDuration: number
  subtitle: string
  caption1: string
  caption2: string
  newsTitle: string
  arrowText: string
  news: SanityArray<NewsData>
}
