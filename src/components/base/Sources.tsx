'use client'

import classNames from 'classnames'
import { track } from 'utils/matomo'
import IframeableLink from './IframeableLink'
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
          <IframeableLink key={source.label} href={source.href} onClick={() => track(tracking, 'Source', source.href)}>
            {source.label}
          </IframeableLink>,
          <span key={`${source.label}-separator`}> • </span>,
        ])
        .slice(0, sources.length * 2 - 1)}
    </p>
  )
}

export default Sources
