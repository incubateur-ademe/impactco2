import React from 'react'
import Legend from 'components/charts/Legend'

export default function CategoryLegend() {
  return (
    <Legend
      items={[
        { label: 'construction', color: 'var(--primary-50)' },
        { label: 'usage', color: 'var(--primary-80)' },
      ]}
    />
  )
}
