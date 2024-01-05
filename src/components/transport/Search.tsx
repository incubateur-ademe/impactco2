import React from 'react'
import styled from 'styled-components'
import { track } from 'utils/matomo'
import useTransportContext from 'components/transport/TransportProvider'
import Simulator from '../misc/Simulator'
import SliderWithInput from '../misc/slider/SliderWithInput'
import Itinerary from './search/Itinerary'
import ModeSelector from './search/ModeSelector'
import Teletravail from './search/Teletravail'

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
  type,
  iframe,
}: {
  type: 'distance' | 'itineraire' | 'teletravail'
  iframe?: boolean
}) {
  const { setOccupancyModal, km, setKm } = useTransportContext()

  return (
    <>
      <ModeSelector type={type} iframe={iframe} />
      {type === 'itineraire' && (
        <Simulator
          text={
            <>
              Découvrez la quantité de CO<sub>2</sub>e que vous émettez{' '}
              <Color
                onClick={() => {
                  track('Transport itinéraire', 'Hypothèses', 'transport_itineraire_hypotheses')
                  setOccupancyModal(true)
                }}>
                (par personne)
              </Color>{' '}
              pour ce trajet
            </>
          }>
          <Itinerary />
        </Simulator>
      )}
      {type === 'teletravail' && (
        <Simulator
          text={
            <>
              Découvrez la quantité de CO<sub>2</sub>e que vous économisez (à l'année) en travaillant de chez vous
            </>
          }>
          <Teletravail />
        </Simulator>
      )}
      {type === 'distance' && (
        <Simulator
          text={
            <>
              Découvrez la quantité de CO<sub>2</sub>e que vous émettez{' '}
              <Color
                onClick={() => {
                  track('Transport distance', 'Hypothèses', 'transport_distance_hypotheses')
                  setOccupancyModal(true)
                }}>
                (par personne)
              </Color>{' '}
              pour cette distance
            </>
          }>
          <SliderWithInput
            value={km}
            setValue={setKm}
            unit='km'
            digit={4}
            tracking='Transport distance'
            aria-label='Distance en km'
          />
        </Simulator>
      )}
    </>
  )
}
