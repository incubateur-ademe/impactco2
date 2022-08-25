import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import copy from 'copy-to-clipboard'

const flash = (props) => keyframes`
  from,
  to {
    background-color: ${props.theme.colors.textLight};
  }

  35%,
  55% {
    background-color: ${props.theme.colors.secondDark};
  }
`

const Wrapper = styled.div`
  position: relative;
`
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`
const Text = styled.code`
  position: relative;
  display: block;
  padding: 1rem 1rem 2rem;
  font-size: 0.875rem;
  word-break: break-word;
  background-color: ${(props) => props.theme.colors.textLight};
  border-radius: 0.5rem;
  animation: ${(props) => (props.copied ? flash : 'none')} 400ms 1;
`
const Copy = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0;
  padding: 0.5rem;
  color: ${(props) => props.theme.colors.main};
  text-decoration: underline;
  background: none;
  border: none;
  cursor: pointer;
`
export default function Code(props) {
  const [script, setScript] = useState(null)

  useEffect(() => {
    setScript(
      `<script id="datagir-mon-convertisseur-co2" src="${window?.location.origin}/iframe.js" data-search="${props.type}?theme=${props.theme}"></script>`
    )
  }, [props.theme, props.type])

  const [copied, setCopied] = useState(false)

  const unsetCopied = () => setCopied(false)
  useEffect(() => {
    setTimeout(unsetCopied, 400)
    return () => clearTimeout(unsetCopied)
  }, [copied])

  return (
    <Wrapper>
      <Label htmlFor='code'>
        3) Copiez le code ci-dessous où vous souhaitez afficher l&apos;iframe
        sur votre site.
      </Label>
      <Text name='code' copied={copied}>
        {script}
      </Text>
      <Copy
        onClick={() => {
          if (!copied && copy(script)) {
            setCopied(true)
          }
        }}
      >
        Copier
      </Copy>
    </Wrapper>
  )
}
