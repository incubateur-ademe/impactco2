import Link from 'next/link'
import React from 'react'
import styles from './SkipLinks.module.css'

const SkipLinks = () => {
  return (
    <div className={styles.wrapper}>
      <ul>
        <li>
          <Link className={styles.hidden} href='#contenu'>
            Contenu
          </Link>
        </li>
        <li>
          <Link className={styles.hidden} href='#header-navigation'>
            Menu
          </Link>
        </li>
        <li>
          <Link className={styles.hidden} href='#footer'>
            Pied de page
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default SkipLinks
