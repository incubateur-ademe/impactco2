import { useTranslations } from 'next-intl'
import React from 'react'
import Legend from 'components/charts/Legend'

export default function CategoryLegend() {
  const t = useTranslations('category.legend')
  return (
    <Legend
      items={[
        { label: t('construction'), color: 'var(--primary-50)' },
        { label: t('usage'), color: 'var(--primary-80)' },
      ]}
    />
  )
}
