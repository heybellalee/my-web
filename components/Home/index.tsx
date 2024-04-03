'use client'

import _ from 'lodash'
import { useState, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import useQuery from '@/hooks/useQuery'
import { useAppContext } from '@/stores/AppContext'
import { Box, SimpleGrid } from '@mantine/core'
import { Subtitle } from '@/components/Fonts'
import RwdBlock from '@/components/Rwd/Block'
import MainVisual from './MainVisual'
import NewsCard from '@/components/NewsCard'
import { homeQuery } from '@/utils/sanity/queries'
import classes from './index.module.css'
import type { HomeData } from '@/types/home'

export default function Home({ initialData }: { initialData: Partial<HomeData> }) {
  const [data] = useQuery<Partial<HomeData>>(initialData, homeQuery)
  const noData = _.isEmpty(data)
  const [show, setShow] = useState(false)
  const { viewportSize } = useAppContext().state

  const { scrollY } = useScroll()
  const filterValue = useTransform(scrollY, [0, viewportSize.height], [1, 0.25])

  useEffect(() => {
    if (noData) return
    setTimeout(() => setShow(true), 2500)
  }, [noData])

  return (
    <Box>
      <Box className={classes.fixed}>
        <motion.div
          initial={{ opacity: 0, y: '100vh' }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 3 }}
        >
          <motion.div
            style={{
              filter: `saturate(${filterValue.get()}) brightness(${filterValue.get()})`,
            }}
          ></motion.div>
        </motion.div>
      </Box>

      {!noData ? (
        <Box>
          {/*   Main  */}
          <MainVisual data={data} show={show} />

          {/*   Pages  */}
          <RwdBlock id="pages" pb={{ base: 40, sm: 80 }}>
            <Subtitle pos="relative" ta="center">
              {data.newsTitle}
            </Subtitle>
          </RwdBlock>

          <SimpleGrid
            spacing={40}
            cols={{ base: 1, sm: 2 }}
            w={{ base: '100%', lg: 1200 }}
            px={{ base: 24, sm: 40 }}
            pb={{ base: 60, sm: 100 }}
            mx="auto"
          >
            {data.news?.map(i => (
              <NewsCard key={i._key} data={i} />
            ))}
          </SimpleGrid>
        </Box>
      ) : null}
    </Box>
  )
}
