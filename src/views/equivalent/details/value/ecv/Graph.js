import React, { useContext } from 'react'
import styled from 'styled-components'

import { formatPercent, formatTotal } from 'utils/formatters'
import DataContext from 'utils/DataContext'

const Wrapper = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  margin-bottom: 1rem;
`
const Title = styled.div`
  width: 8rem;
  margin-right: 0.75rem;
  font-size: 0.75rem;
  text-align: right;
  line-height: 1.2;
`
const Chart = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
`
const Bar = styled.div`
  position: relative;
  width: ${(props) => props.percent * 85}%;
  height: 2rem;
  transform-origin: left;
  background-color: ${(props) => props.color};
  border-radius: 1rem;
`

const Value = styled.div`
  position: absolute;
  top: 50%;
  left: ${(props) => (props.inside ? 'auto' : '100%')};
  right: ${(props) => (props.inside ? '1rem' : 'auto')};
  color: ${(props) => props.theme.colors[props.inside ? 'background' : 'text']};
  transform: translateY(-50%);
  display: flex;
  align-items: baseline;
  padding-left: ${(props) => (props.noBar ? 0 : 0.5)}rem;
  line-height: 0.7;
  transition: color 200ms ease-out;
`
const Number = styled.span`
  margin-right: 0.25rem;
  font-size: 1.25rem;
  font-weight: 700;

  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
  }
`
const Unit = styled.span`
  cursor: pointer;
  font-size: 0.75rem;
  white-space: nowrap;
`
export default function Graph(props) {
  const { ecv } = useContext(DataContext)

  return (
    <Wrapper
      key={props.item.id}
      color={ecv.find((step) => step.id === props.item.id)?.color}
    >
      <Title>{ecv.find((step) => step.id === props.item.id)?.name.fr}</Title>
      <Chart>
        <Bar
          color={ecv.find((step) => step.id === props.item.id)?.color}
          percent={
            formatPercent(
              props.item.value,
              formatTotal(props.equivalent),
              true
            ) / 100
          }
        >
          <Value
            noBar={
              formatPercent(
                props.item.value,
                formatTotal(props.equivalent),
                true
              ) === 0
            }
          >
            <Number>
              {formatPercent(props.item.value, formatTotal(props.equivalent))}
            </Number>
            <Unit> %</Unit>
          </Value>
        </Bar>
      </Chart>
    </Wrapper>
  )
}
