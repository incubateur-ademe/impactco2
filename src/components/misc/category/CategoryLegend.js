import React from 'react'
import { useTheme } from 'styled-components'

import Legend from 'components/charts/Legend'

export default function CategoryLegend() {
  const theme = useTheme()

  return (
    <Legend
      items={[
        { label: 'construction', color: theme.colors.main },
        { label: 'usage', color: theme.colors.mainDark },
      ]}
    />
  )
}
