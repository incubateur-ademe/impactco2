import React, { useState } from 'react'

import CO2NumberContext from 'utils/CO2NumberContext'

export default function CO2NumberProvider(props) {
  const [CO2, setCO2] = useState(1000)
  return (
    <CO2NumberContext.Provider
      value={{
        CO2,
        setCO2
      }}
    >
      {props.children}
    </CO2NumberContext.Provider>
  )
}
