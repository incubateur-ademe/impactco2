'use client'

import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import styles from './Reset.module.css'
import ResetIcon from './icons/reset'

const Reset = ({ slug }: { slug: string }) => {
  const { reset } = useParamContext()
  return (
    <div className={styles.reset}>
      <button className={styles.button} onClick={() => reset(slug)}>
        <ResetIcon />
        Réinitialiser
      </button>
    </div>
  )
}

export default Reset
