import React from 'react'
import Round from './Round'

const ThreeItems = ({ value, comparisons }: { value: number; comparisons: string[] }) => {
  return (
    <>
      <Round top={-27} right={270} value={value} main />
      <Round top={-146} right={-41} comparison={comparisons[3]} value={comparisons[3] ? value : undefined} />
      <Round top={533} right={321} comparison={comparisons[4]} value={comparisons[4] ? value : undefined} />
      <Round top={285} right={-222} comparison={comparisons[5]} value={comparisons[5] ? value : undefined} />
      <Round top={133} right={22} comparison={comparisons[0]} value={value} />
      <Round top={253} right={269} comparison={comparisons[1]} value={value} />
      <Round top={403} right={37} comparison={comparisons[2]} value={value} />
    </>
  )
}

export default ThreeItems
