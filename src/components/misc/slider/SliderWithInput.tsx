import React, { Dispatch, SetStateAction, useState } from 'react'
import { Range } from 'react-range'
import styled from 'styled-components'
import NumberInput from './NumberInput'
import PlusOrMinusButton from './PlusOrMinusButton'
import ThumbContent from './ThumbContent'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 2.5rem;
  margin: 0 auto;
  max-width: 30rem;
`

const Track = styled.div`
  flex: 1;
  height: 0.125rem;
  margin: 0 3.75rem;
  position: relative;

  &:before {
    background-color: ${(props) => props.theme.colors.mainLight};
    bottom: 0;
    content: '';
    left: -2.75rem;
    position: absolute;
    right: -2.75rem;
    top: 0;
  }
`
const Thumb = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colors.main};
  border-radius: 1.5rem;
  color: ${(props) => props.theme.colors.background};
  display: flex;
  font-weight: 700;
  height: 2.5rem;
  justify-content: flex-end;
  padding: 0 0.6rem 0 0.1rem;
  text-align: center;
  width: 7rem;

  &:focus {
    box-shadow: 0 0 0 0.125rem ${(props) => props.theme.colors.mainLight};
    outline: none;
  }
`
const SliderWithInput = ({
  value,
  setValue,
  unit,
  digit,
}: {
  value: number
  setValue: Dispatch<SetStateAction<number>>
  unit: string
  digit: number
}) => {
  const cleanRound = (x: number) => {
    return Number(x.toPrecision(1))
  }

  const getPositionFromKm = (km: number) => {
    const position = Math.round((Math.log(km * 10) / Math.log(10) - 1) * 1000) / 1000
    return position > digit ? digit : position
  }
  const getKmFromPosition = (position: number) => Math.round(Math.pow(10, position))

  const [openTextInput, setOpenTextInput] = useState(false)

  return (
    <Wrapper>
      {openTextInput ? (
        <NumberInput
          value={value}
          max={Math.pow(10, digit)}
          setValue={(newValue) => {
            setValue(newValue)
            setOpenTextInput(false)
          }}
        />
      ) : (
        <>
          <PlusOrMinusButton
            onClick={() => {
              const position = getPositionFromKm(value)
              setValue(cleanRound(getKmFromPosition(position - digit / 10 < 0 ? 0 : position - digit / 10)))
            }}
          />
          <Range
            step={0.001}
            min={0}
            max={digit}
            values={[getPositionFromKm(value)]}
            onChange={(values) => {
              setValue(getKmFromPosition(values[0]))
            }}
            renderTrack={({ props, children }) => <Track {...props}>{children}</Track>}
            renderThumb={({ props }) => (
              // Thumb can't be in his own component (don't know why)
              <Thumb {...props} aria-label='Distance'>
                <ThumbContent value={value} setOpenTextInput={setOpenTextInput} unit={unit} />
              </Thumb>
            )}
          />
          <PlusOrMinusButton
            onClick={() => {
              const position = getPositionFromKm(value)
              setValue(cleanRound(getKmFromPosition(position + digit / 10 > digit ? digit : position + digit / 10)))
            }}
            plus
          />
        </>
      )}
    </Wrapper>
  )
}
export default SliderWithInput
