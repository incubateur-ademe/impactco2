import styles from './SkipLinks.module.css'

// Do not use Next/Link for this => tab order is not correct
const SkipLinks = () => {
  return (
    <nav role='navigation' aria-label='Accès rapide' className={styles.wrapper}>
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
    </nav>
  )
}

export default SkipLinks
