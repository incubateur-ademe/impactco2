import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React, { useMemo } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { ComputedEquivalent } from 'types/equivalent'
import { getName, getNameWithoutSuffix } from 'utils/Equivalent/equivalent'
import formatNumber from 'utils/formatNumber'
import EquivalentIcon from 'components/base/EquivalentIcon'
import GhostButton from 'components/base/GhostButton'
import LocalNumber from 'components/base/LocalNumber'
import NewTabIcon from 'components/base/NewTabIcon'
import StarShapeIcon from 'components/base/icons/star-shap'
import styles from './TransportComparisonEquivalent.module.css'

const getEquivalent = (language: string, equivalents: ComputedEquivalent[], slug: string) => {
  const [name, carpool] = slug.split('+')
  const equivalent = equivalents.find((equivalent) => equivalent.slug === name && !equivalent.carpool)
  if (carpool) {
    if (!equivalent) {
      return undefined
    }
    const newName = getName(language, { ...equivalent, carpool: Number(carpool) })
    const oldName = getNameWithoutSuffix(language, equivalent)

    return {
      ...equivalent,
      name: (equivalent.name || '').replace(oldName, newName),
      carpool: Number(carpool),
      value: equivalent.value / (Number(carpool) + 1),
      link: `${equivalent.link}+${carpool}`,
    }
  }
  return equivalent
}

const TransportComparisonEquivalent = ({ index, equivalents }: { index: 0 | 1; equivalents: ComputedEquivalent[] }) => {
  const {
    language,
    setOverscreen,
    overscreen,
    transport: { comparison },
  } = useParamContext()

  const availableEquivalent = useMemo(
    () => getEquivalent(language, equivalents, comparison[index]),
    [language, comparison, index, equivalents]
  )

  const availableOtherEquivalent = useMemo(
    () => getEquivalent(language, equivalents, comparison[(index + 1) % 2]),
    [language, comparison, index, equivalents]
  )

  const t = useTranslations('transport')
  return (
    <div className={styles.container}>
      {availableEquivalent && availableOtherEquivalent && (
        <>
          <Link
            className={styles.open}
            title={`Voir plus d'information sur ${availableEquivalent.name}`}
            href={availableEquivalent.link}
            target='_blank'
            rel='noreferrer noopener'>
            <NewTabIcon />
          </Link>
          {availableEquivalent.value < availableOtherEquivalent.value && (
            <div className={styles.winner}>
              <div className={styles.star}>
                <StarShapeIcon />
              </div>
              <div className={styles.starContent}>
                <div className={styles.starValue}>
                  <LocalNumber number={formatNumber(availableOtherEquivalent.value - availableEquivalent.value)} />
                </div>
                <div>
                  Kg CO₂e
                  <br />
                  {t('avoided')}
                </div>
              </div>
            </div>
          )}
          <EquivalentIcon equivalent={availableEquivalent} height={4} />
          {availableEquivalent.name}
          <div>
            <div className={styles.impact}>
              <span className={styles.value}>
                <LocalNumber number={formatNumber(availableEquivalent.value)} />
              </span>{' '}
              kg CO₂e
            </div>
            <div className={styles.barContainer}>
              <div
                className={availableEquivalent.value > availableOtherEquivalent.value ? styles.bigBar : styles.smallBar}
                style={
                  availableEquivalent.value > availableOtherEquivalent.value
                    ? {}
                    : {
                        width: `${(100 * availableEquivalent.value) / availableOtherEquivalent.value}%`,
                      }
                }
              />
            </div>
          </div>
          <GhostButton onClick={() => setOverscreen({ ...overscreen, transport: `comparison${index}` })}>
            {t('modify')}
          </GhostButton>
        </>
      )}
    </div>
  )
}

export default TransportComparisonEquivalent
