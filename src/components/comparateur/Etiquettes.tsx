import React, { useMemo, useState } from 'react'
import useParamContext from 'components/providers/ParamProvider'
import ShareableContent from 'components/misc/ShareableContent'
import Tag from 'components/misc/tag/Tag'
import Etiquette from './Etiquette'
import styles from './Etiquettes.module.css'
import { OverScreenEtiquette } from './overscreens/Type'
import { overScreenEtiquetteValues } from './overscreens/Values'

const Etiquettes = () => {
  const {
    comparateur: { baseValue, equivalents, comparedEquivalent },
  } = useParamContext()
  const etiquettes = useMemo(
    () => (comparedEquivalent ? [comparedEquivalent.slug, ...equivalents] : equivalents),
    [comparedEquivalent, equivalents]
  )
  const params = useMemo(() => `value=${baseValue}&comparisons=${etiquettes.join(',')}`, [baseValue, etiquettes])

  const [overScreen1, setOverScreen1] = useState<OverScreenEtiquette>()
  const [overScreen2, setOverScreen2] = useState<OverScreenEtiquette>()
  const overScreenValues = useMemo(() => overScreenEtiquetteValues(params), [params])

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
          path='comparateur/etiquette-animee'
          name='Étiquette animée'
          withoutShare
          extraParams={params}>
          <div className={styles.simulatorContent}>
            <Etiquette baseValue={(baseValue * 1000).toString()} comparisons={etiquettes} animated />
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
          withoutShare
          extraParams={params}>
          <div className={styles.simulatorContent}>
            <Etiquette baseValue={(baseValue * 1000).toString()} comparisons={etiquettes} />
          </div>
        </ShareableContent>
      </div>
    </>
  )
}

export default Etiquettes
