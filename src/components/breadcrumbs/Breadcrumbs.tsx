import React, { Fragment } from 'react'
import Link from 'components/base/buttons/Link'
import ArrowRightIcon from 'components/base/icons/arrow-right'
import styles from './Breadcrumbs.module.css'

const Breadcrumbs = ({ links, current }: { links: { label: string; link: string }[]; current: string }) => {
  return (
    <div className='main-container'>
      <div className={styles.container}>
        {links.map(({ label, link }) => (
          <Fragment key={label}>
            <Link className={styles.link} href={link}>
              {label}
            </Link>
            <ArrowRightIcon />
          </Fragment>
        ))}
        <div className={styles.current}>{current}</div>
      </div>
    </div>
  )
}

export default Breadcrumbs
