import React from 'react'
import Link from 'components/base/buttons/Link'
import styles from './Suggestion.module.css'

const Suggestion = ({
  from,
  fromLabel,
  simulatorName,
}: {
  from?: string
  fromLabel: string
  simulatorName: string
}) => {
  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div>
          <span className='title-h6'>
            <b>Un avis, une suggestion ?</b>
          </span>
          <div>
            Vos retours sont précieux pour améliorer le site Impact CO<sub>2</sub>.
          </div>
        </div>
        <Link
          asButton
          href={`/suggestion?${from ? `from=${from}&` : ''}fromLabel=${fromLabel}&simulatorName=${simulatorName}`}>
          Faire une suggestion
        </Link>
      </div>
    </div>
  )
}

export default Suggestion
