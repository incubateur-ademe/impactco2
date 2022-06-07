import React from 'react'
import styled from 'styled-components'

import Emoji from 'components/base/Emoji'
import Button from 'components/base/Button'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: calc(${(props) => (props.column === 2 ? 50 : 33.3333)}% - 1rem);
  padding-bottom: 1rem;
  background-color: ${(props) => props.theme.colors.second};
  border: 0.0625rem solid ${(props) => props.theme.colors.second};
  border-radius: 1rem;
  overflow: hidden;

  ${(props) => props.theme.mq.medium} {
    width: calc(${(props) => (props.column === 2 ? 50 : 33.3333)}% - 0.5rem);
  }
  ${(props) => props.theme.mq.small} {
    width: calc(${(props) => (props.column === 2 ? 50 : 100)}% - 0.5rem);
  }
`
const Top = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`
const StyledEmoji = styled(Emoji)`
  margin: 1.25rem 0 1rem;
  font-size: 2rem;
  text-align: center;

  ${(props) => props.theme.mq.small} {
    font-size: 1.5rem;
  }
`
const Image = styled.img`
  display: block;
  width: 100%;
  height: auto;
  margin-bottom: 0.875rem;
`
const Title = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.5rem 0.625rem;
  font-size: ${(props) => (props.small ? 1 : 1.125)}rem;
  font-weight: bold;
  text-align: center;
  color: ${(props) => props.theme.colors.text};

  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
  }
`
const Text = styled.p`
  margin: 0 0.5rem 0.625rem;
  font-size: 0.875rem;
  text-align: center;
`
const StyledButton = styled(Button)`
  padding: 0.375rem 1rem;
  font-size: 0.875rem;

  ${(props) => props.theme.mq.small} {
    font-size: 0.75rem;
  }
`
export default function SimpleTile(props) {
  return (
    <Wrapper column={props.column}>
      <Top>
        {props.item.emoji && <StyledEmoji>{props.item.emoji}</StyledEmoji>}
        {props.item.img && (
          <Image src={props.item.img} alt={props.item.title} />
        )}
        <Title small={props.small}>{props.item.title}</Title>
        {props.item.text && <Text>{props.item.text}</Text>}
      </Top>
      <StyledButton to={props.item.url}>
        {props.item.button || 'Découvrir'}
      </StyledButton>
    </Wrapper>
  )
}

SimpleTile.Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;

  ${(props) => props.theme.mq.medium} {
    gap: 0.75rem;
  }
`
