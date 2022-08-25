import React, { useContext } from 'react'
import styled from 'styled-components'

import TransportContext from 'components/transport/TransportProvider'
import ModalContext from 'components/providers/ModalProvider'
import Section from 'components/base/Section'
import Checkbox from 'components/base/Checkbox'
import ModeSelector from './search/ModeSelector'
import Distance from './search/Distance'
import Itinerary from './search/Itinerary'
import Teletravail from './search/Teletravail'

const Wrapper = styled.div``
const Content = styled.div`
  position: relative;
  margin-bottom: 0.5rem;
  padding: 1.5rem 2rem;
  background-color: ${(props) => props.theme.colors.second};
  border-radius: 1rem;

  ${(props) => props.theme.mq.small} {
    padding: 1rem;
  }
`
const Text = styled.p`
  max-width: 26rem;
  margin: 0 auto 1rem;
  text-align: center;

  ${(props) => props.theme.mq.small} {
    font-size: 0.875rem;
  }
`
const Color = styled.button`
  padding: 0;
  color: ${(props) => props.theme.colors.main};
  background: transparent;
  border: none;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`
const BottomWrapper = styled.div`
  display: flex;
  justify-content: space-between;

  ${(props) => props.theme.mq.small} {
    flex-direction: column-reverse;
  }
`
const Legend = styled.div`
  position: relative;
  margin: 0.25rem 0.5rem;
  padding-left: 1.375rem;
  font-size: 0.875rem;

  ${(props) => props.theme.mq.small} {
    margin: 0.25rem 0 0.5rem;
  }

  &:before {
    position: absolute;
    top: 0;
    left: 0;
    content: '';
    width: 1.125rem;
    height: 1.125rem;
    background: linear-gradient(
      45deg,
      ${(props) => props.theme.colors.second} 12.5%,
      ${(props) => props.theme.colors.secondest} 12.5%,
      ${(props) => props.theme.colors.secondest} 37.5%,
      ${(props) => props.theme.colors.second} 37.5%,
      ${(props) => props.theme.colors.second} 62.5%,
      ${(props) => props.theme.colors.secondest} 62.5%,
      ${(props) => props.theme.colors.secondest} 87.5%,
      ${(props) => props.theme.colors.second} 87.5%
    );
    background-size: 1rem 1rem;
    background-position: 0 0;
    border-radius: 0.25rem;
  }
`
const Checkboxes = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`
const StyledCheckbox = styled(Checkbox)`
  margin-bottom: 0.375rem;
  font-size: 0.875rem;

  &:last-child {
    margin-bottom: 0;
  }

  ${(props) => props.theme.mq.small} {
    font-size: 0.75rem;
  }
`
export default function Search(props) {
  const { setOccupancy } = useContext(ModalContext)

  return (
    <Section>
      <Section.Content>
        <ModeSelector
          distance={props.distance}
          itineraire={props.itineraire}
          teletravail={props.teletravail}
          iframe={props.iframe}
        />
        <Content>
          {props.itineraire && (
            <>
              <Text>
                Découvrez la quantité de CO2e que vous émettez{' '}
                <Color onClick={() => setOccupancy(true)}>(par personne)</Color>{' '}
                pour ce trajet
              </Text>
              <Itinerary />
            </>
          )}
          {props.teletravail && (
            <>
              <Text>
                Découvrez la quantité de CO2e que vous économisez (à
                l&apos;année) en travaillant de chez vous
              </Text>
              <Teletravail />
            </>
          )}
          {props.distance && (
            <>
              <Text>
                Découvrez la quantité de CO2e que vous émettez{' '}
                <Color onClick={() => setOccupancy(true)}>(par personne)</Color>{' '}
                pour cette distance
              </Text>
              <Distance />
            </>
          )}
        </Content>
      </Section.Content>
    </Section>
  )
}
