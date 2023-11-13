import Link from 'next/link'
import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import categories from '../../data/categories.json'
import habillement from '../../data/categories/habillement.json'
import Modal from 'components/base/Modal'
import Details from 'components/views/equivalent/Details'
import { QuestionCard, QuestionInput, Tag, Title } from './Question.styles'

const equivalent = habillement.find((equivalent) => equivalent.slug === 'chaussuresentissu')
const category = categories.find((category) => category.slug === 'habillement')

const Question = ({
  title,
  description,
  value,
  setValue,
  tag,
  customBorderRadius,
  withSource,
}: {
  title: string
  description: ReactNode
  value: number | undefined
  setValue: Dispatch<SetStateAction<number | undefined>>
  tag?: string | false
  customBorderRadius?: boolean
  withSource?: boolean
}) => {
  const [open, setOpen] = useState(false)
  return (
    <>
      {withSource && (
        <Modal open={open} setOpen={setOpen}>
          <Details equivalent={equivalent} category={category} />
          <Link
            href='https://librairie.ademe.fr/consommer-autrement/5284-osez-changer-mieux-consommer-vivre-plus-leger.html'
            target='_blank'
            rel='noreferrer noopener'>
            Osez changer
          </Link>
        </Modal>
      )}
      <QuestionCard $customBorderRadius={customBorderRadius}>
        <div>
          <Title>
            {title} {withSource && <button onClick={() => setOpen(true)}>(i)</button>}
          </Title>
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
    </>
  )
}

export default Question
