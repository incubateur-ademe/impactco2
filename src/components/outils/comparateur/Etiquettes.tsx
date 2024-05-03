import React, { useMemo } from 'react'
import Shareable from 'components/shareable/Shareable'
import { overScreenComparateurValues } from 'components/shareable/overScreens/Values'
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
