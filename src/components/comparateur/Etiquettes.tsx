import React, { useMemo, useState } from 'react'
import Equivalent from 'components/externalModules/shopify/Equivalent'
import ShareableContent from 'components/misc/ShareableContent'
import Tag from 'components/misc/tag/Tag'
import styles from './Etiquettes.module.css'
import { OverScreenEtiquette } from './overscreens/Type'
import { overScreenEtiquetteValues } from './overscreens/Values'

const Etiquettes = () => {
  const [overScreen1, setOverScreen1] = useState<OverScreenEtiquette>()
  const [overScreen2, setOverScreen2] = useState<OverScreenEtiquette>()
  const overScreenValues = useMemo(() => overScreenEtiquetteValues(), [])

  return (
    <>
      <div className={styles.header}>
        <Tag text='Nouveau' />
        <span className={styles.title}>
          Valoriser votre comparaison avec les <span className={styles.greenTitle}>étiquettes impact CO2 </span>!
        </span>
      </div>
      <div className={styles.simulator}>
        <ShareableContent<OverScreenEtiquette>
          tracking='Étiquette animée'
          setOverScreen={setOverScreen1}
          overScreen={overScreen1 ? overScreenValues[overScreen1] : undefined}
          path='comparateur/etiquette'
          name='Étiquette animée'
          withoutShare>
          <div className={styles.simulatorContent}>
            <Equivalent baseValue={'100000'} comparisons={['ananas']} />
          </div>
        </ShareableContent>
      </div>
      <div className={styles.simulator}>
        <ShareableContent<OverScreenEtiquette>
          tracking='Étiquette statique'
          setOverScreen={setOverScreen2}
          overScreen={overScreen2 ? overScreenValues[overScreen2] : undefined}
          path='comparateur/etiquette'
          name='Étiquette statique'
          withoutShare>
          <div className={styles.simulatorContent}>
            <Equivalent baseValue={'100000'} comparisons={['ananas', 'voiturethermique', 'tgv']} />
          </div>
        </ShareableContent>
      </div>
    </>
  )
}

export default Etiquettes