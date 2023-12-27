import React from 'react'
import { track } from 'utils/matomo'
import CustomParam, { CustomParamType } from './CustomParam'
import { Title } from './CustomParam.styles'

const CustomParams = ({
  title,
  customValues,
  setCustomValues,
  tracking,
  trackingType,
}: {
  title?: string
  customValues: Record<string, CustomParamType>
  setCustomValues: (values: Record<string, CustomParamType>) => void
  tracking: string
  trackingType: string
}) => {
  return (
    <>
      {title && <Title>{title}</Title>}
      {Object.entries(customValues).map(([key, { value, visible }]) => (
        <CustomParam
          key={key}
          slug={key}
          value={value}
          visible={visible}
          setValue={(newValue) => {
            track(tracking, `Custom value ${key}`, JSON.stringify(newValue))
            setCustomValues({
              ...customValues,
              [key]: {
                value: newValue,
                visible: customValues[key].visible,
              },
            })
          }}
          setVisible={(newVisibility) => {
            track(tracking, `${trackingType} Custom visibility ${key}`, newVisibility ? 'vrai' : 'faux')
            setCustomValues({
              ...customValues,
              [key]: {
                visible: newVisibility,
                value: customValues[key].value,
              },
            })
          }}
        />
      ))}
    </>
  )
}

export default CustomParams
