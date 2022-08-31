import React, { useState, useEffect, useContext } from 'react'

import { formatTotal } from 'utils/formatters'
import DataContext from 'components/providers/DataProvider'
import TransportContext from 'components/transport/TransportProvider'
import useIframe from 'hooks/useIframe'
import { useItinerary } from 'hooks/useItineraries'
import Section from 'components/base/Section'
import Wrapper from 'components/misc/Category/Wrapper'
import YearlyFootprint from './teletravail/YearlyFootprint'
import PercentFootprint from './teletravail/PercentFootprint'
import Search from './Search'

export default function Teletravail(props) {
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
        <Wrapper name={props.category.name.fr} slug={props.category.slug}>
          <Search teletravail iframe={props.iframe} />
          {distance && currentTransportation ? (
            <YearlyFootprint
              emitted={emitted}
              saved={saved}
              presentiel={presentiel}
              teletravail={teletravail}
            />
          ) : null}
          {distance && currentTransportation ? (
            <PercentFootprint saved={saved} />
          ) : null}
        </Wrapper>
      </Section.Content>
    </Section>
  )
}
