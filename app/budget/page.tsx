import React from 'react'
import BudgetPage from 'src/views/BudgetPage'
import Suggestion from 'components/layout/Suggestion'

export default function Budget() {
  return (
    <>
      <BudgetPage />
      <Suggestion fromLabel='Budget' from='/budget' simulatorName="du budget de l'équipe" />
    </>
  )
}
