import React from 'react'
import Suggestion from 'components/layout/web/Suggestion'
import BudgetPage from 'components/pages/BudgetPage'

export default function Budget() {
  return (
    <>
      <BudgetPage />
      <Suggestion fromLabel='Budget' from='/budget' simulatorName="du budget de l'équipe" />
    </>
  )
}
