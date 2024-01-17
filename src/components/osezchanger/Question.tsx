import React, { Dispatch, ReactNode, SetStateAction } from 'react'
import ClickableIcon from './components/Information'
import NumberInput from './components/NumberInput'
import { Content, Description, Header, QuestionCard, Tag, Title } from './Question.styles'

const Question = ({
  id,
  tracking,
  title,
  description,
  value,
  setValue,
  tag,
  customBorderRadius,
  source,
  children,
  'data-testid': dataTestId,
}: {
  id: string
  tracking: string
  title: string
  description: ReactNode
  value: number | undefined
  setValue: Dispatch<SetStateAction<number | undefined>>
  tag?: ReactNode | false
  customBorderRadius?: boolean
  source?: () => void
  children?: ReactNode
  ['data-testid']?: string
}) => {
  return (
    <>
      <QuestionCard $customBorderRadius={customBorderRadius} data-testid={dataTestId}>
        <Header>
          <Title>
            {/* https://github.com/bubkoo/html-to-image/issues/132 */}
            {title.replace(/ /g, ' ')}
            {source && <ClickableIcon onClick={source} />}
          </Title>
          {tag && <Tag data-testid={`${dataTestId}-tag`}>{tag}</Tag>}
        </Header>
        <Content>
          <Description htmlFor={id}>{description}</Description>
          <NumberInput id={id} data-testid={dataTestId} value={value} setValue={setValue} tracking={tracking} />
        </Content>
        {children}
      </QuestionCard>
    </>
  )
}

export default Question
