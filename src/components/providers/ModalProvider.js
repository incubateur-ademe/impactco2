import React, { useState } from 'react'
import ModalContext from 'utils/ModalContext'

export default function ModalProvider(props) {
  const [CO2E, setCO2E] = useState(false)
  const [equivalents, setEquivalents] = useState(false)
  const [about, setAbout] = useState(false)
  const [installInstructions, setInstallInstructions] = useState(false)

  return (
    <ModalContext.Provider
      value={{
        CO2E,
        setCO2E,
        equivalents,
        setEquivalents,
        about,
        setAbout,
        installInstructions,
        setInstallInstructions,
      }}
    >
      {props.children}
    </ModalContext.Provider>
  )
}
