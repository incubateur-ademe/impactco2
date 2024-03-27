import React from 'react'
import { Category } from 'types/category'
import useItineraries from 'hooks/useItineraries'
import useTransportations from 'hooks/useTransportations'
import useParamContext from 'components/providers/ParamProvider'
import BarChart from 'components/charts/BarChart'
import Bottom from 'components/misc/category/Bottom'

const tracking = 'Transport itinéraire'

export default function Itinerary({ category, iframe }: { category: Category; iframe?: boolean }) {
  const {
    itineraire: { start, end },
  } = useParamContext()

  const itineraries = useItineraries(start, end, 'itinéraire')
  const transportations = useTransportations(tracking, 'itineraire', itineraries)

  return itineraries ? (
    <>
      <BarChart equivalents={transportations} category={category} />
      {transportations.length ? <Bottom category={category} iframe={iframe} /> : null}
    </>
  ) : null
}
