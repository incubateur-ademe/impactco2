import React, { useState } from 'react'

const TransportContext = React.createContext({})

export function TransportProvider(props) {
  const [construction, setConstruction] = useState(false)

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

  return (
    <TransportContext.Provider
      value={{
        construction,
        setConstruction,
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
      }}
    >
      {props.children}
    </TransportContext.Provider>
  )
}

export default TransportContext
