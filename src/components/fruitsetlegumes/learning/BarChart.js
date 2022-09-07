import React, { useRef } from 'react'
import styled from 'styled-components'

import useOnScreen from 'hooks/useOnScreen'

const Wrapper = styled.div`
  position: relative;
  max-width: 35em;
  margin: 2em auto;
`
const Product = styled.div`
  display: flex;
`
const Label = styled.div`
  display: flex;
  align-items: center;
  width: 3rem;
  padding-bottom: 0.3em;
  font-size: 2em;
  line-height: 1;
  border-right: 1px solid ${(props) => props.theme.colors.main};
`
const Bars = styled.div`
  flex: 1;
  padding: 0.5em 0;
`
const Bar = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: ${(props) => props.length}%;
  height: 1.5em;
  margin-bottom: 0.5em;
  padding-right: 1em;
  font-weight: 700;
  font-style: italic;
  line-height: 1;
  color: ${(props) => props.theme.colors.second};
  background-color: ${(props) =>
    props.theme.colors[props.secondary ? 'main' : 'error']};
  transform: scaleX(${(props) => (props.isOnScreen ? 1 : 0)});
  transform-origin: left;
  transition: transform 400ms ease-in-out
    ${(props) => props.index * 200 + 1000}ms;
`
const Axis = styled.div`
  position: relative;
  margin-left: 3em;
  padding-top: 1.5em;
  border-top: 1px solid ${(props) => props.theme.colors.main};
`

const Mark = styled.div`
  position: absolute;
  top: 0;
  left: ${(props) => props.position}%;
  transform: translateX(-50%);
  font-size: 0.875em;
  line-height: 1.8;

  &:before {
    content: '';
    position: absolute;
    top: calc(-0.25em - 1px);
    left: 50%;
    transform: translateX(-50%);
    width: 1px;
    height: calc(0.5em + 1px);
    background-color: ${(props) => props.theme.colors.main};
  }
`
const Unit = styled.div`
  text-align: center;
`
const Caption = styled.div`
  position: absolute;
  top: 0;
  right: 0;
`
const Item = styled.div`
  position: relative;
  padding-right: 1.5em;
  font-weight: 700;
  font-style: italic;
  text-align: right;

  &:before {
    content: '';
    position: absolute;
    top: 0.2em;
    right: 0;
    width: 1em;
    height: 1em;
    background-color: ${(props) =>
      props.theme.colors[props.secondary ? 'main' : 'error']};
  }
`
export default function BarChart() {
  const ref = useRef()
  const isOnScreen = useOnScreen(ref, '-100px')
  return (
    <Wrapper ref={ref}>
      <Caption>
        <Item secondary>En saison</Item>
        <Item>Hors saison</Item>
      </Caption>
      <Product>
        <Label>🍓</Label>
        <Bars>
          <Bar
            index={0}
            length={(0.47 / 2) * 100}
            secondary
            isOnScreen={isOnScreen}
          >
            0.47
          </Bar>
          <Bar index={1} length={(0.67 / 2) * 100} isOnScreen={isOnScreen}>
            0.67
          </Bar>
        </Bars>
      </Product>
      <Product>
        <Label>🍅</Label>
        <Bars>
          <Bar
            index={2}
            length={(0.51 / 2) * 100}
            secondary
            isOnScreen={isOnScreen}
          >
            0.51
          </Bar>
          <Bar index={3} length={(1.88 / 2) * 100} isOnScreen={isOnScreen}>
            1.88
          </Bar>
        </Bars>
      </Product>
      <Axis>
        <Mark position={0}>0</Mark>
        <Mark position={(0.5 / 2) * 100}>0.5</Mark>
        <Mark position={(1 / 2) * 100}>1</Mark>
        <Mark position={(1.5 / 2) * 100}>1.5</Mark>
        <Mark position={(2 / 2) * 100}>2</Mark>
        <Unit>
          kgCO<sub>2</sub>eq/kg de produit
        </Unit>
      </Axis>
    </Wrapper>
  )
}
