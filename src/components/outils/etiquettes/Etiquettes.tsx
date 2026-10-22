'use client'

import { useEffect, useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import Shareable from 'components/shareable/Shareable'
import EquivalentsOverscreen from 'src/components/comparateur/overscreens/EquivalentsOverscreen'
import EtiquetteIntegrate from 'src/components/shareable/overScreens/EtiquetteIntegrate'
import Share from 'src/components/shareable/overScreens/Share'
import EtiquetteSimulator from './EtiquetteSimulator'
import styles from './Etiquettes.module.css'

const Etiquettes = () => {
  const { setOverscreen, comparateur } = useParamContext()
  const [equivalents, setEquivalents] = useState(comparateur.equivalents)

  useEffect(() => {
    if (equivalents.length === 0) {
      setEquivalents(comparateur.equivalents)
    }
  }, [comparateur.equivalents, equivalents])

  const overScreens = useMemo(
    () => ({
      partager: {
        title: 'share',
        children: <Share path='outils/etiquettes' tracking='Étiquette' />,
      },
      integrer: {
        title: 'integrate-new',
        children: <EtiquetteIntegrate equivalents={equivalents} setEquivalents={setEquivalents} />,
      },
      equivalents: {
        title: 'equivalent-choose',
        hideFooter: true,
        noHeaderSeparator: true,
        children: (
          <EquivalentsOverscreen
            onClose={() => setOverscreen('etiquette', 'integrer')}
            bottomButtonLabel='validate'
            equivalents={equivalents}
            setEquivalents={setEquivalents}
          />
        ),
        fullHeight: true,
        onClose: () => setOverscreen('etiquette', 'integrer'),
      },
    }),
    [setOverscreen, equivalents, setEquivalents]
  )

  return (
    <Shareable slug='etiquette' tracking='Étiquette' overScreens={overScreens} secondary withNewIntegration>
      <div className={styles.etiquettes}>
        <div>
          <EtiquetteSimulator />
          <p className={styles.label}>étiquette statique</p>
        </div>
        <hr className={styles.separator} />
        <div>
          <EtiquetteSimulator animated />
          <p className={styles.label}>étiquette animée</p>
        </div>
      </div>
    </Shareable>
  )
}

export default Etiquettes
