import React, { Dispatch, InputHTMLAttributes, SetStateAction, useEffect, useRef, useState } from 'react'
import { ZodError } from 'zod'
import { useSuggestions } from 'hooks/useAddress'
import useDebounce from 'hooks/useDebounce'
import { Point } from 'hooks/useItineraries'
import { Icon } from 'components/osezchanger/icons'
import Suggestions from 'components/transport/search/itinerary/address/search/Suggestions'
import { Error, Hint, Label, NotRequired, StyledInput } from './Input.styles'
import useError from './errors'

const AddressInput = ({
  id,
  label,
  hint,
  maxWidth,
  color,
  errors,
  place,
  setPlace,
  ...inputProps
}: InputHTMLAttributes<HTMLInputElement> & {
  id: string
  label?: string
  hint?: string
  maxWidth?: string
  color?: 'secondary'
  errors?: ZodError | null
  place?: string
  setPlace: Dispatch<SetStateAction<Point | undefined>>
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
    <div>
      {label && (
        <Label htmlFor={`input-${id}`} $error={!!error}>
          {label}
          {!inputProps.required && <NotRequired> - Facultatif</NotRequired>}
          {hint && <Hint className='text-sm'>{hint}</Hint>}
        </Label>
      )}
      <StyledInput
        {...inputProps}
        ref={input}
        value={value}
        onChange={(event) => setValue(event.target.value)}
        onFocus={() => setFocus(true)}
        id={`input-${id}`}
        $maxWidth={maxWidth}
        $color={color}
        $error={!!error}
      />
      {data && focus && (
        <Suggestions
          isFetching={isFetching}
          search={debouncedSearch}
          results={data}
          current={current}
          setCurrent={setCurrent}
          handleSuggestionClick={navigateToPlace}
        />
      )}
      {error && (
        <Error className='text-xs'>
          <Icon iconId='error' />
          {error}
        </Error>
      )}
    </div>
  )
}

export default AddressInput
