import React, { useContext } from 'react'
import styled from 'styled-components'

import { formatNumber } from 'utils/formatters'
import DataContext from 'utils/DataContext'
import Emoji from 'components/base/Emoji'
import Selector from './visualization/Selector'

const Wrapper = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem 2rem;
  background-color: ${(props) => props.theme.colors.secondLight};
  border-radius: 1rem;

  ${(props) => props.theme.mq.small} {
    padding: 1rem;
  }
`

const Emojis = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 -0.125rem;
`
const StyledEmoji = styled(Emoji)`
  margin: 0 0.125rem 0.25rem;
  font-size: 1.5rem;
`
export default function Visualization(props) {
  const { categories } = useContext(DataContext)
  return props.weight ? (
    <Wrapper>
      <Selector weight={props.weight} />
      <Emojis>
        {Array.from(
          Array(
            Math.ceil(
              formatNumber(
                props.weight /
                  props.equivalent.total /
                  categories.find(
                    (category) => category.id === props.equivalent.category
                  ).multiplier,
                true
              )
            )
          )
        ).map((emoji) => (
          <StyledEmoji>{props.equivalent.emoji}</StyledEmoji>
        ))}
      </Emojis>
    </Wrapper>
  ) : null
}
