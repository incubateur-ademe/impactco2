'use client'

import classNames from 'classnames'
import { useTranslations } from 'next-intl'
import { ReactNode, useEffect, useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import useTrackingContext from 'src/providers/TrackingProvider'
import { computedEquivalents } from 'src/providers/equivalents'
import { ComputedEquivalent } from 'types/equivalent'
import { getNameWithoutSuffix } from 'utils/Equivalent/equivalent'
import { track } from 'utils/matomo'
import CheckboxInput from 'components/form/CheckboxInput'
import Select from 'components/form/Select'
import CategorySimulator from '../CategorySimulator'
import { livraisonData } from './LivraisonData'
import { LivraisonType } from './Type'
import styles from '../Simulator.module.css'
import livraisonStyles from './LivraisonSimulator.module.css'

const livraisonEquivalents = computedEquivalents.filter((equivalent) => equivalent.category === 12)
const voiturethermique = computedEquivalents.find(
  (equivalent) => equivalent.slug === 'voiturethermique'
) as ComputedEquivalent
const voitureelectrique = computedEquivalents.find(
  (equivalent) => equivalent.slug === 'voitureelectrique'
) as ComputedEquivalent

const LivraisonSimulator = () => {
  const { trackOnce } = useTrackingContext()
  const t = useTranslations('livraison')
  const { livraison, language } = useParamContext()

  const [type, setType] = useState(LivraisonType.Courses)

  useEffect(() => {
    if (livraison.types && !livraison.types.includes(type)) {
      setType(livraison.types[0])
    }
  }, [livraison.types])

  const equivalents = useMemo(() => {
    const data = livraisonData[type]
    return livraisonEquivalents
      .filter((equivalent) => !equivalent.slug.endsWith('kg'))
      .filter((equivalent) => {
        return livraison.modes.some((mode) => equivalent.slug.startsWith(mode))
      })
      .map((equivalent) => {
        if (!data.ecv[equivalent.slug]) {
          return equivalent
        }

        const ecvs = [...data.ecv[equivalent.slug]]
        const distance = livraison.distance[equivalent.slug]
        const transport = livraison.transport[equivalent.slug]
        let initialValue = ecvs.reduce((acc, ecv) => acc + ecv.value, 0)
        let detail: ReactNode = ''
        if (distance && transport) {
          initialValue += (equivalent.slug === 'pointrelais' ? 7 : 30) * voiturethermique.value
          ecvs.push({
            id: 56,
            value: distance * 2 * (transport === 'voiturethermique' ? voiturethermique.value : voitureelectrique.value),
          })
          detail = <span className={livraisonStyles.gray}> - {t('car')}</span>
        } else if (equivalent.slug.includes('douce')) {
          detail = <span className={livraisonStyles.green}> - {t('foot')}</span>
        }

        if (livraison.withFabrication && data.fabrication) {
          ecvs.push({ id: 58, value: data.fabrication })
          initialValue += data.fabrication
        }

        return {
          ...equivalent,
          ecv: ecvs,
          initialValue,
          value: ecvs.reduce((acc, ecv) => acc + ecv.value, 0),
          livraison: !!(distance && transport),
          name: (
            <>
              <span>{getNameWithoutSuffix(language, equivalent)}</span>
              {detail}
            </>
          ),
        }
      })
  }, [type, livraison.modes, livraison.withFabrication, livraison.transport, livraison.distance, language])

  return (
    <>
      <div className={classNames(styles.simulator, livraisonStyles.withBorder)}>
        <label htmlFor='text-select-type'>{t('title')}</label>
        <Select
          className={livraisonStyles.select}
          id='type'
          value={type}
          onChange={(e) => {
            track('Livraison', 'Type', e.target.value)
            trackOnce('Type')
            setType(e.target.value as LivraisonType)
          }}>
          {livraison.types.map((type) => (
            <option key={type} value={type}>
              {t(type)}
            </option>
          ))}
        </Select>
        <div className={livraisonStyles.checkBox}>
          <CheckboxInput
            id='fabrication'
            label={t('fabrication')}
            checked={livraison.withFabrication}
            setChecked={(checked) => {
              livraison.setWithFabrication(checked)
              trackOnce('Fabrication')
              track('Livraison', 'Fabrication', checked.toString())
            }}
          />
        </div>
      </div>
      <div className={livraisonStyles.separator} />
      <CategorySimulator
        equivalents={equivalents}
        tracking='Livraison'
        withSimulator
        forceLegendDown={livraison.modes.length < 4}
      />
    </>
  )
}

export default LivraisonSimulator
