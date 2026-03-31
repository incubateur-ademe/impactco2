'use client'
import { ReadonlyURLSearchParams, usePathname, useSearchParams } from 'next/navigation'
import React, { ReactNode, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { track } from 'utils/matomo'

const TrackingContext = React.createContext<{
  trackOnce: (action: string) => void
} | null>(null)

const trackingTime: Record<string, number | ((pathname: string, params: ReadonlyURLSearchParams) => number)> = {
  // Simulateur
  Livraison: 30000,
  'Fruits et légumes': 30000,
  Alimentation: 30000,
  Chauffage: 30000,
  'Usage numérique': 30000,
  Télétravail: 30000,
  OsezChanger: 30000,
  Quiz: 30000,
  Comparateur: 30000,
  // Graphique dynamique
  Numérique: 30000,
  Habillement: 30000,
  Mobilier: 30000,
  Boisson: 30000,
  Électroménager: 30000,
  Repas: 30000,
  // Transport
  Transport: (pathname: string, params: ReadonlyURLSearchParams) => {
    // On a un bug ou il est possible d'avoir le data-type à transport/itineraire mais tabs à distance (ou l'inverse)
    // exemple : https://www.vieillescharrues.asso.fr/infos-pratiques/
    const tabs = params.get('tabs')
    if (tabs === 'itineraire') {
      return 15000
    } else if (tabs === 'distance') {
      return 30000
    }

    if (pathname.includes('itineraire')) {
      return 15000
    }

    const defaultMode = params.get('defaultMode')
    const mode = params.get('mode')
    if (defaultMode === 'comparison' || mode === 'comparison') {
      return 15000
    }

    return 30000
  },
}

export function TrackingProvider({ children, tracking }: { children: ReactNode; tracking: string }) {
  // inspired from https://usehooks-ts.com/react-hook/use-intersection-observer
  const ref = useRef<HTMLDivElement | null>(null)
  const [entry, setEntry] = useState<IntersectionObserverEntry>()

  const hasTracked = useRef(false)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const params = useSearchParams()
  const pathname = usePathname()

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
    const node = ref.current
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
        // Par défaut 15s sur les étiquettes et les infographies
        let timing = trackingTime[tracking] || 15000
        if (typeof timing !== 'number') {
          timing = timing(pathname, params)
        }
        timeoutRef.current = setTimeout(() => {
          trackOnce('Temps')
        }, timing)
      } else if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
        timeoutRef.current = null
      }
    }
  }, [tracking, entry, params, pathname])

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
    return { trackOnce: () => {} }
  }

  return context
}

export default useTrackingContext
