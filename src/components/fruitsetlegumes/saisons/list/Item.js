import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import formatNumber from 'utils/formatNumber'
import { getMonthLabel } from 'utils/months'
import { MEDIA } from 'utils/styles'
import Emoji from 'components/base/Emoji'
import Link from 'components/base/buttons/Link'
import Chart from './item/Chart'

const Wrapper = styled(Link)`
  background-color: ${(props) => (props.$season ? 'var(--secondary-10)' : 'var(--critical-10)')};
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
  color: var(--primary-60);
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
    <Wrapper
      key={props.item.id}
      href={props.item.to}
      $season={props.item.season}
      onClick={props.item.onClick}
      data-testid={`tile-${props.item.title}`}>
      <Header>
        <Title>{props.item.title}</Title>
        <Emoji>{props.item.emoji}</Emoji>
      </Header>
      <Season>
        De {getMonthLabel(interval[0])} à {getMonthLabel(interval[1] || 11)}
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
