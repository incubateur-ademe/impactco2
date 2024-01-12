import React, { useRef } from 'react'
import { Range } from 'react-range'
import styled from 'styled-components'
import { track } from 'utils/matomo'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  height: 1.25rem;
`
const Track = styled.div`
  height: 0.0625rem;
  margin: 0 0.625rem;
  position: relative;
  width: 100%;

  &:before {
    background-color: var(--neutral-70);
    bottom: 0;
    content: '';
    left: -0.625rem;
    position: absolute;
    right: -0.625rem;
    top: 0;
  }
`
const Thumb = styled.div`
  background-color: ${(props) => props.color || 'var(--primary-50)'};
  border-radius: 1rem;
  height: 1.25rem;
  width: 1.25rem;
`
export default function Slider(props) {
  const tracked = useRef(false)
  return (
    <Wrapper className={props.className}>
      <Range
        step={props.step || 1}
        min={props.min || 0}
        max={props.max || 10}
        values={[props.value]}
        onChange={(values) => {
          if (!tracked.current) {
            tracked.current = true
            if (props.tracking) {
              track(...props.tracking)
            }
          }

          props.onChange(values[0])
        }}
        renderTrack={({ props, children }) => (
          <Track {...props} data-testid='slider-wrapper'>
            {children}
          </Track>
        )}
        renderThumb={({ props: anotherProps }) => (
          <Thumb {...anotherProps} color={props.color} aria-label={props.ariaLabel} />
        )}
      />
    </Wrapper>
  )
}
