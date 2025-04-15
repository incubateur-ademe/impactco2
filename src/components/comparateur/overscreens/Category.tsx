import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { computedEquivalents } from 'src/providers/equivalents'
import { Category as CategoryType } from 'types/category'
import { getName } from 'utils/Equivalent/equivalent'
import { getEquivalentWithCarpool } from 'utils/carpool'
import { track } from 'utils/matomo'
import EquivalentIcon from 'components/base/EquivalentIcon'
import Button from 'components/base/buttons/Button'
import DropdownArrowDownIcon from 'components/base/icons/dropdown-arrow-down'
import DropdownArrowUpIcon from 'components/base/icons/dropdown-arrow-up'
import { getRandomEquivalentsInCategory } from '../random'
import styles from './Category.module.css'
import Equivalents from './Equivalents'

const Category = ({
  category,
  onClose,
  setEquivalents,
  equivalents,
}: {
  category: CategoryType
  onClose: () => void
  setEquivalents: (value: string[]) => void
  equivalents: string[]
}) => {
  const {
    comparateur: { comparedEquivalent, setEquivalents: setFinalEquivalents },
  } = useParamContext()

  const [open, setOpen] = useState(false)

  const categoryEquivalents = useMemo(
    () =>
      computedEquivalents
        .filter((equivalent) => equivalent.category === category.id)
        .filter((equivalent) => equivalent.slug !== comparedEquivalent?.slug)
        .filter((equivalent) => equivalent.value)
        .filter(
          (equivalent, index, values) =>
            values.findIndex((computedEquivalent) => computedEquivalent.slug === equivalent.slug) === index
        )
        .flatMap(getEquivalentWithCarpool)
        .sort((a, b) => getName('fr', a).localeCompare(getName('fr', b))),
    [category, comparedEquivalent]
  )

  const t = useTranslations('comparateur.overscreen')
  const tCategory = useTranslations('category')
  return (
    <div className={styles.container}>
      <button
        className={styles.header}
        onClick={() => setOpen(!open)}
        title={
          open
            ? `${t('hide')} ${tCategory(`name-${category.slug}`)}`
            : `${t('show')} ${tCategory(`name-${category.slug}`)}`
        }>
        <span className={styles.emoji}>
          <EquivalentIcon height={2.5} equivalent={category} />
        </span>
        <span className={styles.names}>
          <legend className={styles.title}>{tCategory(`name-${category.slug}`)}</legend>
          <span>
            <span className={styles.selectedNumber} data-testid={`selected-equivalents-${category.slug}-number`}>
              {categoryEquivalents.filter((equivalent) => equivalents.includes(equivalent.slug)).length}
            </span>
            <span className={styles.numbers}> / {categoryEquivalents.length}</span>
          </span>
        </span>
        <span className={styles.button}>{open ? <DropdownArrowUpIcon /> : <DropdownArrowDownIcon />}</span>
      </button>
      {open && (
        <>
          <div className={styles.comparison}>
            <div>{t('compare')} :</div>
            <Button
              priority='outline'
              onClick={() => {
                setFinalEquivalents(
                  getRandomEquivalentsInCategory(comparedEquivalent?.slug, category.id).map(
                    (equivalent) => equivalent.slug
                  )
                )
                track('Comparateur', 'Voir la comparaison', category.slug)
                onClose()
              }}>
              {t('compare-button')}
            </Button>
          </div>
          <fieldset aria-label={`${t('equivalents-group')} ${tCategory(`name-${category.slug}`)}`}>
            <Equivalents
              equivalents={equivalents}
              equivalentsToDisplay={categoryEquivalents}
              setEquivalents={setEquivalents}
            />
          </fieldset>
        </>
      )}
    </div>
  )
}

export default Category
