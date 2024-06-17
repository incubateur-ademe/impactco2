import { Metadata } from 'next'
import React from 'react'
import StatisticsPage from 'src/views/StatisticsPage'
import { getRevalidate } from 'utils/revalidate'
import { getMatomoStats } from 'utils/stats'
import Suggestion from 'components/layout/Suggestion'

export const metadata: Metadata = {
  title: 'Statistiques | Impact CO₂',
}

export const revalidate = getRevalidate(process.env.STATS_REVALIDATE)

export default async function StatistiquesPage() {
  const stats = await getMatomoStats()

  return (
    <>
      <StatisticsPage stats={stats} />
      <Suggestion fromLabel='Statistiques' from='/stats' simulatorName='de nos statistiques' />
    </>
  )
}
