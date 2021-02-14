import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router-dom'
import copy from 'copy-to-clipboard'

const Wrapper = styled.div`
  margin-bottom: 2em;
`
const Text = styled.code`
  position: relative;
  display: block;
  margin-bottom: 0.5em;
  padding: 1em 0;
  color: ${(props) => props.theme.colors.main};
  word-break: break-word;
  border-bottom: 1px solid ${(props) => props.theme.colors.main};
  cursor: pointer;

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
const Explication = styled.p`
  margin-bottom: 0;
  font-size: 0.875em;
  font-style: italic;
`
export default function Code(props) {
  let location = useLocation()

  const [script, setScript] = useState(
    `<script id="${props.id || 'datagir'}" src="${
      window.location.origin
    }/iframe.js" data-search="${location.search}"></script>`
  )
  useEffect(() => {
    setScript(
      `<script id="${props.id || 'datagir'}" src="${
        window.location.origin
      }/iframe.js" data-search="${location.search}"></script>`
    )
  }, [location.search, props.id])

  const [copied, setCopied] = useState(false)
  return (
    <Wrapper>
      <Text
        copied={copied}
        onClick={() => {
          if (copy(script)) {
            setCopied(true)
          }
        }}
      >
        {script}
      </Text>
      <Explication>
        Copiez ce code puis ajoutez-le où vous souhaitez qu'il s'affiche sur
        votre site web
      </Explication>
    </Wrapper>
  )
}
