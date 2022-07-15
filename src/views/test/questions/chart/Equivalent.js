import React from 'react'
import styled from 'styled-components'

import { formatNumber } from 'utils/formatters'
import Emoji from 'components/base/Emoji'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 0.875rem 0.875rem 1rem;
  text-decoration: none;
  background-color: ${(props) =>
    props.current ? props.theme.colors.second : 'transparent'};
  border-radius: 1rem;
  transition: background-color 200ms ease-out;

  ${(props) => props.theme.mq.small} {
    padding: 0.25rem 0.25rem 1rem;
  }
`
const TitleWrapper = styled.div`
  position: relative;
  z-index: 10;
  display: flex;
  margin-bottom: 0.125rem;
`
const Title = styled.div`
  position: relative;
  font-size: 1rem;
  color: ${(props) => props.theme.colors.text};

  ${(props) => props.theme.mq.small} {
    font-size: 0.75rem;
  }
`

const ChartWrapper = styled.div`
  flex: 1;
`
const Chart = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`
const Bar = styled.div`
  position: relative;
  width: ${(props) => props.percent * 100}%;
  height: 1.75rem;
  transform-origin: left;
  background-color: ${(props) => props.color || props.theme.colors.main};
  border-radius: 1rem;
  transition: width 300ms ease-in-out;
`

const Value = styled.div`
  position: absolute;
  top: 50%;
  left: ${(props) => (props.inside ? 'auto' : '100%')};
  right: ${(props) => (props.inside ? '1rem' : 'auto')};
  color: ${(props) =>
    props.inside
      ? props.theme.colors.background
      : props.color || props.theme.colors.main};
  transform: translateY(-50%);
  display: flex;
  align-items: baseline;
  padding-left: ${(props) => (props.noBar ? 0 : 0.5)}rem;
  line-height: 0.7;
  transition: color 200ms ease-out;
`
const Number = styled.span`
  margin-right: 0.6rem;
  font-size: 1.25rem;
  font-weight: 700;

  ${(props) => props.theme.mq.small} {
    font-size: 1rem;
  }
`
const Unit = styled.span`
  cursor: pointer;
  font-size: 0.875rem;
  white-space: nowrap;
`

export default function Equivalent(props) {
  return (
    <Wrapper {...props}>
      <ChartWrapper>
        <TitleWrapper>
          <Title>
            <Emoji>{props.equivalent.emoji}</Emoji> {props.equivalent.title}
          </Title>
        </TitleWrapper>
        <Chart>
          <Bar
            percent={props.equivalent.total / props.max}
            color={props.equivalent.color}
          >
            <Value
              noBar={props.equivalent.total / props.max === 0}
              inside={props.equivalent.total / props.max > 0.7}
              color={props.equivalent.color}
            >
              <Number>{formatNumber(props.equivalent.total.toFixed(2))}</Number>
              <Unit>
                {' '}
                kg CO
                <sub>2</sub>e
              </Unit>
            </Value>
          </Bar>
        </Chart>
      </ChartWrapper>
    </Wrapper>
  )
}
