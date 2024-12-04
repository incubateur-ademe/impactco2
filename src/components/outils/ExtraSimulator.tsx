import React, { ReactNode, useMemo } from 'react'
import Shareable from 'components/shareable/Shareable'
import { overScreenCategoryValues, overScreenOsezChangerValues } from 'components/shareable/overScreens/Values'
import styles from './ExtraSimulator.module.css'

const ExtraSimulator = ({
  children,
  tracking,
  slug,
  small,
}: {
  children: ReactNode
  tracking: string
  slug: string
  small?: boolean
}) => {
  const overScreens = useMemo(
    () =>
      slug === 'osez-changer'
        ? overScreenOsezChangerValues()
        : overScreenCategoryValues({ id: 2, unit: slug, slug, name: tracking }),
    [slug, tracking]
  )

  const simulator = (
    <Shareable slug={slug} tracking={tracking} overScreens={overScreens} small={small}>
      {children}
    </Shareable>
  )
  return small ? <div className={styles.container}>{simulator}</div> : simulator
}

export default ExtraSimulator
