import React from 'react'
import { Category } from 'types/category'
import useTransportations from 'hooks/useTransportations'
import BarChart from 'components/charts/BarChart'
import Bottom from 'components/misc/category/Bottom'
import CategoryLegend from 'components/misc/category/CategoryLegend'
import ResultHeader from './ResultHeader'
import Search from './Search'
import Transport from './Transport'

const tracking = 'Transport distance'
export default function Distance({ category, iframe }: { category: Category; iframe?: boolean }) {
  const transportations = useTransportations(tracking, 'distance')

  return (
    <Transport category={category} tracking={tracking} iframe={iframe} type='distance'>
      <Search type='distance' iframe={iframe} />
      <ResultHeader category={category} tracking={tracking} type='distance' />
      <BarChart equivalents={transportations} category={category} />
      <CategoryLegend />
      <Bottom category={category} iframe={iframe} />
    </Transport>
  )
}
