'use client'

import useParamContext from 'src/providers/ParamProvider'
import Button from 'src/components/base/buttons/Button'
import styles from './TransportAddButton.module.css'

const TransportAddButton = () => {
  const { setOverscreen } = useParamContext()
  return (
    <Button className={styles.button} onClick={() => setOverscreen('transport', 'integrer')}>
      Ajouter sur votre site
    </Button>
  )
}

export default TransportAddButton
