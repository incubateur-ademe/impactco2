'use client'

import classNames from 'classnames'
import React from 'react'
import { track } from 'utils/matomo'
import Link from 'components/base/buttons/Link'
import styles from './Sources.module.css'

const Sources = ({
  tracking,
  sources,
  className,
}: {
  tracking: string
  sources: { label: string; href: string }[]
  className?: string
}) => {
  return (
    <p className={classNames(styles.wrapper, className)}>
      Source{sources.length > 1 ? 's' : ''} :{' '}
      {sources
        .flatMap((source) => [
          <Link key={source.label} href={source.href} onClick={() => track(tracking, 'Source', source.href)}>
            {source.label}
          </Link>,
          <span key={`${source.label}-separator`}> • </span>,
        ])
        .slice(0, sources.length * 2 - 1)}
    </p>
  )
}

export default Sources
