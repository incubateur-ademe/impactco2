import React, { useContext } from 'react'
import styled from 'styled-components'

import UXContext from 'utils/UXContext'
import ModalContext from 'utils/ModalContext'

const Wrapper = styled.div`
  margin-bottom: 3em;
  padding-top: 2rem;
`
const Title = styled.h1`
  margin-bottom: 0;
  font-size: 5.1em;
  font-weight: 900;
  line-height: 1.2;

  ${(props) => props.theme.mq.small} {
    font-size: 10.7vw;
  }
`
const Big = styled.span`
  font-size: 4rem;

  ${(props) => props.theme.mq.small} {
    font-size: 8.4vw;
  }
`
const Subtitle = styled.div`
  max-width: 30em;
  line-height: 1.5;
`
const Why = styled.div`
  text-align: right;
  margin: 0 1.5em 1em 0;

  a {
    color: ${(props) => props.theme.colors.text};
  }
`
const CO2E = styled.span`
  font-weight: 700;
  color: ${(props) => props.theme.colors.main};
  cursor: pointer;
`
export default function Header(props) {
  const { displayTitle } = useContext(UXContext)
  const { setCO2E } = useContext(ModalContext)
  return (
    <Wrapper>
      {displayTitle && (
        <>
          <Title>
            2 tonnes de CO<sub>2</sub>
            <br />
            <Big>ça représente quoi ?</Big>
          </Title>
          <Why>
            <a
              href={
                props.iframe
                  ? 'https://monconvertisseurco2.fr#informations'
                  : '#informations'
              }
              target={props.iframe ? '_blank' : '_self'}
              rel='noopener noreferrer'
            >
              Et pourquoi s'y tenir ?
            </a>
          </Why>
          <Subtitle>
            Voici quelques équivalents pour se figurer ce qu’un poids en{' '}
            <CO2E onClick={() => setCO2E(true)}>
              CO
              <sub>2</sub>e
            </CO2E>{' '}
            représente en objet ou activité du quotidien...
          </Subtitle>
        </>
      )}
    </Wrapper>
  )
}
