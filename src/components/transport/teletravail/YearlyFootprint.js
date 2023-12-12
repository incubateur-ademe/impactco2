import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-bottom: 2.5rem;
`
const Bar = styled.div`
  background-color: ${(props) => props.theme.colors.mainLight};
  border-radius: 3.5rem;
  height: 7rem;
  margin-bottom: 0.5rem;
  position: relative;
`
const Emitted = styled.div`
  align-items: flex-start;
  background-color: ${(props) => props.theme.colors.main};
  border-radius: 3.5rem;
  color: ${(props) => props.theme.colors.background};
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: ${(props) => props.percent}%;

  ${(props) => props.theme.mq.small} {
    max-width: ${(props) => (props.percent !== 100 ? 'calc(100% - 5rem)' : 'auto')};
    min-width: ${(props) => (props.percent ? '5rem' : 'auto')};
  }
`
const Saved = styled(Emitted)`
  background-color: transparent;
  color: ${(props) => props.theme.colors.main};
  left: auto;
  right: 0;
  transform-origin: right;
`
const Content = styled.p`
  line-height: 1.4rem;
  margin: 0;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  padding-top: 2rem;
  text-align: center;

  ${(props) => props.theme.mq.small} {
    font-size: 0.875rem;
  }
`
const Small = styled.span`
  font-size: 0.875rem;
  font-weight: 300;
  opacity: ${(props) => (props.visible ? 1 : 0)};
`
const Number = styled.span`
  font-size: 2em;
  font-weight: bold;
`
const Disclaimer = styled.p`
  font-size: 0.875rem;
  font-weight: 300;
  text-align: center;
`
export default function YearlyFootprint(props) {
  return (
    <Wrapper>
      <Bar>
        <Emitted percent={(props.emitted / (props.emitted + props.saved)) * 100}>
          <Content visible={props.emitted} small={(props.emitted / (props.emitted + props.saved)) * 100 < 25}>
            <Number>{props.emitted}</Number> kgCO<sub>2</sub>e
            <br />
            émis
            <br />
            <Small visible={(props.emitted / (props.emitted + props.saved)) * 100 >= 25}>
              sur {props.presentiel} jour{props.presentiel > 1 && 's'}
            </Small>
          </Content>
        </Emitted>
        <br />
        <Saved percent={(props.saved / (props.emitted + props.saved)) * 100} data-testid='saved'>
          <Content visible={props.saved} small={(props.saved / (props.emitted + props.saved)) * 100 < 25}>
            <Number>{props.saved}</Number> kgCO<sub>2</sub>e
            <br />
            évité{props.saved > 1 && 's'}
            <br />
            <Small visible={(props.saved / (props.emitted + props.saved)) * 100 >= 25}>
              {' '}
              sur {props.teletravail} jour{props.teletravail > 1 && 's'}
            </Small>
          </Content>
        </Saved>
      </Bar>
      <Disclaimer>
        <strong>à l&apos;année</strong> sur mes déplacements.
        <br />
        (d&apos;autres émissions ont peut-être augmenté)
      </Disclaimer>
    </Wrapper>
  )
}
