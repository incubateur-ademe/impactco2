import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import copy from 'copy-to-clipboard'

const Wrapper = styled.div`
  position: relative;
  margin-bottom: 3rem;
`
const Text = styled.input`
  position: relative;
  display: block;
  width: 100%;
  padding: 0.3rem 0;
  color: ${(props) => props.theme.colors.text};
  font-family: 'Courier New', Courier, monospace;
  line-height: inherit;
  white-space: nowrap;
  background: transparent;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.main};
  cursor: pointer;
  overflow: hidden;

  &:before {
    content: 'Copié !';
    position: absolute;
    bottom: 0;
    right: 0;
    font-size: 0.875em;
    color: ${(props) => props.theme.colors.main};
    opacity: ${(props) => (props.copied ? 1 : 0)};
    transition: opacity 300ms ease-out;
  }
`
const Copy = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 100%;
  padding: 0.5rem 0.3rem 0.5rem 1rem;
  color: ${(props) => props.theme.colors.background};
  background-color: ${(props) => props.theme.colors.main};
  border: none;
  border-radius: 0.5rem 0.5rem 0 0;
  cursor: pointer;

  &:focus {
    outline: none;
  }
`
const Check = styled.svg`
  width: 1rem;
  height: auto;
  vertical-align: top;
  opacity: ${(props) => (props.copied ? 1 : 0)};
  transition: opacity 200ms ease-out;
  path {
    fill: ${(props) => props.theme.colors.background};
  }
`
export default function Code(props) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    return () => {
      setCopied(false)
    }
  }, [props.url])

  return (
    <Wrapper>
      <Text
        readOnly={true}
        value={props.url}
        onClick={() => {
          if (copy(props.url)) {
            setCopied(true)
          }
        }}
      />
      <Copy
        onClick={() => {
          if (copy(props.url)) {
            setCopied(true)
          }
        }}
      >
        Copier{' '}
        <Check
          copied={copied}
          height='417pt'
          viewBox='0 -46 417.81333 417'
          width='417pt'
        >
          <path d='m159.988281 318.582031c-3.988281 4.011719-9.429687 6.25-15.082031 6.25s-11.09375-2.238281-15.082031-6.25l-120.449219-120.46875c-12.5-12.5-12.5-32.769531 0-45.246093l15.082031-15.085938c12.503907-12.5 32.75-12.5 45.25 0l75.199219 75.203125 203.199219-203.203125c12.503906-12.5 32.769531-12.5 45.25 0l15.082031 15.085938c12.5 12.5 12.5 32.765624 0 45.246093zm0 0' />
        </Check>
      </Copy>
    </Wrapper>
  )
}
