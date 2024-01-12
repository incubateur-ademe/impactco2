import React, { Dispatch, SetStateAction } from 'react'
import { track } from 'utils/matomo'
import { Icon } from '../icons'
import { Container, Input, LeftButton, RightButton } from './NumberInput.styles'

const NumberInput = ({
  id,
  tracking,
  value,
  setValue,
  'data-testid': dataTestId,
}: {
  id: string
  tracking: string
  value: number | undefined
  setValue: Dispatch<SetStateAction<number | undefined>>
  ['data-testid']?: string
}) => {
  return (
    <Container>
      <LeftButton
        aria-label='moins'
        disabled={value === 0}
        onClick={() => {
          track('OsezChanger', `${tracking}-minus`, `osez_changer_${tracking}_minus`)
          if (value === undefined) {
            setValue(0)
          } else if (value > 0) {
            setValue(value - 1)
          }
        }}>
        <Icon iconId='minus' />
      </LeftButton>
      <Input
        id={id}
        data-testid={`${dataTestId}-input`}
        type='number'
        value={value === undefined ? '' : value}
        onChange={(e) => {
          const numberValue = Number.parseInt(e.target.value)
          if (Number.isNaN(numberValue)) {
            setValue(undefined)
          } else if (numberValue < 0) {
            setValue(0)
          } else {
            setValue(numberValue)
          }
        }}
        step={1}
        min={0}
        max={99}
      />
      <RightButton
        aria-label='plus'
        onClick={() => {
          track('OsezChanger', `${tracking}-plus`, `osez_changer_${tracking}_plus`)
          if (value === undefined) {
            setValue(1)
          } else {
            setValue(value + 1)
          }
        }}>
        <Icon iconId='plus' />
      </RightButton>
    </Container>
  )
}

export default NumberInput
