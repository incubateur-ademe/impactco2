import React from 'react'
import styles from './HiddenLabel.module.css'

const HiddenLabel = ({ children, htmlFor }: { children: string | string[]; htmlFor: string }) => {
  return (
    <label className={styles.hidden} htmlFor={htmlFor}>
      {children}
    </label>
  )
}

export default HiddenLabel
