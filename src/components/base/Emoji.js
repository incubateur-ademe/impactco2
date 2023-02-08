import React from 'react'
import styled from 'styled-components'
import twemoji from 'twemoji'

const Wrapper = styled.span`
  display: inline-block;
  font-style: normal;
  vertical-align: middle;

  img {
    display: inline-block;
    height: 1em;
    width: auto;
  }
`
export default function Emoji(props) {
  return props.children ? (
    <Wrapper
      dangerouslySetInnerHTML={{
        __html: twemoji
          .parse(props.children, {
            folder: 'svg',
            ext: '.svg',
            base: 'https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/',
          })
          .replace(props.children, props.alt || ''),
      }}
      className={props.className}
      onClick={props.onClick || (() => null)}
    />
  ) : (
    ''
  )
}
