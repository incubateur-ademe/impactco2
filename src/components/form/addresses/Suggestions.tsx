'use client'

import classNames from 'classnames'
import React, { Dispatch, SetStateAction, useCallback, useEffect, useRef } from 'react'
import { Address } from 'types/address'
import { displayAddress } from 'utils/address'
import { Point } from 'hooks/useItineraries'
import styles from './Suggestions.module.css'

const Suggestions = ({
  current,
  setCurrent,
  results,
  handleSuggestionClick,
}: {
  current: number
  setCurrent: Dispatch<SetStateAction<number>>
  isFetching: boolean
  results: Address[]
  handleSuggestionClick: (point?: Point) => void
}) => {
  const maxSuggestions = 7
  const ref = useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.focus()
    }
  }, [ref])

  const onKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.code === 'ArrowDown') {
        e.preventDefault()
        setCurrent(current < maxSuggestions - 1 ? (prevCurrent) => prevCurrent + 1 : 0)
      }
      if (e.code === 'ArrowUp') {
        e.preventDefault()
        if (current > 0) {
          setCurrent((prevCurrent) => prevCurrent - 1)
        }
      }
      if (e.code === 'Enter') {
        const result = results[current]
        if (result) {
          handleSuggestionClick({
            latitude: result.geometry.coordinates[1],
            longitude: result.geometry.coordinates[0],
            city: result.properties.city || result.properties.name || '',
            address: displayAddress(result),
          })
        }
      }
      if (e.code === 'Escape') {
        handleSuggestionClick(undefined)
      }
    },
    [current, setCurrent, handleSuggestionClick, results]
  )

  useEffect(() => {
    window.addEventListener('keydown', onKeyDown)

    return () => {
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [onKeyDown])

  return (
    <ul className={styles.container} data-testid='transportSuggest' ref={ref}>
      {results
        .map((result) => ({ ...result, display: displayAddress(result) }))
        .filter((result, index, array) => array.findIndex((adress) => adress.display === result.display) === index)
        .map((result, index) => {
          return (
            index < maxSuggestions && (
              <li
                role='option'
                className={classNames(styles.suggestion, { [styles.current]: index === current })}
                key={result.properties.osm_id}
                onClick={() =>
                  handleSuggestionClick({
                    latitude: result.geometry.coordinates[1],
                    longitude: result.geometry.coordinates[0],
                    city: result.properties.city || result.properties.name || '',
                    address: displayAddress(result),
                  })
                }
                onMouseDown={(e) => e.preventDefault()}>
                {displayAddress(result)}
              </li>
            )
          )
        })}
    </ul>
  )
}

export default Suggestions
