import React from 'react'
import { Equivalent } from 'types/equivalent'
import formatName from 'utils/formatName'
import styles from './Detail.module.css'

export default function Detail({ equivalent }: { equivalent: Equivalent }) {
  if (!('ecv' in equivalent) || !equivalent.ecv || equivalent.ecv.length === 0) {
    return null
  }
  return (
    <>
      <div className={styles.title}>
        <h3>
          <span>Détail de l&apos;empreinte carbone</span>{' '}
          <span>
            ({equivalent.prefix && <>{formatName(equivalent.prefix)} </>}
            {formatName(equivalent.name, 1)})
          </span>
        </h3>
      </div>
    </>
  )
}
