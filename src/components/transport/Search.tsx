import React, { Dispatch, SetStateAction, useContext } from 'react'
import styled from 'styled-components'
import { track } from 'utils/matomo'
import TransportContext from 'components/transport/TransportProvider'
import Distance from './search/Distance'
import Itinerary from './search/Itinerary'
import ModeSelector from './search/ModeSelector'
import Teletravail from './search/Teletravail'

const Wrapper = styled.div`
  background-color: ${(props) => props.theme.colors.second};
  border-radius: 1rem;
  margin-bottom: 1rem;
  padding: 1.5rem 2rem;
  position: relative;

  ${(props) => props.theme.mq.small} {
    padding: 1rem;
  }
`
const Text = styled.p`
  margin: 0 auto 1rem;
  max-width: 26rem;
  text-align: center;

  ${(props) => props.theme.mq.small} {
    font-size: 0.875rem;
  }
`
const Color = styled.button`
  background: transparent;
  border: none;
  color: ${(props) => props.theme.colors.main};
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`
export default function Search({
  distance,
  itineraire,
  teletravail,
  iframe,
}: {
  distance?: boolean
  itineraire?: boolean
  teletravail?: boolean
  iframe?: boolean
}) {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore: TODO
  const { setOccupancyModal } = useContext<{ setOccupancyModal: Dispatch<SetStateAction<boolean>> }>(TransportContext)

  return (
    <>
      <ModeSelector distance={distance} itineraire={itineraire} teletravail={teletravail} iframe={iframe} />
      <Wrapper>
        {itineraire && (
          <>
            <Text>
              Découvrez la quantité de CO2e que vous émettez{' '}
              <Color
                onClick={() => {
                  track('Transport itinéraire', 'Hypothèses', 'transport_itineraire_hypotheses')
                  setOccupancyModal(true)
                }}>
                (par personne)
              </Color>{' '}
              pour ce trajet
            </Text>
            <Itinerary />
          </>
        )}
        {teletravail && (
          <>
            <Text>Découvrez la quantité de CO2e que vous économisez (à l&apos;année) en travaillant de chez vous</Text>
            <Teletravail />
          </>
        )}
        {distance && (
          <>
            <Text>
              Découvrez la quantité de CO2e que vous émettez{' '}
              <Color
                onClick={() => {
                  track('Transport distance', 'Hypothèses', 'transport_itineraire_hypotheses')
                  setOccupancyModal(true)
                }}>
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
