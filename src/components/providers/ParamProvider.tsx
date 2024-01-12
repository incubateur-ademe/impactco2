import { useRouter } from 'next/router'
import React, { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react'
import { searchAddress } from 'hooks/useAddress'
import { Point } from 'hooks/useItineraries'
import { displayAddress } from 'components/transport/search/itinerary/Address'

const ParamContext = React.createContext<{
  transport: {
    km: number
    setKm: Dispatch<SetStateAction<number>>
    start?: Point
    setStart: Dispatch<SetStateAction<Point | undefined>>
    end?: Point
    setEnd: Dispatch<SetStateAction<Point | undefined>>
  }
  chauffage: {
    m2: number
    setM2: Dispatch<SetStateAction<number>>
  }
} | null>(null)

export function ParamProvider({ children }: { children: ReactNode }) {
  const router = useRouter()

  const [m2, setM2] = useState(63)

  const [km, setKm] = useState(10)
  const [start, setStart] = useState<Point>()
  const [end, setEnd] = useState<Point>()

  useEffect(() => {
    if (!router.isReady) {
      return
    }

    if (router.query.m2) {
      const m2 = Number.parseInt(router.query.m2 as string)
      if (!Number.isNaN(m2)) {
        setM2(m2)
      }
    }

    const start = (router.query.start || router.query.itineraireStart || router.query.teletravailStart) as string
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

    const end = (router.query.end || router.query.itineraireEnd || router.query.teletravailEnd) as string
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
  }, [router, setM2])

  return (
    <ParamContext.Provider
      value={{
        transport: { km, setKm, start, setStart, end, setEnd },
        chauffage: {
          m2,
          setM2,
        },
      }}>
      {children}
    </ParamContext.Provider>
  )
}

const useParamContext = () => {
  const context = useContext(ParamContext)

  if (!context) {
    throw new Error('useParamContext has to be used within <ParamProvider>')
  }

  return context
}

export default useParamContext
