import React from 'react'
import { track } from 'utils/matomo'
import CustomParam, { CustomParamValue } from './CustomParam'
import styles from './CustomParam.module.css'

const CustomParams = ({
  title,
  params,
  visibility,
  setVisibility,
  tracking,
  trackingType,
  integration,
}: {
  title?: string
  params: Record<string, CustomParamValue>
  visibility: Record<string, boolean>
  setVisibility: (values: Record<string, boolean>) => void
  tracking: string
  trackingType: string
  integration?: boolean
}) => {
  return (
    <fieldset>
      {title && <p className={styles.title}>{title}</p>}
      {Object.entries(params)
        .filter(([key]) => key !== 'theme')
        .map(([key, param]) => (
          <CustomParam
            key={key}
            tracking={tracking}
            slug={key}
            integration={integration}
            param={param}
            visible={visibility[key]}
            setVisible={(newVisibility) => {
              track(tracking, `${trackingType} Custom visibility ${key}`, newVisibility ? 'vrai' : 'faux')
              setVisibility({
                ...visibility,
                [key]: newVisibility,
              })
            }}
          />
        ))}
    </fieldset>
  )
}

export default CustomParams
