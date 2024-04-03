'use client'

import clsx from 'clsx'
import { useScreenQueryValue } from '@/hooks/useScreenQuery'
import { Box, Grid, Group, Stack, Paper } from '@mantine/core'
import { Caption, MyTitle, Body } from '@/components/Fonts'
import SanityImage from '@/components/sanity/Image'
import { formatDate } from '@/utils/helper'
import type { PostData } from '@/types/post'
import classes from './index.module.css'

export function BlogCard({ data }: { data: Partial<PostData> }) {
  const { publishedAt, mainImage, readTime = 5 } = data

  const imageAsset = useScreenQueryValue(mainImage, 'asset')

  return (
    <Paper shadow="md" className={clsx(classes.card, 'c-pointer')}>
      <Box
        className={clsx(classes.bgDiv, 'absolute-center', 'pointer-events-none')}
        style={{
          background: 'var(--mantine-color-body)',
          opacity: 0.6,
        }}
      />

      {/*   Background Image  */}
      <Box className={clsx(classes.bgDiv, 'absolute-center', 'pointer-events-none')}>
        {imageAsset ? (
          <Box className={classes.bg}>
            <SanityImage image={imageAsset} style={{ height: '100%' }} />
          </Box>
        ) : null}
      </Box>

      <Box className={classes.content}>
        <Grid columns={6} gutter={0}>
          <Grid.Col span={4}>
            <Stack pr={{ base: 16, sm: 24 }}>
              <Group c="dimmed" gap={8}>
                {publishedAt ? (
                  <>
                    <Caption>{formatDate(publishedAt)}</Caption>
                    <Caption>·</Caption>
                  </>
                ) : null}
                <Caption>{`${readTime} min read`}</Caption>
              </Group>
              <MyTitle>{data.title}</MyTitle>
              <Body lineClamp={2}>{data.description}</Body>
            </Stack>
          </Grid.Col>
          <Grid.Col span={2}>
            <Box pos="relative" className={classes.image}>
              {imageAsset ? <SanityImage image={imageAsset} /> : null}
            </Box>
          </Grid.Col>
        </Grid>
      </Box>
    </Paper>
  )
}
