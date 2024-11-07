import React, { ForwardedRef, ReactNode, forwardRef, useEffect, useState } from 'react'
import HiddenLabel from './HiddenLabel'
import Input from './Input'

const NumberInput = (
  {
    id,
    label,
    value,
    setValue,
    unit,
    unitTitle,
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
    unitTitle?: string
    onUnitClick?: () => void
    extraWidth?: string
    min?: number
    max?: number
  },
  ref: ForwardedRef<HTMLInputElement>
) => {
  const [internalValue, setInternalValue] = useState(value.toString())

  useEffect(() => {
    if (internalValue !== value.toString()) {
      setInternalValue(value ? value.toString() : '')
    }
  }, [value])

  useEffect(() => {
    const newValue = Number(internalValue)
    if (value !== newValue) {
      if (max !== undefined && newValue > max) {
        setInternalValue(max.toString())
      } else if (min !== undefined && newValue < min) {
        setInternalValue(min.toString())
      } else {
        setValue(newValue)
      }
    }
  }, [internalValue])

  return (
    <>
      {label && <HiddenLabel htmlFor={`input-${id}`}>{label}</HiddenLabel>}
      <Input
        ref={ref}
        title={label}
        id={id}
        value={internalValue}
        onChange={(event) => setInternalValue(event.target.value)}
        type='number'
        unitTitle={unitTitle}
        unit={unit}
        min={min === undefined ? 1 : min}
        max={max}
        onUnitClick={onUnitClick}
        extraWidth={extraWidth}
      />
    </>
  )
}

export default forwardRef(NumberInput)
