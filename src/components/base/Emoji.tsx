import classNames from 'classnames'
import React from 'react'
import twemoji from 'twemoji'
import styles from './Emoji.module.css'

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

    stringDOMforEmoji = parsed.replace(/alt=".*?"/g, 'alt=""')
  }
  return stringDOMforEmoji ? (
    <div
      className={classNames(styles.wrapper, className)}
      style={{ height: height || '1em' }}
      dangerouslySetInnerHTML={{
        __html: stringDOMforEmoji,
      }}
      onClick={onClick || (() => null)}
    />
  ) : (
    ''
  )
}
