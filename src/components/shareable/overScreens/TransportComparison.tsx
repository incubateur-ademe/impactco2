import { useTranslations } from 'next-intl'
import React, { useMemo } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { deplacements } from 'data/categories/deplacement'
import SelectEquivalent from 'components/form/SelectEquivalent'
import customStyles from './CustomParam.module.css'
import styles from './TransportListParam.module.css'

const TransportComparison = () => {
  const t = useTranslations('overscreen.transport')
  const {
    transport: { comparison, setComparison },
  } = useParamContext()

  const equivalent1 = useMemo(
    () => deplacements.find((deplacement) => deplacement.slug === comparison[0]),
    [comparison]
  )
  const equivalent2 = useMemo(
    () => deplacements.find((deplacement) => deplacement.slug === comparison[1]),
    [comparison]
  )

  return (
    <>
      <div className={customStyles.title}>{t('comparison')}</div>
      <div className={styles.modes}>
        <div className={styles.select}>
          {equivalent1 && (
            <SelectEquivalent
              id='comparison-1'
              equivalents={deplacements}
              equivalent={equivalent1}
              value={comparison[0]}
              onChange={(event) => {
                setComparison([event.target.value, comparison[1]])
              }}
            />
          )}
        </div>
        <div className={styles.select}>
          {equivalent2 && (
            <SelectEquivalent
              id='comparison-2'
              equivalents={deplacements}
              equivalent={equivalent2}
              value={comparison[1]}
              onChange={(event) => {
                setComparison([comparison[0], event.target.value])
              }}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default TransportComparison
