import Link from 'next/link'
import Logos from 'components/base/Logo/Logos'
import { Icon } from 'components/osezchanger/icons'
import styles from './Header.module.css'
import Menu from './Menu'
import SkipLinks from './SkipLinks'

export default function Header() {
  return (
    <header aria-label='En-tête' className={styles.header} id='header-navigation'>
      <SkipLinks />
      <div className='main-container'>
        <div className={styles.container}>
          <Logos />
          <div>
            <div className={styles.mainLinks}>
              <Link href='/outils'>
                <Icon iconId='tools' />
                Les outils
              </Link>
              <Link href='/doc'>
                <Icon iconId='doc' />
                La doc
              </Link>
            </div>
            <div className={styles.menu}>
              <Menu />
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
