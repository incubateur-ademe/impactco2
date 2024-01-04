import React, { useEffect, useState } from 'react'
import { computeECV } from 'utils/computeECV'
import useItineraries from 'hooks/useItineraries'
import useDataContext from 'components/providers/DataProvider'
import useTransportContext from 'components/transport/TransportProvider'
import Search from './Search'
import Transport from './Transport'
import PercentFootprint from './teletravail/PercentFootprint'
import YearlyFootprint from './teletravail/YearlyFootprint'

const tracking = 'Transport télétravail'

export default function Teletravail(props) {
  const { equivalents } = useDataContext()

  const { start, end, teletravailTransportation, presentiel, teletravail, holidays, extraKm } = useTransportContext()

  const [currentTransportation, setCurrentTransportation] = useState(null)
  useEffect(() => {
    setCurrentTransportation(equivalents.find((transportation) => transportation.slug === teletravailTransportation))
  }, [equivalents, teletravailTransportation])

  const [distance, setDistance] = useState(0)
  const itinerary = useItineraries(start, end, 'télétravail')
  useEffect(() => {
    setDistance(itinerary && itinerary[currentTransportation?.type] * 1000)
  }, [itinerary, currentTransportation])

  const [emitted, setEmitted] = useState(0)
  const [saved, setSaved] = useState(0)
  useEffect(() => {
    if (distance && currentTransportation) {
      setSaved(
        Math.round(
          (computeECV(currentTransportation) *
            (distance - distance * extraKm) *
            2 *
            teletravail *
            (52 - holidays - 1)) /
            1000
        )
      )
      setEmitted(
        Math.round((computeECV(currentTransportation) * distance * presentiel * 2 * (52 - holidays - 1)) / 1000)
      )
    }
  }, [presentiel, teletravail, holidays, extraKm, distance, currentTransportation])

  return (
    <Transport category={props.category} tracking={tracking} iframe={props.iframe} type='teletravail'>
      <Search type='teletravail' iframe={props.iframe} />
      {distance && currentTransportation ? (
        <YearlyFootprint emitted={emitted} saved={saved} presentiel={presentiel} teletravail={teletravail} />
      ) : null}
      {distance && currentTransportation ? <PercentFootprint saved={saved} /> : null}
    </Transport>
  )
}
