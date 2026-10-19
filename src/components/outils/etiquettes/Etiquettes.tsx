import { useMemo } from 'react'
import Shareable from 'components/shareable/Shareable'
import EtiquetteIntegrate from 'src/components/shareable/overScreens/EtiquetteIntegrate'
import Share from 'src/components/shareable/overScreens/Share'
import EtiquetteSimulator from './EtiquetteSimulator'
import styles from './Etiquettes.module.css'

const Etiquettes = () => {
  const overScreens = useMemo(
    () => ({
      partager: {
        title: 'share',
        children: <Share path='outils/etiquettes' tracking='Étiquette' />,
      },
      integrer: {
        title: 'integrate-new',
        children: <EtiquetteIntegrate />,
      },
    }),
    []
  )

  return (
    <Shareable slug='etiquette' tracking='Étiquette' overScreens={overScreens} secondary>
      <div className={styles.etiquettes}>
        <EtiquetteSimulator />
        <p>étiquette statique</p>
        <hr className={styles.separator} />
        <EtiquetteSimulator animated />
        <p>étiquette animée</p>
      </div>
    </Shareable>
  )
}

export default Etiquettes
