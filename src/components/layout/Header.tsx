import Logos from 'components/base/Logo/Logos'
import Link from 'components/base/buttons/Link'
import DocIcon from 'components/base/icons/doc'
import ToolsIcon from 'components/base/icons/tools'
import styles from './Header.module.css'
import Menu from './Menu'
import RDV from './RDV'
import SkipLinks from './SkipLinks'

export default function Header() {
  return (
    <header role='banner' aria-label='En-tête' className={styles.header} id='header-navigation' tabIndex={-1}>
      <SkipLinks />
      <div className='main-container'>
        <div className={styles.container}>
          <Logos />
          <nav role='navigation'>
            <ul className={styles.mainLinks}>
              <li>
                <Link href='/outils' className={styles.link}>
                  <ToolsIcon />
                  Les outils
                </Link>
              </li>
              <li>
                <Link href='/doc' className={styles.link}>
                  <DocIcon />
                  La doc
                </Link>
              </li>
              <RDV>Prendre RDV</RDV>
            </ul>
            <div className={styles.menu}>
              <Menu />
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}
