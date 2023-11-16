import Image from 'next/image'
import Link from 'next/link'
import React, { Dispatch, ReactNode, SetStateAction, useState } from 'react'
import categories from '../../data/categories.json'
import habillement from '../../data/categories/habillement.json'
import Modal from 'components/base/Modal'
import Details from 'components/views/equivalent/Details'
import {
  Button,
  Content,
  Description,
  Header,
  Input,
  QuestionCard,
  QuestionInput,
  SourceButton,
  Tag,
  Title,
} from './Question.styles'

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
}: {
  title: string
  description: ReactNode
  value: number | undefined
  setValue: Dispatch<SetStateAction<number | undefined>>
  tag?: string | false
  customBorderRadius?: boolean
  withSource?: boolean
  children?: ReactNode
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
        <Header>
          <Title>
            {title}
            {withSource && (
              <SourceButton onClick={() => setOpen(true)}>
                <Image src='/icons/information.svg' alt='' width={16} height={16} />
              </SourceButton>
            )}
          </Title>
          {tag && <Tag>{tag}</Tag>}
        </Header>
        <Content>
          <Description>{description}</Description>
          <QuestionInput>
            <Button
              onClick={() => {
                if (value === undefined) {
                  setValue(0)
                } else if (value > 0) {
                  setValue(value - 1)
                }
              }}>
              -
            </Button>
            <Input
              type='number'
              value={value === undefined ? '' : value}
              onChange={(e) => setValue(Number.parseInt(e.target.value) || undefined)}
              step={1}
              min={0}
              max={99}
            />
            <Button
              onClick={() => {
                if (value === undefined) {
                  setValue(1)
                } else {
                  setValue(value + 1)
                }
              }}>
              +
            </Button>
          </QuestionInput>
        </Content>
        {children}
      </QuestionCard>
    </>
  )
}

export default Question
