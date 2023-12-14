import React from 'react'
import { Category } from 'types/category'
import useTransportations from 'hooks/useTransportations'
import { Section, SectionWideContent } from 'components/base/Section'
import BarChart from 'components/charts/BarChart'
import Bottom from 'components/misc/category/Bottom'
import CategoryLegend from 'components/misc/category/CategoryLegend'
import Wrapper from 'components/misc/category/Wrapper'
import ResultHeader from './ResultHeader'
import Search from './Search'

export default function Distance({ category, iframe }: { category: Category; iframe?: boolean }) {
  const transportations = useTransportations('Transport distance')

  return (
    <Section $withoutPadding data-testid='distanceWrapper'>
      <SectionWideContent $small>
        <Wrapper name={category.title || category.name} slug={category.slug} tracking='Transport distance'>
          <Search distance iframe={iframe} />
          <ResultHeader category={category} tracking='Transport distance' />
          <BarChart equivalents={transportations} category={category} />
          <CategoryLegend />
          <Bottom category={category} iframe={iframe} />
        </Wrapper>
      </SectionWideContent>
    </Section>
  )
}
