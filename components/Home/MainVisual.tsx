'use client'

import clsx from 'clsx'
import { MotionSlide } from '@/components/motion'
import { px, Stack, Group, Box, Text, ActionIcon } from '@mantine/core'
import { useAppContext } from '@/stores/AppContext'
import TitlesMotion from './TitlesMotion'
import { Caption } from '@/components/Fonts'
import { HiOutlineArrowNarrowDown } from 'react-icons/hi'
import { headerHeight } from '@/theme/config'
import type { HomeData } from '@/types/home'

export default function MainVisual({ data, show }: { data: Partial<HomeData>; show: boolean }) {
  const { state } = useAppContext()
  const { viewportSize, scroll } = state
  const { width, height } = viewportSize
  const matches = width >= Number(px('48em'))

  const o = 1 - (scroll.y / height) * 2
  const opacity = o > 0 ? o : 0

  return (
    <Box
      pos="relative"
      h={{
        base: `calc(100dvh - ${headerHeight.base}px)`,
        sm: `calc(100dvh - ${headerHeight.sm}px)`,
      }}
      px={{ base: 24, sm: 40 }}
    >
      <Stack h="100%" justify="center" align="center">
        <MotionSlide delay={2.5}>
          <Text fw={400} fz={{ base: 22, sm: 32, lg: 50 }}>
            {data.header}
          </Text>
        </MotionSlide>

        {/*   Titles  */}
        <MotionSlide delay={2}>
          <TitlesMotion data={data.titles || []} duration={data.titleDuration || 1} show={show} />
        </MotionSlide>

        {/*   Subtitle  */}
        <MotionSlide delay={2.8}>
          <Text fw={200} fz={{ base: 18, sm: 26, lg: 38 }}>
            {data.subtitle}
          </Text>
        </MotionSlide>
        <Box w={1} h={headerHeight} />
      </Stack>

      {/*   Caption  */}
      <Box pos="absolute" w="100%" left={0} bottom={{ base: 24, sm: 40 }} px={{ base: 24, sm: 40 }}>
        <MotionSlide delay={3.2}>
          <Box pos="relative">
            <Caption>
              {data.caption1}
              {matches ? ' ' : <br />}
              {data.caption2}
            </Caption>

            {/* Arrow */}
            <Box pos="absolute" right={0} bottom={0}>
              <Group
                className="c-pointer"
                style={{ opacity }}
                onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
              >
                <Caption className={clsx({ hide: !matches })}>{data.arrowText}</Caption>
                <ActionIcon
                  pos="relative"
                  bottom={2}
                  size={20}
                  c="var(--mantine-color-text)"
                  variant="transparent"
                >
                  <HiOutlineArrowNarrowDown size={20} />
                </ActionIcon>
              </Group>
            </Box>
          </Box>
        </MotionSlide>
      </Box>
    </Box>
  )
}
