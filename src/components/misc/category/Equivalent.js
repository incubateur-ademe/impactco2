import React, { useContext } from 'react'
import styled from 'styled-components'

import DataContext from 'utils/DataContext'
import ModalContext from 'utils/ModalContext'
import Emoji from 'components/base/Emoji'
import MagicLink from 'components/base/MagicLink'

const Wrapper = styled(MagicLink)`
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 0.875rem 0.875rem 1rem;
  text-decoration: none;
  background-color: ${(props) =>
    props.current ? props.theme.colors.secondLight : 'transparent'};
  border-radius: 1rem;
  transition: background-color 200ms ease-out;

  &:hover {
    background-color: ${(props) => props.theme.colors.mainLight};
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
  font-size: 0.875rem;
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
const EmojiWrapper = styled.div`
  position: relative;
  width: 2rem;
  margin-right: 1rem;
  font-size: 2rem;
  line-height: 0.7;

  ${(props) => props.theme.mq.small} {
    margin-right: 0.75rem;
  }
`
const Bar = styled.div`
  position: relative;
  width: ${(props) => props.percent * 100}%;
  height: 1.75rem;
  transform-origin: left;
  background-color: ${(props) => props.theme.colors.main};
  border-radius: 1rem;
`

const Value = styled.div`
  position: absolute;
  top: 50%;
  left: ${(props) => (props.inside ? 'auto' : '100%')};
  right: ${(props) => (props.inside ? '1rem' : 'auto')};
  color: ${(props) => props.theme.colors[props.inside ? 'background' : 'main']};
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
  const { categories } = useContext(DataContext)

  const { setCO2E } = useContext(ModalContext)

  return (
    <Wrapper
      to={`/categories/${
        categories.find((category) => category.id === props.equivalent.category)
          .slug
      }/${props.equivalent.slug}`}
      current={props.current}
    >
      <EmojiWrapper>
        <Emoji>{props.equivalent.emoji}</Emoji>
      </EmojiWrapper>
      <ChartWrapper>
        <TitleWrapper>
          <Title>
            {props.category.multiplier}{' '}
            <span>
              {props.equivalent.name.fr.replaceAll(
                '[s]',
                props.category.multiplier === 1 ? '' : 's'
              )}
            </span>
          </Title>
        </TitleWrapper>
        <Chart>
          <Bar percent={props.equivalent.total / props.max}>
            <Value
              noBar={props.equivalent.total / props.max === 0}
              inside={props.equivalent.total / props.max > 0.7}
            >
              <Number>
                {Math.round(
                  (props.equivalent.total * props.category.multiplier).toFixed(
                    2
                  ) * 100
                ) / 100}
              </Number>
              <Unit onClick={() => setCO2E(true)}>
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
