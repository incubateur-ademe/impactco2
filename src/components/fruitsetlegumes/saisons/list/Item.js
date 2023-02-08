import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { getMonth } from 'utils/months'
import { formatNumber } from 'utils/formatters'
import Emoji from 'components/base/Emoji'
import MagicLink from 'components/base/MagicLink'

import Chart from './item/Chart'

const Wrapper = styled(MagicLink)`
  background-color: ${(props) =>
    props.theme.colors[props.season ? 'second' : 'errorLight']};
  border-radius: 1rem;
  color: ${(props) => props.theme.colors.text};
  padding: 1rem;
  position: relative;
  text-decoration: none;
  transition: background-color 200ms ease-out;
  width: calc(33.3333% - 1rem);

  ${(props) => props.theme.mq.small} {
    width: calc(50% - 0.375rem);
  }

  &:hover {
    background-color: ${(props) => props.theme.colors.mainLight};
  }
`
const Header = styled.div`
  color: ${(props) => props.theme.colors.main};
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`
const Title = styled.div`
  font-weight: bold;
`
const Season = styled.div`
  font-size: 0.875rem;
  margin-bottom: 1rem;
  text-align: center;
`
const Value = styled.div`
  margin-bottom: 0.125rem;
`
const Unit = styled.span`
  font-size: 0.75em;
`
export default function Item(props) {
  const [interval, setInterval] = useState([])
  useEffect(() => {
    const orderedMonths = props.item.months.sort((a, b) => (a > b ? 1 : -1))
    if (orderedMonths.includes(11) && orderedMonths.includes(0)) {
      for (let i = orderedMonths.length - 1; i >= 0; i--) {
        if (orderedMonths[i] !== orderedMonths[i - 1] + 1) {
          setInterval([orderedMonths[i], orderedMonths[i - 1]])
          break
        }
      }
    } else {
      setInterval([orderedMonths[0], orderedMonths[orderedMonths.length - 1]])
    }
  }, [props.item])

  return (
    <Wrapper key={props.item.id} to={props.item.to} season={props.item.season}>
      <Header>
        <Title>{props.item.title}</Title>
        <Emoji>{props.item.emoji}</Emoji>
      </Header>
      <Season>
        De {getMonth(interval[0]).long} à {getMonth(interval[1] || 11).long}
      </Season>

      {props.item.season ? (
        <Value>
          {formatNumber(props.item.value)}
          <Unit>
            {' '}
            kg CO<sub>2</sub>e / kg
          </Unit>
        </Value>
      ) : (
        <Value>Pas la saison</Value>
      )}
      <Chart item={props.item} />
    </Wrapper>
  )
}
