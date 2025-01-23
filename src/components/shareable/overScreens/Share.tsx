'use client'

import { useEffect, useMemo, useState } from 'react'
import { useGlobalStore } from 'src/providers/stores/global'
import useAllParams from 'src/providers/stores/useAllParams'
import { Category } from 'types/category'
import { buildCurrentUrlFor } from 'utils/urls'
import CustomParam, { CustomParamValue } from './CustomParam'
import CustomParams from './CustomParams'
import { getComparateurParams, getCustomParams } from './CustomParamsValues'
import styles from './Share.module.css'
import ShareKit from './ShareKit'
import ShareUrl from './ShareUrl'
import { buildCustomParamsUrl } from './customParamsUrl'

const Share = ({
  category,
  path,
  tracking,
}: {
  category?: Pick<Category, 'slug' | 'name'>
  path?: string
  tracking?: string
}) => {
  const allParams = useAllParams()
  const globalStore = useGlobalStore()

  const [visibility, setVisibility] = useState<Record<string, boolean> | null>(null)

  // Alimentation
  const [alimentationCategory, setAlimentationCategory] = useState(allParams.alimentation.category)

  // Chauffage
  const [m2, setM2] = useState(allParams.chauffage.m2)
  useEffect(() => {
    setM2(allParams.chauffage.m2)
  }, [allParams.chauffage.m2])

  // Fruits et légumes
  const [month, setMonth] = useState(allParams.fruitsetlegumes.month)
  useEffect(() => {
    setMonth(allParams.fruitsetlegumes.month)
  }, [allParams.fruitsetlegumes.month])

  // Usage numérique
  const [toDisplay, setToDisplay] = useState('')

  // Télétravail
  const [start, setStart] = useState(allParams.teletravail.start)
  useEffect(() => {
    setStart(allParams.teletravail.start)
  }, [allParams.teletravail.start])
  const [end, setEnd] = useState(allParams.teletravail.end)
  useEffect(() => {
    setEnd(allParams.teletravail.end)
  }, [allParams.teletravail.end])
  const [transport, setTransport] = useState(allParams.teletravail.transport)
  useEffect(() => {
    setTransport(allParams.teletravail.transport)
  }, [allParams.teletravail.transport])
  const [presentiel, setPresentiel] = useState(allParams.teletravail.presentiel)
  useEffect(() => {
    setPresentiel(allParams.teletravail.presentiel)
  }, [allParams.teletravail.presentiel])
  const [homeOffice, setHomeOffice] = useState(allParams.teletravail.homeOffice)
  useEffect(() => {
    setHomeOffice(allParams.teletravail.homeOffice)
  }, [allParams.teletravail.homeOffice])

  const params = useMemo(() => {
    if (category) {
      // Warning: Add values in CustomParamsValues.ts also
      if (category.slug === 'chauffage') {
        return { m2: { value: m2, setter: setM2 } } as Record<string, CustomParamValue>
      }
      if (category.slug === 'alimentation') {
        return { alimentationCategory: { value: alimentationCategory, setter: setAlimentationCategory } } as Record<
          string,
          CustomParamValue
        >
      }
      if (category.slug === 'chauffage') {
        return { m2: { value: m2, setter: setM2 } } as Record<string, CustomParamValue>
      }
      if (category.slug === 'fruitsetlegumes') {
        return { month: { value: month, setter: setMonth } } as Record<string, CustomParamValue>
      }
      if (category.slug === 'teletravail') {
        return {
          teletravail: {
            start: { value: start?.address || '', setter: setStart },
            end: { value: end?.address || '', setter: setEnd },
          },
          transport: { value: transport, setter: setTransport },
          presentiel: { value: presentiel, setter: setPresentiel },
          homeOffice: { value: homeOffice, setter: setHomeOffice },
        } as Record<string, CustomParamValue>
      }
      const params = getCustomParams(category.slug, allParams)
      if (category.slug === 'usagenumerique') {
        return { ...params, display: { value: toDisplay, setter: setToDisplay } } as Record<string, CustomParamValue>
      }
      return params
    } else if (path?.startsWith('comparateur')) {
      return getComparateurParams(allParams, path?.includes('etiquette'))
    }
    return {}
  }, [category, path, m2, month, transport, start, end, presentiel, homeOffice, toDisplay, alimentationCategory])

  useEffect(() => {
    if (params) {
      const values: Record<string, boolean> = {}
      Object.keys(params).forEach((key) => {
        values[key] = visibility ? visibility[key] : true
      })
      setVisibility(values)
    }
  }, [params, setVisibility])

  const url = buildCurrentUrlFor(
    `${path || `outils/${category?.slug === 'repas' ? 'alimentation' : category?.slug}`}?${buildCustomParamsUrl(params, visibility)}&language=${globalStore.language}${category?.slug === 'repas' ? '#repas' : ''}`
  ).replace(/\?$/, '')
  const trackingValue = (category ? category.name : tracking) || 'UNKNOWN'

  return (
    <>
      <form id={`${category}-share`}>
        {params && visibility && (
          <>
            <CustomParams
              tracking={trackingValue}
              trackingType='Partager'
              params={params}
              visibility={visibility}
              setVisibility={setVisibility}
            />
            {Object.keys(params).length > 0 && <div className={styles.separator} />}
          </>
        )}
        <CustomParam
          tracking={trackingValue}
          slug='language'
          integration
          param={{ value: globalStore.language, setter: globalStore.setLanguage } as CustomParamValue}
          visible
        />
      </form>
      <ShareUrl
        form={`${category}-share`}
        url={url}
        tracking={tracking}
        path={path}
        category={category}
        customImage={
          category
            ? undefined
            : `${process.env.NEXT_PUBLIC_IMAGE_URL}/api/dynamics/comparateur?${buildCustomParamsUrl(params, visibility)}&language=${globalStore.language}`
        }
      />
      <ShareKit />
    </>
  )
}

export default Share
