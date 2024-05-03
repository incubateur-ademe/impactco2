import React from 'react'
import { ecv } from 'data/ecv'

const Label = ({ id }: { id: string | number }) => {
  const currentECV = ecv.find((e) => e.id === id)

  return currentECV ? (
    <>
      <span>{currentECV.name}</span>
    </>
  ) : null
}

export default Label
