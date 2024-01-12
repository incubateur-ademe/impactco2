import React from 'react'
import styled from 'styled-components'
import formatNumber from 'utils/formatNumber'
import { MEDIA } from 'utils/styles'
import Emoji from 'components/base/Emoji'
import Link from 'components/base/buttons/Link'
import Chart from './item/Chart'

const Wrapper = styled(Link)`
  background-color: var(--secondary-10);
  border-radius: 1rem;
  color: var(--neutral-70);
  padding: 1rem;
  position: relative;
  text-decoration: none;
  width: calc(33.3333% - 1rem);

  ${MEDIA.LT.SMALL} {
    width: calc(50% - 0.375rem);
  }

  &:hover {
    background-color: var(--primary-10);
  }
`
const Header = styled.div`
  color: var(--primary-50);
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
`
const Title = styled.div`
  font-weight: bold;
`
const Value = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`
const Unit = styled.span`
  font-size: 0.5em;
  font-weight: 300;
`
export default function Item(props) {
  return (
    <Wrapper key={props.item.id} href={props.item.to}>
      <Header>
        <Title>{props.item.title}</Title>
        <Emoji>{props.item.emoji}</Emoji>
      </Header>
      <Value>
        {formatNumber(props.item.value * 1000)}
        <Unit>
          {' '}
          g CO<sub>2</sub>e / {props.item.unit}
        </Unit>
      </Value>
      <Chart item={props.item} max={props.max} />
    </Wrapper>
  )
}
