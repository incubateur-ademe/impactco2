import React, { useEffect, useState } from 'react'
import { Category } from 'types/category'
import ClipboardBox from 'components/base/ClipboardBox'
import CustomParams from './CustomParams'

const Integrate = ({ category, params }: { category: Category; params?: Record<string, string> }) => {
  const [customValues, setCustomValues] = useState<Record<string, { value: string; visible: boolean }> | null>(null)

  useEffect(() => {
    if (params) {
      const values: Record<string, { value: string; visible: boolean }> = {}
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
  }" data-search="?theme=default${
    customValues
      ? `?${Object.entries(customValues)
          .filter(([, { visible }]) => visible)
          .map(([key, { value }]) => `${key}=${value}`)
          .join('&')}`
      : ''
  }"></script>`

  return (
    <>
      {customValues && (
        <CustomParams
          tracking={category.name}
          trackingType='Intégrer'
          customValues={customValues}
          setCustomValues={setCustomValues}
        />
      )}
      <ClipboardBox>{url}</ClipboardBox>
    </>
  )
}

export default Integrate
