import React from 'react'
import { SimpleEquivalent } from 'types/equivalent'
import values from 'data/shopify/values.json'
import Round from './Round'

const equivalents = values as Record<string, SimpleEquivalent>

const EquivalentItems = ({
  value,
  comparisons,
  equivalent,
}: {
  value: number
  comparisons: string[]
  equivalent: string
}) => {
  const equivalentValue = equivalents[equivalent]
  const baseValue = (value * equivalentValue.value) / 1000

  return (
    <>
      <Round top={-66} right={-25} value={baseValue} />
      <Round top={45} right={270} comparison={equivalent} value={baseValue} main />
      <Round top={213} right={22} comparison={comparisons[0]} value={comparisons[0] ? baseValue : undefined} />
      <Round top={333} right={269} comparison={comparisons[1]} value={comparisons[1] ? baseValue : undefined} />
      <Round top={483} right={37} comparison={comparisons[2]} value={comparisons[2] ? baseValue : undefined} />
      <Round top={613} right={321} comparison={comparisons[3]} value={comparisons[3] ? baseValue : undefined} />
      <Round top={365} right={-222} comparison={comparisons[4]} value={comparisons[4] ? baseValue : undefined} />
    </>
  )
}

export default EquivalentItems
