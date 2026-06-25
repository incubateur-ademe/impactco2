'use client'

import { useTranslations } from 'next-intl'
import { useMemo, useState } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { ComputedEquivalent } from 'types/equivalent'
import { getName } from 'utils/Equivalent/equivalent'
import EquivalentIcon from 'components/base/EquivalentIcon'
import DropdownArrowDownIcon from 'components/base/icons/dropdown-arrow-down'
import DropdownArrowUpIcon from 'components/base/icons/dropdown-arrow-up'
import Checkbox from './Checkbox'
import ComparisonEquivalents from './ComparisonEquivalents'
import styles from './SubCategoryEquivalent.module.css'

type BaseProps = {
  category: ComputedEquivalent
  categoriesEquivalents: Record<string, ComputedEquivalent[]>
}

type ComparisonModeProps = BaseProps & {
  checkbox?: false
  onClose: () => void
  index: 0 | 1
}

type CheckboxModeProps = BaseProps & {
  checkbox: true
  equivalents: string[]
  setEquivalents: (value: string[]) => void
}

type Props = ComparisonModeProps | CheckboxModeProps

const SubCategoryEquivalent = ({ category, categoriesEquivalents, ...props }: Props) => {
  const { language } = useParamContext()
  const t = useTranslations('comparateur.overscreen.subCategory')
  const tOverscreen = useTranslations('comparateur.overscreen')

  const [open, setOpen] = useState(false)
  const checkboxEquivalents = props.checkbox ? props.equivalents : undefined
  const { total, selected } = useMemo(() => {
    if (!checkboxEquivalents) {
      return { total: 0, selected: 0 }
    }

    let total = 0
    let selected = 0
    Object.values(categoriesEquivalents).forEach((subCategoryEquivalents) => {
      subCategoryEquivalents.forEach((equivalent) => {
        total += 1
        if (checkboxEquivalents.includes(equivalent.slug)) {
          selected += 1
        }
      })
    })
    return { total, selected }
  }, [categoriesEquivalents, checkboxEquivalents])

  const name = getName(language, category)
  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        className={styles.header}
        title={open ? `${tOverscreen('hide')} ${name}` : `${tOverscreen('show')} ${name}`}>
        <span className={styles.button}>{open ? <DropdownArrowUpIcon /> : <DropdownArrowDownIcon />}</span>
        <span className={styles.title}>
          <legend>{name}</legend>
          {props.checkbox && (
            <span>
              <span
                className={selected > 0 ? styles.coloredNumber : ''}
                data-testid={`selected-equivalents-${category.slug}-number`}>
                {selected}
              </span>{' '}
              / {total}
            </span>
          )}
        </span>
        <EquivalentIcon equivalent={category} height={2.5} />
      </button>
      {open && (
        <div className={styles.subCategories}>
          {Object.entries(categoriesEquivalents).map(([subCategory, subCategoryEquivalents]) => (
            <div key={subCategory}>
              {subCategory && <p className={styles.subCategory}>{t(subCategory)}</p>}
              {subCategoryEquivalents.map((equivalent) => {
                return (
                  <div className={styles.checkbox} key={equivalent.slug}>
                    {props.checkbox ? (
                      <Checkbox
                        equivalents={props.equivalents}
                        equivalent={equivalent}
                        setEquivalents={props.setEquivalents}
                        simple
                      />
                    ) : (
                      <ComparisonEquivalents
                        onClose={props.onClose}
                        equivalents={[equivalent]}
                        index={props.index}
                        simple
                      />
                    )}
                  </div>
                )
              })}
            </div>
          ))}
        </div>
      )}
    </>
  )
}

export default SubCategoryEquivalent
