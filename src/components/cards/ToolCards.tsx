import React, { ReactNode } from 'react'
import styles from './ToolCards.module.css'

const ToolCards = ({ children }: { children: ReactNode }) => {
  return <div className={styles.container}>{children}</div>
}

export default ToolCards
