import copy from 'copy-to-clipboard'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  margin-bottom: 3rem;
  position: relative;
`
const Text = styled.input`
  background: transparent;
  border: none;
  border-bottom: 1px solid ${(props) => props.theme.colors.main};
  color: ${(props) => props.theme.colors.text};
  cursor: pointer;
  display: block;
  font-family: 'Courier New', Courier, monospace;
  line-height: inherit;
  overflow: hidden;
  padding: 0.3rem 0;
  position: relative;
  white-space: nowrap;
  width: 100%;

  &:before {
    bottom: 0;
    color: ${(props) => props.theme.colors.main};
    content: 'Copié !';
    font-size: 0.875em;
    opacity: ${(props) => (props.copied ? 1 : 0)};
    position: absolute;
    right: 0;
  }
`
const Copy = styled.button`
  background-color: ${(props) => props.theme.colors.main};
  border: none;
  border-radius: 0.5rem 0.5rem 0 0;
  bottom: 0;
  color: ${(props) => props.theme.colors.background};
  cursor: pointer;
  height: 100%;
  padding: 0.5rem 0.3rem 0.5rem 1rem;
  position: absolute;
  right: 0;

  &:focus {
    outline: none;
  }
`
const Check = styled.svg`
  height: auto;
  opacity: ${(props) => (props.$copied ? 1 : 0)};
  vertical-align: top;
  width: 1rem;
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
        }}>
        Copier{' '}
        <Check $copied={copied} height='417pt' viewBox='0 -46 417.81333 417' width='417pt'>
          <path d='m159.988281 318.582031c-3.988281 4.011719-9.429687 6.25-15.082031 6.25s-11.09375-2.238281-15.082031-6.25l-120.449219-120.46875c-12.5-12.5-12.5-32.769531 0-45.246093l15.082031-15.085938c12.503907-12.5 32.75-12.5 45.25 0l75.199219 75.203125 203.199219-203.203125c12.503906-12.5 32.769531-12.5 45.25 0l15.082031 15.085938c12.5 12.5 12.5 32.765624 0 45.246093zm0 0' />
        </Check>
      </Copy>
    </Wrapper>
  )
}
