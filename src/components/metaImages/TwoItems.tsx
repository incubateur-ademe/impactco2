import React from 'react'
import Round from './Round'

const TwoItems = ({ value, comparisons }: { value: number; comparisons: string[] }) => {
  return (
    <>
      <Round top={-66} right={-41} />
      <Round top={483} right={37} />
      <Round top={563} right={37} />
      <Round top={365} right={-222} />
      <Round top={613} right={321} />
      <Round top={53} right={270} value={value} main />
      <Round top={213} right={22} comparison={comparisons[0]} value={value} />
      <Round top={333} right={269} comparison={comparisons[1]} value={value} />
    </>
  )
}

export default TwoItems
