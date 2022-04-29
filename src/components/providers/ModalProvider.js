import React, { useState } from 'react'
import ModalContext from 'utils/ModalContext'

export default function ModalProvider(props) {
  const [CO2E, setCO2E] = useState(false)
  const [tiles, setTiles] = useState(false)
  const [share, setShare] = useState(false)

  return (
    <ModalContext.Provider
      value={{
        CO2E,
        setCO2E,
        tiles,
        setTiles,
        share,
        setShare,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  )
}
