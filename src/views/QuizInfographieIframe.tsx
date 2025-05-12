'use client'

import { useMemo } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import CategorySimulator from 'components/outils/CategorySimulator'
import { getQuizEquivalents } from 'components/outils/quiz/question.config'
import Shareable from 'components/shareable/Shareable'
import { overScreenQuizInfographyValues } from 'components/shareable/overScreens/Values/QuizInfography'

const QuizInfographieIframe = () => {
  const { language } = useParamContext()
  const equivalents = useMemo(() => getQuizEquivalents(language), [language])

  return (
    <Shareable slug='quiz-infographie' tracking='Quiz infographie' overScreens={overScreenQuizInfographyValues}>
      <CategorySimulator tracking='Quiz infographie' equivalents={equivalents} reverse />
    </Shareable>
  )
}

export default QuizInfographieIframe
