import React, { useState, useContext } from 'react'
import styled from 'styled-components'

import { formatPercent } from 'utils/formatters'
import DataContext from 'utils/DataContext'
import Graph from './ecv/Graph'

const Wrapper = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem 1rem 0.5rem;
  background-color: ${(props) => props.theme.colors.background};
  border-radius: 1rem;
`
const List = styled.ul`
  column-count: 2;
  list-style: none;
  margin: 0 -0.5rem;
  padding: 0;

  ${(props) => props.theme.mq.small} {
    column-count: 1;
  }
`
const Item = styled.li`
  position: relative;
  padding: 0.5rem 0.5rem 0.5rem 2rem;
  font-size: 0.75rem;
  background: ${(props) =>
    props.hover ? props.theme.colors.mainLight : 'transparent'};
  border-radius: 0.25rem;
  cursor: pointer;

  &:hover {
    color: ${(props) => props.theme.colors.main};
  }

  &:before {
    content: '';
    position: absolute;
    top: 0.5rem;
    left: 0.5rem;
    width: 1rem;
    height: 1rem;
    background-color: ${(props) => props.color};
    border-radius: 0.25rem;
  }
`

const Percent = styled.span`
  font-weight: 300;
`
export default function Ecv(props) {
  const { ecv } = useContext(DataContext)

  const [hover, setHover] = useState(null)
  return props.equivalent.ecv ? (
    <Wrapper>
      <Graph equivalent={props.equivalent} ecv={ecv} setHover={setHover} />
      <List>
        {props.equivalent.ecv.map((item) => (
          <Item
            key={item.id}
            color={ecv.find((step) => step.id === item.id)?.color}
            hover={hover === item.id}
          >
            {ecv.find((step) => step.id === item.id)?.name.fr} :{' '}
            <Percent>
              {formatPercent(item.value, props.equivalent.total)} %
            </Percent>
          </Item>
        ))}
      </List>
    </Wrapper>
  ) : null
}
