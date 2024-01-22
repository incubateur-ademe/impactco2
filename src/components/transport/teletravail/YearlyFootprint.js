import React from 'react'
import styled from 'styled-components'
import { MEDIA } from 'utils/styles'

const Wrapper = styled.div`
  margin-bottom: 2.5rem;
`
const Bar = styled.div`
  background-color: var(--primary-10);
  border-radius: 3.5rem;
  height: 7rem;
  margin-bottom: 0.5rem;
  position: relative;
`
const Emitted = styled.div`
  align-items: flex-start;
  background-color: var(--primary-50);
  border-radius: 3.5rem;
  color: var(--neutral-00);
  display: flex;
  height: 100%;
  justify-content: center;
  left: 0;
  position: absolute;
  top: 0;
  width: ${(props) => props.$percent}%;

  ${MEDIA.LT.SMALL} {
    max-width: ${(props) => (props.$percent !== 100 ? 'calc(100% - 5rem)' : 'auto')};
    min-width: ${(props) => (props.$percent ? '5rem' : 'auto')};
  }
`
const Saved = styled(Emitted)`
  background-color: transparent;
  color: var(--primary-50);
  left: auto;
  right: 0;
  transform-origin: right;
`
const Content = styled.p`
  line-height: 1.4rem;
  margin: 0;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
  padding-top: 2rem;
  text-align: center;

  ${MEDIA.LT.SMALL} {
    font-size: 0.875rem;
  }
`
const Small = styled.span`
  font-size: 0.875rem;
  font-weight: 300;
  opacity: ${(props) => (props.$visible ? 1 : 0)};
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
  const numerator = props.emitted + props.saved
  return (
    <Wrapper>
      <Bar>
        <Emitted $percent={numerator ? (props.emitted / numerator) * 100 : 0}>
          <Content $visible={props.emitted}>
            <Number>{props.emitted}</Number> kgCO<sub>2</sub>e
            <br />
            émis
            <br />
            <Small $visible={numerator ? (props.emitted / numerator) * 100 : 0 >= 25}>
              sur {props.presentiel} jour{props.presentiel > 1 && 's'}
            </Small>
          </Content>
        </Emitted>
        <br />
        <Saved $percent={numerator ? (props.saved / numerator) * 100 : 0} data-testid='saved'>
          <Content $visible={props.saved}>
            <Number>{props.saved}</Number> kgCO<sub>2</sub>e
            <br />
            évité{props.saved > 1 && 's'}
            <br />
            <Small $visible={(numerator ? (props.saved / numerator) * 100 : 0) >= 25}>
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
