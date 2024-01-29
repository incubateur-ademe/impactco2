import React from 'react'
import useDataContext from 'components/providers/DataProvider'

const Label = ({ id }: { id: string | number }) => {
  const { ecv } = useDataContext()
  const currentECV = ecv.find((e) => e.id === id)

  return currentECV ? (
    <>
      <span>{currentECV.name}</span>
    </>
  ) : null
}

export default Label
