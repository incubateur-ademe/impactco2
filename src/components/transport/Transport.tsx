import React, { ReactNode, useContext, useMemo, useState } from 'react'
import { Category } from 'types/category'
import ShareableContent from 'components/misc/ShareableContent'
import { CustomParamValue } from 'components/misc/category/CustomParam'
import { OverScreenTransport } from 'components/misc/category/overScreens/TransportType'
import { overScreenTransportValues } from 'components/misc/category/overScreens/TransportValues'
import TransportContext from './TransportProvider'

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
  const { km, start, end } = useContext<{
    km: number
    start: {
      latitude: number
      longitude: number
      city: string
      address: string
    }
    end: {
      latitude: number
      longitude: number
      city: string
      address: string
    }
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore: TODO
  }>(TransportContext)

  const params = useMemo(() => {
    switch (type) {
      case 'distance':
        return { km: km.toString() } as Record<string, CustomParamValue>
      case 'itineraire':
        return {
          itineraire: {
            start: start.address,
            end: end.address,
          },
        } as Record<string, CustomParamValue>
      case 'teletravail':
        return {
          teletravail: {
            start: start.address,
            end: end.address,
          },
        } as Record<string, CustomParamValue>
    }
  }, [km, type, start, end])

  const [overScreen, setOverScreen] = useState<OverScreenTransport | undefined>()
  const overScreenValues = useMemo(
    () => overScreenTransportValues(category, params, tracking, type),
    [category, params, tracking, type]
  )

  return (
    <ShareableContent<OverScreenTransport>
      category={category}
      iframe={iframe}
      params={params}
      tracking={tracking}
      type={type}
      data-testid={`${type}-wrapper`}
      setOverScreen={setOverScreen}
      overScreen={overScreen ? overScreenValues[overScreen] : undefined}>
      {children}
    </ShareableContent>
  )
}

export default Transport
