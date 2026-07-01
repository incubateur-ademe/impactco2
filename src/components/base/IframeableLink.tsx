'use client'

import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { AnchorHTMLAttributes, ForwardedRef, forwardRef } from 'react'

const IframeableLink = (
  props: LinkProps & AnchorHTMLAttributes<HTMLAnchorElement>,
  ref: ForwardedRef<HTMLAnchorElement>
) => {
  const pathname = usePathname()
  const isIFramed = pathname?.includes('iframes') ?? false

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
