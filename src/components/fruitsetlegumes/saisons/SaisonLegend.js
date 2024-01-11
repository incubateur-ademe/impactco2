import React from 'react'
import Legend from 'components/charts/Legend'

export default function SaisonLegend() {
  return (
    <Legend
      items={[
        { label: 'en saison', color: 'var(--primary-50)' },
        { label: 'hors saison', color: 'var(--critical-50)' },
      ]}
    />
  )
}
