import { useMemo } from 'react'
import Shareable from 'components/shareable/Shareable'
import { overScreenQuizValues } from 'components/shareable/overScreens/Values/Quiz'
import QuizSimulator from './QuizSimulator'

const Quiz = () => {
  const overScreens = useMemo(() => overScreenQuizValues(), [])

  return (
    <Shareable slug='quiz' tracking='Quiz' noBottomBorders overScreens={overScreens}>
      <QuizSimulator />
    </Shareable>
  )
}

export default Quiz
