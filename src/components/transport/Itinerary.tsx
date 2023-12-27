import React, { useContext } from 'react'
import { Category } from 'types/category'
import useItineraries, { Point } from 'hooks/useItineraries'
import useTransportations from 'hooks/useTransportations'
import BarChart from 'components/charts/BarChart'
import Bottom from 'components/misc/category/Bottom'
import TransportContext from 'components/transport/TransportProvider'
import ResultHeader from './ResultHeader'
import Search from './Search'
import Transport from './Transport'

const tracking = 'Transport itinéraire'

export default function Itinerary({ category, iframe }: { category: Category; iframe?: boolean }) {
  const { start, end } = useContext<{
    start: Point
    end: Point
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: TODO
  }>(TransportContext)

  const itineraries = useItineraries(start, end, 'itinéraire')
  const transportations = useTransportations(tracking, itineraries)

  return (
    <Transport category={category} tracking={tracking} iframe={iframe} type='itineraire'>
      <Search type='itineraire' iframe={iframe} />
      {itineraries && (
        <>
          {transportations.length ? <ResultHeader category={category} tracking={tracking} /> : null}
          <BarChart equivalents={transportations} category={category} />
          {transportations.length ? <Bottom category={category} /> : null}
        </>
      )}
    </Transport>
  )
}
