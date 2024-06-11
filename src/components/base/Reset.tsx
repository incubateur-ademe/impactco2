'use client'

import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { track } from 'utils/matomo'
import styles from './Reset.module.css'
import ResetIcon from './icons/reset'

const Reset = ({ tracking, slug }: { tracking: string; slug: string }) => {
  const { reset } = useParamContext()
  return (
    <div className={styles.reset}>
      <button
        className={styles.button}
        onClick={() => {
          track(tracking, 'Réinitialiser', slug)
          reset(slug)
        }}>
        <ResetIcon />
        Réinitialiser
      </button>
    </div>
  )
}

export default Reset
