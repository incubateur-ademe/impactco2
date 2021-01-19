import React, { useState } from 'react'
import { useQueryParam, BooleanParam, withDefault } from 'use-query-params'

import UXContext from 'utils/UXContext'

export default function UXProvider(props) {
  const [configuratorOpen, setConfiguratorOpen] = useState(false)

  const [displayTitle, setDisplayTitle] = useQueryParam(
    'title',
    withDefault(BooleanParam, true)
  )

  return (
    <UXContext.Provider
      value={{
        configuratorOpen,
        setConfiguratorOpen,
        displayTitle,
        setDisplayTitle,
      }}
    >
      {props.children}
    </UXContext.Provider>
  )
}
