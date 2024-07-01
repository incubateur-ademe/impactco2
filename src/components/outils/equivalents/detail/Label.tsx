import { useTranslations } from 'next-intl'
import React from 'react'

const Label = ({ id }: { id: string | number }) => {
  const t = useTranslations('equivalent.ecv')

  return <span>{t(id.toString())}</span>
}

export default Label
