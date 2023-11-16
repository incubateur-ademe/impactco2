import React, { useContext, useEffect, useState } from 'react'
import { formatTotal } from 'utils/formatters'
import { useItinerary } from 'hooks/useItineraries'
import DataContext from 'components/providers/DataProvider'
import { Section, SectionWideContent } from 'components/base/Section'
import Wrapper from 'components/misc/category/Wrapper'
import TransportContext from 'components/transport/TransportProvider'
import Search from './Search'
import PercentFootprint from './teletravail/PercentFootprint'
import YearlyFootprint from './teletravail/YearlyFootprint'

export default function Teletravail(props) {
  const { equivalents } = useContext(DataContext)

  const { start, end, teletravailTransportation, presentiel, teletravail, holidays, extraKm } =
    useContext(TransportContext)

  const [currentTransportation, setCurrentTransportation] = useState(null)
  useEffect(() => {
    setCurrentTransportation(equivalents.find((transportation) => transportation.id === teletravailTransportation))
  }, [equivalents, teletravailTransportation])

  const [distance, setDistance] = useState(0)
  const types = { car: 'driving', foot: 'walking', rail: 'driving' }
  const { data: itinerary } = useItinerary(start, end, types[currentTransportation?.type])
  useEffect(() => {
    setDistance(itinerary && itinerary[0].elements[0].status === 'OK' && itinerary[0].elements[0].distance.value)
  }, [itinerary])

  const [emitted, setEmitted] = useState(0)
  const [saved, setSaved] = useState(0)
  useEffect(() => {
    if (distance && currentTransportation) {
      setSaved(
        Math.round(
          (formatTotal(currentTransportation) *
            (distance - distance * extraKm) *
            2 *
            teletravail *
            (52 - holidays - 1)) /
            1000
        )
      )
      setEmitted(
        Math.round((formatTotal(currentTransportation) * distance * presentiel * 2 * (52 - holidays - 1)) / 1000)
      )
    }
  }, [presentiel, teletravail, holidays, extraKm, distance, currentTransportation])

  return (
    <Section $withoutPadding>
      <SectionWideContent $small>
        <Wrapper name={props.category.title || props.category.name} slug={props.category.slug}>
          <Search teletravail iframe={props.iframe} />
          {distance && currentTransportation ? (
            <YearlyFootprint emitted={emitted} saved={saved} presentiel={presentiel} teletravail={teletravail} />
          ) : null}
          {distance && currentTransportation ? <PercentFootprint saved={saved} /> : null}
        </Wrapper>
      </SectionWideContent>
    </Section>
  )
}
