import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.button`
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  padding-right: 0.75rem;
  background: ${(props) => props.theme.colors.background};
  border: none;
  border-radius: 1.375rem;
  opacity: ${(props) => (props.visible ? 1 : 0)};
  pointer-events: ${(props) => (props.visible ? 'inherit' : 'none')};
  transition: opacity ${(props) => (props.visible ? 600 : 0)}ms;
  cursor: pointer;

  &:focus {
    opacity: 1;
  }

  svg {
    display: block;
    width: 1.25rem;
    height: auto;

    path {
      fill: ${(props) => props.theme.colors.main};
    }
  }
`
export default function Submit(props) {
  return (
    <Wrapper
      visible={props.visible}
      onFocus={() => props.setFocus(true)}
      onBlur={() => props.setFocus(false)}
    >
      <svg width='42' height='42' viewBox='0 0 42 42'>
        <path d='M2.52447 23.948C2.69632 23.9759 2.87024 23.9888 3.04425 23.9865L32.6744 23.9865L32.0283 24.287C31.3968 24.5859 30.8222 24.9928 30.3304 25.4891L22.0214 33.7981C20.9271 34.8427 20.7432 36.5232 21.5857 37.7798C22.5662 39.1189 24.4465 39.4096 25.7856 38.4291C25.8938 38.3499 25.9967 38.2635 26.0933 38.1705L41.1187 23.1451C42.2929 21.9722 42.2939 20.0695 41.121 18.8953C41.1203 18.8945 41.1194 18.8937 41.1187 18.8929L26.0933 3.86753C24.9181 2.69564 23.0154 2.69827 21.8435 3.87344C21.7512 3.96594 21.6651 4.06436 21.5857 4.16803C20.7432 5.42463 20.9271 7.10512 22.0214 8.14976L30.3154 16.4738C30.7563 16.9152 31.2632 17.2853 31.818 17.5707L32.7195 17.9764L3.20963 17.9764C1.6745 17.9194 0.327661 18.9917 0.0392677 20.5006C-0.2264 22.1389 0.886232 23.6823 2.52447 23.948Z' />
      </svg>
    </Wrapper>
  )
}
