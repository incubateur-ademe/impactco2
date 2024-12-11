import { useTranslations } from 'next-intl'
import { Dispatch, SetStateAction, useEffect, useMemo } from 'react'
import { computedEquivalents } from 'data/categories/computedEquivalents'
import { deplacements } from 'data/categories/deplacement'
import { getEquivalentWithCarpool } from 'utils/carpool'
import SelectEquivalent from 'components/form/SelectEquivalent'
import customStyles from './CustomParam.module.css'
import styles from './TransportListParam.module.css'

const equivalents = computedEquivalents('transport', deplacements).flatMap(getEquivalentWithCarpool)

const TransportComparison = ({
  comparison,
  setComparison,
  modes,
}: {
  comparison: string[]
  setComparison: Dispatch<SetStateAction<string[]>>
  modes: string[]
}) => {
  const t = useTranslations('overscreen.transport')

  const filteredEquivalents = useMemo(
    () =>
      equivalents
        .filter((equivalent) => {
          if (equivalent.carpool) {
            const [slug] = equivalent.slug.split('+')
            return modes.includes(`${slug}+1`)
          }
          return modes.includes(equivalent.slug)
        })
        .sort((a, b) => a.slug.localeCompare(b.slug)),
    [modes]
  )

  const equivalent1 = useMemo(
    () => filteredEquivalents.find((deplacement) => deplacement.slug === comparison[0]),
    [comparison, filteredEquivalents]
  )
  const equivalent2 = useMemo(
    () => filteredEquivalents.find((deplacement) => deplacement.slug === comparison[1]),
    [comparison, filteredEquivalents]
  )

  useEffect(() => {
    if (!equivalent1 && !equivalent2) {
      setComparison([filteredEquivalents[0].slug, filteredEquivalents[1].slug])
    } else if (!equivalent1) {
      setComparison([filteredEquivalents[0].slug, comparison[1]])
    } else if (!equivalent2) {
      setComparison([comparison[0], filteredEquivalents[1].slug])
    }
  }, [equivalent1, equivalent2])

  return (
    <fieldset>
      <legend className={customStyles.title}>{t('comparison')}</legend>
      <div className={styles.modes}>
        <div className={styles.select}>
          {equivalent1 && (
            <SelectEquivalent
              id='comparison-1'
              equivalents={filteredEquivalents}
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
              equivalents={filteredEquivalents}
              value={comparison[1]}
              onChange={(event) => {
                setComparison([comparison[0], event.target.value])
              }}
            />
          )}
        </div>
      </div>
    </fieldset>
  )
}

export default TransportComparison
