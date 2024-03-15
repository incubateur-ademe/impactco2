import React from 'react'
import Round from './Round'

const OneItem = ({ value, comparisons }: { value: number; comparisons: string[] }) => {
  return (
    <>
      <Round top={-144} right={207} />
      <Round top={14} right={-41} />
      <Round top={413} right={269} />
      <Round top={563} right={37} />
      <Round top={445} right={-222} />
      <Round top={293} right={22} comparison={comparisons[0]} value={value} />
      <Round top={133} right={270} value={value} main />
    </>
  )
}

export default OneItem
