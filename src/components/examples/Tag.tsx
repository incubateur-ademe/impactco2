'use client'

import React from 'react'
import { track } from 'utils/matomo'
import Link from 'components/base/buttons/Link'
import styles from './Tag.module.css'

const Tag = ({ name, text, href }: { name: string; text: string; href: string }) => {
  return (
    <Link
      href={href}
      className={styles.tag}
      target='_blank'
      rel='noopener noreferrer'
      onClick={() => track('Exemple', name, href)}>
      {text}
    </Link>
  )
}

export default Tag
