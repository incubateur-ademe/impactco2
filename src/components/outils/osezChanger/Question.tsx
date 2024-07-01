'use client'

import { useTranslations } from 'next-intl'
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import formatName from 'utils/formatName'
import { track } from 'utils/matomo'
import Input from 'components/form/Input'
import styles from './Question.module.css'

const Question = ({
  slug,
  value,
  setValue,
  extra,
}: {
  slug: string
  value: number | undefined
  setValue: Dispatch<SetStateAction<number | undefined>>
  extra?: string | boolean
}) => {
  const [internalValue, setInternalValue] = useState('')
  const t = useTranslations('osez-changer')
  useEffect(() => {
    setValue(internalValue === '' ? undefined : Number(internalValue))
  }, [internalValue])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <label htmlFor={`input-${slug}`}>
          {t(slug)}
          <br />
          <span className={styles.description}>{t(`${slug}-description`)}</span>
        </label>
        {extra && <div className={styles.tag}>{extra}</div>}
      </div>
      <Input
        id={slug}
        unit={formatName(t('paire'), value || 2)}
        value={internalValue}
        onChange={(event) => {
          track('OsezChanger', slug, event.target.value)
          setInternalValue(event.target.value)
        }}
        type='number'
      />
    </div>
  )
}

export default Question
