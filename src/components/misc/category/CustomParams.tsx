import React from 'react'
import { track } from 'utils/matomo'
import CustomParam, { CustomParamValue } from './CustomParam'
import { Title } from './CustomParam.styles'
import { Separator } from './TransportIntegrate.styles'

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
  withTheme?: boolean
}) => {
  return (
    <>
      {title && <Title>{title}</Title>}
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
      {params.theme && (
        <>
          {Object.keys(params).some((param) => param !== 'theme') && <Separator />}
          <CustomParam tracking={tracking} slug='theme' integration={integration} param={params.theme} visible />
        </>
      )}
    </>
  )
}

export default CustomParams
