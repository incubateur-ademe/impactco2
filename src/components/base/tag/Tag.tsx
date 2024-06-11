import React from 'react'
import styles from './Tag.module.css'

const Tag = ({ text }: { text: string }) => {
  return <div className={styles.tag}>{text}</div>
}

export default Tag
