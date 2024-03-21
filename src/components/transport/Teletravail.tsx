import React, { useEffect, useState } from 'react'
import { Category } from 'types/category'
import { ComputedEquivalent, DeplacementEquivalent, DeplacementType } from 'types/equivalent'
import useItineraries from 'hooks/useItineraries'
import useParamContext from 'components/providers/ParamProvider'
import { computedEquivalents } from 'components/providers/equivalents'
import Search from './Search'
import Transport from './Transport'
import PercentFootprint from './teletravail/PercentFootprint'
import YearlyFootprint from './teletravail/YearlyFootprint'

const tracking = 'Transport télétravail'
export default function Teletravail({ category, iframe }: { category: Category; iframe?: boolean }) {
  const {
    teletravail: { start, end, transport, presentiel, teletravail, holidays, extraKm },
  } = useParamContext()

  const [currentTransportation, setCurrentTransportation] = useState<
    (ComputedEquivalent & DeplacementEquivalent) | undefined
  >()
  useEffect(() => {
    setCurrentTransportation(
      computedEquivalents.find((transportation) => transportation.slug === transport) as ComputedEquivalent &
        DeplacementEquivalent
    )
  }, [transport])

  const [distance, setDistance] = useState(0)
  const itinerary = useItineraries(start, end, 'télétravail')
  useEffect(() => {
    if (itinerary && currentTransportation && itinerary[currentTransportation.type as DeplacementType]) {
      setDistance(itinerary[currentTransportation.type as DeplacementType] * 1000)
    }
  }, [itinerary, currentTransportation])

  const [emitted, setEmitted] = useState(0)
  const [saved, setSaved] = useState(0)
  useEffect(() => {
    if (distance && currentTransportation) {
      setSaved(
        Math.round(
          (currentTransportation.value * (distance - distance * extraKm) * 2 * teletravail * (52 - holidays - 1)) / 1000
        )
      )
      setEmitted(Math.round((currentTransportation.value * distance * presentiel * 2 * (52 - holidays - 1)) / 1000))
    }
  }, [presentiel, teletravail, holidays, extraKm, distance, currentTransportation])

  return (
    <Transport category={category} tracking={tracking} iframe={iframe} type='teletravail'>
      <Search type='teletravail' iframe={iframe} />
      {distance && currentTransportation ? (
        <YearlyFootprint emitted={emitted} saved={saved} presentiel={presentiel} teletravail={teletravail} />
      ) : null}
      {distance && currentTransportation ? <PercentFootprint saved={saved} /> : null}
    </Transport>
  )
}
