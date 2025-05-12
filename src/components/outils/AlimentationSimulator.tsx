'use client'

import { useTranslations } from 'next-intl'
import React, { useMemo } from 'react'
import useParamContext from 'src/providers/ParamProvider'
import { computedEquivalents } from 'src/providers/equivalents'
import { AlimentationCategories, equivalentsByCategory } from 'utils/alimentation'
import { track } from 'utils/matomo'
import HiddenLabel from 'components/form/HiddenLabel'
import Select from 'components/form/Select'
import CategorySimulator from './CategorySimulator'
import AlimentationSubCategory from './alimentation/AlimentationSubCategory'
import alimentationStyles from './AlimentationSimulator.module.css'
import styles from './Simulator.module.css'

const AlimentationSimulator = () => {
  const {
    alimentation: { category, setCategory, customList, equivalents },
  } = useParamContext()

  const t = useTranslations('alimentation')
  const values = useMemo(() => equivalentsByCategory[category], [category])
  const [openCategories, setOpenCategories] = React.useState<Record<string, boolean>>({})

  return customList ? (
    <CategorySimulator
      equivalents={computedEquivalents.filter(
        (equivalent, index) =>
          equivalents.includes(equivalent.slug) &&
          computedEquivalents.findIndex((e) => e.slug === equivalent.slug) === index
      )}
      tracking='Alimentation'
      reverse
    />
  ) : (
    <>
      <div className={styles.simulator}>
        <p>{t.rich('title', { important: (chunks) => <b>{chunks}</b> })}</p>
        <HiddenLabel htmlFor='text-select-category'>{t('label')}</HiddenLabel>
        <Select
          id='category'
          className={alimentationStyles.select}
          value={category}
          onChange={(e) => {
            track('Alimentation', 'Category', e.target.value)
            setCategory(e.target.value as AlimentationCategories)
          }}>
          {Object.values(AlimentationCategories).map((category) => (
            <option key={category} value={category}>
              {t(category)}
            </option>
          ))}
        </Select>
      </div>
      <div className={alimentationStyles.categories}>
        {values.length === 1 ? (
          <div className={alimentationStyles.equivalents}>
            <CategorySimulator
              equivalents={equivalentsByCategory[category][0]?.equivalents || []}
              tracking='Alimentation'
              reverse
            />
          </div>
        ) : (
          values.map((value, index) => (
            <AlimentationSubCategory
              equivalents={value.equivalents}
              logos={value.logos}
              name={value.name}
              key={value.name}
              proportion={value.mean / values[0].mean}
              barInfo={index === 0 ? t('biggest') : index === values.length - 1 ? t('smallest') : undefined}
              barPosition={index === 0 ? 'absolute' : 'relative'}
              openCategories={openCategories}
              toggleCategories={(name) => {
                const open = openCategories[name]
                setOpenCategories({ ...openCategories, [name]: !open })
                track('Alimentation', value.name, open ? 'close' : 'open')
              }}
            />
          ))
        )}
        <p className={alimentationStyles.click}>{t('click')}</p>
      </div>
    </>
  )
}

export default AlimentationSimulator
