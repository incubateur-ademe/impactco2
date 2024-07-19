'use client'

import React, { useEffect, useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { Category } from 'types/category'
import ClipboardBox from 'components/base/ClipboardBox'
import Link from 'components/base/buttons/Link'
import CustomParam, { CustomParamValue } from './CustomParam'
import CustomParams from './CustomParams'
import { getComparateurParams, getCustomParams } from './CustomParamsValues'
import IntegratePreview from './IntegratePreview'
import styles from './Share.module.css'
import { buildCustomParamsUrl } from './customParamsUrl'

const Integrate = ({
  category,
  path,
  extraParams,
  tracking,
}: {
  path: string
  category?: Category
  extraParams?: string
  tracking: string
}) => {
  const allParams = useParamContext()
  const [visibility, setVisibility] = useState<Record<string, boolean> | null>(null)

  // All
  const [theme, setTheme] = useState(allParams.theme)
  const [language, setLanguage] = useState(allParams.language)

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

  const params = useMemo(() => {
    if (category) {
      // Warning: Add values in CustomParamsValues.ts also
      if (category.slug === 'chauffage') {
        return { m2: { value: m2, setter: setM2 } } as Record<string, CustomParamValue>
      }
      if (category.slug === 'fruitsetlegumes') {
        return { month: { value: month, setter: setMonth } } as Record<string, CustomParamValue>
      }
      return getCustomParams(category.slug, allParams)
    } else if (path?.startsWith('comparateur')) {
      return getComparateurParams(allParams, path?.includes('etiquette'))
    }
    return {}
  }, [allParams, category, path, m2, month])

  useEffect(() => {
    if (params) {
      const values: Record<string, boolean> = {}
      Object.keys(params).forEach((key) => {
        values[key] = visibility ? visibility[key] : true
      })
      setVisibility(values)
    }
  }, [params])

  const urlParams = `${buildCustomParamsUrl(params, visibility)}${extraParams ? `&${extraParams}` : ''}&language=${language}&theme=${theme}`

  return params && visibility ? (
    <>
      <CustomParams
        integration
        tracking={tracking}
        trackingType='Intégrer'
        params={path.includes('etiquette') ? {} : params}
        visibility={visibility}
        setVisibility={setVisibility}
      />
      {!path.includes('etiquette') && Object.entries(params).length > 0 && <div className={styles.separator} />}
      <CustomParam
        tracking={tracking}
        slug='theme'
        param={{ value: theme, setter: setTheme } as CustomParamValue}
        visible
      />
      <CustomParam
        tracking={tracking}
        slug='language'
        param={{ value: language, setter: setLanguage } as CustomParamValue}
        visible
      />
      <ClipboardBox tracking={tracking}>{`<script name="impact-co2" src="${
        process.env.NEXT_PUBLIC_URL
      }/iframe.js" data-type="${path}" data-search="?${urlParams}"></script>`}</ClipboardBox>
      <IntegratePreview path={path} urlParams={urlParams} />
    </>
  ) : null
}

export default Integrate
