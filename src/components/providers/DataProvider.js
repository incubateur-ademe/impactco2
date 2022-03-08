import React, { useState, useEffect } from 'react'
import DataContext from 'utils/DataContext'

import equivalentsData from 'data/equivalents.json'

export default function DataProvider(props) {
  const [equivalents, setEquivalents] = useState([])
  const [currentEquivalent, setCurrentEquivalent] = useState(0)

  useEffect(() => {
    setEquivalents(equivalentsData)
    setCurrentEquivalent(
      equivalentsData.filter((equivalent) => equivalent.default)[0]
    )
  }, [])

  return (
    <DataContext.Provider
      value={{
        equivalents,
        currentEquivalent,
        setCurrentEquivalent,
      }}
    >
      {props.children}
    </DataContext.Provider>
  )
}
