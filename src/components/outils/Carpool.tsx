import Image from 'next/image'
import React from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { TransportSimulateur } from 'types/transport'
import MinusIcon from 'components/base/icons/minus'
import PlusIcon from 'components/base/icons/plus'
import styles from './Carpool.module.css'

const Carpool = ({ type }: { type: TransportSimulateur }) => {
  const {
    [type]: { carpool, setCarpool },
  } = useParamContext()

  return (
    <div className={styles.container}>
      <button className={styles.minus} onClick={() => setCarpool(carpool - 1)} disabled={carpool === 1}>
        <MinusIcon />
      </button>
      <div className={styles.passager}>
        <Image src='/icons/passager.svg' alt='' width={18} height={24} />
        {carpool} {carpool === 1 ? 'passager' : 'passagers'}
      </div>
      <button className={styles.plus} onClick={() => setCarpool(carpool + 1)} disabled={carpool === 4}>
        <PlusIcon />
      </button>
    </div>
  )
}

export default Carpool
