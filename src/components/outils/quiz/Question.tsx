'use client'

import { useTranslations } from 'next-intl'
import { SetStateAction } from 'preact/compat'
import React, { Dispatch, ForwardedRef, forwardRef, useCallback, useEffect, useMemo } from 'react'
import { computedEquivalents } from 'src/providers/equivalents'
import { Question as QuestionType } from 'types/question'
import Button from 'components/base/buttons/Button'
import FullArrowRightIcon from 'components/base/icons/full-arrow-right'
import Answer from './Answer'
import styles from './Question.module.css'

const Question = (
  {
    question,
    answer,
    setAnswer,
    nextQuestion,
    displayMore,
  }: {
    question: QuestionType
    nextQuestion: () => void
    answer: 'A' | 'B' | undefined
    setAnswer: Dispatch<SetStateAction<'A' | 'B' | undefined>>
    displayMore: boolean
  },
  nextRef: ForwardedRef<HTMLButtonElement>
) => {
  const t = useTranslations('quiz')
  const equivalentA = useMemo(
    () => computedEquivalents.find((equivalent) => equivalent.slug === question.slugA),
    [question.slugA]
  )
  const equivalentB = useMemo(
    () => computedEquivalents.find((equivalent) => equivalent.slug === question.slugB),
    [question.slugB]
  )

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!answer) {
        if (e.key === 'a') {
          e.preventDefault()
          setAnswer('A')
        }
        if (e.key === 'b') {
          e.preventDefault()
          setAnswer('B')
        }
      }
    },
    [answer]
  )

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])

  return (
    equivalentA &&
    equivalentB && (
      <>
        <div className={styles.container}>
          <div className={styles.question}>
            <Answer
              equivalent={equivalentA}
              value={question.valueA || 1}
              tag='A'
              onClick={() => setAnswer('A')}
              answer={answer}
              correctAnswer={question.answer}
              proportion={
                question.answer === 'B'
                  ? 1
                  : ((question.valueA || 1) * equivalentA.value) / ((question.valueB || 1) * equivalentB.value)
              }
            />
            <div className={styles.orContainer}>
              <div className={styles.or}>{t('ou')}</div>
            </div>
            <Answer
              equivalent={equivalentB}
              value={question.valueB || 1}
              tag='B'
              onClick={() => setAnswer('B')}
              answer={answer}
              correctAnswer={question.answer}
              proportion={
                question.answer === 'A'
                  ? 1
                  : ((question.valueB || 1) * equivalentB.value) / ((question.valueA || 1) * equivalentA.value)
              }
            />
          </div>
          {answer && (
            <div>
              <Button
                className={styles.nextButton}
                onClick={nextQuestion}
                ref={nextRef}
                data-testid='quiz-next-question'>
                {t(question.last ? 'result' : 'next')} <FullArrowRightIcon />
              </Button>
              <div
                data-testid='quiz-more-info'
                id='quiz-more-info'
                className={styles.moreInfo}
                //@ts-expect-error: inert not managed by react
                inert={displayMore ? undefined : ''}>
                {question.moreInfo}
              </div>
            </div>
          )}
        </div>
      </>
    )
  )
}

export default forwardRef(Question)
