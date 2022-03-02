import React, { useState } from 'react'
import ModalContext from 'utils/ModalContext'

export default function ModalProvider(props) {
  const [CO2E, setCO2E] = useState(false)
  const [map, setMap] = useState(false)
  const [avoid, setAvoid] = useState(false)
  const [next, setNext] = useState(false)

  return (
    <ModalContext.Provider
      value={{
        CO2E,
        setCO2E,
        map,
        setMap,
        avoid,
        setAvoid,
        next,
        setNext,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  )
}
