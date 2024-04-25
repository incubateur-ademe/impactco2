import Link from 'next/link'
import Logos from 'components/base/Logo/Logos'
import DocIcon from 'components/osezchanger/icons/doc'
import ToolsIcon from 'components/osezchanger/icons/tools'
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
                <ToolsIcon />
                Les outils
              </Link>
              <Link href='/doc'>
                <DocIcon />
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
