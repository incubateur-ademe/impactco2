import copy from 'copy-to-clipboard'
import React, { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const Wrapper = styled.div`
  position: relative;
`
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`
const Text = styled.code<{ $copied: boolean }>`
  animation: ${(props) =>
      props.$copied
        ? keyframes`
            from,
            to {
              background-color: ${props.theme.colors.textLight};
            }

            35%,
            55% {
              background-color: ${props.theme.colors.secondDark};
            }
          `
        : 'none'}
    400ms 1;
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
export default function Code({ theme, type, extraParams }: { theme: string; type: string; extraParams: string }) {
  const [script, setScript] = useState('')

  useEffect(() => {
    setScript(
      `<script id="impact-co2" src="${window?.location
        .origin}/iframe.js" data-type="${type}" data-search="?theme=${theme}${
        extraParams ? `&${extraParams}` : ''
      }"></script>`
    )
  }, [theme, type, extraParams])

  const [copied, setCopied] = useState(false)

  const timeout = useRef<NodeJS.Timeout | null>(null)
  useEffect(() => {
    timeout.current = setTimeout(() => setCopied(false), 400)
    return () => {
      if (timeout.current) {
        clearTimeout(timeout.current)
      }
    }
  }, [copied])

  return (
    <Wrapper>
      <Label htmlFor='code'>
        3) Copiez le code ci-dessous où vous souhaitez afficher l&apos;iframe sur votre site.
      </Label>
      <Text $copied={copied}>{script}</Text>
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
