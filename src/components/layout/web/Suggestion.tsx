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
      <div className='main-container'>
        <div className={styles.card}>
          <div>
            <b className='title-h6'>Un avis, une suggestion ?</b>
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
    </div>
  )
}

export default Suggestion
