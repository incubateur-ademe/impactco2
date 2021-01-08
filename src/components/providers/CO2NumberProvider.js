import React from 'react'
import { useQueryParam, NumberParam, withDefault } from 'use-query-params'
import CO2NumberContext from 'utils/CO2NumberContext'

export default function CO2NumberProvider(props) {
  const [CO2, setCO2] = useQueryParam('co2', withDefault(NumberParam, 1000))

  console.log('CO2', CO2)
  return (
    <CO2NumberContext.Provider
      value={{
        CO2,
        setCO2: (newCO2) => {
          console.log('newCO2', newCO2)
          setCO2(newCO2)
        },
      }}
    >
      {props.children}
    </CO2NumberContext.Provider>
  )
}
