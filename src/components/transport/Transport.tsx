import { useRouter } from 'next/router'
import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import { Category } from 'types/category'
import { TransportSimulateur } from 'types/transport'
import useParamContext from 'components/providers/ParamProvider'
import ShareableContent from 'components/misc/ShareableContent'
import { CustomParamValue } from 'components/misc/category/CustomParam'
import { OverScreenTransport } from 'components/misc/category/overScreens/TransportType'
import { overScreenTransportValues } from 'components/misc/category/overScreens/TransportValues'

const Transport = ({
  children,
  category,
  tracking,
  iframe,
  type,
}: {
  children: ReactNode
  category: Category
  tracking: string
  iframe?: boolean
  type: TransportSimulateur
}) => {
  const { distance, itineraire, teletravail } = useParamContext()

  const params = useMemo(() => {
    switch (type) {
      case 'distance':
        return { km: { value: distance.km, setter: distance.setKm } } as Record<string, CustomParamValue>
      case 'itineraire':
        return {
          itineraire: {
            start: { value: itineraire.start?.address || '', setter: itineraire.setStart },
            end: { value: itineraire.end?.address || '', setter: itineraire.setEnd },
          },
        } as Record<string, CustomParamValue>
      case 'teletravail':
        return {
          teletravail: {
            start: { value: teletravail.start?.address || '', setter: teletravail.setStart },
            end: { value: teletravail.end?.address || '', setter: teletravail.setEnd },
          },
        } as Record<string, CustomParamValue>
    }
  }, [distance, type, itineraire, teletravail])

  const [overScreen, setOverScreen] = useState<OverScreenTransport | undefined>()
  const overScreenValues = useMemo(
    () => overScreenTransportValues(category, params, tracking, type),
    [category, params, tracking, type]
  )

  const router = useRouter()
  const [isReady, setIsReady] = useState(!iframe)
  const queries = Object.entries(router.query)
  const queryParams = queries.length > 0 ? `?${queries.map(([key, value]) => `${key}=${value}`).join('&')}` : ''

  useEffect(() => {
    if (iframe && router.isReady) {
      if (router.query.tabs && router.query.tabs.length > 0 && !router.query.tabs.includes(type)) {
        const newTab = (router.query.tabs as string).split(',')[0]
        router.push(`/iframes/transport${newTab === 'distance' ? '' : `/${newTab}`}${queryParams}`)
        return
      }
      setIsReady(true)
    }
  }, [router, iframe, type, queryParams])

  return isReady ? (
    <ShareableContent<OverScreenTransport>
      category={category}
      iframe={iframe}
      params={params}
      tracking={tracking}
      type={type}
      data-testid={`${type}-wrapper`}
      setOverScreen={setOverScreen}
      overScreen={overScreen ? overScreenValues[overScreen] : undefined}
      path={`transport/${type === 'distance' ? '' : type}`}>
      {children}
    </ShareableContent>
  ) : null
}

export default Transport
