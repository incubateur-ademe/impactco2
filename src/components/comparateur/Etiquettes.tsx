import React, { useMemo, useState } from 'react'
import useScreenshot from 'hooks/useScreenshot'
import useParamContext from 'components/providers/ParamProvider'
import ShareableContent from 'components/misc/ShareableContent'
import Tag from 'components/misc/tag/Tag'
import Etiquette from './Etiquette'
import styles from './Etiquettes.module.css'
import { OverScreenEtiquette } from './overscreens/Type'
import { overScreenEtiquetteValues } from './overscreens/Values'

const Etiquettes = () => {
  const {
    comparateur: { baseValue, weight, equivalents, comparedEquivalent },
  } = useParamContext()
  const etiquettes = useMemo(
    () => (comparedEquivalent ? [comparedEquivalent.slug, ...equivalents] : equivalents),
    [comparedEquivalent, equivalents]
  )
  const params = useMemo(() => `value=${baseValue}&comparisons=${etiquettes.join(',')}`, [baseValue, etiquettes])

  const [overScreen1, setOverScreen1] = useState<OverScreenEtiquette>()
  const [overScreen2, setOverScreen2] = useState<OverScreenEtiquette>()
  const overScreenValues = useMemo(() => overScreenEtiquetteValues(params), [params])

  const { ref: ref1, takeScreenshot: takeScreenshot1 } = useScreenshot('etiquette-animée', 'Étiquette animée')
  const { ref: ref2, takeScreenshot: takeScreenshot2 } = useScreenshot('etiquette-statitique', 'Étiquette statitique')

  return (
    <>
      <div className={styles.header}>
        <Tag text='Nouveau' />
        <span className={styles.title}>
          Valoriser votre comparaison avec les <span className={styles.greenTitle}>étiquettes impact CO2 </span>!
        </span>
      </div>
      <ShareableContent<OverScreenEtiquette>
        tracking='Étiquette animée'
        setOverScreen={setOverScreen1}
        overScreen={overScreen1 ? overScreenValues[overScreen1] : undefined}
        path='comparateur/etiquette-animee'
        name='Étiquette animée'
        withoutShare
        extraParams={params}
        customScreenshot={takeScreenshot1}>
        <div className={styles.simulatorContent}>
          <div ref={ref1}>
            <Etiquette baseValue={(baseValue * weight * 1000).toString()} comparisons={etiquettes} animated />
          </div>
        </div>
      </ShareableContent>
      <div className={styles.simulator}>
        <ShareableContent<OverScreenEtiquette>
          tracking='Étiquette statique'
          setOverScreen={setOverScreen2}
          overScreen={overScreen2 ? overScreenValues[overScreen2] : undefined}
          path='comparateur/etiquette'
          name='Étiquette statique'
          withoutShare
          extraParams={params}
          customScreenshot={takeScreenshot2}>
          <div className={styles.simulatorContent}>
            <div ref={ref2}>
              <Etiquette baseValue={(baseValue * weight * 1000).toString()} comparisons={etiquettes} />
            </div>
          </div>
        </ShareableContent>
      </div>
    </>
  )
}

export default Etiquettes
