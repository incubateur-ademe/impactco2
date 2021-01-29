import React, { useContext, useRef } from 'react'
import styled from 'styled-components'

import useOnScreen from 'hooks/useOnScreen'
import ModalContext from 'utils/ModalContext'

import ButtonLink from '@bit/datagir.simulateurs.button-link'

const Wrapper = styled.div`
  position: relative;
  max-width: 45em;
  margin: 0 auto 1em;

  ${(props) => props.theme.mq.small} {
    margin: 0 3vw 1em;
  }
`
const Content = styled.div`
  position: relative;
`
const Statistic = styled.div`
  display: flex;
  margin-bottom: 1em;
`
const Number = styled.div`
  font-size: 16em;
  font-weight: 900;
  letter-spacing: -0.08em;
  line-height: 0.85;
  opacity: ${(props) => (props.isOnScreen ? 1 : 0)};
  transition: opacity 1000ms;

  ${(props) => props.theme.mq.small} {
    font-size: 30vw;
    letter-spacing: 0;
  }
`
const BigText = styled.div`
  font-weight: 900;
  line-height: 1.14;
  text-transform: uppercase;

  ${(props) => props.theme.mq.small} {
    line-height: 1.04;
  }
`
const Line = styled.div`
  font-size: ${(props) => (props.bottom ? '5.39em' : '6.7em')};
  opacity: ${(props) => (props.isOnScreen ? 1 : 0)};
  transition: opacity 1000ms ${(props) => (props.bottom ? '800ms' : '400ms')};

  ${(props) => props.theme.mq.small} {
    font-size: ${(props) => (props.bottom ? '10.7vw' : '13.5vw')};
  }
`
const Strong = styled.p`
  margin-left: 2rem;
  font-size: 1.25em;
  font-weight: 700;
  font-style: italic;

  ${(props) => props.theme.mq.small} {
    margin-left: 0;
  }
`
const Text = styled.p``
const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin: 2rem 0;
`
const CO2E = styled.span`
  font-weight: 700;
  color: ${(props) => props.theme.colors.main};
  cursor: pointer;
`
export default function Learning() {
  const { setCO2E } = useContext(ModalContext)

  const ref = useRef()
  const isOnScreen = useOnScreen(ref, '-100px')

  return (
    <Wrapper id='informations'>
      <Content>
        <Statistic ref={ref}>
          <Number isOnScreen={isOnScreen}>10</Number>
          <BigText>
            <Line isOnScreen={isOnScreen}>tonnes</Line>
            <Line isOnScreen={isOnScreen} bottom>
              à perdre
            </Line>
          </BigText>
        </Statistic>
        <Strong>
          Aujourd'hui, un français émet en moyenne 12 tonnes de CO2e par an.
          Pour atteindre l'objectif des accords de Paris, il nous faut diviser
          cet impact par 6 et arriver à 2 tonnes d'ici 2050.
        </Strong>
        <Text>
          Mais d'où vient cet impact ? Quels gestes et achats de mon quotidien
          en sont responsables ? Ce convertisseur vous aide à y voir plus clair.
          Ainsi vous pouvez comparer facilement différents gestes et voir ce qui
          compte vraiment.
        </Text>
        <Text>
          Si vous souhaitez aller plus loin dans votre démarche, vous pouvez
          calculer votre empreinte sur le climat grace à notre simulateur{' '}
          <a
            href={'https://nosgestesclimat.fr/'}
            target='_blank'
            rel='noopener noreferrer'
          >
            Nos Gestes Climat
          </a>
        </Text>
        <ButtonWrapper>
          <ButtonLink href={'https://nosgestesclimat.fr/'}>
            Je calcule mon empreinte carbone
          </ButtonLink>
        </ButtonWrapper>
        <Text>
          Les correspondances proposées dans ce convertisseur sont calculées à
          partir des facteurs d’émissions de la Base Carbone® de l’ADEME.
          <br />
          Un facteur d’émissions permet de traduire l’impact GES (
          <CO2E onClick={() => setCO2E(true)}>
            CO
            <sub>2</sub>e
          </CO2E>
          ) d’une donnée d’activité unitaire (kWh, kg, litre, etc...) : par
          exemple, l’impact GES de la production et distribution d’1 kWh
          d’électricité, de la fabrication d’un jean en coton, de la collecte et
          du traitement d’1 tonne d’ordures ménagères, etc...
        </Text>
      </Content>
    </Wrapper>
  )
}
