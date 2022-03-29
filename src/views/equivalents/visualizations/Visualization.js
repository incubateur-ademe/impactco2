import React from 'react'
import styled from 'styled-components'

import { formatNumber, formatName } from 'utils/formatters'
import Emoji from 'components/base/Emoji'

const Wrapper = styled.div`
  margin-bottom: 1.5rem;
`
const Title = styled.h3`
  margin-bottom: 0.25rem;
  color: ${(props) => props.theme.colors.text};
`
const Emojis = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -0.125rem;
`
const StyledEmoji = styled(Emoji)`
  margin: 0 0.125rem 0.25rem;
  font-size: 1.5rem;
`
export default function Visualization(props) {
  return props.weight ? (
    <Wrapper>
      <Title>
        {formatNumber(props.weight / props.equivalent.total)}{' '}
        {formatName(
          props.equivalent.name.fr,
          props.weight / props.equivalent.total
        )}
      </Title>
      <Emojis>
        {Array.from(
          Array(Math.floor(props.weight / props.equivalent.total))
        ).map((emoji) => (
          <StyledEmoji>{props.equivalent.emoji}</StyledEmoji>
        ))}
      </Emojis>
    </Wrapper>
  ) : null
}
