import React from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function MagicLink(props) {
  const { search } = useLocation()
  return !props.to ? (
    <button className={props.className} onClick={props.onClick}>
      {props.children}
    </button>
  ) : props.to.includes('http') || props.to.includes('mailto') ? (
    <a
      className={props.className}
      href={props.to}
      onClick={props.onClick || null}
      target='_blank'
      rel='noreferrer noopener'
    >
      {props.children}
    </a>
  ) : (
    <Link
      className={props.className}
      to={props.to + (!props.to.includes('?') && search)}
      onClick={props.onClick || null}
    >
      {props.children}
    </Link>
  )
}
