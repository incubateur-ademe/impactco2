import React, { useState } from 'react'
import ModalContext from 'utils/ModalContext'

export default function ModalProvider(props) {
  const [Co2e, setCo2e] = useState(false)
  const [tiles, setTiles] = useState(false)
  const [share, setShare] = useState(false)

  return (
    <ModalContext.Provider
      value={{
        Co2e,
        setCo2e,
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
