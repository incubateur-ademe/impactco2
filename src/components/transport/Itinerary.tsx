import React, { useContext } from 'react'
import { Category } from 'types/category'
import useItineraries, { Point } from 'hooks/useItineraries'
import useTransportations from 'hooks/useTransportations'
import { Section, SectionWideContent } from 'components/base/Section'
import BarChart from 'components/charts/BarChart'
import Bottom from 'components/misc/category/Bottom'
import Wrapper from 'components/misc/category/Wrapper'
import TransportContext from 'components/transport/TransportProvider'
import ResultHeader from './ResultHeader'
import Search from './Search'

export default function Itinerary({ category, iframe }: { category: Category; iframe?: boolean }) {
  const { start, end } = useContext<{
    start: Point
    end: Point
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: TODO
  }>(TransportContext)

  const itineraries = useItineraries(start, end)
  const transportations = useTransportations(itineraries)

  return (
    <Section $withoutPadding>
      <SectionWideContent $small>
        <Wrapper name={category.title || category.name} slug='transport/itineraire'>
          <Search itineraire iframe={iframe} />
          {itineraries && (
            <>
              {transportations.length ? <ResultHeader category={category} /> : null}
              <BarChart equivalents={transportations} category={category} />
              {transportations.length ? <Bottom category={category} /> : null}
            </>
          )}
        </Wrapper>
      </SectionWideContent>
    </Section>
  )
}
