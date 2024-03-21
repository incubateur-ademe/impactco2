import React, { useState } from 'react'
import styled from 'styled-components'
import { TransportSimulateur } from 'types/transport'
import { track } from 'utils/matomo'
import useParamContext from 'components/providers/ParamProvider'
import Simulator from '../misc/Simulator'
import SliderWithInput from '../misc/slider/SliderWithInput'
import Occupancy from './modals/OccupancyModal'
import Itinerary from './search/Itinerary'
import ModeSelector from './search/ModeSelector'
import Teletravail from './search/Teletravail'

const Color = styled.button`
  background: transparent;
  border: none;
  color: var(--primary-60);
  cursor: pointer;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`
export default function Search({ type, iframe }: { type: TransportSimulateur; iframe?: boolean }) {
  const [open, setOpen] = useState(false)
  const {
    distance: { km, setKm },
  } = useParamContext()

  return (
    <>
      <ModeSelector type={type} iframe={iframe} />
      {open && <Occupancy setOpen={setOpen} />}
      {type === 'itineraire' && (
        <Simulator
          text={
            <>
              Découvrez la quantité de CO<sub>2</sub>e que vous émettez{' '}
              <Color
                onClick={() => {
                  track('Transport itinéraire', 'Hypothèses', 'transport_itineraire_hypotheses')
                  setOpen(true)
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
                  setOpen(true)
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
