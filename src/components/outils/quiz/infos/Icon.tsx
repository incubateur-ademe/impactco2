import Image from 'next/image'
import React from 'react'
import styles from './Icon.module.css'

const Icon = () => {
  return (
    <div>
      <div className={styles.icon}>
        <Image src='/images/icn-next-actions.svg' alt='' width={24} height={24} />
      </div>
    </div>
  )
}

export default Icon
