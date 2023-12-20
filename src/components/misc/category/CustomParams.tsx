import React, { Dispatch, SetStateAction } from 'react'
import { track } from 'utils/matomo'
import CustomParam from './CustomParam'

const CustomParams = ({
  customValues,
  setCustomValues,
  tracking,
  trackingType,
}: {
  customValues: Record<string, { value: string; visible: boolean }>
  setCustomValues: Dispatch<SetStateAction<Record<string, { value: string; visible: boolean }> | null>>
  tracking: string
  trackingType: string
}) => {
  return Object.entries(customValues).map(([key, { value, visible }]) => (
    <CustomParam
      key={key}
      slug={key}
      value={value}
      visible={visible}
      setValue={(newValue) => {
        track(tracking, `Custom value ${key}`, newValue)
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
  ))
}

export default CustomParams
