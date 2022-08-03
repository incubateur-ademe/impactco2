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
export default function EmojiComponent(props) {
  return props.emoji ? (
    <Wrapper>
      <Emoji>{props.emoji}</Emoji>
    </Wrapper>
  ) : null
}
