'use client'

import useParamContext from 'src/providers/ParamProvider'
import { track } from 'src/utils/matomo'
import Button from 'src/components/base/buttons/Button'
import styles from './AddButton.module.css'

const AddButton = ({ slug, name }: { slug: string; name: string }) => {
  const { setOverscreen } = useParamContext()
  return (
    <Button
      className={styles.button}
      onClick={() => {
        setOverscreen(slug, 'integrer')
        track('Ajout', name, 'ajouter sur votre site')
      }}>
      Ajouter sur votre site
    </Button>
  )
}

export default AddButton
