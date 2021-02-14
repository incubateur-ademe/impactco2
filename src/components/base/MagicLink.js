import React from 'react'
import { Link } from 'react-router-dom'

export default function MagicLink(props) {
  return !props.to ? (
    <button className={props.className} onClick={props.onClick}>
      {props.children}
    </button>
  ) : props.to.includes('http') ? (
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
      to={props.to}
      onClick={props.onClick || null}
    >
      {props.children}
    </Link>
  )
}
