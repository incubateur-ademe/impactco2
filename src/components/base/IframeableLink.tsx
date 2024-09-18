'use client'

import Link, { LinkProps } from 'next/link'
import React, { AnchorHTMLAttributes, ForwardedRef, forwardRef, useEffect, useState } from 'react'

const IframeableLink = (
  props: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>,
  ref: ForwardedRef<HTMLAnchorElement>
) => {
  const [isIFramed, setIsIframed] = useState(false)

  useEffect(() => {
    setIsIframed(window.location.pathname.includes('iframes'))
  }, [])

  return (
    <Link
      {...props}
      ref={ref}
      href={encodeURI(props.href)}
      target={isIFramed ? '_blank' : props.target}
      rel={isIFramed ? 'noreferrer noopener' : props.rel}
    />
  )
}

export default forwardRef(IframeableLink)
