import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import HiddenLabel from './HiddenLabel'
import Input from './Input'

const NumberInput = ({
  id,
  label,
  value,
  setValue,
  unit,
}: {
  id: string
  label: string
  value: number
  setValue: Dispatch<SetStateAction<number>>
  unit: string
}) => {
  const [internalValue, setInternalValue] = useState(value.toString())

  useEffect(() => {
    if (internalValue !== value.toString()) {
      setInternalValue(value ? value.toString() : '')
    }
  }, [value])

  useEffect(() => {
    setValue(Number(internalValue))
  }, [internalValue])

  return (
    <>
      <HiddenLabel htmlFor={`input-${id}`}>{label}</HiddenLabel>
      <Input
        id={id}
        value={internalValue}
        onChange={(event) => setInternalValue(event.target.value)}
        type='number'
        unit={unit}
        maxWidth='11.25rem'
        min={1}
      />
    </>
  )
}

export default NumberInput
