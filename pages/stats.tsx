import React from 'react'
import styled from 'styled-components'
import { Stats, getMatomoStats } from 'utils/stats'
import { Section, SectionWideContent } from 'components/base/Section'
import Web from 'components/layout/Web'
import Statistics from 'components/statistics/Statistics'

const FormatText = styled.div`
  margin-bottom: 5rem;
  h1 {
    font-size: 3rem;
  }
  > h2 {
    margin-top: 3rem;
  }
`

export default function StatistiquesPage({ stats }: { stats: Stats }) {
  return (
    <Web title='Statistiques'>
      <Section>
        <SectionWideContent>
          <FormatText>
            <h1>Statistiques</h1>
            <Statistics stats={stats} />
          </FormatText>
        </SectionWideContent>
      </Section>
    </Web>
  )
}

export async function getStaticProps() {
  const revalidate = process.env.STATS_REVALIDATE && Number.parseInt(process.env.STATS_REVALIDATE)
  const stats = await getMatomoStats()
  return {
    props: {
      stats,
    },
    revalidate: revalidate && !Number.isNaN(revalidate) ? revalidate : 1,
  }
}
