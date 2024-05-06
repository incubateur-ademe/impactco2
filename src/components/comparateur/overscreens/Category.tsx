import React, { useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { computedEquivalents } from 'src/providers/equivalents'
import { Category as CategoryType } from 'types/category'
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
        .sort((a, b) => a.name.localeCompare(b.name)),
    [category, comparedEquivalent]
  )

  return (
    <div className={styles.container}>
      <button className={styles.header} onClick={() => setOpen(!open)}>
        <div className={styles.emoji}>
          <EquivalentIcon height={2.5} equivalent={category} />
        </div>
        <div className={styles.names}>
          <div className={styles.title}>{category.name}</div>
          <div>
            <span className={styles.selectedNumber} data-testid={`selected-equivalents-${category.slug}-number`}>
              {categoryEquivalents.filter((equivalent) => equivalents.includes(equivalent.slug)).length}
            </span>
            <span className={styles.numbers}> / {categoryEquivalents.length}</span>
          </div>
        </div>
        <div
          className={styles.button}
          title={
            open
              ? `Cacher les éléments de la catégorie ${category.name}`
              : `Voir les éléments de la catégorie ${category.name}`
          }>
          {open ? <DropdownArrowUpIcon /> : <DropdownArrowDownIcon />}
        </div>
      </button>
      {open && (
        <>
          <div className={styles.comparison}>
            <div>Comparer avec cette catégorie seulement :</div>
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
              Voir la comparaison
            </Button>
          </div>
          <Equivalents
            equivalents={equivalents}
            equivalentsToDisplay={categoryEquivalents}
            setEquivalents={setEquivalents}
          />
        </>
      )}
    </div>
  )
}

export default Category
