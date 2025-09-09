'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import Image from 'next/image'
import { useEffect, useMemo, useRef, useState } from 'react'
import useTrackingContext from 'src/providers/TrackingProvider'
import { track } from 'utils/matomo'
import Resource from 'components/base/Resource'
import Button from 'components/base/buttons/Button'
import DropdownArrowDownIcon from 'components/base/icons/dropdown-arrow-down'
import DropdownArrowUpIcon from 'components/base/icons/dropdown-arrow-up'
import FullArrowLeftIcon from 'components/base/icons/full-arrow-left'
import Question from './Question'
import QuizInfography from './QuizInfography'
import { questions } from './question.config'
import shareableStyles from '../../shareable/Shareable.module.css'
import styles from './QuizSimulator.module.css'

const QuizSimulator = () => {
  const { trackOnce } = useTrackingContext()
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
      trackOnce('Réponse')
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

  useEffect(() => {
    if (!config) {
      track('Quiz', 'Finished', `score_${score.current.reduce((acc, current) => acc + current, 0)}`)
    }
  }, [config])

  const Header = (
    <div className={styles.header} ref={ref} tabIndex={-1}>
      {question > 0 && config && (
        <button
          data-testid='quiz-previous-button'
          type='button'
          className={styles.previousButton}
          onClick={() => {
            setAnswer(undefined)
            setQuestion(question - 1)
            setDisplayMore(false)
            track('Quiz', 'Previous', question.toString())
          }}>
          <FullArrowLeftIcon />
          {t('previous')}
        </button>
      )}
      <p className={styles.question} data-testid='quiz-header'>
        {config ? (
          <>
            {t('question')} {question + 1} / 10
          </>
        ) : (
          t('finished')
        )}
      </p>
      <legend className={styles.title} data-testid='quiz-title'>
        {config
          ? t.rich('title', { important: (chunks) => <b>{chunks}</b> })
          : t.rich('score', {
              score: score.current.reduce((acc, current) => acc + current, 0),
              important: (chunks) => <b>{chunks}</b>,
            })}
      </legend>
      {config && (
        <p
          className={classNames(styles.tag, {
            [styles.correct]: answer === config.answer,
            [styles.missed]: answer && answer !== config.answer,
          })}
          data-testid='quiz-question-result'
          role='status'>
          {answer ? (
            answer === config.answer ? (
              t.rich('correct', { important: (chunks) => <b>{chunks}</b> })
            ) : (
              <>
                {t.rich('missed', { important: (chunks) => <b>{chunks}</b> })} {config.answer} !
              </>
            )
          ) : (
            t('tag')
          )}
        </p>
      )}
    </div>
  )
  return (
    <>
      {config ? (
        <form>
          <fieldset>
            {Header}
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
          </fieldset>
        </form>
      ) : (
        <>
          {Header}
          <div className={styles.result}>
            <Image src='/images/tools-quiz-end.svg' alt='' width={220} height={180} data-testid='quiz-success' />
            <Button
              data-testid='quiz-restart-button'
              priority='outline'
              onClick={() => {
                setAnswer(undefined)
                setQuestion(0)
                track('Quiz', 'Restart', 'quiz_restart_button')
              }}>
              {t('restart')}
            </Button>
          </div>
          <QuizInfography />
          <div className={styles.ressources}>
            <p>{t('read-more')}</p>
            <Resource
              image='/images/fiches.png'
              text='fiches'
              href='/kit/fiches.zip'
              withLink='Télécharger les 20 fiches'
              tracking='Quiz'
            />
            <Resource
              image='/images/tools-transport.svg'
              text='ico2-transport'
              href='https://impactco2.fr/outils/transport'
              withLink='Simulateur Transports'
              tracking='Quiz'
            />
            <Resource
              image='/images/tools-fruitsetlegumes.svg'
              text='ico2-fruitsetlegumes'
              href='https://impactco2.fr/outils/fruitsetlegumes'
              withLink='Fruits et légumes de saison'
              tracking='Quiz'
            />
            <Resource
              image='/images/lvao.png'
              text='lvao'
              href='https://quefairedemesobjets.ademe.fr/?mtm_campaign=impactCO2'
              withLink='Longue Vie Aux Objets'
              tracking='Quiz'
            />
            <Resource
              image='/images/ngc.png'
              text='ngc'
              href='https://nosgestesclimat.fr/'
              withLink='Nos Gestes Climat'
              tracking='Quiz'
            />
          </div>
          <div className={shareableStyles.separator} />
        </>
      )}
      {answer && (
        <div role='alert' aria-live='polite'>
          <button
            className={styles.moreButton}
            onClick={() => {
              setDisplayMore(!displayMore)
              track('Quiz', displayMore ? 'HideMore' : 'DisplayMore', (question + 1).toString())
              if (displayMore && ref.current) {
                ref.current.scrollIntoView({ behavior: 'smooth' })
              }
            }}
            data-testid='quiz-more-info-button'
            aria-expanded={displayMore}
            aria-controls='quiz-more-info'>
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
        </div>
      )}
    </>
  )
}

export default QuizSimulator
