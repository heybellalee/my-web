import { draftMode } from 'next/headers'
import About from '@/components/About'
import { getAboutData } from '@/utils/sanity/queries'

export default async function AboutPage() {
  const { isEnabled } = draftMode()
  const data = isEnabled ? {} : await getAboutData()
  return (
    <>
      <About initialData={data} />
    </>
  )
}

export const revalidate = 3600 // revalidate at most every hour
