'use client'

import classNames from 'classnames'
import React, { Dispatch, InputHTMLAttributes, SetStateAction, useEffect, useRef, useState } from 'react'
import { ZodError } from 'zod'
import { useSuggestions } from 'hooks/useAddress'
import useDebounce from 'hooks/useDebounce'
import { Point } from 'hooks/useItineraries'
import ErrorIcon from 'components/base/icons/error'
import LoadingIcon from 'components/base/icons/loading'
import Suggestions from 'components/form/addresses/Suggestions'
import inputStyles from '../Input.module.css'
import useError from '../errors'
import styles from './AddressInput.module.css'

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
    } else {
      setValue('')
    }
  }, [place])

  useEffect(() => {
    if (!focus) {
      setCurrent(0)
      if (input.current) {
        input.current.blur()
      }
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
          {!inputProps.required && <span className={inputStyles.notRequired}> - Facultatif</span>}
          {hint && <span className={classNames(inputStyles.hint, 'text-sm')}>{hint}</span>}
        </label>
      )}
      <input
        className={classNames(inputStyles.input, {
          [inputStyles.withIcon]: isFetching,
          [inputStyles.inputError]: !!error,
        })}
        {...inputProps}
        autoComplete='off'
        ref={input}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setFocus(true)}
        id={`input-${id}`}
        onBlur={() => setFocus(false)}
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
            results={data}
            current={current}
            setCurrent={setCurrent}
            handleSuggestionClick={navigateToPlace}
          />
        </div>
      )}
      {error && (
        <div className={classNames(inputStyles.error, 'text-xs')}>
          <ErrorIcon />
          {error}
        </div>
      )}
    </div>
  )
}

export default AddressInput
