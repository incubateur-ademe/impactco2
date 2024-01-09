import { useRouter } from 'next/router'
import React, { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { searchAddress } from 'hooks/useAddress'
import { Point } from 'hooks/useItineraries'
import FootprintModal from './modals/FootprintModal'
import OccupancyModal from './modals/OccupancyModal'
import TeletravailModal from './modals/TeletravailModal'
import { displayAddress } from './search/itinerary/Address'

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

export function TransportProvider({
  type,
  children,
}: {
  type: 'distance' | 'teletravail' | 'itineraire'
  children: ReactNode
}) {
  const router = useRouter()

  const [displayAll, setDisplayAll] = useState(false)

  const [carpool, setCarpool] = useState(0)

  const [km, setKm] = useState(10)

  const [start, setStart] = useState<Point>()
  const [end, setEnd] = useState<Point>()

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

  useEffect(() => {
    if (router.isReady) {
      const start = (router.query.start ||
        (type === 'itineraire' && router.query.itineraireStart) ||
        (type === 'teletravail' && router.query.itineraireStart)) as string
      if (start) {
        searchAddress(start, 1).then((result) => {
          if (result.length > 0) {
            const address = result[0]
            setStart({
              latitude: address.geometry.coordinates[1],
              longitude: address.geometry.coordinates[0],
              city: address.properties.city,
              address: displayAddress(address),
            })
          }
        })
      }

      const end = (router.query.end ||
        (type === 'itineraire' && router.query.itineraireEnd) ||
        (type === 'teletravail' && router.query.itineraireEnd)) as string

      if (end) {
        searchAddress(end, 1).then((result) => {
          if (result.length > 0) {
            const address = result[0]
            setEnd({
              latitude: address.geometry.coordinates[1],
              longitude: address.geometry.coordinates[0],
              city: address.properties.city,
              address: displayAddress(address),
            })
          }
        })
      }

      if (router.query.km) {
        const km = Number.parseInt(router.query.km as string)
        if (!Number.isNaN(km)) {
          setKm(km)
        }
      }
    }
  }, [router, type])

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
