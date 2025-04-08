import { Metadata } from 'next'
import PlanDuSitePage from 'src/views/PlanDuSitePage'
import Suggestion from 'components/layout/Suggestion'

export const metadata: Metadata = {
  title: 'Plan du site | Impact CO₂',
}

export default function PlanDuSite() {
  return (
    <>
      <PlanDuSitePage />
      <Suggestion fromLabel='Plan du site' simulatorName='du plan du site' />
    </>
  )
}
