import React, { Dispatch, SetStateAction, useContext } from 'react'
import { Category } from 'types/category'
import useItineraries, { Point } from 'hooks/useItineraries'
import useTransportations from 'hooks/useTransportations'
import Checkbox from 'components/base/Checkbox'
import { Section, SectionWideContent } from 'components/base/Section'
import BarChart from 'components/charts/BarChart'
import Bottom from 'components/misc/category/Bottom'
import Instruction from 'components/misc/category/Instruction'
import { Checkboxes, Top } from 'components/misc/category/Top'
import Wrapper from 'components/misc/category/Wrapper'
import TransportContext from 'components/transport/TransportProvider'
import Search from './Search'

export default function Itinerary({ category, iframe }: { category: Category; iframe?: boolean }) {
  const { displayAll, setDisplayAll, start, end } = useContext<{
    displayAll: boolean
    setDisplayAll: Dispatch<SetStateAction<boolean>>
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
              {transportations.length ? (
                <Top>
                  <Instruction />
                  <Checkboxes $visible>
                    <Checkbox
                      name='displayAll'
                      checked={displayAll}
                      onChange={() => {
                        setDisplayAll((prevDisplayAll) => !prevDisplayAll)
                        window?.please?.track(['trackEvent', 'Interaction', 'Voir tous les équivalents', category.name])
                      }}>
                      Voir tous les équivalents
                    </Checkbox>
                  </Checkboxes>
                </Top>
              ) : null}
              <BarChart items={transportations} max={transportations[transportations.length - 1]?.value} />
              {transportations.length ? <Bottom category={category} /> : null}
            </>
          )}
        </Wrapper>
      </SectionWideContent>
    </Section>
  )
}
