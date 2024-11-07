import IframeableLink from 'components/base/IframeableLink'
import Logos from 'components/base/Logo/Logos'
import DocIcon from 'components/base/icons/doc'
import ToolsIcon from 'components/base/icons/tools'
import styles from './Header.module.css'
import Menu from './Menu'
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
                <IframeableLink href='/outils'>
                  <ToolsIcon />
                  Les outils
                </IframeableLink>
              </li>
              <li>
                <IframeableLink href='/doc'>
                  <DocIcon />
                  La doc
                </IframeableLink>
              </li>
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
