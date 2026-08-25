'use client'

import classNames from 'classnames'
import { useEffect, useRef, useState } from 'react'
import Link from 'components/base/buttons/Link'
import DocIcon from 'components/base/icons/doc'
import MenuIcon from 'components/base/icons/menu'
import ToolsIcon from 'components/base/icons/tools'
import RDV from './RDV'
import headerStyles from './Header.module.css'
import styles from './Menu.module.css'

const Menu = () => {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClick = (event: Event) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('click', handleClick, true)
    return () => {
      document.removeEventListener('click', handleClick, true)
    }
  }, [])

  return (
    <>
      <button
        ref={ref}
        onClick={() => setOpen(!open)}
        title='Menu'
        aria-expanded={open}
        aria-controls='mobile-menu'
        className={headerStyles.link}>
        <MenuIcon />
        <span>Menu</span>
      </button>
      <ul className={classNames(styles.menu, { [styles.open]: open })} id='mobile-menu'>
        <li>
          <Link href='/outils' className={headerStyles.link}>
            <ToolsIcon />
            Les outils
          </Link>
        </li>
        <li>
          <Link href='/doc' className={headerStyles.link}>
            <DocIcon />
            La doc
          </Link>
        </li>
        <RDV className={styles.button}>Prendre rendez-vous</RDV>
      </ul>
    </>
  )
}

export default Menu
