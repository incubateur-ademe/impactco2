import React, { useContext } from 'react'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'

import RulesContext from 'utils/RulesContext'
import Button from 'components/base/Button'

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 1.5rem;
  padding: 1.5rem;
  background-color: ${(props) => props.theme.colors.second};
  border-radius: 1rem;
  overflow: hidden;
`
const Title = styled.h2``
const StyledReactMarkdown = styled(ReactMarkdown)``
export default function CategoryStart(props) {
  const { curCategory } = useContext(RulesContext)
  return (
    <Wrapper>
      <Title>
        {curCategory.title} {curCategory.rawNode['icônes']}
      </Title>
      <StyledReactMarkdown>
        {curCategory.rawNode.description || '🚲 🚗 ✈️ 🚅 🚌'}
      </StyledReactMarkdown>
      <Button.Wrapper right>
        <Button onClick={() => props.setStatus('started')}>Commencer</Button>
      </Button.Wrapper>
    </Wrapper>
  )
}
