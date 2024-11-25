import CategorySimulator from 'components/outils/CategorySimulator'
import { quizEquivalents } from 'components/outils/quiz/question.config'
import Shareable from 'components/shareable/Shareable'
import { overScreenQuizInfographyValues } from 'components/shareable/overScreens/Values'

const page = () => {
  return (
    <Shareable slug='quiz-infographie' tracking='Quiz infographie' overScreens={overScreenQuizInfographyValues}>
      <CategorySimulator tracking='Quiz infographie' equivalents={quizEquivalents} reverse />
    </Shareable>
  )
}

export default page
