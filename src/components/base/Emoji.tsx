import React from 'react'
import styled from 'styled-components'
import twemoji from 'twemoji'

const Wrapper = styled.span<{ $height?: string }>`
  display: inline-flex;
  ${({ $height }) => $height && `height: ${$height};`}
  font-style: normal;
  vertical-align: middle;

  img {
    display: inline-block;
    height: ${({ $height }) => ($height ? $height : '1em')};
    width: auto;
  }
`

export default function Emoji({
  children,
  className,
  onClick,
  height,
}: {
  children: string
  className?: string
  onClick?: () => void
  height?: string
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
      $height={height}
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
