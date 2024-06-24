'use client'

import React, { useEffect, useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { Category } from 'types/category'
import ClipboardBox from 'components/base/ClipboardBox'
import { CustomParamValue } from './CustomParam'
import CustomParams from './CustomParams'
import { getComparateurParams, getCustomParams } from './CustomParamsValues'
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
  const params = useParamContext()
  const [visibility, setVisibility] = useState<Record<string, boolean> | null>(null)

  const paramWithTheme = useMemo<Record<string, CustomParamValue>>(() => {
    const theme = { theme: { value: params.theme, setter: params.setTheme } } as Record<string, CustomParamValue>
    if (category) {
      return {
        ...getCustomParams(category.slug, params),
        ...theme,
      }
    }
    if (path.startsWith('comparateur')) {
      return { ...getComparateurParams(params, path.includes('etiquette')), ...theme }
    }
    return theme
  }, [params, category, path])

  useEffect(() => {
    if (paramWithTheme) {
      const values: Record<string, boolean> = {}
      Object.keys(paramWithTheme).forEach((key) => {
        values[key] = visibility ? visibility[key] : true
      })
      setVisibility(values)
    }
  }, [paramWithTheme])

  const url = `<script name="impact-co2" src="${
    process.env.NEXT_PUBLIC_URL
  }/iframe.js" data-type="${path}" data-search="?${buildCustomParamsUrl(paramWithTheme, visibility)}${extraParams ? `&${extraParams}` : ''}"></script>`

  return paramWithTheme && visibility ? (
    <>
      <CustomParams
        integration
        tracking={tracking}
        trackingType='Intégrer'
        params={path.includes('etiquette') ? {} : paramWithTheme}
        visibility={visibility}
        setVisibility={setVisibility}
      />
      <ClipboardBox tracking={tracking}>{url}</ClipboardBox>
    </>
  ) : null
}

export default Integrate
