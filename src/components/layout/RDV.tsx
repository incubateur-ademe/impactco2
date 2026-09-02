'use client'

import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import Link from 'components/base/buttons/Link'
import styles from './RDV.module.css'

const ignore = ['/', '/rendez-vous', '/outils/transport', '/outils/transport/itineraire']

const RDV = ({ children, className }: { children: ReactNode; className?: string }) => {
  const pathName = usePathname()

  return ignore.includes(pathName) ? null : (
    <li className={styles.button}>
      <Link asButton href={`/rendez-vous?$fromLabel=header-${pathName}`} className={className} size='sm'>
        {children}
      </Link>
    </li>
  )
}

export default RDV
