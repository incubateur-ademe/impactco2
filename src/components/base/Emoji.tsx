import React from 'react'
import styled from 'styled-components'
import twemoji from 'twemoji'

const Wrapper = styled.span<{ $big?: boolean }>`
  display: inline-block;
  font-style: normal;
  height: ${({ $big }) => ($big ? '1.5' : '1')}em;
  vertical-align: middle;

  img {
    display: inline-block;
    height: 100%;
    width: auto;
  }
`

export default function Emoji({
  children,
  className,
  onClick,
  big,
}: {
  children: string
  className?: string
  onClick?: () => void
  big?: boolean
}) {
  let stringDOMforEmoji = null

  if (children) {
    const parsed = twemoji.parse(children, {
      folder: 'svg',
      ext: '.svg',
      base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/',
    })

    stringDOMforEmoji = parsed.replaceAll(/alt=".*?"/g, 'alt=""')
  }

  return stringDOMforEmoji ? (
    <Wrapper
      $big={big}
      dangerouslySetInnerHTML={{
        __html: stringDOMforEmoji,
      }}
      className={className}
      onClick={onClick || (() => null)}
    />
  ) : (
    ''
  )
}
