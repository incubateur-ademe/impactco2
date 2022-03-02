import React, { useState, useEffect, useContext } from 'react'
import styled from 'styled-components'
import { useLocation } from '@reach/router'
import copy from 'copy-to-clipboard'

import StyleContext from 'utils/StyleContext'

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
  const { theme } = useContext(StyleContext)
  const [script, setScript] = useState(null)

  useEffect(() => {
    setScript(
      `<script id="${props.id || 'datagir'}" src="${
        window.location.origin
      }/iframe.js" data-search="${
        props.typeShare === 'result' ? location.pathname : ''
      }?theme=${theme}"></script>`
    )
  }, [location.pathname, props.id, props.typeShare, theme])

  const [copied, setCopied] = useState(false)
  return (
    <Wrapper>
      <Text
        copied={copied}
        onClick={() => {
          if (copy(script)) {
            setCopied(true)
          }
          window._paq?.push(['trackEvent', 'Share', 'Embed', props.typeshare])
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
