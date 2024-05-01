import React, { useMemo } from 'react'
import { overScreenComparateurValues } from 'components/misc/category/overScreens/Values'
import Shareable from 'components/misc/shareable/Shareable'
import EtiquetteSimulator from './EtiquetteSimulator'
import styles from './Etiquettes.module.css'

const Etiquettes = () => {
  const overScreens = useMemo(() => overScreenComparateurValues(), [])

  return (
    <div className={styles.etiquettes}>
      <Shareable tracking='Étiquette animée' overScreens={overScreens} secondary='Étiquette animée'>
        <EtiquetteSimulator animated />
      </Shareable>
      <Shareable tracking='Étiquette statique' overScreens={overScreens} secondary='Étiquette statique'>
        <EtiquetteSimulator />
      </Shareable>
    </div>
  )
}

export default Etiquettes
