'use client'

import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { track } from 'utils/matomo'

const IFrameTracking = ({ children }: { children: React.ReactNode }) => {
  const path = usePathname()

  // inspired from https://usehooks-ts.com/react-hook/use-intersection-observer
  const ref = useRef<HTMLDivElement | null>(null)
  const [entry, setEntry] = useState<IntersectionObserverEntry>()
  const [observed, setObserved] = useState(false)

  useEffect(() => {
    const node = ref.current // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver
    if (!hasIOSupport || !node) {
      return
    }

    const observer = new IntersectionObserver(([entry]) => setEntry(entry))
    observer.observe(node)
    return () => observer.disconnect()
  }, [ref])

  useEffect(() => {
    if (!observed && entry && entry.isIntersecting) {
      setObserved(true)
      track('IFrame', window.location.href.endsWith('/') ? window.location.href : `${window.location.href}/`, path)
    }
  }, [entry, observed, path])

  return <div ref={ref}>{children}</div>
}

export default IFrameTracking
