'use client'

import React, { Dispatch, SetStateAction, useEffect, useState } from 'react'
import formatName from 'utils/formatName'
import Input from 'components/form/Input'
import styles from './Question.module.css'

const Question = ({
  title,
  description,
  value,
  setValue,
  extra,
}: {
  title: string
  description: string
  value: number | undefined
  setValue: Dispatch<SetStateAction<number | undefined>>
  extra?: string | boolean
}) => {
  const [internalValue, setInternalValue] = useState('')

  useEffect(() => {
    setValue(internalValue === '' ? undefined : Number(internalValue))
  }, [internalValue])

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <label htmlFor={`input-${title}`}>
          {title}
          <br />
          <span className={styles.description}>{description}</span>
        </label>
        {extra && <div className={styles.tag}>{extra}</div>}
      </div>
      <Input
        id={title}
        unit={formatName('paire[s]', value || 2)}
        value={internalValue}
        onChange={(event) => setInternalValue(event.target.value)}
        type='number'
      />
    </div>
  )
}

export default Question
