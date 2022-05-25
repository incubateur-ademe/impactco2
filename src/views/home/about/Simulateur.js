import React from 'react'
import styled from 'styled-components'

import Button from 'components/base/Button'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  width: calc(50% - 1rem);
  padding-bottom: 1rem;
  background-color: ${(props) => props.theme.colors.second};
  border: 0.0625rem solid ${(props) => props.theme.colors.second};
  border-radius: 1rem;
  overflow: hidden;

  ${(props) => props.theme.mq.medium} {
    width: calc(50% - 0.5rem);
  }
`
const Image = styled.img`
  width: 100%;
  height: auto;
`
const Title = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 3rem;
  margin: 0.25rem;
  font-size: 1.125rem;
  font-weight: bold;
  text-align: center;
  color: ${(props) => props.theme.colors.text};
`
const StyledButton = styled(Button)`
  padding: 0.375rem 1rem;
  font-size: 0.875rem;

  ${(props) => props.theme.mq.small} {
    font-size: 0.75rem;
  }
`
export default function Category(props) {
  return (
    <Wrapper>
      <Image src={props.simulateur.img} alt={props.simulateur.name} />
      <Title>{props.simulateur.name}</Title>
      <StyledButton to={props.simulateur.url}>Découvrir</StyledButton>
    </Wrapper>
  )
}
