import React, { useState } from 'react'

import OccupancyModal from './modals/OccupancyModal'
import FootprintModal from './modals/FootprintModal'
import TeletravailModal from './modals/TeletravailModal'

const TransportContext = React.createContext({})

export function TransportProvider(props) {
  const [displayAll, setDisplayAll] = useState(false)

  const [carpool, setCarpool] = useState(false)

  const [km, setKm] = useState(10)

  const [start, setStart] = useState({})
  const [end, setEnd] = useState({})

  const [teletravailTransportation, setTeletravailTransportation] =
    useState(null)
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
        setOccupancyModal: (value) => {
          window?._paq?.push([
            'trackEvent',
            'Interaction',
            'Modal',
            'Par personne',
          ])
          setOccupancyModal(value)
        },
        footprintModal,
        setFootprintModal: (value) => {
          window?._paq?.push([
            'trackEvent',
            'Interaction',
            'Modal',
            'Personnaliser empreinte',
          ])
          setFootprintModal(value)
        },
        teletravailModal,
        setTeletravailModal: (value) => {
          window?._paq?.push([
            'trackEvent',
            'Interaction',
            'Modal',
            'Teletravail',
          ])
          setTeletravailModal(value)
        },
      }}
    >
      {props.children}
      <OccupancyModal />
      <FootprintModal />
      <TeletravailModal />
    </TransportContext.Provider>
  )
}

export default TransportContext
