import copy from 'copy-to-clipboard'
import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

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
  animation: ${(props) => (props.$copied ? flash : 'none')} 400ms 1;
  background-color: ${(props) => props.theme.colors.textLight};
  border-radius: 0.5rem;
  display: block;
  font-size: 0.875rem;
  padding: 1rem 1rem 2rem;
  position: relative;
  word-break: break-word;
`
const Copy = styled.button`
  background: none;
  border: none;
  bottom: 0;
  color: ${(props) => props.theme.colors.main};
  cursor: pointer;
  margin: 0;
  padding: 0.5rem;
  position: absolute;
  right: 0;
  text-decoration: underline;
`
export default function Code(props) {
  const [script, setScript] = useState(null)

  useEffect(() => {
    setScript(
      `<script id="datagir-impact-co2" src="${window?.location.origin}/iframe.js" data-type="${props.type}" data-search="?theme=${props.theme}"></script>`
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
        3) Copiez le code ci-dessous où vous souhaitez afficher l&apos;iframe sur votre site.
      </Label>
      <Text name='code' $copied={copied}>
        {script}
      </Text>
      <Copy
        onClick={() => {
          if (!copied && copy(script)) {
            setCopied(true)
          }
        }}>
        Copier
      </Copy>
    </Wrapper>
  )
}
