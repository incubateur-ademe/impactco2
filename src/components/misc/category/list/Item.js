import React from 'react'
import styled from 'styled-components'

import { formatNumber } from 'utils/formatters'
import Emoji from 'components/base/Emoji'
import MagicLink from 'components/base/MagicLink'

import Chart from './item/Chart'

const Wrapper = styled(MagicLink)`
  position: relative;
  width: calc(33.3333% - 1rem);
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.second};
  border-radius: 1rem;
  text-decoration: none;
  color: ${(props) => props.theme.colors.text};
  transition: background-color 200ms ease-out;

  ${(props) => props.theme.mq.small} {
    width: calc(50% - 0.375rem);
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.mainLight};
  }
`
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  color: ${(props) => props.theme.colors.main};
`
const Title = styled.div`
  font-weight: bold;
`
const Value = styled.div`
  margin-bottom: 0.125rem;
`
const Unit = styled.span`
  font-size: 0.75em;
`
export default function Item(props) {
  return (
    <Wrapper key={props.item.id} to={props.item.to}>
      <Header>
        <Title>{props.item.title}</Title>
        <Emoji>{props.item.emoji}</Emoji>
      </Header>
      <Value>
        {formatNumber(props.item.value)}
        <Unit>
          {' '}
          kg CO<sub>2</sub>e / kg
        </Unit>
      </Value>
      <Chart item={props.item} />
    </Wrapper>
  )
}
