import { Metadata } from 'next'
import StatisticsPage from 'src/views/StatisticsPage'
import { getMatomoStats } from 'utils/stats'
import Suggestion from 'components/layout/Suggestion'

export const metadata: Metadata = {
  title: 'Statistiques | Impact CO₂',
}

export const revalidate = 900

export default async function StatistiquesPage() {
  const year = new Date().getFullYear().toString()
  const stats = await getMatomoStats(year)

  return (
    <>
      <StatisticsPage stats={stats} year={year} />
      <Suggestion fromLabel='Statistiques' simulatorName='de nos statistiques' />
    </>
  )
}
