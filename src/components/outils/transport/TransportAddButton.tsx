'use client'

import useParamContext from 'src/providers/ParamProvider'
import { track } from 'src/utils/matomo'
import Button from 'src/components/base/buttons/Button'
import styles from './TransportAddButton.module.css'

const TransportAddButton = () => {
  const { setOverscreen } = useParamContext()
  return (
    <Button
      className={styles.button}
      onClick={() => {
        setOverscreen('transport', 'integrer')
        track('Ajout', 'Transport', 'ajouter sur votre site')
      }}>
      Ajouter sur votre site
    </Button>
  )
}

export default TransportAddButton
