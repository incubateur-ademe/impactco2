'use client'

import React, { ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { track } from 'utils/matomo'

const TrackingContext = React.createContext<{
  trackOnce: (action: string) => void
} | null>(null)

export function TrackingProvider({ children, tracking }: { children: ReactNode; tracking: string }) {
  // inspired from https://usehooks-ts.com/react-hook/use-intersection-observer
  const ref = useRef<HTMLDivElement | null>(null)
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  const hasTracked = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const trackOnce = useCallback(
    (action: string) => {
      if (!hasTracked.current) {
        track(`Engagement_${tracking}`, action, action)
        hasTracked.current = true

        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current)
          timeoutRef.current = null
        }
      }
    },
    [tracking]
  )

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
    if (entry) {
      if (entry.isIntersecting) {
        timeoutRef.current = setTimeout(
          () => {
            trackOnce('Temps')
          },
          tracking.toLowerCase().replace(/é/g, 'e').includes('etiquette') ? 15000 : 45000
        )
      } else if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [tracking, entry])

  return (
    <TrackingContext.Provider
      value={{
        trackOnce,
      }}>
      <div ref={ref}> {children}</div>
    </TrackingContext.Provider>
  )
}

const useTrackingContext = () => {
  const context = useContext(TrackingContext)

  if (!context) {
    throw new Error('useTrackingContext has to be used within <TrackingProvider>')
  }

  return context
}

export default useTrackingContext
