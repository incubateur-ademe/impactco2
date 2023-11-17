import Link from 'next/link'
import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import categories from '../../data/categories.json'
import habillement from '../../data/categories/habillement.json'
import ClickableIcon from './components/Information'
import NumberInput from './components/NumberInput'
import Modal from 'components/base/Modal'
import Details from 'components/views/equivalent/Details'
import { Content, Description, Header, QuestionCard, Tag, Title } from './Question.styles'

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
  children,
  'data-testid': dataTestId,
}: {
  title: string
  description: ReactNode
  value: number | undefined
  setValue: Dispatch<SetStateAction<number | undefined>>
  tag?: string | false
  customBorderRadius?: boolean
  withSource?: boolean
  children?: ReactNode
  ['data-testid']?: string
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
      <QuestionCard $customBorderRadius={customBorderRadius} data-testid={dataTestId}>
        <Header>
          <Title>
            {title}
            {withSource && <ClickableIcon icon='information' onClick={() => setOpen(true)} />}
          </Title>
          {tag && <Tag data-testid={`${dataTestId}-tag`}>{tag}</Tag>}
        </Header>
        <Content>
          <Description>{description}</Description>
          <NumberInput data-testid={dataTestId} value={value} setValue={setValue} />
        </Content>
        {children}
      </QuestionCard>
    </>
  )
}

export default Question
