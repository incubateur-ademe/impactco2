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
  min,
  max,
}: {
  id: string
  label?: string
  value: number
  setValue: (value: number) => void
  unit: ReactNode
  onUnitClick?: () => void
  extraWidth?: string
  min?: number
  max?: number
}) => {
  const [internalValue, setInternalValue] = useState(value.toString())

  useEffect(() => {
    if (internalValue !== value.toString()) {
      setInternalValue(value ? value.toString() : '')
    }
  }, [value])

  useEffect(() => {
    if (value !== Number(internalValue)) {
      setValue(Number(internalValue))
    }
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
        min={min === undefined ? 1 : min}
        max={max}
        onUnitClick={onUnitClick}
        extraWidth={extraWidth}
      />
    </>
  )
}

export default NumberInput
