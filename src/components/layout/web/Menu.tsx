'use client'

import classNames from 'classnames'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { Icon } from 'components/osezchanger/icons'
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
      <button ref={ref} onClick={() => setOpen(!open)}>
        <Icon iconId='menu' />
        <span>Menu</span>
      </button>
      <div className={classNames(styles.menu, { [styles.open]: open })}>
        <div>
          <Link href='/outils'>
            <Icon iconId='tools' />
            Les outils
          </Link>
        </div>
        <div>
          <Link href='/doc'>
            <Icon iconId='doc' />
            La doc
          </Link>
        </div>
      </div>
    </>
  )
}

export default Menu
