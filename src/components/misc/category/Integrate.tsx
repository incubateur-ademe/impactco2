import React, { useEffect, useState } from 'react'
import { Category } from 'types/category'
import ClipboardBox from 'components/base/ClipboardBox'
import { CustomParamType, CustomParamValue } from './CustomParam'
import CustomParams from './CustomParams'
import { buildCustomParamsUrl } from './customParamsUrl'

const Integrate = ({
  category,
  params,
  tracking,
}: {
  category: Category
  params?: Record<string, CustomParamValue>
  tracking: string
}) => {
  const [customValues, setCustomValues] = useState<Record<string, CustomParamType>>({})

  useEffect(() => {
    if (params) {
      const values: Record<string, CustomParamType> = {}
      Object.entries(params).forEach(([key, value]) => {
        values[key] = {
          value,
          visible: customValues && customValues[key] ? customValues[key].visible : true,
        }
      })
      setCustomValues(values)
    }
  }, [params, setCustomValues])

  const url = `<script name="impact-co2" src="${process.env.NEXT_PUBLIC_URL}/iframe.js" data-type="${
    category.slug
  }" data-search="?theme=default&${buildCustomParamsUrl(customValues)}"></script>`

  return (
    <>
      <CustomParams
        integration
        tracking={tracking}
        trackingType='Intégrer'
        customValues={customValues}
        setCustomValues={setCustomValues}
      />
      <ClipboardBox>{url}</ClipboardBox>
    </>
  )
}

export default Integrate
