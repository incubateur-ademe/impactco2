import React, { useMemo, useState } from 'react'
import { Category as CategoryType } from 'types/category'
import { computedEquivalents } from 'components/providers/DataProvider'
import useParamContext from 'components/providers/ParamProvider'
import Emoji from 'components/base/Emoji'
import Button from 'components/base/buttons/Button'
import { Icon } from 'components/osezchanger/icons'
import styles from './Category.module.css'
import Equivalents from './Equivalents'

const Category = ({ category }: { category: CategoryType }) => {
  const {
    comparateur: { equivalents },
  } = useParamContext()

  const [open, setOpen] = useState(false)

  const categoryEquivalents = useMemo(
    () =>
      computedEquivalents
        .filter((equivalent) => equivalent.category === category.id)
        .sort((a, b) => a.name.localeCompare(b.name)),
    [category]
  )

  return (
    <div className={styles.container}>
      <button className={styles.header} onClick={() => setOpen(!open)}>
        <div className={styles.emoji}>
          <Emoji height='2.5rem'>{category.emoji}</Emoji>
        </div>
        <div className={styles.names}>
          <div className={styles.title}>{category.name}</div>
          <div>
            <span className={styles.selectedNumber}>
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
          <Icon iconId={open ? 'dropdown-arrow-up' : 'dropdown-arrow-down'} />
        </div>
      </button>
      {open && (
        <>
          <div className={styles.comparison}>
            <div>Comparer avec cette catégorie seulement :</div>
            <Button priority='secondary'>Voir la comparaison</Button>
          </div>
          <Equivalents equivalentsToDisplay={categoryEquivalents} />
        </>
      )}
    </div>
  )
}

export default Category