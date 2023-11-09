import Link from 'next/link'
import React from 'react'
import NewTabIcon from './NewTabIcon'

export default function MagicLink(props) {
  return !props.to ? (
    <button
      className={props.className}
      onClick={props.onClick}
      aria-label={props['aria-label']}
      disabled={props.disabled}
      type={props.type}>
      {props.children}
    </button>
  ) : props.to.includes(':') || props.to.includes('.') || (props.to.includes('#') && !props.internal) ? (
    <a
      className={props.className}
      href={props.to}
      onClick={props.onClick || null}
      target={props.to.includes(':') || props.to.includes('.') ? '_blank' : '_self'}
      rel='noreferrer noopener'
      aria-label={props['aria-label']}
      data-testid='magic-link'>
      {props.children}
      {!props.noIcon && <NewTabIcon />}
    </a>
  ) : (
    <Link href={props.to} className={props.className} onClick={props.onClick || null} aria-label={props['aria-label']}>
      {props.children}
    </Link>
  )
}
