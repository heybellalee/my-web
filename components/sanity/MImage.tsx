'use client'

import { Box } from '@mantine/core'
import SanityImage from '@/components/sanity/Image'
import type { ImageAssetData } from '@/types/image'

type MImageProps = {
  value: { asset?: ImageAssetData; hidden?: boolean }
}

export function MImage({ value }: MImageProps) {
  const { asset, hidden } = value

  return (
    <Box pos="relative" w="100%" h="auto">
      {asset ? (
        <SanityImage image={asset} style={{ visibility: hidden ? 'hidden' : 'unset' }} />
      ) : null}
    </Box>
  )
}
