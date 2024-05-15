import React from 'react'
import Link from 'components/base/buttons/Link'
import styles from './Tag.module.css'

const Tag = ({ text, href }: { text: string; href: string }) => {
  return (
    <Link href={href} className={styles.tag} target='_blank' rel='noopener noreferrer'>
      {text}
    </Link>
  )
}

export default Tag
