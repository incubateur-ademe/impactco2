import React from 'react'
import styled from 'styled-components'

import MagicLink from 'components/base/MagicLink'
import Emoji from './item/Emoji'
import Title from './item/Title'
import Bar from './item/Bar'

const Wrapper = styled(MagicLink)`
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 0.875rem 0.875rem 1rem;
  text-decoration: none;
  background-color: ${(props) =>
    props.current ? props.theme.colors.second : 'transparent'};
  border-radius: 1rem;
  transition: background-color 200ms ease-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.mainLight};
  }

  ${(props) => props.theme.mq.small} {
    padding: 0.25rem 0.25rem 1rem;
  }
`
const ChartWrapper = styled.div`
  flex: 1;
`
export default function Item(props) {
  return (
    <Wrapper to={props.to} onClick={props.onClick || null} {...props}>
      <Emoji emoji={props.emoji} secondEmoji={props.secondEmoji} />
      <ChartWrapper>
        <Title
          title={props.title}
          subtitle={props.subtitle}
          component={props.component}
        />
        <Bar
          value={props.value}
          usage={props.usage}
          max={props.max}
          color={props.color}
        />
      </ChartWrapper>
    </Wrapper>
  )
}
