import React from 'react'
import { SimpleEquivalent } from 'types/equivalent'
import values from 'utils/Equivalent/values.json'
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
  const baseValue = (value * equivalentValue.value) / (1000 * (equivalentValue.percentage ? 100 : 1))

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: '60px',
          right: '280px',
          gap: '1.25rem',
        }}>
        <Round comparison={equivalent} value={baseValue} main />
        <Round comparison={comparisons[1]} value={comparisons[1] ? baseValue : undefined} />
        <Round comparison={comparisons[3]} value={comparisons[3] ? baseValue : undefined} />
      </div>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          position: 'absolute',
          top: '-32px',
          right: '80px',
          gap: '1.25rem',
        }}>
        <Round value={baseValue} />
        <Round comparison={comparisons[0]} value={comparisons[0] ? baseValue : undefined} />
        <Round comparison={comparisons[2]} value={comparisons[2] ? baseValue : undefined} />
        <Round comparison={comparisons[4]} value={comparisons[4] ? baseValue : undefined} />
      </div>
    </>
  )
}

export default EquivalentItems
