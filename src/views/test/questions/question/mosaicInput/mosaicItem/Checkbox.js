import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 1.5rem;
  width: 1.5rem;
  background-color: ${(props) => props.theme.colors.background};
  border: 0.125rem solid ${(props) => props.theme.colors.main};
  border-radius: 0.25rem;
  transition: border 200ms ease-out, background-color 300ms ease-out;

  ${(props) => props.theme.mq.small} {
    height: 1.375rem;
    width: 1.375rem;
  }
`
const Check = styled.svg`
  width: auto;
  height: 1rem;

  ${(props) => props.theme.mq.small} {
    height: 0.875rem;
  }

  path {
    fill: none;
    stroke: ${(props) => props.theme.colors.main};
    stroke-width: 600;
    stroke-dasharray: 4322.794921875;
    stroke-dashoffset: ${(props) => (props.checked ? 0 : 4322.794921875)};
    transition: stroke-dashoffset ${(props) => (props.checked ? '200ms' : '0')}
      ease-out;
  }
`
export default function Checkbox(props) {
  return (
    <Wrapper checked={props.checked} className={'box'}>
      <Check
        checked={props.checked}
        width='3213'
        height='2768'
        viewBox='0 0 3213 2768'
      >
        <path
          id='check'
          d='M165 1360C165 1360 1153 2220 1277 2336C1885.14 828 3101 224 3101 224'
        />
      </Check>
    </Wrapper>
  )
}
