'use client'

import classNames from 'classnames'
import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { ComputedEquivalent } from 'types/equivalent'
import { getName } from 'utils/Equivalent/equivalent'
import formatNumber from 'utils/formatNumber'
import EquivalentIcon from 'components/base/EquivalentIcon'
import LocalNumber from 'components/base/LocalNumber'
import StarShapeCriticalIcon from 'components/base/icons/star-shap-critical'
import StarShapeSuccessIcon from 'components/base/icons/star-shap-success'
import styles from './Answer.module.css'

const Answer = ({
  equivalent,
  value,
  tag,
  onClick,
  answer,
  correctAnswer,
  proportion,
}: {
  equivalent: ComputedEquivalent
  value: number
  tag: 'A' | 'B'
  onClick: () => void
  answer: 'A' | 'B' | undefined
  correctAnswer: 'A' | 'B'
  proportion: number
}) => {
  const { language } = useParamContext()

  const content = (
    <div className={styles.content} data-testid={`quiz-answer-${tag}`}>
      <div className={styles.tag}>{tag}</div>
      <EquivalentIcon equivalent={equivalent} height={5} />
      <div className={styles.value}>{value}</div>
      <div className={styles.name}>{getName(language, equivalent, true, value)}</div>
    </div>
  )
  return answer ? (
    <div
      className={classNames(styles.answered, {
        [styles.correct]: answer === correctAnswer && answer === tag,
        [styles.missed]: answer !== correctAnswer && answer === tag,
      })}>
      {answer === tag && (
        <div
          className={styles.badge}
          data-testid={correctAnswer === tag ? `quiz-badge-success-${tag}` : `quiz-badge-critical-${tag}`}>
          {correctAnswer === tag ? <StarShapeSuccessIcon /> : <StarShapeCriticalIcon />}
        </div>
      )}
      <div className={correctAnswer !== tag ? styles.wrong : ''}>{content}</div>
      <div className={classNames(styles.footer, { [styles.wrong]: correctAnswer !== tag })}>
        <div className={styles.result} data-testid={`quiz-answer-value-${tag}`}>
          <span className={styles.resultValue}>
            <LocalNumber number={formatNumber(equivalent.value * value)} />
          </span>{' '}
          kg CO₂e
        </div>
        <div
          className={styles.bar}
          style={{
            width: `${100 * proportion}%`,
          }}
        />
      </div>
    </div>
  ) : (
    <button
      className={styles.answer}
      aria-label={`${value} ${getName(language, equivalent, true, value)}`}
      onClick={onClick}>
      {content}
    </button>
  )
}

export default Answer
