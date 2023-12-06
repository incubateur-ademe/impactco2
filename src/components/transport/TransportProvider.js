import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { searchAddress } from 'hooks/useAddress'
import FootprintModal from './modals/FootprintModal'
import OccupancyModal from './modals/OccupancyModal'
import TeletravailModal from './modals/TeletravailModal'
import { displayAddress } from './search/itinerary/Address'

const TransportContext = React.createContext({})

export function TransportProvider(props) {
  const router = useRouter()

  const [displayAll, setDisplayAll] = useState(false)

  const [carpool, setCarpool] = useState(0)

  const [km, setKm] = useState(10)

  const [start, setStart] = useState({})
  const [end, setEnd] = useState({})

  const [teletravailTransportation, setTeletravailTransportation] = useState(null)
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
    if (router.query.start) {
      searchAddress(router.query.start, 1).then((result) => {
        if (result.length > 0) {
          const address = result[0]
          setStart({
            latitude: address.geometry.coordinates[1],
            longitude: address.geometry.coordinates[0],
            address: displayAddress(address),
          })
        }
      })
    }
    if (router.query.end) {
      searchAddress(router.query.end, 1).then((result) => {
        if (result.length > 0) {
          const address = result[0]
          setEnd({
            latitude: address.geometry.coordinates[1],
            longitude: address.geometry.coordinates[0],
            address: displayAddress(address),
          })
        }
      })
    }
  }, [router])

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
        setOccupancyModal: (value) => {
          window?.please?.track(['trackEvent', 'Interaction', 'Modal', 'Par personne'])
          setOccupancyModal(value)
        },
        footprintModal,
        setFootprintModal: (value) => {
          window?.please?.track(['trackEvent', 'Interaction', 'Modal', 'Personnaliser empreinte'])
          setFootprintModal(value)
        },
        teletravailModal,
        setTeletravailModal: (value) => {
          window?.please?.track(['trackEvent', 'Interaction', 'Modal', 'Teletravail'])
          setTeletravailModal(value)
        },
      }}>
      {props.children}
      <OccupancyModal />
      <FootprintModal />
      <TeletravailModal />
    </TransportContext.Provider>
  )
}

export default TransportContext
