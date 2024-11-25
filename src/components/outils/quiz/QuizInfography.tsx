import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'use-intl'
import Shareable from 'components/shareable/Shareable'
import { overScreenQuizInfographyValues } from 'components/shareable/overScreens/Values'
import shareableStyles from '../../shareable/Shareable.module.css'
import CategoryDisplayAll from '../CategoryDisplayAll'
import CategorySimulator from '../CategorySimulator'
import styles from './QuizInfography.module.css'
import { quizEquivalents } from './question.config'

const QuizInfography = () => {
  const t = useTranslations('quiz')
  const [displayAll, setDisplayAll] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current) {
      if (displayAll) {
        ref.current.getElementsByTagName('a')[0].focus()
      } else {
        ref.current.getElementsByTagName('a')[0].scrollIntoView({ behavior: 'smooth', block: 'end' })
      }
    }
  }, [ref, displayAll])

  return (
    <>
      <div className={shareableStyles.separatorBothBorders} />
      <div
        className={classNames(styles.category, { [styles.displayAll]: displayAll })}
        inert={displayAll ? undefined : true}>
        <p className={styles.text}>{t('infography')}</p>
        <Shareable slug='quiz-infographie' tracking='Quiz infographie' overScreens={overScreenQuizInfographyValues}>
          <div ref={ref}>
            <CategorySimulator tracking='Quiz infographie' equivalents={quizEquivalents} reverse />
          </div>
        </Shareable>
      </div>
      <CategoryDisplayAll
        displayAll={displayAll}
        setDisplayAll={setDisplayAll}
        tracking='Quiz infographie'
        displayAllText={t('displayAll')}
        hideAllText={t('hideAll')}
      />
      <div className={shareableStyles.separatorBothBorders} />
    </>
  )
}

export default QuizInfography
