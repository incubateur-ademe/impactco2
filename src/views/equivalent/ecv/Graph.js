import React from 'react'
import styled from 'styled-components'

import { formatPercent, formatNumberFixed } from 'utils/formatters'

const Wrapper = styled.li`
  position: relative;
  display: flex;
  align-items: center;

  &:last-child {
    margin-bottom: 1.5rem;
  }
`
const Title = styled.div`
  width: 9rem;
  margin-right: 0.75rem;
  padding: 0.75rem 0;
  font-size: 0.875rem;
  text-align: right;
  line-height: 1.2;
`
const Chart = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  padding: 0.75rem 0;
  border-left: 0.0675rem solid ${(props) => props.theme.colors.text};
`
const Sizer = styled.div`
  width: 9rem;
`
const Bar = styled.div`
  position: relative;
  width: ${(props) => props.percent * 100}%;
  height: 2.5rem;
  background-color: ${(props) => props.color};
  border-radius: 0 1rem 1rem 0;
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
const Percent = styled.span`
  margin-right: 0.25rem;
  font-size: 1.25rem;
  font-weight: bold;
  white-space: nowrap;

  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
  }
`
const Absolute = styled.span`
  cursor: pointer;
  font-size: 0.75rem;
  font-weight: 300;
  white-space: nowrap;

  span {
    font-weight: normal;
  }
`
export default function Graph(props) {
  return (
    <Wrapper {...props} color={props.item.color}>
      <Title dangerouslySetInnerHTML={{ __html: props.item.name.fr }} />
      <Chart>
        <Bar
          color={props.item.color}
          percent={formatPercent(props.item.value, props.total, true) / 100}
        >
          <Value
            noBar={formatPercent(props.item.value, props.total, true) === 0}
          >
            <Percent>{formatPercent(props.item.value, props.total)} %</Percent>
            <Absolute>
              (<span>{formatNumberFixed(props.item.value)}</span> kgCO
              <sub>2</sub>e)
            </Absolute>
          </Value>
        </Bar>
      </Chart>
      <Sizer />
    </Wrapper>
  )
}
