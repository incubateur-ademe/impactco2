import React, { Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import FootprintModal from './modals/FootprintModal'

const TransportContext = React.createContext<{
  footprintModal: boolean
  setFootprintModal: Dispatch<SetStateAction<boolean>>
} | null>(null)

export function TransportProvider({ children }: { children: ReactNode }) {
  const [footprintModal, setFootprintModal] = useState(false)

  return (
    <TransportContext.Provider
      value={{
        footprintModal,
        setFootprintModal,
      }}>
      {children}
      <FootprintModal />
    </TransportContext.Provider>
  )
}

const useTransportContext = () => {
  const context = useContext(TransportContext)

  if (!context) {
    throw new Error('useTransportContext has to be used within <TransportProvider>')
  }

  return context
}

export default useTransportContext
