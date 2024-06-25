'use client'

import React, { useEffect, useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { Category } from 'types/category'
import { buildCurrentUrlFor } from 'utils/urls'
import CustomParams from './CustomParams'
import { getComparateurParams, getCustomParams } from './CustomParamsValues'
import ShareUrl from './ShareUrl'
import { buildCustomParamsUrl } from './customParamsUrl'

const Share = ({
  category,
  path,
  tracking,
  noLanguage,
}: {
  category?: Pick<Category, 'slug' | 'name' | 'meta'>
  path?: string
  tracking?: string
  noLanguage?: boolean
}) => {
  const allParams = useParamContext()
  const [visibility, setVisibility] = useState<Record<string, boolean> | null>(null)

  const params = useMemo(
    () =>
      category
        ? getCustomParams(category.slug, allParams)
        : path?.startsWith('outils/comparateur')
          ? getComparateurParams(allParams, path?.includes('etiquette'))
          : {},
    [allParams, category, path]
  )

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
    `${path || `outils/${category?.slug}`}?${buildCustomParamsUrl(params, visibility)}&language=${allParams.language}`
  ).replace(/\?$/, '')
  const trackingValue = (category ? category.name : tracking) || 'UNKNOWN'

  return (
    <>
      {params && visibility && (
        <CustomParams
          tracking={trackingValue}
          trackingType='Partager'
          params={params}
          visibility={visibility}
          setVisibility={setVisibility}
        />
      )}
      <ShareUrl
        url={url}
        tracking={tracking}
        path={path}
        category={category}
        customImage={
          category
            ? undefined
            : `${process.env.NEXT_PUBLIC_IMAGE_URL}/api/dynamics/comparateur?${buildCustomParamsUrl(params, visibility)}`
        }
      />
    </>
  )
}

export default Share
