import { useTranslations } from 'next-intl'
import Link from 'next/link'
import React, { useMemo } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { computedEquivalents } from 'src/providers/equivalents'
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
  const equivalent = equivalents.find(
    (equivalent) =>
      (slug === 'avion' ? equivalent.slug.startsWith('avion') : equivalent.slug === name) && !equivalent.carpool
  ) as (ComputedEquivalent & { found?: boolean }) | undefined
  if (!equivalent) {
    return computedEquivalents.find((equivalent) =>
      slug === 'avion' ? equivalent.slug.startsWith('avion') : equivalent.slug === name
    ) as (ComputedEquivalent & { found?: boolean }) | undefined
  }
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
      found: true,
    }
  }
  return equivalent ? { ...equivalent, found: true } : undefined
}

const TransportComparisonEquivalent = ({ index, equivalents }: { index: 0 | 1; equivalents: ComputedEquivalent[] }) => {
  const {
    language,
    setOverscreen,
    overscreen,
    transport: { comparison },
  } = useParamContext()

  const equivalent = useMemo(
    () => getEquivalent(language, equivalents, comparison[index]),
    [language, comparison, index, equivalents]
  )

  const otherEquivalent = useMemo(
    () => getEquivalent(language, equivalents, comparison[(index + 1) % 2]),
    [language, comparison, index, equivalents]
  )

  const t = useTranslations('transport')
  return (
    <div className={styles.container}>
      {equivalent && otherEquivalent && (
        <>
          <Link
            className={styles.open}
            title={`Voir plus d'information sur ${equivalent.name}`}
            href={equivalent.link}
            target='_blank'
            rel='noreferrer noopener'>
            <NewTabIcon noMargin />
          </Link>
          {equivalent.found && otherEquivalent.found && equivalent.value < otherEquivalent.value && (
            <div className={styles.winner}>
              <div className={styles.star}>
                <StarShapeIcon />
              </div>
              <div className={styles.starContent}>
                <div className={styles.starValue}>
                  <LocalNumber number={formatNumber(otherEquivalent.value - equivalent.value)} />
                </div>
                <div>
                  Kg CO₂e
                  <br />
                  {t('avoided')}
                </div>
              </div>
            </div>
          )}
          <EquivalentIcon equivalent={equivalent} height={4} />
          {equivalent.found ? equivalent.name : getName(language, equivalent)}
          {equivalent.found ? (
            <div>
              <div className={styles.impact}>
                <span className={styles.value}>
                  <LocalNumber number={formatNumber(equivalent.value)} />
                </span>{' '}
                kg CO₂e
              </div>
              <div className={styles.barContainer}>
                <div
                  className={equivalent.value > otherEquivalent.value ? styles.bigBar : styles.smallBar}
                  style={
                    equivalent.value > otherEquivalent.value
                      ? {}
                      : {
                          width: `${(100 * equivalent.value) / otherEquivalent.value}%`,
                        }
                  }
                />
              </div>
            </div>
          ) : (
            <div className={styles.notFound}>
              <b>{t('sorry')}</b>
              <br />
              {t('notFound')}
            </div>
          )}
          <div className={styles.button}>
            <GhostButton onClick={() => setOverscreen({ ...overscreen, transport: `comparison${index}` })}>
              {t('modify')}
            </GhostButton>
          </div>
        </>
      )}
    </div>
  )
}

export default TransportComparisonEquivalent
