'use client'

import classNames from 'classnames'
import React, { Dispatch, InputHTMLAttributes, SetStateAction, useEffect, useRef, useState } from 'react'
import { ZodError } from 'zod'
import { displayAddress } from 'utils/address'
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
  const [open, setOpen] = useState(false)
  const { data, isFetching } = useSuggestions(debouncedSearch, focus, place)
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
      setOpen(false)
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
        role='combobox'
        aria-controls={`suggestions-${id}`}
        aria-expanded={focus}
        aria-activedescendant={data && focus ? displayAddress(data[current]) : undefined}
        aria-autocomplete='list'
        className={classNames(inputStyles.input, {
          [inputStyles.withIcon]: isFetching,
          [inputStyles.inputError]: !!error,
        })}
        {...inputProps}
        autoComplete='off'
        ref={input}
        value={value}
        onChange={(event) => {
          setPlace(undefined)
          setOpen(true)
          setValue(event.target.value)
        }}
        onFocus={() => {
          setOpen(true)
          setFocus(true)
        }}
        id={`input-${id}`}
        onBlur={() => setFocus(false)}
      />
      {isFetching && (
        <div className={classNames(styles.loading, { [styles.largeLoading]: large })}>
          <LoadingIcon />
        </div>
      )}
      <div id={`suggestions-${id}`} aria-label={isFetching ? 'chargement en cours' : `${data?.length} resultats`}>
        {data && focus && open && (
          <Suggestions
            isFetching={isFetching}
            results={data}
            current={current}
            setCurrent={setCurrent}
            handleSuggestionClick={navigateToPlace}
          />
        )}
      </div>
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
