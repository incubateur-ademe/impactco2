'use client'

import Link, { LinkProps } from 'next/link'
import React, { AnchorHTMLAttributes, useEffect, useState } from 'react'

const IframeableLink = (props: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const [isIFramed, setIsIframed] = useState(false)

  useEffect(() => {
    setIsIframed(window.location.pathname.includes('iframes'))
  }, [])

  return (
    <Link {...props} target={isIFramed ? '_blank' : props.target} rel={isIFramed ? 'noreferrer noopener' : props.rel} />
  )
}

export default IframeableLink
