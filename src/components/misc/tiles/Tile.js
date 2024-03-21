import React from 'react'
import styled from 'styled-components'
import formatName from 'utils/formatName'
import formatNumber from 'utils/formatNumber'
import { MEDIA } from 'utils/styles'
import Emoji from 'components/base/Emoji'

const Wrapper = styled.div`
  align-items: center;
  background-color: var(--secondary-10);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  padding: 1.125rem 0.25rem;
  position: relative;
  width: calc(33.3333% - 1rem);

  ${MEDIA.LT.MEDIUM} {
    width: calc(33.3333% - 0.5rem);
  }
  ${MEDIA.LT.SMALL} {
    width: calc(50% - 0.375rem);
  }
`

const EmojiWrapper = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;

  img,
  span {
    display: block;
  }
`
const Title = styled.p`
  color: var(--neutral-70);
  font-size: 0.875rem;
  font-weight: normal;
  line-height: 1.2;
  margin-bottom: 0.25rem;
  text-align: center;
`
const Number = styled.span`
  display: block;
  font-size: 2rem;
  font-weight: bold;

  ${MEDIA.LT.SMALL} {
    font-size: 1.75rem;
  }
`
const Name = styled.span`
  align-items: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 2.125rem;
`

export default function Tile(props) {
  return (
    <Wrapper>
      <EmojiWrapper>
        <Emoji>{props.equivalent.emoji}</Emoji>
      </EmojiWrapper>
      <Title>
        <Number data-testid={`tile-${props.equivalent.slug}-value`}>
          {formatNumber(props.weight / props.equivalent.value)}
        </Number>
        <Name>
          {formatName(
            (props.equivalent.prefix || '') + props.equivalent.name + (props.equivalent.suffix || ''),
            props.weight / props.equivalent.value
          )}
        </Name>
      </Title>
    </Wrapper>
  )
}
