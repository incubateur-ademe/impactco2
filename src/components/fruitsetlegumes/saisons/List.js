import React from 'react'
import styled from 'styled-components'

import { getMonth } from 'utils/months'
import { formatNumber } from 'utils/formatters'
import Emoji from 'components/base/Emoji'
import MagicLink from 'components/base/MagicLink'

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  ${(props) => props.theme.mq.small} {
    gap: 0.75rem;
  }
`
const Item = styled(MagicLink)`
  position: relative;
  width: calc(33.3333% - 1rem);
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.second};
  border-radius: 1rem;
  text-decoration: none;
  color: ${(props) => props.theme.colors.text};
  transition: background-color 200ms ease-out;

  ${(props) => props.theme.mq.medium} {
    width: calc(33.3333% - 0.5rem);
  }
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
const Season = styled.div`
  margin-bottom: 1rem;
  font-size: 0.875rem;
  text-align: center;
`
const Value = styled.div`
  margin-bottom: 0.125rem;
`
const Unit = styled.span`
  font-size: 0.75em;
`
const Line = styled.div`
  position: relative;
  width: 100%;
  height: 0.25rem;
  background-color: ${(props) => props.theme.colors.mainLight};
  border-radius: 0.125rem;
  overflow: hidden;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    transform: scaleX(${(props) => props.percent});
    transform-origin: left;
    background-color: ${(props) =>
      props.theme.colors[
        props.percent > 0.5 ? 'error' : props.percent > 0.3 ? 'warning' : 'main'
      ]};
  }
`
export default function List(props) {
  return (
    <Wrapper>
      {props.items.map((item) => (
        <Item key={item.id} to={item.to}>
          <Header>
            <Title>{item.title}</Title>
            <Emoji>{item.emoji}</Emoji>
          </Header>
          <Season>
            De {getMonth(item.months[0]).long} à{' '}
            {getMonth(item.months[item.months.length - 1]).long}
          </Season>
          {item.season ? (
            <Value>
              {formatNumber(item.value)}
              <Unit>
                {' '}
                kg CO<sub>2</sub>e / kg
              </Unit>
            </Value>
          ) : (
            <Value>Pas la saison</Value>
          )}
          <Line percent={item.season ? item.value / 15 : 15} />
        </Item>
      ))}
    </Wrapper>
  )
}
