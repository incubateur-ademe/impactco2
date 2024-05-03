import React from 'react'
import Suggestion from 'components/layout/web/Suggestion'
import PlanDuSitePage from 'components/pages/PlanDuSitePage'

export default function PlanDuSite() {
  return (
    <>
      <PlanDuSitePage />
      <Suggestion fromLabel='Plan du site' from='/plan-du-site' simulatorName='du plan du site' />
    </>
  )
}
