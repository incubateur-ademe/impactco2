import React from 'react'
import Link from 'components/base/buttons/Link'
import { Icon } from 'components/osezchanger/icons'
import styles from './Breadcrumbs.module.css'

const Breadcrumbs = ({ links, current }: { links: { label: string; link: string }[]; current: string }) => {
  return (
    <div className='main-container'>
      <div className={styles.container}>
        {links.map(({ label, link }) => (
          <>
            <Link href={link}>{label}</Link>
            <Icon iconId='arrow-right' />
          </>
        ))}
        <div className={styles.current}>{current}</div>
      </div>
    </div>
  )
}

export default Breadcrumbs
