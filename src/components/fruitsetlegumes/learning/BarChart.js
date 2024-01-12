import React, { useRef } from 'react'
import styled from 'styled-components'
import useOnScreen from 'hooks/useOnScreen'

const Wrapper = styled.div`
  margin: 2em auto;
  max-width: 35em;
  position: relative;
`
const Product = styled.div`
  display: flex;
`
const Label = styled.div`
  align-items: center;
  border-right: 1px solid var(--primary-50);
  display: flex;
  font-size: 2em;
  line-height: 1;
  padding-bottom: 0.3em;
  width: 3rem;
`
const Bars = styled.div`
  flex: 1;
  padding: 0.5em 0;
`
const Bar = styled.div`
  align-items: center;
  background-color: ${(props) => (props.$secondary ? 'var(--primary-50)' : 'var(--critical-50)')};
  color: var(--neutral-00);
  display: flex;
  font-style: italic;
  font-weight: 700;
  height: 1.5em;
  justify-content: flex-end;
  line-height: 1;
  margin-bottom: 0.5em;
  padding-right: 1em;
  transform: scaleX(${(props) => (props.$isOnScreen ? 1 : 0)});
  transform-origin: left;
  width: ${(props) => props.$length}%;
`
const Axis = styled.div`
  border-top: 1px solid var(--primary-50);
  margin-left: 3em;
  padding-top: 1.5em;
  position: relative;
`

const Mark = styled.div`
  font-size: 0.875em;
  left: ${(props) => props.$position}%;
  line-height: 1.8;
  position: absolute;
  top: 0;
  transform: translateX(-50%);

  &:before {
    background-color: var(--primary-50);
    content: '';
    height: calc(0.5em + 1px);
    left: 50%;
    position: absolute;
    top: calc(-0.25em - 1px);
    transform: translateX(-50%);
    width: 1px;
  }
`
const Unit = styled.div`
  text-align: center;
`
const Caption = styled.div`
  position: absolute;
  right: 0;
  top: 0;
`
const Item = styled.div`
  font-style: italic;
  font-weight: 700;
  padding-right: 1.5em;
  position: relative;
  text-align: right;

  &:before {
    background-color: ${(props) => (props.$secondary ? 'var(--primary-50)' : 'var(--critical-50)')};
    content: '';
    height: 1em;
    position: absolute;
    right: 0;
    top: 0.2em;
    width: 1em;
  }
`
export default function BarChart() {
  const ref = useRef()
  const isOnScreen = useOnScreen(ref, '-100px')
  return (
    <Wrapper ref={ref}>
      <Caption>
        <Item $secondary>En saison</Item>
        <Item>Hors saison</Item>
      </Caption>
      <Product>
        <Label>🍓</Label>
        <Bars>
          <Bar $length={(0.47 / 2) * 100} $secondary $isOnScreen={isOnScreen}>
            0.47
          </Bar>
          <Bar $length={(0.67 / 2) * 100} $isOnScreen={isOnScreen}>
            0.67
          </Bar>
        </Bars>
      </Product>
      <Product>
        <Label>🍅</Label>
        <Bars>
          <Bar $length={(0.51 / 2) * 100} $secondary $isOnScreen={isOnScreen}>
            0.51
          </Bar>
          <Bar $length={(1.88 / 2) * 100} $isOnScreen={isOnScreen}>
            1.88
          </Bar>
        </Bars>
      </Product>
      <Axis>
        <Mark $position={0}>0</Mark>
        <Mark $position={(0.5 / 2) * 100}>0.5</Mark>
        <Mark $position={(1 / 2) * 100}>1</Mark>
        <Mark $position={(1.5 / 2) * 100}>1.5</Mark>
        <Mark $position={(2 / 2) * 100}>2</Mark>
        <Unit>
          kgCO<sub>2</sub>e / kg de produit
        </Unit>
      </Axis>
    </Wrapper>
  )
}
