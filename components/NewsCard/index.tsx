'use client'

import clsx from 'clsx'
import { useRouter } from 'next/navigation'
import { Box, Paper, Stack } from '@mantine/core'
import { MyTitle, Body } from '@/components/Fonts'
import SanityImage from '@/components/sanity/Image'
import classes from './index.module.css'
import type { NewsData } from '@/types/news'

export default function NewsCard({ data }: { data: Partial<NewsData> }) {
  const router = useRouter()

  const { title, subtitle, asset, post } = data

  return (
    <Paper
      shadow="md"
      className={clsx(classes.card, 'c-pointer')}
      onClick={() => (post?.slug ? router.push(`/pages/${post.slug}`) : null)}
    >
      {/*   Background Image  */}
      <Box className={clsx(classes.bgDiv, 'absolute-center', 'pointer-events-none')}>
        {asset ? (
          <Box className={classes.bg}>
            <SanityImage image={asset} style={{ height: '100%' }} />
          </Box>
        ) : null}
      </Box>

      <Stack className={classes.content} px={16} py={24} gap={20}>
        <MyTitle>{title}</MyTitle>

        {asset ? (
          <Box pos="relative">
            <Box className={classes.imgBox}>
              <SanityImage image={asset} />
            </Box>
          </Box>
        ) : null}

        <Body>{subtitle}</Body>
      </Stack>
    </Paper>
  )
}
