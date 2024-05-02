'use client'

import classNames from 'classnames'
import React, { Dispatch, InputHTMLAttributes, SetStateAction, useEffect, useRef, useState } from 'react'
import { ZodError } from 'zod'
import { useSuggestions } from 'hooks/useAddress'
import useDebounce from 'hooks/useDebounce'
import { Point } from 'hooks/useItineraries'
import { Icon } from 'components/osezchanger/icons'
import LoadingIcon from 'components/osezchanger/icons/loading'
import Suggestions from 'components/transport/search/itinerary/address/search/Suggestions'
import styles from './AddressInput.module.css'
import inputStyles from './Input.module.css'
import useError from './errors'

const AddressInput = ({
  id,
  label,
  hint,
  errors,
  place,
  setPlace,
  large,
  ...inputProps
}: InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label?: string
  hint?: string
  errors?: ZodError | null
  place?: string
  setPlace: Dispatch<SetStateAction<Point | undefined>>
  large?: boolean
}) => {
  const [value, setValue] = useState('')
  const input = useRef<HTMLInputElement>(null)
  const debouncedSearch: string = useDebounce(value)
  const [focus, setFocus] = useState(false)
  const { data, isFetching } = useSuggestions(debouncedSearch, focus)
  const [current, setCurrent] = useState(0)

  useEffect(() => {
    if (place) {
      setValue(place)
    }
  }, [place])

  useEffect(() => {
    if (!focus) {
      setCurrent(0)
      input.current && input.current.blur()
    }
  }, [focus])

  const navigateToPlace = (place: Point) => {
    if (place) {
      setPlace(place)
      setFocus(false)
    }
  }

  const error = useError(id, errors)
  return (
    <div className={styles.container}>
      {label && (
        <label className={classNames(inputStyles.label, { [inputStyles.labelError]: !!error })} htmlFor={`input-${id}`}>
          {label}
          {!inputProps.required && <div className={inputStyles.notRequired}> - Facultatif</div>}
          {hint && <div className={classNames(inputStyles.hint, 'text-sm')}>{hint}</div>}
        </label>
      )}
      <input
        className={classNames(inputStyles.input, {
          [inputStyles.withIcon]: isFetching,
          [inputStyles.inputError]: !!error,
        })}
        {...inputProps}
        ref={input}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setFocus(true)}
        id={`input-${id}`}
      />
      {isFetching && (
        <div className={classNames(styles.loading, { [styles.largeLoading]: large })}>
          <LoadingIcon />
        </div>
      )}
      {data && focus && (
        <div className={styles.suggestionsContainer}>
          <Suggestions
            isFetching={isFetching}
            search={debouncedSearch}
            results={data}
            current={current}
            setCurrent={setCurrent}
            handleSuggestionClick={navigateToPlace}
          />
        </div>
      )}
      {error && (
        <div className={classNames(inputStyles.error, 'text-xs')}>
          <Icon iconId='error' />
          {error}
        </div>
      )}
    </div>
  )
}

export default AddressInput
