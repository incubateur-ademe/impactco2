'use client'

import React, { useEffect, useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { Category } from 'types/category'
import ClipboardBox from 'components/base/ClipboardBox'
import CustomParam, { CustomParamValue } from './CustomParam'
import CustomParams from './CustomParams'
import { getComparateurParams, getCustomParams } from './CustomParamsValues'
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
  }, [params])

  const url = `<script name="impact-co2" src="${
    process.env.NEXT_PUBLIC_URL
  }/iframe.js" data-type="${path}" data-search="?${buildCustomParamsUrl(params, visibility)}${extraParams ? `&${extraParams}` : ''}&language=${allParams.language}&theme=${allParams.theme}"></script>`

  return params && visibility ? (
    <>
      <CustomParams
        integration
        tracking={tracking}
        trackingType='Intégrer'
        params={params}
        visibility={visibility}
        setVisibility={setVisibility}
      />
      {Object.entries(params).length > 0 && <div className={styles.separator} />}
      <CustomParam
        tracking={tracking}
        slug='theme'
        param={{ value: allParams.theme, setter: allParams.setTheme } as CustomParamValue}
        visible
      />
      <CustomParam
        tracking={tracking}
        slug='language'
        param={{ value: allParams.language, setter: allParams.setLanguage } as CustomParamValue}
        visible
      />

      <ClipboardBox tracking={tracking}>{url}</ClipboardBox>
    </>
  ) : null
}

export default Integrate
