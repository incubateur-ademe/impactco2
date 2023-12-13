import React, { Dispatch, SetStateAction } from 'react'
import CustomParam from './CustomParam'

const CustomParams = ({
  customValues,
  setCustomValues,
}: {
  customValues: Record<string, { value: string; visible: boolean }>
  setCustomValues: Dispatch<SetStateAction<Record<string, { value: string; visible: boolean }> | null>>
}) => {
  return Object.entries(customValues).map(([key, { value, visible }]) => (
    <CustomParam
      key={key}
      slug={key}
      value={value}
      visible={visible}
      setValue={(newValue) =>
        setCustomValues({
          ...customValues,
          [key]: {
            value: newValue,
            visible: customValues[key].visible,
          },
        })
      }
      setVisible={(newVisibility) =>
        setCustomValues({
          ...customValues,
          [key]: {
            visible: newVisibility,
            value: customValues[key].value,
          },
        })
      }
    />
  ))
}

export default CustomParams
