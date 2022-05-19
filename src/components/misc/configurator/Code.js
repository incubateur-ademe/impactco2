import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { useLocation } from '@reach/router'
import copy from 'copy-to-clipboard'

const flash = (props) => keyframes`
  from,
  to {
    background-color: ${props.theme.colors.textLight};
  }

  50% {
    background-color: ${props.theme.colors.secondLight};
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
  padding: 1rem;
  background-color: ${(props) => props.theme.colors.textLight};
  border-radius: 0.5rem;
  word-break: break-word;
  animation: ${(props) => (props.copied ? flash : 'none')} 500ms 1;
`
const Copy = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  margin: 0;
  padding: 0.5rem;
  color: ${(props) => props.theme.colors.main};
  text-decoration: underline;
  background-color: ${(props) => props.theme.colors.textLight};
  border: none;
  cursor: pointer;
  animation: ${(props) => (props.copied ? flash : 'none')} 500ms 1;
`
export default function Code(props) {
  let location = useLocation()
  const [script, setScript] = useState(null)

  useEffect(() => {
    setScript(
      `<script id="${props.id || 'datagir'}" src="${
        window.location.origin
      }/iframe.js" data-search="${
        props.typeShare === 'result' ? location.pathname : ''
      }?theme=${props.theme}"></script>`
    )
  }, [location.pathname, props.id, props.typeShare, props.theme])

  const [copied, setCopied] = useState(false)
  useEffect(() => {
    setTimeout(() => setCopied(false), 500)
  }, [copied])
  return (
    <Wrapper>
      <Label htmlFor='code'>
        3) Copiez le code ci-dessous où vous souhaitez afficher l'iframe sur
        votre site web
      </Label>
      <Text name='code' copied={copied}>
        {script}
      </Text>
      <Copy
        onClick={() => {
          if (copy(script)) {
            setCopied(true)
          }
        }}
        copied={copied}
      >
        Copier
      </Copy>
    </Wrapper>
  )
}
