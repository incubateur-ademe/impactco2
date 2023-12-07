import copy from 'copy-to-clipboard'
import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

export default function IflCode(props) {
  const [script, setScript] = useState(null)

  useEffect(() => {
    setScript(
      `<script id="impact-co2" src="${window?.location.origin}/iframe.js" data-type="livraison" data-search="?theme=${props.theme}"></script>`
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
        2) Copiez le <strong>code</strong> ci-dessous où vous souhaitez afficher l&apos;iframe sur votre site.
      </Label>
      <Text name='code' copied={copied}>
        {script}
        <Flex>
          <div>
            <svg aria-hidden='true' xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 16 20' width='16px'>
              {' '}
              <path
                stroke='#457be7'
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M2 5a1 1 0 0 0-1 1v12a.969.969 0 0 0 .933 1h8.1a1 1 0 0 0 1-1.033M10 1v4a1 1 0 0 1-1 1H5m10-4v12a.97.97 0 0 1-.933 1H5.933A.97.97 0 0 1 5 14V5.828a2 2 0 0 1 .586-1.414l2.828-2.828A2 2 0 0 1 9.828 1h4.239A.97.97 0 0 1 15 2Z'
              />{' '}
            </svg>
          </div>
          <div>
            <Copy
              onClick={() => {
                if (!copied && copy(script)) {
                  setCopied(true)
                }
              }}>
              Copier le code
            </Copy>
          </div>
        </Flex>
      </Text>
    </Wrapper>
  )
}

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

const Wrapper = styled.div``
const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
`
const Text = styled.code`
  animation: ${(props) => (props.copied ? flash : 'none')} 400ms 1;
  background-color: ${(props) => props.theme.colors.textLight};
  border-radius: 0.5rem;
  display: block;
  font-size: 0.875rem;
  padding: 1rem 1rem 2rem;
  padding-bottom: 0.5rem;
  word-break: break-word;
`
const Copy = styled.button`
  background: none;
  border: none;
  color: ${(props) => props.theme.colors.firstBlue};
  cursor: pointer;
  margin: 0;
  padding: 0.5rem;
  text-decoration: underline;
`

const Flex = styled.div`
  align-items: center;
  display: flex;
  font-family: 'Marianne';
  justify-content: flex-end;
  margin-top: 1.5rem;
`
