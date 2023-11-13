import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import { QuestionCard, QuestionInput, Tag, Title } from './Question.styles'

const Question = ({
  title,
  description,
  value,
  setValue,
  tag,
  customBorderRadius,
}: {
  title: string
  description: ReactNode
  value: number | undefined
  setValue: Dispatch<SetStateAction<number | undefined>>
  tag?: string | false
  customBorderRadius?: boolean
}) => {
  return (
    <QuestionCard $customBorderRadius={customBorderRadius}>
      <div>
        <Title>{title}</Title>
        {description}
      </div>
      <div>
        <QuestionInput>
          <button
            onClick={() => {
              if (value === undefined) {
                setValue(0)
              } else if (value > 0) {
                setValue(value - 1)
              }
            }}>
            -
          </button>
          <input
            type='number'
            value={value === undefined ? '' : value}
            onChange={(e) => setValue(Number.parseInt(e.target.value) || undefined)}
            step={1}
            min={0}
          />
          <button
            onClick={() => {
              if (value === undefined) {
                setValue(1)
              } else {
                setValue(value + 1)
              }
            }}>
            +
          </button>
        </QuestionInput>
        Paires
      </div>
      {tag && <Tag>{tag}</Tag>}
    </QuestionCard>
  )
}

export default Question
