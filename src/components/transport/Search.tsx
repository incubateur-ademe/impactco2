import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { Category } from 'types/category'
import { TransportSimulateur } from 'types/transport'
import { track } from 'utils/matomo'
import useParamContext from 'components/providers/ParamProvider'
import Simulator from '../misc/Simulator'
import SliderWithInput from '../misc/slider/SliderWithInput'
import Distance from './Distance'
import Itinerary from './Itinerary'
import Teletravail from './Teletravail'
import Transport from './Transport'
import Occupancy from './modals/OccupancyModal'
import ItinerarySearch from './search/Itinerary'
import ModeSelector from './search/ModeSelector'
import TeletravailSearch from './search/Teletravail'

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
const tracking: Record<TransportSimulateur, string> = {
  distance: 'Transport distance',
  teletravail: 'Transport télétravail',
  itineraire: 'Transport itinéraire',
}

export type SearchProps = { initialType: TransportSimulateur; category: Category; iframe?: boolean }

export default function Search({ initialType, category, iframe }: SearchProps) {
  const t = useTranslations('transport.search')

  const {
    transport: { selected, setSelected },
  } = useParamContext()
  const [open, setOpen] = useState(false)
  const {
    distance: { km, setKm },
  } = useParamContext()

  useEffect(() => {
    setSelected(initialType)
  }, [initialType, setSelected])

  return selected ? (
    <Transport category={category} tracking={tracking[selected]} iframe={iframe} type={selected}>
      <ModeSelector />
      {open && <Occupancy setOpen={setOpen} />}
      {selected === 'itineraire' && (
        <>
          <Simulator
            text={
              <>
                {t('header')}{' '}
                <Color
                  onClick={() => {
                    track('Transport itinéraire', 'Hypothèses', 'transport_itineraire_hypotheses')
                    setOpen(true)
                  }}>
                  ({t('header-par-personne')})
                </Color>{' '}
                {t('header-itineraire')}
              </>
            }>
            <ItinerarySearch />
          </Simulator>
          <Itinerary category={category} />
        </>
      )}
      {selected === 'teletravail' && (
        <>
          <Simulator text={t('header-teletravail')}>
            <TeletravailSearch />
          </Simulator>
          <Teletravail />
        </>
      )}
      {selected === 'distance' && (
        <>
          <Simulator
            text={
              <>
                {t('header')}{' '}
                <Color
                  onClick={() => {
                    track('Transport distance', 'Hypothèses', 'transport_distance_hypotheses')
                    setOpen(true)
                  }}>
                  ({t('header-par-personne')})
                </Color>{' '}
                {t('header-distance')}
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
          <Distance category={category} iframe={iframe} />
        </>
      )}
    </Transport>
  ) : null
}
