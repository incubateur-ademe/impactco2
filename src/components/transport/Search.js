import React, { useContext } from 'react'
import styled from 'styled-components'

import TransportContext from 'components/transport/TransportProvider'
import ModeSelector from './search/ModeSelector'
import Distance from './search/Distance'
import Itinerary from './search/Itinerary'
import Teletravail from './search/Teletravail'

const Wrapper = styled.div`
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
export default function Search(props) {
  const { setOccupancyModal } = useContext(TransportContext)

  return (
    <>
      <ModeSelector
        distance={props.distance}
        itineraire={props.itineraire}
        teletravail={props.teletravail}
        iframe={props.iframe}
      />
      <Wrapper>
        {props.itineraire && (
          <>
            <Text>
              Découvrez la quantité de CO2e que vous émettez{' '}
              <Color onClick={() => setOccupancyModal(true)}>
                (par personne)
              </Color>{' '}
              pour ce trajet
            </Text>
            <Itinerary />
          </>
        )}
        {props.teletravail && (
          <>
            <Text>
              Découvrez la quantité de CO2e que vous économisez (à l&apos;année)
              en travaillant de chez vous
            </Text>
            <Teletravail />
          </>
        )}
        {props.distance && (
          <>
            <Text>
              Découvrez la quantité de CO2e que vous émettez{' '}
              <Color onClick={() => setOccupancyModal(true)}>
                (par personne)
              </Color>{' '}
              pour cette distance
            </Text>
            <Distance />
          </>
        )}
      </Wrapper>
    </>
  )
}
