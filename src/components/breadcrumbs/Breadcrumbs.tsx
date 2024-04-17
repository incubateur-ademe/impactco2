import React, { Fragment } from 'react'
import Link from 'components/base/buttons/Link'
import { Icon } from 'components/osezchanger/icons'
import styles from './Breadcrumbs.module.css'

const Breadcrumbs = ({ links, current }: { links: { label: string; link: string }[]; current: string }) => {
  return (
    <div className='main-container'>
      <div className={styles.container}>
        {links.map(({ label, link }) => (
          <Fragment key={label}>
            <Link href={link}>{label}</Link>
            <Icon iconId='arrow-right' />
          </Fragment>
        ))}
        <div className={styles.current}>{current}</div>
      </div>
    </div>
  )
}

export default Breadcrumbs
