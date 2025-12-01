import { Metadata } from 'next'
import BudgetPage from 'src/views/BudgetPage'
import Suggestion from 'components/layout/Suggestion'

export const metadata: Metadata = {
  title: 'Budget | Impact CO₂',
}

export default function Budget() {
  return (
    <>
      <BudgetPage />
      <Suggestion fromLabel='Budget' simulatorName="du budget de l'équipe" />
    </>
  )
}
