import React from 'react'
import { useTheme } from 'styled-components'

import Legend from 'components/charts/Legend'

export default function SaisonLegend() {
  const theme = useTheme()

  return (
    <Legend
      items={[
        { label: 'en saison', color: theme.colors.main },
        { label: 'hors saison', color: theme.colors.error },
      ]}
    />
  )
}
