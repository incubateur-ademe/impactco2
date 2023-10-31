import React from 'react'
import styled from 'styled-components'
import Emoji from 'components/base/Emoji'

const Wrapper = styled.div`
  font-size: 2rem;
  line-height: 0.7;
  margin-right: 1rem;
  position: relative;
  width: 2rem;

  ${(props) => props.theme.mq.small} {
    margin-right: 0.75rem;
  }
`
const Second = styled.span`
  bottom: 0;
  font-size: 0.75em;
  position: absolute;
  right: 0;
  transform: translate(30%, 50%);
`
export default function EmojiComponent(props) {
  return props.emoji ? (
    <Wrapper>
      <Emoji>{props.emoji}</Emoji>
      {props.secondEmoji && (
        <Second>
          <Emoji>{props.secondEmoji}</Emoji>
        </Second>
      )}
    </Wrapper>
  ) : null
}
