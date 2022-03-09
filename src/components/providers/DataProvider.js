import React, { useState, useEffect } from 'react'
import { navigate } from 'gatsby'

import DataContext from 'utils/DataContext'
import equivalentsData from 'data/equivalents.json'

export default function DataProvider(props) {
  const [equivalents, setEquivalents] = useState([])
  const [currentEquivalent, setCurrentEquivalent] = useState(0)

  useEffect(() => {
    setEquivalents(equivalentsData)
    setCurrentEquivalent(
      (window.location.hash &&
        equivalentsData.find(
          (equivalent) =>
            String(equivalent.id) === window.location.hash.replace('#', '')
        )) ||
        equivalentsData.filter((equivalent) => equivalent.default)[0]
    )
  }, [])

  return (
    <DataContext.Provider
      value={{
        equivalents,
        currentEquivalent,
        setCurrentEquivalent: (equivalent) => {
          navigate(`#${equivalent.id}`)
          setCurrentEquivalent(equivalent)
        },
      }}
    >
      {props.children}
    </DataContext.Provider>
  )
}
