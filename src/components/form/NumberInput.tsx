import React, { ReactNode, useEffect, useState } from 'react'
import HiddenLabel from './HiddenLabel'
import Input from './Input'

const NumberInput = ({
  id,
  label,
  value,
  setValue,
  unit,
  onUnitClick,
  extraWidth,
}: {
  id: string
  label?: string
  value: number
  setValue: (value: number) => void
  unit: ReactNode
  onUnitClick?: () => void
  extraWidth?: string
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
      {label && <HiddenLabel htmlFor={`input-${id}`}>{label}</HiddenLabel>}
      <Input
        id={id}
        value={internalValue}
        onChange={(event) => setInternalValue(event.target.value)}
        type='number'
        unit={unit}
        min={1}
        onUnitClick={onUnitClick}
        extraWidth={extraWidth}
      />
    </>
  )
}

export default NumberInput
