import React from 'react'
import styles from './SkipLinks.module.css'

const SkipLinks = () => {
  return (
    <div className={styles.wrapper}>
      <ul>
        <li>
          <a className={styles.hidden} href='#contenu'>
            Contenu
          </a>
        </li>
        <li>
          <a className={styles.hidden} href='#header-navigation'>
            Menu
          </a>
        </li>
        <li>
          <a className={styles.hidden} href='#footer'>
            Pied de page
          </a>
        </li>
      </ul>
    </div>
  )
}

export default SkipLinks
