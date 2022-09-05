import React from 'react'
import styled from 'styled-components'

import Emoji from 'components/base/Emoji'

const Wrapper = styled.div`
  position: relative;
  width: 2rem;
  margin-right: 1rem;
  font-size: 2rem;
  line-height: 0.7;

  ${(props) => props.theme.mq.small} {
    margin-right: 0.75rem;
  }
`
const Second = styled.span`
  position: absolute;
  bottom: 0;
  right: 0;
  transform: translate(30%, 50%);
  font-size: 0.75em;
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
