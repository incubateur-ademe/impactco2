'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import React, { useEffect, useMemo, useRef, useState } from 'react'
import Resource from 'components/base/Resource'
import Button from 'components/base/buttons/Button'
import DropdownArrowDownIcon from 'components/base/icons/dropdown-arrow-down'
import DropdownArrowUpIcon from 'components/base/icons/dropdown-arrow-up'
import FullArrowLeftIcon from 'components/base/icons/full-arrow-left'
import shareableStyles from '../../shareable/Shareable.module.css'
import Question from './Question'
import styles from './QuizSimulator.module.css'
import { questions } from './question.config'

const QuizSimulator = () => {
  const ref = useRef<HTMLDivElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  const [navigated, setNavigated] = useState(false)
  const [question, setQuestion] = useState(0)
  const score = useRef<number[]>([])
  const [answer, setAnswer] = useState<'A' | 'B' | undefined>()
  const [displayMore, setDisplayMore] = useState(false)

  const config = useMemo(() => questions[question], [question])
  const t = useTranslations('quiz')

  useEffect(() => {
    if (answer && nextRef.current) {
      nextRef.current.focus()
    }
  }, [answer, nextRef])

  useEffect(() => {
    if (displayMore && nextRef.current) {
      nextRef.current.focus()
    }
  }, [nextRef, displayMore])

  useEffect(() => {
    if (navigated && ref.current) {
      ref.current.focus()
    }
  }, [question, navigated])

  return (
    <>
      <div className={styles.header} ref={ref} tabIndex={-1}>
        {question > 0 && config && (
          <button
            data-testid='quiz-previous-button'
            className={styles.previousButton}
            onClick={() => {
              setAnswer(undefined)
              setQuestion(question - 1)
              setDisplayMore(false)
            }}>
            <FullArrowLeftIcon />
            {t('previous')}
          </button>
        )}
        <div className={styles.question} data-testid='quiz-header'>
          {config ? (
            <>
              {t('question')} {question + 1} / 10
            </>
          ) : (
            t('finished')
          )}
        </div>
        <div className={styles.title} data-testid='quiz-title'>
          {config
            ? t.rich('title')
            : t.rich('score', { score: score.current.reduce((acc, current) => acc + current, 0) })}
        </div>
        {config && (
          <div
            className={classNames(styles.tag, {
              [styles.correct]: answer === config.answer,
              [styles.missed]: answer && answer !== config.answer,
            })}
            data-testid='quiz-question-result'>
            {answer ? (
              answer === config.answer ? (
                t.rich('correct')
              ) : (
                <>
                  {t.rich('missed')} {config.answer} !
                </>
              )
            ) : (
              t('tag')
            )}
          </div>
        )}
      </div>
      {config ? (
        <div className={answer && !displayMore ? styles.reduced : undefined}>
          <Question
            question={config}
            nextQuestion={() => {
              score.current[question] = answer === config.answer ? 1 : 0
              setNavigated(true)
              setAnswer(undefined)
              setQuestion(question + 1)
              setDisplayMore(false)
            }}
            answer={answer}
            setAnswer={setAnswer}
            ref={nextRef}
            displayMore={displayMore}
          />
        </div>
      ) : (
        <>
          <div className={styles.result}>
            <Image src='/images/tools-quiz-end.svg' alt='' width={220} height={180} data-testid='quiz-success' />
            <Button
              data-testid='quiz-restart-button'
              priority='outline'
              onClick={() => {
                setAnswer(undefined)
                setQuestion(0)
              }}>
              {t('restart')}
            </Button>
          </div>
          <div className={shareableStyles.separatorBothBorders} />
          <div className={styles.ressources}>
            {t('read-more')}
            <Resource
              image='/images/fiches.png'
              text='fiches'
              href='https://impactco2.fr/outils/quiz'
              withLink='Télécharger les 20 fiches'
              tracking='Quiz'
            />
            <Resource
              image='/images/ico2.svg'
              text='ico2'
              href='https://impactco2.fr/'
              withLink='Impact CO2'
              tracking='Quiz'
              imgSize='6rem'
            />
            <Resource
              image='/images/agir.png'
              text='agir'
              href='https://agirpourlatransition.ademe.fr/'
              withLink='ADEME'
              tracking='Quiz'
            />
            <Resource
              image='/images/ngc.png'
              text='ngc'
              href='https://nosgestesclimat.fr/'
              withLink='Nos Gestes Climat'
              tracking='Quiz'
              imgSize='4.5rem'
            />
          </div>
          <div className={shareableStyles.separator} />
        </>
      )}
      {answer && (
        <button
          className={styles.moreButton}
          onClick={() => {
            setDisplayMore(!displayMore)
            if (displayMore && ref.current) {
              ref.current.scrollIntoView({ behavior: 'smooth' })
            }
          }}
          data-testid='quiz-more-info-button'>
          {displayMore ? (
            <>
              {t('less')} <DropdownArrowUpIcon />
            </>
          ) : (
            <>
              {t('more')} <DropdownArrowDownIcon />
            </>
          )}
        </button>
      )}
    </>
  )
}

export default QuizSimulator
