import classNames from 'classnames'
import React from 'react'
import { track } from 'utils/matomo'
import Link from 'components/base/buttons/Link'
import styles from './Sources.module.css'

const Sources = ({
  tracking,
  sources,
  priority,
  className,
}: {
  tracking: string
  sources: { label: string; href: string }[]
  priority?: 'secondary'
  className?: string
}) => {
  return (
    <div className={classNames(styles.wrapper, className)}>
      Source{sources.length > 1 ? 's' : ''} :{' '}
      {sources
        .flatMap((source) => [
          <Link
            key={source.label}
            href={source.href}
            priority={priority}
            onClick={() => track(tracking, 'Source', source.href)}>
            {source.label}
          </Link>,
          <span key={`${source.label}-separator`}> • </span>,
        ])
        .slice(0, sources.length * 2 - 1)}
    </div>
  )
}

export default Sources
