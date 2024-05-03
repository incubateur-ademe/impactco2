import React from 'react'
import { getMatomoStats } from 'utils/stats'
import Suggestion from 'components/layout/web/Suggestion'
import StatisticsPage from 'components/pages/StatisticsPage'

const getRevalidate = () => {
  const revalidate = process.env.STATS_REVALIDATE && Number.parseInt(process.env.STATS_REVALIDATE)
  return revalidate && !Number.isNaN(revalidate) ? revalidate : 1
}

export const revalidate = getRevalidate()

export default async function StatistiquesPage() {
  const stats = await getMatomoStats()

  return (
    <>
      <StatisticsPage stats={stats} />
      <Suggestion fromLabel='Statistiques' from='/stats' simulatorName='de nos statistiques' />
    </>
  )
}
