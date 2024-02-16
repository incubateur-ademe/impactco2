import React, { useEffect, useMemo, useState } from 'react'
import useParamContext from 'components/providers/ParamProvider'
import ClipboardBox from 'components/base/ClipboardBox'
import { CustomParamValue } from './CustomParam'
import CustomParams from './CustomParams'
import { buildCustomParamsUrl } from './customParamsUrl'

const Integrate = ({
  path,
  params,
  tracking,
}: {
  path: string
  params?: Record<string, CustomParamValue>
  tracking: string
}) => {
  const { theme, setTheme } = useParamContext()
  const [visibility, setVisibility] = useState<Record<string, boolean> | null>(null)

  const paramWithTheme = useMemo(
    () => ({ ...params, theme: { value: theme, setter: setTheme } as CustomParamValue }),
    [params, theme, setTheme]
  )
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
  }/iframe.js" data-type="${path}" data-search="?${buildCustomParamsUrl(paramWithTheme, visibility)}"></script>`

  return paramWithTheme && visibility ? (
    <>
      <CustomParams
        integration
        tracking={tracking}
        trackingType='Intégrer'
        params={paramWithTheme}
        visibility={visibility}
        setVisibility={setVisibility}
      />
      <ClipboardBox tracking={tracking}>{url}</ClipboardBox>
    </>
  ) : null
}

export default Integrate
