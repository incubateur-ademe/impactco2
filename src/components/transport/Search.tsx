import React, { Dispatch, SetStateAction, useContext } from 'react'
import styled from 'styled-components'
import { track } from 'utils/matomo'
import TransportContext from 'components/transport/TransportProvider'
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
  const { setOccupancyModal, km, setKm } = useContext<{
    setOccupancyModal: Dispatch<SetStateAction<boolean>>
    km: number
    setKm: Dispatch<SetStateAction<number>>
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: TODO
  }>(TransportContext)

  return (
    <>
      <ModeSelector distance={distance} itineraire={itineraire} teletravail={teletravail} iframe={iframe} />
      {itineraire && (
        <Simulator
          text={
            <>
              Découvrez la quantité de CO2e que vous émettez{' '}
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
      {teletravail && (
        <Simulator text="Découvrez la quantité de CO2e que vous économisez (à l'année) en travaillant de chez vous">
          <Teletravail />
        </Simulator>
      )}
      {distance && (
        <Simulator
          text={
            <>
              Découvrez la quantité de CO2e que vous émettez{' '}
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
          <SliderWithInput value={km} setValue={setKm} unit='km' digit={4} tracking='Transport distance' />
        </Simulator>
      )}
    </>
  )
}
