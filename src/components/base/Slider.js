import React from 'react'
import styled from 'styled-components'
import { Range } from 'react-range'

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  height: 1.25rem;
`
const Track = styled.div`
  position: relative;
  width: 100%;
  height: 0.0625rem;
  margin: 0 0.625rem;

  &:before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: -0.625rem;
    right: -0.625rem;
    background-color: ${(props) => props.theme.colors.text};
  }
`
const Thumb = styled.div`
  width: 1.25rem;
  height: 1.25rem;
  background-color: ${(props) => props.color || props.theme.colors.main};
  border-radius: 1rem;
`
export default function Slider(props) {
  return (
    <Wrapper className={props.className}>
      <Range
        step={props.step || 1}
        min={props.min || 0}
        max={props.max || 10}
        values={[props.value]}
        onChange={(values) => {
          props.onChange(values[0])
        }}
        renderTrack={({ props, children }) => (
          <Track {...props}>{children}</Track>
        )}
        renderThumb={({ props: anotherProps }) => (
          <Thumb
            {...anotherProps}
            color={props.color}
            aria-label={props.ariaLabel}
          />
        )}
      />
    </Wrapper>
  )
}
