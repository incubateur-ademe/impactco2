import React, { useState, useEffect } from 'react'
import {
  useQueryParam,
  DelimitedArrayParam,
  withDefault,
} from 'use-query-params'

import EquivalentsContext from 'utils/EquivalentsContext'

export default function CO2NumberProvider(props) {
  const [equivalents, setEquivalents] = useState([])

  const [equivalentsVisibles, setEquivalentsVisibles] = useQueryParam(
    'equivalents',
    withDefault(DelimitedArrayParam, [])
  )

  const [equivalentsFetched, setEquivalentsFetched] = useState(false)

  useEffect(() => {
    if (!equivalentsFetched) {
      setEquivalentsFetched(true)
      fetch('/data/equivalents.json')
        .then((res) => res.json())
        .then((res) => {
          if (equivalentsVisibles.length) {
            const startList = equivalentsVisibles
              .map((equivalentId) =>
                res.find((equivalent) => String(equivalent.id) === equivalentId)
              )
              .filter((equivalent) => equivalent)
              .map((equivalent) => {
                equivalent.active = true
                return equivalent
              })

            const endList = res
              .filter(
                (equivalent) =>
                  !equivalentsVisibles.includes(String(equivalent.id))
              )
              .map((equivalent) => {
                equivalent.active = false
                return equivalent
              })
            setEquivalents([...startList, ...endList])
          } else {
            setEquivalents(
              res.map((equivalent) => {
                equivalent.active = equivalent.default
                return equivalent
              })
            )
          }
        })
    }
  }, [equivalentsVisibles, equivalentsFetched])

  return (
    <EquivalentsContext.Provider
      value={{
        equivalents,
        setEquivalents: (equivalents) => {
          setEquivalents(equivalents)
          setEquivalentsVisibles(
            equivalents
              .filter((equivalent) => equivalent.active)
              .map((equivalent) => equivalent.id)
          )
        },
      }}
    >
      {props.children}
    </EquivalentsContext.Provider>
  )
}
