import { useRouter } from 'next/router'
import React, { ReactNode, useEffect, useMemo, useState } from 'react'
import { Category } from 'types/category'
import ShareableContent from 'components/misc/ShareableContent'
import { CustomParamValue } from 'components/misc/category/CustomParam'
import { OverScreenTransport } from 'components/misc/category/overScreens/TransportType'
import { overScreenTransportValues } from 'components/misc/category/overScreens/TransportValues'
import useTransportContext from './TransportProvider'

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
  type: 'distance' | 'itineraire' | 'teletravail'
}) => {
  const { km, start, end } = useTransportContext()

  const params = useMemo(() => {
    switch (type) {
      case 'distance':
        return { km: km.toString() } as Record<string, CustomParamValue>
      case 'itineraire':
        return {
          itineraire: {
            start: start?.address || '',
            end: end?.address || '',
          },
        } as Record<string, CustomParamValue>
      case 'teletravail':
        return {
          teletravail: {
            start: start?.address || '',
            end: end?.address || '',
          },
        } as Record<string, CustomParamValue>
    }
  }, [km, type, start, end])

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
