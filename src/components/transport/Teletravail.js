import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'

import { formatTotal } from 'utils/formatters'
import DataContext from 'components/providers/DataProvider'
import TransportContext from 'components/transport/TransportProvider'
import useIframe from 'hooks/useIframe'
import { useItinerary } from 'hooks/useItineraries'
import Section from 'components/base/Section'
import YearlyFootprint from './teletravail/YearlyFootprint'
import PercentFootprint from './teletravail/PercentFootprint'

const Wrapper = styled.div`
  margin-top: 2rem;
`
export default function Teletravail() {
  const iframe = useIframe(true)

  useEffect(() => {
    if (!iframe) {
      document.title = 'Télétravail | Mon Impact Transport'
      document.getElementById('Accueil')?.focus()
      document.activeElement.blur()
    }
  }, [iframe])

  const { equivalents } = useContext(DataContext)

  const {
    start,
    end,
    teletravailTransportation,
    presentiel,
    teletravail,
    holidays,
    extraKm,
  } = useContext(TransportContext)

  const [currentTransportation, setCurrentTransportation] = useState(null)
  useEffect(() => {
    setCurrentTransportation(
      equivalents.find(
        (transportation) => transportation.id === teletravailTransportation
      )
    )
  }, [equivalents, teletravailTransportation])

  const [distance, setDistance] = useState(0)
  const types = { car: 'driving', foot: 'walking', rail: 'driving' }
  const { data: itinerary } = useItinerary(
    start,
    end,
    types[currentTransportation?.type]
  )
  useEffect(() => {
    setDistance(
      itinerary &&
        itinerary[0].elements[0].status === 'OK' &&
        itinerary[0].elements[0].distance.value
    )
  }, [itinerary])

  const [emitted, setEmitted] = useState(0)
  const [saved, setSaved] = useState(0)
  useEffect(() => {
    if (distance && currentTransportation) {
      setSaved(
        Math.round(
          (formatTotal(currentTransportation) *
            (distance - distance * extraKm) *
            teletravail *
            (52 - holidays - 1)) /
            1000000
        )
      )
      setEmitted(
        Math.round(
          (formatTotal(currentTransportation) *
            distance *
            presentiel *
            (52 - holidays - 1)) /
            1000000
        )
      )
    }
  }, [
    presentiel,
    teletravail,
    holidays,
    extraKm,
    distance,
    currentTransportation,
  ])

  return (
    <Section>
      <Section.Content>
        {distance && currentTransportation && (
          <YearlyFootprint
            emitted={emitted}
            saved={saved}
            presentiel={presentiel}
            teletravail={teletravail}
          />
        )}
        {distance && currentTransportation && (
          <PercentFootprint saved={saved} />
        )}
      </Section.Content>
    </Section>
  )
}
