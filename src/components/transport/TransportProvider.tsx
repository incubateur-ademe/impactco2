import React, { Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react'
import { Point } from 'hooks/useItineraries'
import useParamContext from 'components/providers/ParamProvider'
import FootprintModal from './modals/FootprintModal'
import OccupancyModal from './modals/OccupancyModal'
import TeletravailModal from './modals/TeletravailModal'

const TransportContext = React.createContext<{
  displayAll: boolean
  setDisplayAll: Dispatch<SetStateAction<boolean>>
  carpool: number
  setCarpool: Dispatch<SetStateAction<number>>
  km: number
  setKm: Dispatch<SetStateAction<number>>
  start?: Point
  setStart: Dispatch<SetStateAction<Point | undefined>>
  end?: Point
  setEnd: Dispatch<SetStateAction<Point | undefined>>
  teletravailTransportation: string
  setTeletravailTransportation: Dispatch<SetStateAction<string>>
  presentiel: number
  setPresentiel: Dispatch<SetStateAction<number>>
  teletravail: number
  setTeletravail: Dispatch<SetStateAction<number>>
  days: string
  setDays: Dispatch<SetStateAction<string>>
  holidays: string
  setHolidays: Dispatch<SetStateAction<string>>
  extraKm: string
  setExtraKm: Dispatch<SetStateAction<string>>
  yearlyFootprint: number
  setYearlyFootprint: Dispatch<SetStateAction<number>>
  occupancyModal: boolean
  setOccupancyModal: Dispatch<SetStateAction<boolean>>
  footprintModal: boolean
  setFootprintModal: Dispatch<SetStateAction<boolean>>
  teletravailModal: boolean
  setTeletravailModal: Dispatch<SetStateAction<boolean>>
} | null>(null)

export function TransportProvider({ children }: { children: ReactNode }) {
  const {
    transport: { km, setKm, start, setStart, end, setEnd },
  } = useParamContext()
  const [displayAll, setDisplayAll] = useState(false)

  const [carpool, setCarpool] = useState(0)
  const [teletravailTransportation, setTeletravailTransportation] = useState('')
  const [presentiel, setPresentiel] = useState(5)
  const [teletravail, setTeletravail] = useState(0)
  const [days, setDays] = useState('5')
  const [holidays, setHolidays] = useState('5')
  const [extraKm, setExtraKm] = useState('0.25')
  const [yearlyFootprint, setYearlyFootprint] = useState(9.9)

  const [occupancyModal, setOccupancyModal] = useState(false)
  const [teletravailModal, setTeletravailModal] = useState(false)
  const [footprintModal, setFootprintModal] = useState(false)

  return (
    <TransportContext.Provider
      value={{
        displayAll,
        setDisplayAll,
        carpool,
        setCarpool,
        km,
        setKm,
        start,
        setStart,
        end,
        setEnd,
        teletravailTransportation,
        setTeletravailTransportation,
        presentiel,
        setPresentiel,
        teletravail,
        setTeletravail,
        days,
        setDays,
        holidays,
        setHolidays,
        extraKm,
        setExtraKm,
        yearlyFootprint,
        setYearlyFootprint,
        occupancyModal,
        setOccupancyModal,
        footprintModal,
        setFootprintModal,
        teletravailModal,
        setTeletravailModal,
      }}>
      {children}
      <OccupancyModal />
      <FootprintModal />
      <TeletravailModal />
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
