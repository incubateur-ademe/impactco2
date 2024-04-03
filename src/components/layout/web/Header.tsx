import Link from 'next/link'
import Ademe from 'components/base/Logo/Ademe'
import Logo from 'components/base/Logo/ImpactCO2'
import Marianne from 'components/base/Logo/Marianne'
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
          <Link href='/' className={styles.logos}>
            <Marianne />
            <Ademe />
            <Logo />
          </Link>
          <div>
            <div className={styles.mainLinks}>
              <Link href='/outils'>
                <Icon iconId='tools' />
                Les outils
              </Link>
              <Link href='/'>
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
